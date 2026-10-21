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
    theme: 'Búsqueda guiada por una heurística',
    software: 'a-estrella',
    ai: 'tree-of-thoughts',
    note: 'A* explora el espacio de estados con g(n) + h(n). Tree-of-Thoughts explora rutas de razonamiento y las evalúa para podar. Cuando el espacio es demasiado grande para enumerarlo, ambos dependen de una buena función de estimación.',
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
    ai: 'bases-vectoriales',
    note: 'Una tabla hash convierte una clave en una cubeta para responder "¿existe?" en O(1). HNSW convierte un vector en un vecindario para responder "¿a qué se parece?" en milisegundos. Cambia la pregunta, no la ambición de no recorrer todo.',
  },
  {
    id: 'frontera-de-sistema',
    theme: 'Puertos, adaptadores y contratos',
    software: 'arquitectura-hexagonal',
    ai: 'mcp',
    note: 'Hexagonal aísla el dominio detrás de puertos y adaptadores. MCP aísla el modelo de las herramientas con un protocolo estándar. En ambos casos el objetivo es poder sustituir la infraestructura sin tocar el núcleo.',
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
    software: 'sbr-motor-inferencia',
    ai: 'guardrails',
    note: 'Un sistema basado en reglas decide con IF-THEN auditables. Un guardrail hace lo mismo con un agente: políticas externas y deterministas que no dependen de que el modelo "decida" portarse bien.',
  },
];
