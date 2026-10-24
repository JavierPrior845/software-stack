import test from 'node:test';
import assert from 'node:assert/strict';
import { formatBytes, formatTokens, kvBytesPerToken, kvCacheBytes, pagedKvBytes } from '../src/lib/kv.ts';
import { formatDuration, formatLatency, logWidth, relativeSeconds } from '../src/lib/memory.ts';
import { COMPLEXITY_CURVES, estimateCpuTime, formatOps, opsBarWidth } from '../src/lib/bigo.ts';
import { GATES, evaluateGate, truthTable } from '../src/lib/logic.ts';

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

test('Big-O: cálculo de operaciones y tiempo estimado a 1 ns/op', () => {
  const byId = Object.fromEntries(COMPLEXITY_CURVES.map((c) => [c.id, c]));
  assert.equal(byId.o1.ops(1024), 1);
  assert.equal(byId.ologn.ops(1024), 10);
  assert.equal(byId.on.ops(1024), 1024);
  assert.equal(byId.onlogn.ops(1024), 10_240);
  assert.equal(byId.on2.ops(1024), 1_048_576);
  assert.equal(byId.o2n.ops(100), Number.POSITIVE_INFINITY);
  assert.equal(formatOps(1024), '1024 ops');
  assert.equal(estimateCpuTime(1000), '1.0 µs');
  assert.equal(opsBarWidth(1, 1_000_000), 4);
  assert.equal(opsBarWidth(Number.POSITIVE_INFINITY, 1_000_000), 100);
});

test('Puertas lógicas: tablas de verdad completas', () => {
  const expected = {
    and: [0, 0, 0, 1],
    or: [0, 1, 1, 1],
    xor: [0, 1, 1, 0],
    nand: [1, 1, 1, 0],
    nor: [1, 0, 0, 0],
  } as const;

  for (const gate of GATES) {
    assert.deepEqual(
      truthTable(gate.id).map((row) => row.y),
      expected[gate.id],
      `tabla de ${gate.label}`,
    );
  }
});

test('Puertas lógicas: evaluación puntual y NAND universal', () => {
  assert.equal(evaluateGate('and', 1, 1), 1);
  assert.equal(evaluateGate('or', 0, 0), 0);
  assert.equal(evaluateGate('xor', 1, 0), 1);
  assert.equal(evaluateGate('nand', 1, 1), 0);
  assert.equal(evaluateGate('nor', 0, 1), 0);

  const nand = (x: 0 | 1, y: 0 | 1) => evaluateGate('nand', x, y);
  const not = (x: 0 | 1) => nand(x, x);
  const and = (x: 0 | 1, y: 0 | 1) => not(nand(x, y));

  for (const x of [0, 1] as const) {
    assert.equal(not(x), x === 0 ? 1 : 0, `NOT con NAND para ${x}`);
    for (const y of [0, 1] as const) {
      assert.equal(and(x, y), x === 1 && y === 1 ? 1 : 0, `AND con NAND para ${x},${y}`);
    }
  }
});
