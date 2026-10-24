export type StackId = 'software' | 'ai';

export const DIAGRAM_IDS = [
  'memory-hierarchy',
  'cpu-pipeline',
  'virtual-memory',
  'avl-vs-bst',
  'hexagonal-arch',
  'testing-pyramid',
  'encapsulation',
  'tcp-handshake',
  'tls-handshake',
  'bias-variance',
  'neural-activations',
  'attention',
  'react-loop',
  'rag-pipeline',
  'bit-layout',
  'process-memory-layout',
] as const;

export type DiagramId = (typeof DIAGRAM_IDS)[number];

export const WIDGET_IDS = [
  'memory-scale',
  'big-o-playground',
  'hash-probing',
  'stack-selector',
  'attention-explorer',
  'kv-cache',
  'logic-gates',
] as const;

export type WidgetId = (typeof WIDGET_IDS)[number];

export interface Tradeoffs {
  whenToUse: string[];
  whenToAvoid: string[];
  cost: string;
}

export interface ConceptExample {
  label: string;
  code: string;
  note?: string;
}

export interface Concept {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  keyPoints?: string[];
  tags?: string[];
  diagram?: DiagramId;
  widget?: WidgetId;
  complexity?: string;
  tradeoffs?: Tradeoffs;
  example?: ConceptExample;
}

export interface Block {
  slug: string;
  title: string;
  summary: string;
  concepts: Concept[];
}

export interface Layer {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  hue: number;
  blocks: Block[];
}

export interface Stack {
  id: StackId;
  title: string;
  short: string;
  claim: string;
  layers: Layer[];
}
