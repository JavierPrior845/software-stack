export type StackId = 'software' | 'ai';

export type DiagramId =
  | 'memory-hierarchy'
  | 'cpu-pipeline'
  | 'encapsulation'
  | 'tls-handshake'
  | 'attention'
  | 'react-loop';

export interface Tradeoffs {
  whenToUse: string[];
  whenToAvoid: string[];
  cost: string;
}

export interface Concept {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  keyPoints?: string[];
  tags?: string[];
  diagram?: DiagramId;
  complexity?: string;
  tradeoffs?: Tradeoffs;
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
