import type { Layer } from '../types';

export const ai1: Layer = {
  slug: 'ia-simbolica',
  number: 1,
  title: 'IA simbólica',
  subtitle: 'Reglas, lógica y búsqueda. Inteligencia sin aprendizaje estadístico, y la raíz de muchas ideas que volverán en los agentes.',
  hue: 42,
  blocks: [
    {
      slug: 'representacion-y-logica',
      title: 'Representación del conocimiento y lógica',
      summary:
        'Si puedes escribir el conocimiento como símbolos y reglas, puedes razonar sobre él de forma auditable.',
      concepts: [
        {
          slug: 'ontologias-y-grafos',
          name: 'Ontologías y grafos de conocimiento',
          tagline: 'Una red de conceptos con relaciones tipadas que permite deducir lo que no está escrito.',
          summary:
            'Una ontología define clases, instancias y relaciones (RDF, OWL, SPARQL). A diferencia de una base de datos relacional, el significado de las aristas es explícito y permite inferencia por transitividad. Son la base de los graph databases y del GraphRAG moderno.',
          keyPoints: [
            'RDF modela tripletas (sujeto, predicado, objeto).',
            'La inferencia convierte hechos explícitos en conocimiento implícito.',
          ],
          tags: ['simbólica', 'conocimiento'],
        },
        {
          slug: 'logica-formal',
          name: 'Lógica proposicional y de primer orden',
          tagline: 'Demostrar teoremas con reglas de inferencia en vez de aprender patrones.',
          summary:
            'La lógica proposicional combina átomos con AND, OR y NOT; la de primer orden añade cuantificadores y predicados. El razonamiento se mecaniza con resolución y unificación: si el teorema se deriva, es verdad por construcción. Su límite es la fragilidad ante el ruido y el conocimiento incompleto.',
          keyPoints: [
            'Ventaja: explicabilidad total y garantías formales.',
            'Límite: construir y mantener la base de reglas no escala al mundo real.',
          ],
          tags: ['simbólica', 'lógica'],
        },
        {
          slug: 'logica-difusa',
          name: 'Lógica difusa',
          tagline: '22 °C no es "caluroso" a secas: es 0.7 agradable y 0.3 caluroso.',
          summary:
            'La lógica difusa sustituye el 0/1 por un grado de pertenencia μ ∈ [0,1]. Con funciones de membresía y un proceso de defuzzificación (centroide, por ejemplo) se construyen controladores robustos para sistemas físicos. Es la alternativa simbólica a la incertidumbre, anterior y distinta de la probabilidad.',
          keyPoints: [
            'No es probabilidad: modela vaguedad, no frecuencia.',
            'Muy usada en control industrial, cámaras y electrodomésticos.',
          ],
          tags: ['simbólica', 'incertidumbre'],
        },
      ],
    },
    {
      slug: 'sistemas-expertos',
      title: 'Sistemas expertos y basados en reglas',
      summary:
        'El conocimiento de un especialista escrito como IF-THEN. Explicable, determinista y caro de mantener.',
      concepts: [
        {
          slug: 'sbr-motor-inferencia',
          name: 'SBR y motor de inferencia',
          tagline: 'Hechos + reglas + un motor que decide qué regla disparar primero.',
          summary:
            'Un sistema basado en reglas separa la base de conocimiento (IF condición THEN acción) de la base de hechos (estado actual). El motor de inferencia resuelve conflictos y aplica reglas; el algoritmo Rete indexa patrones para no reevaluar todo en cada ciclo. Fue el estándar de la IA aplicada en los 80 y sigue vivo en guardrails y políticas.',
          keyPoints: [
            'Rete evita reevaluar todas las reglas en cada cambio de hechos.',
            'La explicabilidad es total: puedes trazar qué regla disparó cada conclusión.',
          ],
          tags: ['simbólica', 'reglas'],
        },
        {
          slug: 'encadenamiento',
          name: 'Forward vs backward chaining',
          tagline: '¿Partes de los datos o de la hipótesis que quieres demostrar?',
          summary:
            'El encadenamiento hacia adelante parte de los hechos y dispara reglas hasta una conclusión: típico en monitorización. Hacia atrás parte de una meta y busca las reglas que la sustentarían: típico en diagnóstico. La elección cambia por completo el orden de exploración y el coste.',
          keyPoints: [
            'Forward: dirigido por datos. Backward: dirigido por metas.',
            'Los sistemas de diagnóstico médico son el ejemplo canónico de backward.',
          ],
          tags: ['simbólica', 'inferencia'],
        },
      ],
    },
    {
      slug: 'busqueda-y-planificacion',
      title: 'Búsqueda, juegos y planificación',
      summary:
        'Formalizar un problema como espacio de estados y encontrar el camino sin explorar el universo entero.',
      concepts: [
        {
          slug: 'a-estrella',
          name: 'Búsqueda A*',
          tagline: 'Explora guiado por g(n) + h(n): lo que ya costó más una estimación de lo que falta.',
          summary:
            'A* combina el coste real acumulado con una heurística que estima el resto. Si h es admisible (nunca sobreestima), garantiza el camino óptimo; si además es consistente, no reabre nodos. Es el puente conceptual entre la búsqueda simbólica y el Tree-of-Thoughts de los agentes modernos.',
          keyPoints: [
            'Una heurística admisible garantiza optimalidad; una buena heurística decide la velocidad.',
            'Dijkstra es A* con h = 0.',
          ],
          tags: ['búsqueda', 'algoritmos'],
          complexity: 'O(b^d) peor caso · dominado por la calidad de h',
        },
        {
          slug: 'minimax-alfabeta',
          name: 'Minimax y poda alfa-beta',
          tagline: 'Asume que el rival juega perfecto y poda las ramas que no cambiarían la decisión.',
          summary:
            'Minimax explora el árbol de juego alternando maximizar y minimizar. Alfa-beta descarta ramas cuando ya no pueden alterar el resultado, reduciendo el factor de ramificación de b a √b en el mejor caso. Es el fundamento de los motores de ajedrez clásicos antes de las redes neuronales.',
          keyPoints: [
            'El orden de exploración determina cuánto poda alfa-beta.',
            'Es el ejemplo canónico de razonamiento adversarial con oponente óptimo.',
          ],
          tags: ['búsqueda', 'juegos'],
        },
        {
          slug: 'algoritmos-geneticos',
          name: 'Algoritmos genéticos',
          tagline: 'Poblaciones, cruce, mutación y selección: optimización sin gradiente.',
          summary:
            'Un algoritmo genético evoluciona una población de soluciones con una función de fitness, cruce y mutación. Funciona cuando el espacio de búsqueda es enorme, no hay gradiente y una solución "suficientemente buena" vale. No garantiza óptimo global y su ajuste de hiperparámetros es más arte que ciencia.',
          keyPoints: [
            'Útil para optimización combinatoria y diseño paramétrico.',
            'Sin una función de fitness bien diseñada, converge a basura con mucha elegancia.',
          ],
          tags: ['búsqueda', 'optimización'],
        },
        {
          slug: 'planificacion-strips',
          name: 'Planificación clásica (STRIPS/PDDL)',
          tagline: 'Describe qué puede hacer cada acción y deja que el planificador encuentre la secuencia.',
          summary:
            'En STRIPS cada acción tiene precondiciones y efectos que añaden o eliminan predicados del estado. PDDL estandariza cómo describir dominios y problemas. El planificador busca una secuencia que lleve del estado inicial a la meta. Es la versión formal de lo que hoy llamamos planificación de agentes, pero con garantías.',
          keyPoints: [
            'Separar dominio y problema permite reutilizar el planificador.',
            'Los LLM han recuperado esta idea: descomponer metas en subtareas verificables.',
          ],
          tags: ['planificación', 'simbólica'],
        },
      ],
    },
  ],
};
