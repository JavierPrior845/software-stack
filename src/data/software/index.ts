import type { Stack } from '../types';
import { layer0 } from './layer0';
import { layer1 } from './layer1';
import { layer2 } from './layer2';
import { layer3 } from './layer3';
import { layer4 } from './layer4';

export const software: Stack = {
  id: 'software',
  title: 'Software & Systems Stack',
  short: 'Software',
  claim:
    'Del transistor al framework: las cinco capas que explican por qué tu código se comporta como se comporta.',
  layers: [layer0, layer1, layer2, layer3, layer4],
};
