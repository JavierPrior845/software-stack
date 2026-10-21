import type { Layer } from '../types';

export const ai3: Layer = {
  slug: 'redes-neuronales',
  number: 3,
  title: 'Redes neuronales',
  subtitle: 'Perceptrones, gradientes y convoluciones. La maquinaria que hace posible todo lo que viene después.',
  hue: 8,
  blocks: [
    {
      slug: 'neurona-y-aprendizaje',
      title: 'De la neurona al MLP',
      summary:
        'Una suma ponderada y una no linealidad. Repetido en capas, se convierte en un aproximador universal.',
      concepts: [
        {
          slug: 'perceptron-mlp',
          name: 'Perceptrón y MLP',
          tagline: 'Una neurona dibuja una recta; apiladas, dibujan cualquier frontera.',
          summary:
            'El perceptrón calcula una suma ponderada y aplica una función escalón: solo separa problemas linealmente separables, y por eso no resuelve XOR. El MLP añade capas ocultas y no linealidades; con una sola capa oculta puede aproximar cualquier función continua con precisión arbitraria (teorema de aproximación universal). La profundidad, no solo la anchura, es lo que hace eficiente esa aproximación.',
          keyPoints: [
            'Sin no linealidad, apilar capas equivale a una sola transformación lineal.',
            'El teorema garantiza existencia, no que el entrenamiento la encuentre.',
          ],
          tags: ['redes', 'fundamentos'],
        },
        {
          slug: 'backpropagation',
          name: 'Backpropagation y autograd',
          tagline: 'La regla de la cadena aplicada hacia atrás para saber cuánto culpa tiene cada peso.',
          summary:
            'En el forward pass se calculan activaciones; en el backward, la derivada de la pérdida respecto a cada peso usando la regla de la cadena. Autograd construye el grafo de operaciones y lo recorre en reversa. Sin backprop no hay deep learning: es el algoritmo que convierte una función de pérdida en instrucciones concretas de actualización.',
          keyPoints: [
            'El coste del backward es ~2× el forward: por eso el entrenamiento es caro.',
            'Gradient clipping evita explosiones numéricas en secuencias largas.',
          ],
          tags: ['redes', 'entrenamiento'],
        },
      ],
    },
    {
      slug: 'activaciones-y-perdidas',
      title: 'Activaciones y pérdidas',
      summary:
        'La no linealidad decide qué puede aprender la red; la pérdida decide qué considera un error.',
      concepts: [
        {
          slug: 'funciones-de-activacion',
          name: 'Funciones de activación',
          tagline: 'Sigmoid se satura, ReLU muere, GELU suaviza: cada una se inventó por un fallo concreto.',
          summary:
            'Sigmoid y tanh comprimen y sufren vanishing gradient en capas profundas. ReLU (max(0,x)) es trivial de calcular y evita la saturación positiva, pero puede morir. Leaky ReLU lo mitiga y GELU —la estándar en Transformers— pondera la entrada por su probabilidad acumulada normal. La elección cambia la dinámica de entrenamiento, no solo la precisión final.',
          keyPoints: [
            'ReLU es barata y funciona; por eso dominó una década.',
            'GELU es la activación por defecto en GPT, BERT y compañía.',
          ],
          tags: ['redes', 'activaciones'],
        },
        {
          slug: 'funciones-de-perdida',
          name: 'Funciones de pérdida',
          tagline: 'MSE para predecir cantidades; cross-entropy para predecir probabilidades.',
          summary:
            'MSE penaliza el error cuadrático y asume ruido gaussiano: adecuada para regresión. Cross-entropy mide la divergencia entre la distribución real y la predicha y es la elección para clasificación. La pérdida define qué optimizas: elegir mal convierte un problema de negocio en un objetivo matemático distinto.',
          keyPoints: [
            'Cross-entropy con softmax estabiliza el gradiente frente a MSE + sigmoid.',
            'La pérdida debe reflejar el coste real de equivocarse.',
          ],
          tags: ['redes', 'entrenamiento'],
        },
      ],
    },
    {
      slug: 'cnn-rnn',
      title: 'CNN y RNN',
      summary:
        'Dos sesgos inductivos: la rejilla espacial y la secuencia temporal. Antes de los Transformers, eran el estado del arte.',
      concepts: [
        {
          slug: 'cnn',
          name: 'Redes convolucionales',
          tagline: 'Un filtro pequeño que se desliza por toda la imagen: el mismo detector en cualquier posición.',
          summary:
            'Una convolución aplica un kernel aprendible sobre vecindades locales. Compartir pesos reduce parámetros y aporta invariancia a traslación; el pooling reduce resolución y aumenta el campo receptivo. Stride y padding controlan el tamaño de salida. Siguen siendo la elección eficiente para visión en el borde y para datos con estructura de rejilla.',
          keyPoints: [
            'La compartición de pesos es la razón por la que una CNN no necesita millones de parámetros por píxel.',
            'El campo receptivo crece con la profundidad: capas profundas ven más contexto.',
          ],
          tags: ['redes', 'visión'],
        },
        {
          slug: 'rnn',
          name: 'RNN y el problema del gradiente',
          tagline: 'Una memoria que se pasa de paso en paso, y que se olvida de lo lejano al multiplicar gradientes.',
          summary:
            'Una RNN actualiza un estado oculto h_t = tanh(W_hh h_{t-1} + W_xh x_t). Al retropropagar en el tiempo (BPTT), los gradientes se multiplican repetidamente por la misma matriz: se desvanecen o explotan. El clipping mitiga la explosión; las compuertas de LSTM y GRU atacan el desvanecimiento. Aun así, la secuencialidad limita el paralelismo.',
          keyPoints: [
            'El gradiente desvaneciente es la razón por la que existió LSTM.',
            'La recurrencia impide paralelizar por tiempo: de ahí el éxito del Transformer.',
          ],
          tags: ['redes', 'secuencias'],
        },
      ],
    },
  ],
};
