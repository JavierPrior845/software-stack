export const KV_MODEL = {
  name: 'Llama-3-8B',
  layers: 32,
  queryHeads: 32,
  headDim: 128,
  weightsGiB: 16,
  pageTokens: 16,
};

export const KV_VARIANTS = {
  mha: { label: 'MHA', kvHeads: 32, note: 'una K/V por cabeza' },
  gqa: { label: 'GQA', kvHeads: 8, note: '8 queries por K/V' },
  mqa: { label: 'MQA', kvHeads: 1, note: 'una K/V para todas' },
} as const;

export type KvVariant = keyof typeof KV_VARIANTS;

export const KV_DTYPES = {
  fp16: { label: 'FP16', bytes: 2 },
  fp8: { label: 'FP8', bytes: 1 },
} as const;

export type KvDtype = keyof typeof KV_DTYPES;

export interface KvOptions {
  variant: KvVariant;
  dtype: KvDtype;
  context: number;
  batch: number;
}

export function kvBytesPerToken(options: Pick<KvOptions, 'variant' | 'dtype'>): number {
  const { kvHeads } = KV_VARIANTS[options.variant];
  const bytes = KV_DTYPES[options.dtype].bytes;
  return 2 * KV_MODEL.layers * kvHeads * KV_MODEL.headDim * bytes;
}

export function kvCacheBytes(options: KvOptions): number {
  return kvBytesPerToken(options) * options.context * options.batch;
}

export function pagedKvBytes(options: KvOptions, occupancy: number): number {
  const usedTokens = Math.ceil((options.context * occupancy) / 100);
  const allocated = Math.ceil(usedTokens / KV_MODEL.pageTokens) * KV_MODEL.pageTokens;
  return kvBytesPerToken(options) * allocated * options.batch;
}

export function formatBytes(bytes: number): string {
  const units = [
    { label: 'TiB', size: 1024 ** 4 },
    { label: 'GiB', size: 1024 ** 3 },
    { label: 'MiB', size: 1024 ** 2 },
    { label: 'KiB', size: 1024 },
  ];
  const unit = units.find((item) => bytes >= item.size) ?? { label: 'B', size: 1 };
  const value = bytes / unit.size;
  return `${new Intl.NumberFormat('es-ES', { maximumFractionDigits: value >= 10 ? 0 : 1 }).format(value)} ${unit.label}`;
}

export function formatTokens(tokens: number): string {
  if (tokens >= 1024) {
    const k = tokens / 1024;
    return `${new Intl.NumberFormat('es-ES', { maximumFractionDigits: k % 1 === 0 ? 0 : 1 }).format(k)}K`;
  }
  return String(tokens);
}
