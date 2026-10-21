import test from 'node:test';
import assert from 'node:assert/strict';
import { formatBytes, formatTokens, kvBytesPerToken, kvCacheBytes, pagedKvBytes } from '../src/lib/kv.ts';
import { formatDuration, formatLatency, logWidth, relativeSeconds } from '../src/lib/memory.ts';

const base = { context: 8192, batch: 1, dtype: 'fp16' as const };

test('KV-cache: bytes por token según variante', () => {
  assert.equal(kvBytesPerToken({ variant: 'gqa', dtype: 'fp16' }), 131_072);
  assert.equal(kvBytesPerToken({ variant: 'mha', dtype: 'fp16' }), 524_288);
  assert.equal(kvBytesPerToken({ variant: 'mqa', dtype: 'fp16' }), 16_384);
  assert.equal(kvBytesPerToken({ variant: 'gqa', dtype: 'fp8' }), 65_536);
});

test('KV-cache: 8K de contexto con Llama-3-8B', () => {
  assert.equal(kvCacheBytes({ ...base, variant: 'gqa' }), 1024 ** 3);
  assert.equal(kvCacheBytes({ ...base, variant: 'mha' }), 4 * 1024 ** 3);
  assert.equal(kvCacheBytes({ ...base, variant: 'mqa' }), 128 * 1024 ** 2);
  assert.equal(kvCacheBytes({ ...base, variant: 'gqa', batch: 8 }), 8 * 1024 ** 3);
});

test('PagedAttention: el desperdicio depende de la ocupación', () => {
  const contiguous = kvCacheBytes({ ...base, variant: 'gqa' });
  assert.equal(pagedKvBytes({ ...base, variant: 'gqa' }, 100), contiguous);
  assert.equal(pagedKvBytes({ ...base, variant: 'gqa' }, 50), contiguous / 2);
  assert.equal(pagedKvBytes({ ...base, variant: 'gqa' }, 33), contiguous * (2704 / 8192));
});

test('Formato de bytes y tokens', () => {
  assert.equal(formatBytes(1024 ** 3), '1 GiB');
  assert.equal(formatBytes(128 * 1024 ** 2), '128 MiB');
  assert.equal(formatBytes(1.5 * 1024 ** 3), '1,5 GiB');
  assert.equal(formatTokens(8192), '8K');
  assert.equal(formatTokens(131072), '128K');
});

test('Memoria: latencias y escala humana', () => {
  assert.equal(formatLatency(0.3), '0,3 ns');
  assert.equal(formatLatency(100), '100 ns');
  assert.equal(formatLatency(100_000), '100 µs');
  assert.equal(formatLatency(150_000_000), '150 ms');
  assert.equal(relativeSeconds(100, 1), 100);
  assert.equal(formatDuration(100), '1 min 40 s');
  assert.equal(formatDuration(100_000), '1,2 días');
  assert.equal(formatDuration(150_000_000), '4,8 años');
  assert.equal(logWidth(0.3), 5);
  assert.equal(logWidth(150_000_000), 100);
});
