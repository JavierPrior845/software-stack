export interface MemoryLevel {
  id: string;
  name: string;
  ns: number;
  note: string;
}

export const MEMORY_LEVELS: MemoryLevel[] = [
  { id: 'register', name: 'Registro', ns: 0.3, note: 'dentro de la CPU' },
  { id: 'l1', name: 'Caché L1', ns: 1, note: '32–64 KB por núcleo' },
  { id: 'l2', name: 'Caché L2', ns: 4, note: '256 KB–1 MB por núcleo' },
  { id: 'l3', name: 'Caché L3', ns: 12, note: 'compartida, 8–32 MB' },
  { id: 'ram', name: 'RAM', ns: 100, note: 'DRAM, decenas de GB' },
  { id: 'ssd', name: 'SSD NVMe', ns: 100_000, note: '~100 µs por acceso' },
  { id: 'hdd', name: 'HDD', ns: 10_000_000, note: '~10 ms, ya mecánico' },
  { id: 'network', name: 'Red', ns: 150_000_000, note: 'RTT intercontinental' },
];

export const MIN_NS = MEMORY_LEVELS[0].ns;
export const MAX_NS = MEMORY_LEVELS[MEMORY_LEVELS.length - 1].ns;

export function logWidth(ns: number, min = MIN_NS, max = MAX_NS): number {
  const ratio = (Math.log10(ns) - Math.log10(min)) / (Math.log10(max) - Math.log10(min));
  return 5 + Math.max(0, Math.min(1, ratio)) * 95;
}

export function relativeSeconds(ns: number, baseNs: number): number {
  return ns / baseNs;
}

export function formatLatency(ns: number): string {
  if (ns < 1_000) return `${trim(ns)} ns`;
  if (ns < 1_000_000) return `${trim(ns / 1_000)} µs`;
  if (ns < 1_000_000_000) return `${trim(ns / 1_000_000)} ms`;
  return `${trim(ns / 1_000_000_000)} s`;
}

export function formatDuration(seconds: number): string {
  if (seconds < 0.001) return formatLatency(seconds * 1_000_000_000);
  if (seconds < 1) return `${trim(seconds * 1_000)} ms`;
  if (seconds < 60) return `${trim(seconds)} s`;
  if (seconds < 3_600) {
    const minutes = Math.floor(seconds / 60);
    const rest = Math.round(seconds % 60);
    return rest > 0 ? `${minutes} min ${rest} s` : `${minutes} min`;
  }
  if (seconds < 86_400) {
    const hours = Math.floor(seconds / 3_600);
    const minutes = Math.round((seconds % 3_600) / 60);
    return minutes > 0 ? `${hours} h ${minutes} min` : `${hours} h`;
  }
  if (seconds < 31_536_000) return `${trim(seconds / 86_400)} días`;
  return `${trim(seconds / 31_536_000)} años`;
}

function trim(value: number): string {
  const rounded = value >= 100 ? Math.round(value) : value >= 10 ? Math.round(value * 10) / 10 : Math.round(value * 10) / 10;
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 }).format(rounded);
}
