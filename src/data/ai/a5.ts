import type { Layer } from '../types';

export const ai5: Layer = {
  slug: 'ia-generativa',
  number: 5,
  title: 'IA generativa',
  subtitle: 'LLMs, difusión y multimodalidad. Y la ingeniería de inferencia que decide cuánto cuesta cada token.',
  hue: 330,
  blocks: [
    {
      slug: 'llms',
      title: 'Large Language Models',
      summary:
        'Predecir el siguiente token, a escala, resulta ser suficiente para conversar, razonar y escribir código.',
      concepts: [
        {
          slug: 'modelado-autorregresivo',
          name: 'Modelado autorregresivo y BPE',
          tagline: 'El modelo no lee palabras: lee trozos de bytes y apuesta por el siguiente trozo.',
          summary:
            'Un LLM factoriza la probabilidad de una secuencia como producto de probabilidades condicionadas al contexto previo. BPE convierte texto en subpalabras frecuentes, equilibrando vocabulario y longitud. Ese detalle explica por qué los modelos fallan al contar letras o al hacer aritmética con dígitos: no ven caracteres, ven tokens.',
          keyPoints: [
            'La tokenización es la causa de muchos "fallos tontos" aparentes.',
            'Vocabularios de 32k a 128k tokens; el español suele costar más tokens que el inglés.',
          ],
          tags: ['llm', 'tokenización'],
        },
        {
          slug: 'gqa-moe',
          name: 'GQA y Mixture of Experts',
          tagline: 'Menos memoria por token y menos cómputo por token, sin encoger el modelo.',
          summary:
            'GQA agrupa cabezas de Query para compartir pares K/V y reducir el KV-cache, que es el verdadero cuello de botella en serving. MoE sustituye capas densas por expertos y un router que activa solo unos pocos por token: el modelo puede tener cientos de miles de millones de parámetros y coste de cómputo de uno mucho menor. La memoria, en cambio, no baja.',
          keyPoints: [
            'MoE reduce FLOPs por token, no la VRAM necesaria para los pesos.',
            'El balanceo de carga entre expertos es el problema operativo de MoE.',
          ],
          tags: ['llm', 'arquitectura'],
        },
      ],
    },
    {
      slug: 'generacion-visual',
      title: 'Difusión y multimodalidad',
      summary:
        'Destruir una imagen con ruido y aprender a reconstruirla. El mismo truco, aplicado en un espacio latente, genera imágenes.',
      concepts: [
        {
          slug: 'difusion',
          name: 'Modelos de difusión',
          tagline: 'Aprende a quitar ruido paso a paso y habrás aprendido a generar imágenes desde cero.',
          summary:
            'El proceso directo añade ruido gaussiano gradualmente hasta destruir la imagen; el inverso entrena una red (U-Net o DiT) para predecir y restar ese ruido. Latent Diffusion opera en el espacio comprimido de un VAE, reduciendo el coste en órdenes de magnitud. Es más estable que las GAN, a cambio de decenas de pasos de inferencia.',
          keyPoints: [
            'El coste de inferencia escala con el número de pasos de denoising.',
            'Los distilled models y schedulers rápidos reducen pasos a cambio de algo de calidad.',
          ],
          tags: ['generativo', 'difusión'],
        },
        {
          slug: 'clip-vlm',
          name: 'CLIP y modelos multimodales',
          tagline: 'Alinea imagen y texto en el mismo espacio vectorial y podrás buscar una foto con una frase.',
          summary:
            'CLIP entrena un encoder de imagen y otro de texto de forma contrastiva para que pares correctos queden cerca en el espacio latente. Eso habilita búsqueda semántica y zero-shot classification. Los VLM modernos van más lejos: proyectan parches de imagen al espacio de tokens del LLM y los intercalan como si fueran texto.',
          keyPoints: [
            'CLIP aprende alineación, no generación: es la pieza de conexión.',
            'Un VLM es, en esencia, un LLM que también recibe tokens visuales.',
          ],
          tags: ['multimodal', 'visión'],
        },
      ],
    },
    {
      slug: 'inferencia',
      title: 'Optimización de inferencia',
      summary:
        'Servir un LLM es un problema de memoria, no de FLOPs. Aquí vive el puente directo con la Capa 0.',
      concepts: [
        {
          slug: 'kv-cache',
          name: 'KV-Cache',
          tagline: 'No recalcules el pasado: guárdalo en VRAM y solo procesa el token nuevo.',
          summary:
            'En generación autorregresiva, sin caché habría que recalcular K y V de todos los tokens previos en cada paso, con coste cuadrático redundante. El KV-cache guarda esos tensores y reduce cada paso a procesar un token. El precio: la memoria crece linealmente con el contexto y el batch, y en contextos largos el KV-cache puede superar el tamaño de los pesos.',
          keyPoints: [
            'El cuello de botella pasa de cómputo a ancho de banda de memoria.',
            'La memoria del KV-cache crece con longitud × capas × cabezas × dimensión × batch.',
          ],
          tags: ['inferencia', 'memoria'],
          diagram: 'memory-hierarchy',
          tradeoffs: {
            whenToUse: ['Siempre en generación autorregresiva'],
            whenToAvoid: ['Nunca, pero dimensiona la VRAM antes de prometer contextos largos'],
            cost: 'La VRAM del KV-cache limita el batch y, por tanto, el throughput por GPU.',
          },
        },
        {
          slug: 'paged-attention',
          name: 'PagedAttention (vLLM)',
          tagline: 'La misma idea que la memoria virtual: páginas no contiguas para no fragmentar la VRAM.',
          summary:
            'Los KV-cache se reservaban contiguos por secuencia, generando fragmentación y desperdicio. PagedAttention los divide en bloques de tamaño fijo y los asigna como páginas virtuales, con una tabla que mapea bloques lógicos a físicos. Eso permite memoria casi sin desperdicio, batching continuo y compartición de prefijos entre peticiones. Es memoria virtual aplicada a VRAM.',
          keyPoints: [
            'Bloques de KV-cache no contiguos + tabla de bloques = paginación.',
            'Habilita continuous batching: nuevas peticiones entran sin esperar a que el lote termine.',
          ],
          tags: ['inferencia', 'memoria', 'serving'],
          tradeoffs: {
            whenToUse: ['Serving de LLM con concurrencia y contextos largos'],
            whenToAvoid: ['Inferencia local de un solo usuario con contexto corto'],
            cost: 'Complejidad del runtime; a cambio, throughput varias veces mayor por GPU.',
          },
        },
        {
          slug: 'cuantizacion',
          name: 'Cuantización (FP8/INT4)',
          tagline: 'Menos bits por peso, menos VRAM y más throughput, a cambio de un poco de precisión.',
          summary:
            'Pasar de FP16 a FP8 o INT4 reduce el espacio de los pesos y el ancho de banda necesario. AWQ protege los pesos con activaciones atípicas; GPTQ resuelve capas una a una con mínimos cuadrados; GGUF permite ejecutar en CPU con llama.cpp. La cuantización hace viable un modelo en hardware que antes era insuficiente, pero degrada tareas sensibles a precisión numérica.',
          keyPoints: [
            'INT4 AWQ/GPTQ para GPU; GGUF para CPU y Mac.',
            'Cuantiza y evalúa: la pérdida de calidad depende del modelo y de la tarea.',
          ],
          tags: ['inferencia', 'memoria'],
        },
        {
          slug: 'speculative-decoding',
          name: 'Speculative decoding',
          tagline: 'Un modelo pequeño propone varios tokens y el grande los valida en una sola pasada.',
          summary:
            'Un draft model rápido genera k tokens candidatos; el modelo grande los evalúa en paralelo y acepta el prefijo correcto. Si el draft acierta, ganas velocidad sin cambiar la distribución de salida. Es exactamente la lógica de branch prediction llevada al decoding: apostar y verificar en paralelo.',
          keyPoints: [
            'No altera la distribución final si la aceptación es correcta.',
            'La ganancia depende de la tasa de aceptación del draft model.',
          ],
          tags: ['inferencia', 'rendimiento'],
        },
      ],
    },
  ],
};
