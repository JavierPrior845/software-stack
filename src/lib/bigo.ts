export const BIG_O_SIZES = [10, 100, 1_000, 10_000, 100_000, 1_000_000] as const;

export interface ComplexityCurve {
  id: string;
  notation: string;
  name: string;
  example: string;
  ops: (n: number) => number;
}

export const COMPLEXITY_CURVES: ComplexityCurve[] = [
  {
    id: 'o1',
    notation: 'O(1)',
    name: 'Constante',
    example: 'Índice de array, tabla hash ideal',
    ops: () => 1,
  },
  {
    id: 'ologn',
    notation: 'O(log₂ N)',
    name: 'Logarítmica',
    example: 'Búsqueda binaria, árbol AVL / B-Tree',
    ops: (n) => Math.max(1, Math.ceil(Math.log2(n))),
  },
  {
    id: 'on',
    notation: 'O(N)',
    name: 'Lineal',
    example: 'Recorrido de array, búsqueda sin índice',
    ops: (n) => n,
  },
  {
    id: 'onlogn',
    notation: 'O(N log₂ N)',
    name: 'Cuasilineal',
    example: 'MergeSort, QuickSort medio',
    ops: (n) => Math.round(n * Math.log2(n)),
  },
  {
    id: 'on2',
    notation: 'O(N²)',
    name: 'Cuadrática',
    example: 'Doble bucle anidado, Self-Attention densa',
    ops: (n) => n * n,
  },
  {
    id: 'o2n',
    notation: 'O(2ᴺ)',
    name: 'Exponencial',
    example: 'Subconjuntos / fuerza bruta sin poda',
    ops: (n) => (n > 40 ? Number.POSITIVE_INFINITY : 2 ** n),
  },
];

export function formatOps(ops: number): string {
  if (!Number.isFinite(ops)) return '> 10³⁰ ops (inviable)';
  if (ops >= 1_000_000_000_000) return `${(ops / 1_000_000_000_000).toFixed(0)} B ops`;
  if (ops >= 1_000_000_000) return `${(ops / 1_000_000_000).toFixed(1)} G ops`;
  if (ops >= 1_000_000) return `${(ops / 1_000_000).toFixed(1)} M ops`;
  return `${new Intl.NumberFormat('es-ES').format(ops)} ops`;
}

/** Asume ~1 ns por operación elemental en CPU moderna (10^9 ops/s). */
export function estimateCpuTime(ops: number): string {
  if (!Number.isFinite(ops)) return 'siglos (cuelgue total)';
  const ns = ops;
  if (ns < 1_000) return `< 1 µs`;
  if (ns < 1_000_000) return `${(ns / 1_000).toFixed(1)} µs`;
  if (ns < 1_000_000_000) return `${(ns / 1_000_000).toFixed(1)} ms`;
  const s = ns / 1_000_000_000;
  if (s < 60) return `${s.toFixed(1)} s`;
  if (s < 3600) return `${(s / 60).toFixed(1)} min`;
  return `${(s / 3600).toFixed(1)} h`;
}

export function opsBarWidth(ops: number, maxFiniteOps: number): number {
  if (!Number.isFinite(ops)) return 100;
  if (ops <= 1) return 4;
  const ratio = Math.log10(ops) / Math.log10(Math.max(10, maxFiniteOps));
  return Math.max(4, Math.min(100, Math.round(ratio * 100)));
}
