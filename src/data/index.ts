import { software } from './software';
import { ai } from './ai';
import { validateContent } from './validate';
import { bridges, type Bridge } from './bridges';
import type { Block, Concept, Layer, Stack, StackId } from './types';

export const stacks: Record<StackId, Stack> = { software, ai };
export { bridges };
export type { Bridge };

export interface ConceptLocation {
  concept: Concept;
  block: Block;
  layer: Layer;
  stack: Stack;
  prev: { slug: string; name: string } | null;
  next: { slug: string; name: string } | null;
}

function buildIndex(stack: Stack): Map<string, ConceptLocation> {
  const flat: Array<{ concept: Concept; block: Block; layer: Layer }> = [];

  for (const layer of stack.layers) {
    for (const block of layer.blocks) {
      for (const concept of block.concepts) {
        flat.push({ concept, block, layer });
      }
    }
  }

  const index = new Map<string, ConceptLocation>();

  flat.forEach((entry, position) => {
    const prev = flat[position - 1];
    const next = flat[position + 1];

    index.set(entry.concept.slug, {
      ...entry,
      stack,
      prev: prev ? { slug: prev.concept.slug, name: prev.concept.name } : null,
      next: next ? { slug: next.concept.slug, name: next.concept.name } : null,
    });
  });

  return index;
}

const indexes: Record<StackId, Map<string, ConceptLocation>> = {
  software: buildIndex(software),
  ai: buildIndex(ai),
};

const allLocations = new Map<string, ConceptLocation>([
  ...indexes.software.entries(),
  ...indexes.ai.entries(),
]);

export function getConcept(slug: string): ConceptLocation | undefined {
  return allLocations.get(slug);
}

export function allConceptSlugs(): string[] {
  return [...allLocations.keys()];
}

export function getStack(id: StackId): Stack {
  return stacks[id];
}

export function getStackOf(slug: string): Stack | undefined {
  return getConcept(slug)?.stack;
}

export function getBridgesFor(slug: string): Bridge[] {
  return bridges.filter((bridge) => bridge.software === slug || bridge.ai === slug);
}

export function getBridgePair(bridge: Bridge): {
  software: ConceptLocation | undefined;
  ai: ConceptLocation | undefined;
} {
  return {
    software: getConcept(bridge.software),
    ai: getConcept(bridge.ai),
  };
}

export function layerConceptCount(layer: Layer): number {
  return layer.blocks.reduce((total, block) => total + block.concepts.length, 0);
}

export function stackConceptCount(stack: Stack): number {
  return stack.layers.reduce((total, layer) => total + layerConceptCount(layer), 0);
}

validateContent(stacks, bridges);

export const totalConcepts = allLocations.size;
export const totalBridges = bridges.length;
