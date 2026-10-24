export type GateId = 'and' | 'or' | 'xor' | 'nand' | 'nor';
export type Bit = 0 | 1;

export interface Gate {
  id: GateId;
  label: string;
  expression: string;
  evaluate: (a: boolean, b: boolean) => boolean;
}

export const GATES: Gate[] = [
  { id: 'and', label: 'AND', expression: 'A · B', evaluate: (a, b) => a && b },
  { id: 'or', label: 'OR', expression: 'A + B', evaluate: (a, b) => a || b },
  { id: 'xor', label: 'XOR', expression: 'A ⊕ B', evaluate: (a, b) => a !== b },
  { id: 'nand', label: 'NAND', expression: '¬(A · B)', evaluate: (a, b) => !(a && b) },
  { id: 'nor', label: 'NOR', expression: '¬(A + B)', evaluate: (a, b) => !(a || b) },
];

export function getGate(id: string): Gate | undefined {
  return GATES.find((gate) => gate.id === id);
}

export function evaluateGate(id: GateId, a: Bit, b: Bit): Bit {
  const gate = getGate(id);
  if (!gate) throw new Error(`Puerta desconocida: ${id}`);
  return gate.evaluate(a === 1, b === 1) ? 1 : 0;
}

export interface TruthRow {
  a: Bit;
  b: Bit;
  y: Bit;
}

export function truthTable(id: GateId): TruthRow[] {
  const rows: Array<{ a: Bit; b: Bit }> = [
    { a: 0, b: 0 },
    { a: 0, b: 1 },
    { a: 1, b: 0 },
    { a: 1, b: 1 },
  ];
  return rows.map(({ a, b }) => ({ a, b, y: evaluateGate(id, a, b) }));
}
