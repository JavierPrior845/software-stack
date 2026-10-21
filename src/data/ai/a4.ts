import type { Layer } from '../types';

export const ai4: Layer = {
  slug: 'deep-learning',
  number: 4,
  title: 'Deep learning',
  subtitle: 'Compuertas, espacios latentes, grafos y el Transformer: la arquitectura que reordenó todo en 2017.',
  hue: 350,
  blocks: [
    {
      slug: 'secuencias-y-latentes',
      title: 'Secuencias y espacios latentes',
      summary:
        'Cómo retener contexto largo y cómo comprimir datos en representaciones que puedes muestrear.',
      concepts: [
        {
          slug: 'lstm-gru',
          name: 'LSTM y GRU',
          tagline: 'Una autopista de estado con tres puertas para decidir qué recordar, qué guardar y qué emitir.',
          summary:
            'LSTM introduce el cell state como flujo casi lineal, regulado por forget, input y output gates. Eso permite propagar gradientes a través de muchos pasos sin que se desvanezcan. GRU fusiona estado oculto y celda y reduce a dos compuertas, con calidad similar y menos parámetros. Fueron el estándar en traducción y series temporales hasta 2017.',
          keyPoints: [
            'La forget gate es la pieza que evita acumular ruido indefinidamente.',
            'Siguen siendo competitivas en series temporales con pocos datos.',
          ],
          tags: ['secuencias', 'arquitecturas'],
        },
        {
          slug: 'autoencoders-vae',
          name: 'Autoencoders y VAE',
          tagline: 'Comprimir hasta un cuello de botella y reconstruir: la versión aprendida de un codec.',
          summary:
            'Un autoencoder aprende una representación latente comprimida y reconstruye la entrada. El VAE va más allá: el encoder predice μ y σ de una distribución, y muestrea con el reparameterization trick para que el gradiente fluya. La pérdida combina reconstrucción y divergencia KL, que empuja el espacio latente hacia una normal estándar y permite generar muestras nuevas.',
          keyPoints: [
            'Sin el reparameterization trick, el muestreo bloquea el gradiente.',
            'La KL es la que hace el espacio latente interpolable.',
          ],
          tags: ['generativo', 'latente'],
        },
        {
          slug: 'gans',
          name: 'GANs',
          tagline: 'Un falsificador y un detective entrenando a la vez: el juego que produce imágenes realistas.',
          summary:
            'El generador transforma ruido en muestras; el discriminador intenta distinguir reales de falsas. Se entrenan en un minimax: el generador aprende a engañar, el discriminador a detectar. Producen muestras nítidas pero sufren colapso de modo e inestabilidad. Las difusiones las han desplazado en calidad y estabilidad, aunque las GAN siguen siendo rapidísimas en inferencia.',
          keyPoints: [
            'Colapso de modo: el generador produce variedad limitada aunque engañe al discriminador.',
            'Inferencia de una sola pasada: mucho más rápida que difusión.',
          ],
          tags: ['generativo', 'adversario'],
        },
        {
          slug: 'gnn',
          name: 'Graph Neural Networks',
          tagline: 'Cada nodo actualiza su estado escuchando a sus vecinos, capa tras capa.',
          summary:
            'Las GNN operan sobre grafos con message passing: cada nodo agrega mensajes transformados de su vecindad y actualiza su representación. Tras k capas, cada nodo ve un vecindario de radio k. Modelan moléculas, redes sociales y grafos de conocimiento. Su límite es el oversmoothing y el coste de manejar grafos enormes.',
          keyPoints: [
            'Message passing es el equivalente en grafos a la convolución en rejilla.',
            'Demasiadas capas difuminan las diferencias entre nodos (oversmoothing).',
          ],
          tags: ['grafos', 'arquitecturas'],
        },
      ],
    },
    {
      slug: 'transformer',
      title: 'El Transformer',
      summary:
        'Atención en paralelo sobre toda la secuencia. El mecanismo que eliminó la recurrencia y desbloqueó el escalado.',
      concepts: [
        {
          slug: 'self-attention',
          name: 'Self-attention (QKV)',
          tagline: 'Cada token pregunta "¿a quién debo mirar?" y pondera la respuesta con softmax.',
          summary:
            'Cada token genera una Query, una Key y un Value. El producto Q·Kᵀ mide afinidad entre tokens; se escala por √d_k para estabilizar el softmax; el resultado pondera los Values. Así el modelo mezcla información de toda la secuencia en paralelo, sin recurrencia. El coste es cuadrático en longitud, y de ahí nacen KV-cache, GQA y PagedAttention.',
          keyPoints: [
            'La escala 1/√d_k evita que el softmax se sature con dimensiones grandes.',
            'La máscara causal impide mirar tokens futuros en modelos autorregresivos.',
          ],
          tags: ['transformer', 'atención'],
          diagram: 'attention',
          complexity: 'O(N²·d) por capa en longitud de contexto',
        },
        {
          slug: 'multi-head-attention',
          name: 'Multi-head attention',
          tagline: 'Varias cabezas mirando subespacios distintos a la vez: sintaxis, correferencia, posición.',
          summary:
            'MHA proyecta Q, K y V en h subespacios independientes y aplica atención en cada uno; luego concatena y proyecta. Cada cabeza puede especializarse en un tipo de relación. MQA y GQA reducen el coste de memoria compartiendo K y V entre grupos de cabezas, y son el estándar en LLM modernos porque el cuello de botella real es leer el KV-cache de VRAM.',
          keyPoints: [
            'MHA: h pares K/V. MQA: 1. GQA: g grupos. Menos K/V = menos VRAM.',
            'La calidad se mantiene sorprendentemente bien al compartir K/V.',
          ],
          tags: ['transformer', 'atención'],
        },
        {
          slug: 'positional-encoding',
          name: 'Codificación posicional',
          tagline: 'La atención no sabe de orden, así que hay que inyectarle dónde está cada token.',
          summary:
            'Si procesas todos los tokens en paralelo, el modelo no distingue "perro muerde hombre" de "hombre muerde perro". Las codificaciones sinusoidales originales sumaban una señal fija; RoPE (rotary positional embeddings) rota Q y K según la posición y es hoy el estándar. La longitud de contexto soportada depende de cómo se extrapola esta señal.',
          keyPoints: [
            'RoPE codifica posición relativa mediante rotaciones en el producto escalar.',
            'Ampliar contexto sin reentrenar requiere técnicas de interpolación de RoPE.',
          ],
          tags: ['transformer', 'posición'],
        },
        {
          slug: 'arquitecturas-transformer',
          name: 'Encoder-only, decoder-only y encoder-decoder',
          tagline: '¿Leer todo el texto, generarlo hacia adelante o traducir de uno a otro?',
          summary:
            'Encoder-only (BERT) usa atención bidireccional y produce representaciones: ideal para clasificación, NER y embeddings. Decoder-only (GPT, Llama) usa atención causal y genera autorregresivamente: domina la IA generativa actual. Encoder-decoder (T5, BART) separa comprensión y generación: útil en traducción y resumen.',
          keyPoints: [
            'Decoder-only ganó por simplicidad de escalado y versatilidad de prompting.',
            'La máscara causal es la única diferencia estructural clave entre encoder y decoder.',
          ],
          tags: ['transformer', 'arquitecturas'],
        },
      ],
    },
  ],
};
