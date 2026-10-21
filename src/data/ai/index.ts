import type { Stack } from '../types';
import { ai1 } from './a1';
import { ai2 } from './a2';
import { ai3 } from './a3';
import { ai4 } from './a4';
import { ai5 } from './a5';
import { ai6 } from './a6';

export const ai: Stack = {
  id: 'ai',
  title: 'Artificial Intelligence Stack',
  short: 'Inteligencia Artificial',
  claim:
    'De la lógica simbólica a los agentes autónomos: las seis capas que convierten matemáticas en sistemas que actúan.',
  layers: [ai1, ai2, ai3, ai4, ai5, ai6],
};
