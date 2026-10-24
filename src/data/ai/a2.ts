import type { Layer } from '../types';

export const ai2: Layer = {
  slug: 'machine-learning',
  number: 2,
  title: 'Machine learning',
  subtitle: 'Dejar de escribir reglas y aprender los parámetros a partir de los datos. Con su sesgo, su varianza y sus métricas.',
  hue: 28,
  blocks: [
    {
      slug: 'fundamentos-ml',
      title: 'Fundamentos matemáticos',
      summary:
        'Todo ML es una función de pérdida, un optimizador y una estimación. El resto son variaciones.',
      concepts: [
        {
          slug: 'descenso-de-gradiente',
          name: 'Descenso de gradiente',
          tagline: 'Baja la colina en la dirección opuesta al gradiente, con un paso que no sea ni tímido ni suicida.',
          summary:
            'Actualiza los parámetros en la dirección que reduce la pérdida: θ ← θ − η∇J(θ). Batch usa todo el dataset (estable y lento), SGD una muestra (ruidoso y rápido) y mini-batch el compromiso real. El learning rate decide si converge, oscila o diverge, y los optimizadores adaptativos (Adam) lo ajustan por parámetro.',
          keyPoints: [
            'Un learning rate alto diverge; uno bajo tarda una eternidad en salir del valle.',
            'El ruido del SGD puede ayudar a escapar de mínimos locales poco profundos.',
          ],
          tags: ['ml', 'optimización'],
          example: {
            label: 'Paso de actualización SGD vs AdamW',
            code: '# SGD clásico\nw = w - lr * grad\n\n# AdamW (momento + varianza adaptativa + weight decay desacoplado)\nm = beta1 * m + (1 - beta1) * grad\nv = beta2 * v + (1 - beta2) * (grad ** 2)\nw = w - lr * (m_hat / (sqrt(v_hat) + eps) + wd * w)',
            note: 'AdamW es el optimizador por defecto en Transformers porque adapta el paso por coordenada sin mezclar el weight decay con el momento.',
          },
        },
        {
          slug: 'bayes',
          name: 'Teorema de Bayes',
          tagline: 'Actualizas tu creencia previa con la evidencia: el esqueleto de la inferencia probabilística.',
          summary:
            'P(A|B) = P(B|A)·P(A)/P(B). Formaliza cómo cambia la probabilidad de una hipótesis al observar datos. Sostiene Naive Bayes, la inferencia bayesiana y buena parte del razonamiento bajo incertidumbre. La "ingenuidad" de Naive Bayes es asumir independencia condicional entre features, que casi nunca se cumple y aun así funciona sorprendentemente bien.',
          keyPoints: [
            'El prior importa: con pocos datos, domina la creencia inicial.',
            'La independencia condicional es una simplificación, no una verdad.',
          ],
          tags: ['ml', 'probabilidad'],
        },
      ],
    },
    {
      slug: 'aprendizaje-supervisado',
      title: 'Aprendizaje supervisado',
      summary:
        'Regresión y clasificación. Regularización, márgenes y ensambles: las herramientas que ganan tablas de datos.',
      concepts: [
        {
          slug: 'regresion-y-regularizacion',
          name: 'Regresión y regularización L1/L2',
          tagline: 'L2 encoge los pesos; L1 los apaga. La diferencia decide si haces selección de features gratis.',
          summary:
            'La regresión lineal ajusta ŷ = Wᵀx + b minimizando el error cuadrático. Ridge (L2) penaliza la norma de los pesos y estabiliza cuando hay colinealidad; Lasso (L1) lleva pesos a cero y produce modelos dispersos. Elastic Net combina ambas. La regularización es la defensa más simple contra el overfitting.',
          keyPoints: [
            'Estandariza features antes de regularizar: la penalización depende de la escala.',
            'L1 no es diferenciable en 0: usa coordenadas o prox, no gradiente puro.',
          ],
          tags: ['ml', 'supervisado'],
          diagram: 'bias-variance',
          tradeoffs: {
            whenToUse: ['Baseline rápido e interpretable', 'Pocas muestras o alta colinealidad entre variables'],
            whenToAvoid: ['Relaciones fuertemente no lineales sin ingeniería de features previa'],
            cost: 'O(p³) cerrado o O(n·p) iterativo; insignificante comparado con cualquier red neuronal.',
          },
        },
        {
          slug: 'regresion-logistica',
          name: 'Regresión logística',
          tagline: 'Una recta aplastada por una sigmoide para convertir puntuaciones en probabilidades.',
          summary:
            'Modela la probabilidad de una clase con σ(Wᵀx + b) y se entrena con entropía cruzada. Sigue siendo el baseline obligatorio en clasificación binaria: barato, interpretable y calibrado con frecuencia. Si un modelo complejo no le gana claramente, el problema probablemente no justifica la complejidad.',
          keyPoints: [
            'Devuelve probabilidades, no solo etiquetas: el umbral es una decisión de negocio.',
            'La regresión logística multinomial generaliza a multiclase con softmax.',
          ],
          tags: ['ml', 'clasificación'],
        },
        {
          slug: 'svm-kernels',
          name: 'SVM y kernel trick',
          tagline: 'Si no puedes separar en 2D, proyecta a más dimensiones sin calcular la proyección.',
          summary:
            'Una SVM busca el hiperplano que maximiza el margen entre clases. El kernel trick permite separar datos no lineales calculando productos escalares en un espacio de mayor dimensión sin construirlo explícitamente (RBF, polinomial). Con márgenes suaves (C) tolera solapamiento. Escala mal a datasets enormes.',
          keyPoints: [
            'El margen máximo es una forma elegante de regularización.',
            'El coste es O(N²) o peor: hoy compite con gradient boosting, no con deep learning.',
          ],
          tags: ['ml', 'clasificación'],
        },
        {
          slug: 'arboles-y-ensambles',
          name: 'Árboles, Random Forest y boosting',
          tagline: 'Un árbol sobreajusta; muchos árboles promediados o corregidos ganan casi cualquier tabla.',
          summary:
            'Random Forest (bagging) entrena árboles en paralelo sobre muestras y features aleatorias para reducir varianza. Gradient Boosting (XGBoost, LightGBM) entrena secuencialmente árboles que corrigen el residuo del anterior, reduciendo sesgo. En datos tabulares, el boosting suele ser el estado del arte frente a redes neuronales.',
          keyPoints: [
            'Bagging reduce varianza; boosting reduce sesgo.',
            'Los árboles no extrapolan: cuidado con tendencias fuera del rango de entrenamiento.',
          ],
          tags: ['ml', 'ensambles'],
          tradeoffs: {
            whenToUse: ['Datos tabulares con features heterogéneas', 'Necesitas un baseline fuerte y rápido'],
            whenToAvoid: ['Series temporales con tendencia fuerte (extrapolación)', 'Datos de imagen o texto sin feature engineering'],
            cost: 'Boosting: sensible a hiperparámetros y más lento de entrenar; Forest: paraleliza bien.',
          },
        },
      ],
    },
    {
      slug: 'no-supervisado',
      title: 'Aprendizaje no supervisado',
      summary:
        'Sin etiquetas: agrupar, comprimir y visualizar. La interpretación siempre es tuya, no del algoritmo.',
      concepts: [
        {
          slug: 'clustering',
          name: 'K-Means vs DBSCAN',
          tagline: 'K-Means asume clusters redondos y k conocido; DBSCAN descubre formas y marca el ruido.',
          summary:
            'K-Means minimiza la varianza intra-cluster y exige fijar k de antemano; sensible a la inicialización (k-means++) y a la escala. DBSCAN agrupa por densidad, encuentra formas arbitrarias y etiqueta outliers, pero falla con densidades muy distintas. Elegir el algoritmo es elegir qué forma de cluster estás dispuesto a ver.',
          keyPoints: [
            'Estandariza siempre antes de calcular distancias.',
            'El codo o la silueta ayudan a elegir k, pero no sustituyen el criterio de negocio.',
          ],
          tags: ['ml', 'clustering'],
        },
        {
          slug: 'pca-tsne',
          name: 'PCA, t-SNE y UMAP',
          tagline: 'PCA comprime preservando varianza; t-SNE y UMAP preservan vecindad para que puedas mirar.',
          summary:
            'PCA es una proyección lineal ortogonal que maximiza varianza; es interpretable y sirve para reducir ruido. t-SNE y UMAP son no lineales y excelentes para visualizar embeddings, pero las distancias globales no son interpretables y los resultados cambian con los hiperparámetros. No uses t-SNE para medir similitud entre clusters.',
          keyPoints: [
            'PCA antes de un modelo es reducción de dimensionalidad; t-SNE es solo visualización.',
            'La distancia entre clusters en t-SNE no significa nada.',
          ],
          tags: ['ml', 'dimensionalidad'],
        },
      ],
    },
    {
      slug: 'evaluacion-y-diagnostico',
      title: 'Evaluación y diagnóstico',
      summary:
        'Un modelo sin métricas honestas es una opinión con código. El sesgo-varianza es el mapa del fracaso.',
      concepts: [
        {
          slug: 'bias-variance',
          name: 'Trade-off sesgo-varianza',
          tagline: 'Underfitting es no aprender; overfitting es memorizar el ruido.',
          summary:
            'Alto sesgo: el modelo es demasiado simple y falla en train y test. Alta varianza: aprende el ruido y falla solo en test. La curva de error de validación te dice en qué lado estás. Más datos reducen varianza; más capacidad reduce sesgo y aumenta varianza. La regularización compra sesgo para vender varianza.',
          keyPoints: [
            'Si train y test van mal: más capacidad o mejores features.',
            'Si train va bien y test mal: regulariza, simplifica o consigue más datos.',
          ],
          tags: ['ml', 'evaluación'],
          diagram: 'bias-variance',
          tradeoffs: {
            whenToUse: ['Siempre: es el primer diagnóstico antes de tocar arquitectura o hiperparámetros'],
            whenToAvoid: ['Nunca: cambiar el modelo a ciegas sin mirar train vs validation es jugar a la lotería'],
            cost: 'Exige reservar un conjunto de validación limpio sin data leakage.',
          },
        },
        {
          slug: 'metricas-clasificacion',
          name: 'Matriz de confusión, ROC y AUC',
          tagline: 'La accuracy miente con clases desbalanceadas; precisión y recall cuentan la verdad incómoda.',
          summary:
            'La matriz de confusión desglosa TP, FP, FN y TN. Precisión mide cuántos positivos predichos son reales; recall, cuántos positivos reales detectaste; F1 los equilibra. ROC-AUC mide separación global, pero con desbalance extremo la curva precision-recall es más informativa. El umbral es una decisión de coste, no de métrica.',
          keyPoints: [
            'Un 99% de accuracy puede ser inútil si el 99% de los casos es negativo.',
            'AUC alto no garantiza buen rendimiento en el umbral que vas a usar.',
          ],
          tags: ['ml', 'métricas'],
          example: {
            label: 'Por qué la accuracy engaña en fraude (1% positivos)',
            code: 'Dataset: 10.000 transacciones (9.900 legítimas, 100 fraudes)\nModelo trivial: predice SIEMPRE "legítima"\n\nAccuracy = 9.900 / 10.000 = 99,0%  <-- parece excelente\nRecall   = 0 / 100        =  0,0%  <-- no detecta ni un solo fraude',
            note: 'Elige la métrica según qué error paga más caro el negocio: falsos positivos (fricción) o falsos negativos (fraude/enfermedad).',
          },
        },
        {
          slug: 'deteccion-anomalias',
          name: 'Detección de anomalías',
          tagline: 'Cuando no tienes ejemplos de fallo, aprende la forma de lo normal.',
          summary:
            'Isolation Forest aísla outliers con particiones aleatorias: los anómalos necesitan menos divisiones. One-Class SVM ajusta una frontera alrededor de la clase normal. Ambos asumen que lo anómalo es raro y distinto, y fallan cuando el concepto de "normal" cambia con el tiempo. La deriva de datos es su enemigo natural.',
          keyPoints: [
            'Isolation Forest escala mejor y es más fácil de operar.',
            'Define el coste de falso positivo antes de elegir umbral.',
          ],
          tags: ['ml', 'anomalías'],
        },
      ],
    },
  ],
};
