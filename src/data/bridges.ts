export interface Bridge {
  id: string;
  theme: string;
  software: string;
  ai: string;
  note: string;
}

export const bridges: Bridge[] = [
  {
    id: 'memoria-virtual',
    theme: 'Paginación bajo presión de memoria',
    software: 'paginacion',
    ai: 'paged-attention',
    note: 'Ambos parten la memoria en bloques de tamaño fijo, mantienen una tabla de traducción y aceptan que los bloques físicos estén dispersos. PagedAttention es literalmente memoria virtual aplicada al KV-cache.',
  },
  {
    id: 'cache-de-estado',
    theme: 'Cachear lo que costaría recorrer',
    software: 'tlb',
    ai: 'kv-cache',
    note: 'La TLB evita repetir el page walk en cada acceso. El KV-cache evita recalcular K y V de todos los tokens previos. El mismo principio: guardar el resultado caro y validarlo antes de usarlo.',
  },
  {
    id: 'representacion-numerica',
    theme: 'Precisión y formato de los números',
    software: 'ieee-754',
    ai: 'cuantizacion',
    note: 'IEEE 754 decide cuántos bits cuesta representar un real y qué errores aceptas. La cuantización negocia exactamente lo mismo con los pesos de un modelo: menos bits, menos memoria, más error.',
  },
  {
    id: 'prediccion',
    theme: 'Predecir y verificar en paralelo',
    software: 'branch-prediction',
    ai: 'speculative-decoding',
    note: 'La CPU ejecuta especulativamente la rama que cree probable y descarta el trabajo si falla. Un draft model propone tokens y el modelo grande los valida. Predicción barata + verificación cara es el mismo patrón.',
  },
  {
    id: 'busqueda-heuristica',
    theme: 'De la elección local a la búsqueda informada',
    software: 'algoritmos-voraces',
    ai: 'a-estrella',
    note: 'El voraz se queda con el mejor paso inmediato y no vuelve atrás. A* suma coste real y heurística para explorar solo lo prometedor. Ambos sustituyen enumerar todo por una función de puntuación; si esa función está mal calibrada, el atajo se convierte en el error.',
  },
  {
    id: 'grafos',
    theme: 'Datos que no son una tabla',
    software: 'representacion-grafos',
    ai: 'gnn',
    note: 'Elegir representación (matriz, listas de adyacencia) decide el coste de recorrer vecinos. Las GNN hacen del message passing su operación central. GraphRAG recupera la versión simbólica de la misma idea.',
  },
  {
    id: 'indexacion',
    theme: 'Índices: de la igualdad exacta a la similitud',
    software: 'hash-tables',
    ai: 'rag-avanzado',
    note: 'Una tabla hash convierte una clave en una cubeta para responder "¿existe?" en O(1). RAG indexa fragmentos y recupera los más parecidos antes de generar, en vez de recorrer el corpus. Cambia la pregunta —exactitud frente a similitud—, no la ambición de no recorrerlo todo.',
  },
  {
    id: 'frontera-de-sistema',
    theme: 'Puertos, adaptadores y contratos',
    software: 'arquitectura-software',
    ai: 'mcp',
    note: 'La arquitectura hexagonal y los estilos arquitectónicos aíslan el dominio detrás de puertos y adaptadores. MCP aísla el modelo de las herramientas con un protocolo estándar. En ambos casos el objetivo es poder sustituir la infraestructura sin tocar el núcleo.',
  },
  {
    id: 'frontera-de-privilegios',
    theme: 'Cruzar una frontera con permiso',
    software: 'syscalls',
    ai: 'tool-calling',
    note: 'Una syscall es una puerta estrecha, validada y auditable hacia el kernel. Una tool call es una puerta estrecha hacia el mundo. Si no validas argumentos y aplicas mínimo privilegio, la puerta es un agujero.',
  },
  {
    id: 'verificacion',
    theme: 'Verificar antes de confiar',
    software: 'piramide-testing',
    ai: 'evaluacion-ragas',
    note: 'La pirámide de testing compensa coste y cobertura con capas. La evaluación de LLM hace lo mismo: métricas baratas automáticas, jueces y, arriba, revisión humana. No hay una sola capa que baste.',
  },
  {
    id: 'complejidad-cuadratica',
    theme: 'El coste de mirar todo',
    software: 'notacion-asintotica',
    ai: 'self-attention',
    note: 'Entender que la atención es O(N²) explica por qué existe la ventana de contexto, el KV-cache y PagedAttention. Sin notación asintótica, la factura de serving parece magia.',
  },
  {
    id: 'control-determinista',
    theme: 'Reglas que no se negocian',
    software: 'mutex-semaforo-spinlock',
    ai: 'guardrails',
    note: 'Un mutex no pide permiso al hilo: lo bloquea. Un guardrail no pide al modelo que se porte bien: intercepta la acción fuera del modelo. En ambos casos la garantía vive en el mecanismo, no en la buena voluntad de quien actúa.',
  },
  {
    id: 'orquestacion-dag',
    theme: 'Grafos dirigidos para coordinar trabajo',
    software: 'dfs-bfs-toposort',
    ai: 'multiagente-langgraph',
    note: 'El orden topológico decide qué tarea puede ejecutarse cuando sus dependencias han terminado. Un grafo de agentes (LangGraph) aplica la misma disciplina al razonamiento: nodos con estado explícito, aristas condicionales y puntos de control.',
  },
  {
    id: 'poda-de-ramas',
    theme: 'Explorar árboles podando lo inviable',
    software: 'backtracking-branch-bound',
    ai: 'tree-of-thoughts',
    note: 'Branch & Bound explora un árbol de decisiones y corta ramas cuya cota no puede mejorar la solución actual. Tree-of-Thoughts genera múltiples candidatos de pensamiento y usa un evaluador para podar las ramas poco prometedoras antes de gastar más tokens.',
  },
];
