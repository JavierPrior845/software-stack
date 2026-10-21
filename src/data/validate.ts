import { DIAGRAM_IDS, WIDGET_IDS, type Stack, type StackId } from './types';
import type { Bridge } from './bridges';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assertText(errors: string[], value: string | undefined, label: string) {
  if (!value || !value.trim()) errors.push(`${label}: texto vacío`);
}

export function validateContent(stacks: Record<StackId, Stack>, bridges: Bridge[]): void {
  const errors: string[] = [];
  const conceptSlugs = new Map<string, string>();

  for (const [id, stack] of Object.entries(stacks) as Array<[StackId, Stack]>) {
    if (stack.id !== id) errors.push(`stack "${id}": id interno "${stack.id}" no coincide`);

    const layerSlugs = new Set<string>();
    const layerNumbers = new Set<number>();

    for (const layer of stack.layers) {
      const where = `${stack.id}/${layer.slug}`;

      if (!SLUG_RE.test(layer.slug)) errors.push(`${where}: slug de capa inválido`);
      if (layerSlugs.has(layer.slug)) errors.push(`${where}: capa duplicada`);
      layerSlugs.add(layer.slug);

      if (layerNumbers.has(layer.number)) errors.push(`${where}: número de capa ${layer.number} duplicado`);
      layerNumbers.add(layer.number);

      assertText(errors, layer.title, `${where}.title`);
      assertText(errors, layer.subtitle, `${where}.subtitle`);

      if (layer.hue < 0 || layer.hue > 360) errors.push(`${where}: hue ${layer.hue} fuera de 0–360`);

      const blockSlugs = new Set<string>();

      for (const block of layer.blocks) {
        const blockWhere = `${where}/${block.slug}`;

        if (!SLUG_RE.test(block.slug)) errors.push(`${blockWhere}: slug de bloque inválido`);
        if (blockSlugs.has(block.slug)) errors.push(`${blockWhere}: bloque duplicado en la capa`);
        blockSlugs.add(block.slug);

        assertText(errors, block.title, `${blockWhere}.title`);

        for (const concept of block.concepts) {
          const conceptWhere = `${blockWhere}/${concept.slug} (${concept.name || 'sin nombre'})`;

          if (!SLUG_RE.test(concept.slug)) errors.push(`${conceptWhere}: slug inválido`);
          if (conceptSlugs.has(concept.slug)) {
            errors.push(`${conceptWhere}: slug duplicado, ya existe en ${conceptSlugs.get(concept.slug)}`);
          }
          conceptSlugs.set(concept.slug, blockWhere);

          assertText(errors, concept.name, `${conceptWhere}.name`);
          assertText(errors, concept.tagline, `${conceptWhere}.tagline`);
          assertText(errors, concept.summary, `${conceptWhere}.summary`);

          if (concept.diagram && !(DIAGRAM_IDS as readonly string[]).includes(concept.diagram)) {
            errors.push(`${conceptWhere}: diagrama desconocido "${concept.diagram}"`);
          }

          if (concept.widget && !(WIDGET_IDS as readonly string[]).includes(concept.widget)) {
            errors.push(`${conceptWhere}: widget desconocido "${concept.widget}"`);
          }

          if (concept.tradeoffs) {
            if (!concept.tradeoffs.whenToUse.length) errors.push(`${conceptWhere}: whenToUse vacío`);
            if (!concept.tradeoffs.whenToAvoid.length) errors.push(`${conceptWhere}: whenToAvoid vacío`);
            assertText(errors, concept.tradeoffs.cost, `${conceptWhere}.tradeoffs.cost`);
          }
        }
      }
    }
  }

  const bridgeIds = new Set<string>();
  const software = new Set<string>();
  const ai = new Set<string>();

  for (const layer of stacks.software.layers) {
    for (const block of layer.blocks) {
      for (const concept of block.concepts) software.add(concept.slug);
    }
  }

  for (const layer of stacks.ai.layers) {
    for (const block of layer.blocks) {
      for (const concept of block.concepts) ai.add(concept.slug);
    }
  }

  for (const bridge of bridges) {
    const where = `bridge ${bridge.id || '(sin id)'}`;

    if (!SLUG_RE.test(bridge.id)) errors.push(`${where}: id inválido`);
    if (bridgeIds.has(bridge.id)) errors.push(`${where}: id duplicado`);
    bridgeIds.add(bridge.id);

    assertText(errors, bridge.theme, `${where}.theme`);
    assertText(errors, bridge.note, `${where}.note`);

    if (!software.has(bridge.software)) {
      errors.push(`${where}: "${bridge.software}" no es un concepto del stack de software`);
    }
    if (!ai.has(bridge.ai)) {
      errors.push(`${where}: "${bridge.ai}" no es un concepto del stack de IA`);
    }
    if (bridge.software === bridge.ai) errors.push(`${where}: apunta al mismo slug en ambos lados`);
  }

  if (errors.length > 0) {
    throw new Error(
      `Contenido inválido (${errors.length} ${errors.length === 1 ? 'error' : 'errores'}):\n` +
        errors.map((error) => `  - ${error}`).join('\n'),
    );
  }
}
