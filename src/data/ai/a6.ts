import type { Layer } from '../types';

export const ai6: Layer = {
  slug: 'ia-agentica',
  number: 6,
  title: 'IA agéntica y LLMOps',
  subtitle:
    'El modelo deja de ser un oráculo y pasa a ser el motor de sistemas que perciben, deciden, usan herramientas y fallan en producción.',
  hue: 312,
  blocks: [
    {
      slug: 'nucleo-agentico',
      title: 'Núcleo agéntico',
      summary:
        'Percepción, estado, decisión y acción. Bucles de razonamiento, memoria y contratos de herramientas.',
      concepts: [
        {
          slug: 'definicion-de-agente',
          name: 'Qué es un agente',
          tagline: 'Un LLM con un bucle, un estado y permiso para actuar. El permiso es la parte peligrosa.',
          summary:
            'Un agente es una entidad que observa un entorno, mantiene estado, evalúa metas y ejecuta acciones mediante herramientas. La diferencia con un chatbot no es la inteligencia: es la capacidad de actuar y de encadenar decisiones sin intervención humana. Por eso el diseño de permisos, límites y observabilidad importa más que el prompt.',
          keyPoints: [
            'Sin herramientas, no hay agente: hay generación de texto.',
            'Cada acción externa debe tener un radio de impacto explícito.',
          ],
          tags: ['agentes', 'sistemas'],
        },
        {
          slug: 'bucle-react',
          name: 'Bucle ReAct',
          tagline: 'Pensar, actuar, observar, repetir. El while(true) que sostiene la mayoría de agentes.',
          summary:
            'ReAct alterna Thought (razonamiento), Action (llamada a herramienta) y Observation (resultado). El bucle continúa hasta que el modelo emite una respuesta final o se agota un presupuesto. Plan-and-Solve separa planificación y ejecución; Reflexion añade autocrítica sobre los fallos. Todos comparten el mismo riesgo: bucles infinitos y coste sin control.',
          keyPoints: [
            'Impón límites de iteraciones, tokens y tiempo desde el primer día.',
            'La observación es entrada no confiable: puede contener inyecciones.',
          ],
          tags: ['agentes', 'razonamiento'],
          diagram: 'react-loop',
        },
        {
          slug: 'memoria-coala',
          name: 'Memoria agéntica (CoALA)',
          tagline: 'No es un chat largo: es working, semántica, procedimental y episódica.',
          summary:
            'CoALA distingue memoria de trabajo (contexto activo), semántica (hechos recuperados por RAG), procedimental (skills y reglas) y episódica (experiencias pasadas). Confundirlas produce prompts gigantes que mezclan todo y degradan la atención. Cada tipo tiene su mecanismo de escritura, recuperación y olvido.',
          keyPoints: [
            'La memoria de trabajo es cara y limitada: no metas el historial completo.',
            'La memoria episódica necesita decay o se convierte en ruido.',
          ],
          tags: ['agentes', 'memoria'],
        },
        {
          slug: 'tree-of-thoughts',
          name: 'Tree-of-Thoughts y descomposición',
          tagline: 'En vez de una cadena de pensamiento, explora un árbol y poda las ramas malas.',
          summary:
            'ToT genera múltiples rutas de razonamiento, las evalúa y aplica búsqueda (BFS/DFS) sobre ellas. Es A* aplicado a pensamientos. La descomposición jerárquica convierte una meta ambigua en un DAG de subtareas verificables. El coste crece rápido: solo merece la pena en problemas donde equivocarse es caro y el espacio es pequeño.',
          keyPoints: [
            'El evaluador de estados es el componente crítico, no el generador.',
            'En producción, un plan explícito verificable suele batir a ToT libre.',
          ],
          tags: ['agentes', 'planificación'],
        },
        {
          slug: 'tool-calling',
          name: 'Tool calling y guided decoding',
          tagline: 'El modelo no ejecuta código: emite una llamada que debe cumplir un contrato.',
          summary:
            'Las herramientas se describen con esquemas tipados (Pydantic, Zod) y el modelo genera la llamada como JSON. Guided decoding restringe los logits para que la salida cumpla la gramática al 100%, eliminando errores de sintaxis. Aun así, el esquema no garantiza semántica: valida argumentos y aplica mínimo privilegio antes de ejecutar.',
          keyPoints: [
            'Guided decoding garantiza formato, no intención.',
            'Valida en el servidor y trata la llamada como entrada no confiable.',
          ],
          tags: ['agentes', 'herramientas'],
        },
      ],
    },
    {
      slug: 'rag-y-protocolos',
      title: 'RAG, protocolos y orquestación',
      summary:
        'Cómo dar contexto y herramientas a los modelos sin reconstruir el sistema cada vez que cambia un proveedor.',
      concepts: [
        {
          slug: 'rag-avanzado',
          name: 'RAG avanzado',
          tagline: 'Recuperar bien es más difícil que generar: chunking, búsqueda híbrida y re-ranking.',
          summary:
            'RAG inyecta contexto recuperado en el prompt. La calidad depende del chunking (semántico, no por caracteres), de la búsqueda híbrida (BM25 + densa fusionadas con RRF) y del re-ranking con un cross-encoder. GraphRAG añade relaciones entre entidades para preguntas globales. Sin evaluación, un RAG parece funcionar y falla en cuanto cambia el corpus.',
          keyPoints: [
            'El re-ranking suele aportar más que cambiar de modelo generador.',
            'Mide faithfulness y context recall por separado: el fallo puede estar en cualquiera de las dos fases.',
          ],
          tags: ['rag', 'recuperación'],
          tradeoffs: {
            whenToUse: ['Conocimiento privado, cambiante o con necesidad de citas'],
            whenToAvoid: ['Conocimiento estable que cabe en el prompt', 'Tareas que requieren razonamiento sobre todo el corpus'],
            cost: 'Latencia de retrieval + re-ranking; indexación y reindexación continuas.',
          },
        },
        {
          slug: 'mcp',
          name: 'MCP (Model Context Protocol)',
          tagline: 'El puerto USB-C de las herramientas: un protocolo en vez de N integraciones a medida.',
          summary:
            'MCP estandariza la conexión cliente-servidor entre modelos y fuentes de datos. Un servidor expone Tools (ejecutables), Resources (datos de solo lectura) y Prompts (plantillas); el host gestiona permisos y múltiples servidores. El beneficio es el mismo que un adaptador hexagonal: desacoplas el modelo de la herramienta y puedes cambiar cualquiera de los dos.',
          keyPoints: [
            'Es el patrón puerto/adaptador aplicado a agentes.',
            'El dynamic tool routing evita saturar el contexto con decenas de definiciones.',
          ],
          tags: ['agentes', 'protocolos', 'mcp'],
        },
        {
          slug: 'agent-skills',
          name: 'Agent Skills',
          tagline: 'Capacidades empaquetadas con manifiesto y carga progresiva: el agente solo abre lo que necesita.',
          summary:
            'Una skill encapsula instrucciones, scripts deterministas y triggers declarativos en una carpeta con manifiesto. La divulgación progresiva carga el contenido completo solo cuando el contexto lo requiere, ahorrando tokens y reduciendo distracción. Es la forma de dar procedimientos fiables sin inflar el system prompt.',
          keyPoints: [
            'Los scripts deterministas son más fiables que pedirle al modelo que improvise.',
            'Triggers explícitos evitan que la skill se active por accidente.',
          ],
          tags: ['agentes', 'skills'],
        },
        {
          slug: 'multiagente-langgraph',
          name: 'Multi-agente y LangGraph',
          tagline: 'Grafos de estado cíclicos con checkpoints, en lugar de cadenas lineales que no saben volver.',
          summary:
            'LangGraph modela agentes como nodos que transforman un estado compartido, con aristas condicionales y checkpointers para pausar o intervenir (human-in-the-loop). El patrón supervisor-worker delega subtareas en agentes especializados. Más agentes no es mejor: cada handoff pierde contexto y añade latencia y coste.',
          keyPoints: [
            'El estado explícito y persistido es lo que hace depurable un agente.',
            'Empieza con un agente y herramientas; divide solo cuando el contexto lo exija.',
          ],
          tags: ['agentes', 'orquestación'],
        },
        {
          slug: 'peft-lora',
          name: 'LoRA, QLoRA y alineamiento',
          tagline: 'No reentrenes 70B: entrena dos matrices pequeñas que corrigen el comportamiento.',
          summary:
            'LoRA congela los pesos base y aprende ΔW = (α/r)·B·A con rango bajo, reduciendo los parámetros entrenables más del 99%. QLoRA cuantiza la base a 4 bits NF4 y entrena en 16 bits, permitiendo fine-tuning de modelos grandes en una GPU. DPO alinea con pares preferidos/rechazados sin reward model; GRPO usa ventaja relativa de grupo, clave en razonamiento.',
          keyPoints: [
            'LoRA no añade conocimiento nuevo de forma fiable: moldea estilo y formato.',
            'DPO es más simple de operar que RLHF con reward model.',
          ],
          tags: ['entrenamiento', 'fine-tuning'],
        },
        {
          slug: 'context-engineering',
          name: 'Context engineering',
          tagline: 'El prompt no es un texto: es un presupuesto que se ensambla, se comprime y se coloca con intención.',
          summary:
            'Ensamblar contexto justo a tiempo (system, memorias, historial comprimido, contratos de herramientas) importa más que escribir un prompt bonito. La información crítica va al principio y al final, porque en medio se pierde (lost in the middle). La compactación y el resumen recursivo evitan desbordar la ventana en tareas largas.',
          keyPoints: [
            'Lost in the middle: no entierres la instrucción clave entre documentos.',
            'Presupuesta tokens por sección, no por intuición.',
          ],
          tags: ['agentes', 'contexto'],
        },
      ],
    },
    {
      slug: 'llmops-y-seguridad',
      title: 'LLMOps, evaluación y seguridad',
      summary:
        'Sin trazas no hay depuración; sin evaluación no hay mejora; sin guardrails, el agente es una superficie de ataque.',
      concepts: [
        {
          slug: 'observabilidad',
          name: 'Observabilidad y tracing',
          tagline: 'Un agente sin trazas es una caja negra que cuesta dinero y falla de forma irreproducible.',
          summary:
            'Cada ejecución debería dejar un árbol de spans: llamadas al modelo, tokens, latencia, coste, entradas/salidas de herramientas y estado de memoria. Herramientas como LangSmith o Arize Phoenix permiten reconstruir por qué el agente hizo lo que hizo. Sin esto, cada incidente se convierte en arqueología de logs.',
          keyPoints: [
            'Registra tokens y coste por paso: el gasto se esconde en los bucles.',
            'Correlaciona trazas con la versión del prompt y del modelo.',
          ],
          tags: ['llmops', 'observabilidad'],
        },
        {
          slug: 'evaluacion-ragas',
          name: 'Evaluación con LLM-as-a-Judge',
          tagline: 'Si la salida no es determinista, los tests unitarios no bastan: necesitas rúbricas y métricas.',
          summary:
            'Un modelo evaluador audita respuestas bajo rúbricas estrictas. En RAG se miden faithfulness (¿la respuesta está respaldada por el contexto?), answer relevance y context recall. Sirve para comparar versiones, pero hereda los sesgos del juez: calibra contra evaluación humana y fija conjuntos de referencia estables.',
          keyPoints: [
            'Evalúa recuperación y generación por separado.',
            'Un juez sin rúbrica es una opinión más caras.',
          ],
          tags: ['llmops', 'evaluación'],
        },
        {
          slug: 'prompt-injection',
          name: 'Prompt injection',
          tagline: 'Si el agente lee una web, esa web puede darle órdenes. Y el agente no distingue datos de instrucciones.',
          summary:
            'La inyección directa viene del usuario; la indirecta, de contenido externo que el agente procesa (una página, un correo, un PDF). Al no existir una separación robusta entre datos e instrucciones en el modelo, la defensa es arquitectónica: delimitar datos no confiables, aplicar mínimo privilegio y exigir confirmación humana para acciones destructivas.',
          keyPoints: [
            'No hay prompt que resuelva la inyección indirecta por sí solo.',
            'Trata toda salida de herramienta como texto hostil.',
          ],
          tags: ['seguridad', 'agentes'],
        },
        {
          slug: 'guardrails',
          name: 'Guardrails y mínimo privilegio',
          tagline: 'La seguridad de un agente vive en sus permisos, no en su personalidad.',
          summary:
            'Los guardrails combinan filtros de entrada/salida, delimitación estricta de datos externos, enmascaramiento de PII y restricción de permisos por herramienta. El principio es determinista: nada de escritura destructiva sin confirmación, nada de secretos en el contexto, nada de red saliente arbitraria. Los filtros probabilísticos ayudan, pero no sustituyen los límites del sistema.',
          keyPoints: [
            'Mínimo privilegio por herramienta y por sesión.',
            'La confirmación humana es un guardrail, no una molestia.',
          ],
          tags: ['seguridad', 'guardrails'],
        },
      ],
    },
  ],
};
