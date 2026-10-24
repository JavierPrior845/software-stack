import type { Layer } from '../types';

export const layer4: Layer = {
  slug: 'factoria-de-software',
  number: 4,
  title: 'Factoría de software',
  subtitle: 'Lenguaje, motor, runtime, framework, API y base de datos. Y la matriz para elegir sin fe.',
  hue: 268,
  blocks: [
    {
      slug: 'taxonomia-runtimes',
      title: 'Taxonomía: lenguaje, motor y runtime',
      summary:
        'La industria mezcla estos términos a propósito. Separarlos te permite entender qué se ejecuta, dónde y a qué coste.',
      concepts: [
        {
          slug: 'lenguaje-motor-runtime',
          name: 'Lenguaje, motor y runtime',
          tagline: 'El lenguaje es una especificación; el motor ejecuta; el runtime le da manos para tocar el mundo.',
          summary:
            'JavaScript es el lenguaje; V8 es el motor que lo compila; libuv gestiona el event loop y las llamadas al SO; Node.js es el runtime que une ambos y añade APIs de servidor. Esta distinción explica por qué el mismo JS se comporta distinto en el navegador y en Node: el lenguaje es el mismo, el runtime no.',
          keyPoints: [
            'Un lenguaje no ejecuta nada: es gramática y semántica.',
            'El runtime es lo que determina qué APIs tienes, no el lenguaje.',
          ],
          tags: ['runtime', 'fundamentos'],
        },
        {
          slug: 'aot-jit',
          name: 'AOT, bytecode y JIT',
          tagline: 'Compilar antes, interpretar al vuelo o compilar en caliente justo lo que se repite.',
          summary:
            'AOT (C++, Rust, Go) produce binario nativo antes de ejecutar: arranque inmediato y máximo rendimiento, pero binario atado a arquitectura y SO. Bytecode + VM (JVM, CPython) es portable y arranca rápido. JIT detecta hot paths y los compila a máquina en memoria, acercándose a nativo a cambio de calentamiento y memoria.',
          keyPoints: [
            'JIT tiene warm-up: los benchmarks en frío engañan.',
            'AOT no significa más rápido en todo; significa predecible.',
          ],
          tags: ['runtime', 'rendimiento'],
          tradeoffs: {
            whenToUse: ['AOT (Go/Rust): serverless, CLIs y contenedores que escalan de 0 a N en milisegundos', 'JIT (JVM/V8): servidores de larga duración'],
            whenToAvoid: ['Runtimes con warm-up pesado en funciones efímeras (cold starts lentos)'],
            cost: 'JIT consume más RAM base para almacenar el compilador y el código máquina generado al vuelo.',
          },
        },
        {
          slug: 'libreria-vs-framework',
          name: 'Librería vs framework',
          tagline: 'En la librería tú llamas; en el framework te llaman a ti.',
          summary:
            'La diferencia es la inversión de control. Con una librería tu código dirige el flujo y llama cuando necesita (axios, zod). Con un framework, el ciclo de vida es suyo y tú rellenas huecos (FastAPI, NestJS, Next.js). Por eso los frameworks son difíciles de abandonar: tu arquitectura está escrita en su vocabulario.',
          keyPoints: [
            'La IoC no es un detalle: define quién manda en el arranque y el enrutado.',
            'Aísla el framework en adaptadores si esperas sobrevivir a él.',
          ],
          tags: ['runtime', 'arquitectura'],
          tradeoffs: {
            whenToUse: ['Framework: estandarizar convenciones en equipos y acelerar entrega', 'Librerías: mantener control fino del flujo'],
            whenToAvoid: ['Acoplar las entidades del dominio a decoradores o clases base propietarios del framework'],
            cost: 'Cambiar una librería lleva horas; migrar de framework sin arquitectura limpia equivale a reescribir.',
          },
        },
      ],
    },
    {
      slug: 'anatomia-de-un-sistema',
      title: 'Anatomía de un sistema',
      summary:
        'Frontend, backend, protocolos de API y persistencia. Cada elección responde a un tipo de comunicación y de dato.',
      concepts: [
        {
          slug: 'frontend-backend',
          name: 'Frontend vs backend',
          tagline: 'El cliente es territorio hostil; el servidor es tu casa. No pongas secretos en la calle.',
          summary:
            'El frontend se ejecuta en el dispositivo del usuario: renderiza, captura eventos y consume APIs. Cualquiera puede leer el bundle y manipular el estado. El backend concentra la lógica de negocio, la autorización y el acceso a datos. La regla no negociable: ninguna decisión de seguridad se valida solo en el cliente.',
          keyPoints: [
            'Validar en cliente mejora UX; validar en servidor es la seguridad.',
            'El código del cliente es público aunque esté minificado.',
          ],
          tags: ['web', 'arquitectura'],
        },
        {
          slug: 'rest-graphql-grpc',
          name: 'REST, GraphQL y gRPC',
          tagline: 'Recursos cacheables, consultas a medida o binario ultrarrápido: elige según quién habla.',
          summary:
            'REST es el estándar sobre HTTP/JSON: simple, cacheable, universal. GraphQL elimina over/under-fetching con un único endpoint y queries declarativas, a cambio de caching y N+1 más difíciles. gRPC usa HTTP/2 y Protobuf: el estándar para comunicación interna entre servicios por su latencia y contratos fuertes.',
          keyPoints: [
            'gRPC brilla dentro de tu infraestructura; REST brilla hacia fuera.',
            'GraphQL traslada complejidad del cliente al servidor: necesitas límites de profundidad y coste.',
          ],
          tags: ['api', 'protocolos'],
          tradeoffs: {
            whenToUse: ['REST: APIs públicas y CRUD', 'GraphQL: clientes con necesidades variables', 'gRPC: servicio a servicio'],
            whenToAvoid: ['GraphQL para un CRUD simple', 'gRPC en navegador sin proxy'],
            cost: 'GraphQL: resolver y caching. gRPC: tooling y debugging binario. REST: over-fetching.',
          },
        },
        {
          slug: 'websockets-sse',
          name: 'WebSockets vs SSE',
          tagline: '¿Necesitas hablar en ambos sentidos o solo escuchar al servidor?',
          summary:
            'WebSockets abren una conexión TCP persistente y bidireccional: chat, juegos, trading. SSE es HTTP unidireccional servidor→cliente, más simple, con reconexión automática y compatible con proxies. Los LLM usan SSE para streaming de tokens; si solo necesitas recibir, SSE suele ser la elección correcta.',
          keyPoints: [
            'SSE pasa por HTTP/2 sin trucos de upgrade.',
            'WebSocket requiere gestionar reconexión, heartbeats y estado a mano.',
          ],
          tags: ['api', 'tiempo-real'],
          tradeoffs: {
            whenToUse: ['SSE: streaming de tokens de IA, notificaciones y feeds en vivo', 'WebSockets: colaboración multiusuario en tiempo real y gaming'],
            whenToAvoid: ['WebSockets cuando el cliente solo envía una petición inicial y escucha el stream de respuesta'],
            cost: 'WebSockets complica el balanceo de carga L7, los cortafuegos corporativos y la reconexión.',
          },
        },
        {
          slug: 'tipos-de-bases-de-datos',
          name: 'SQL, NoSQL, Redis y vectorial',
          tagline: 'El 90% de los sistemas quieren Postgres. El otro 10% tiene una razón concreta.',
          summary:
            'SQL ofrece relaciones, constraints y ACID: el valor por defecto. Documental encaja con esquemas variables y prototipado. Redis vive en RAM para caché, sesiones y contadores. Las bases vectoriales indexan embeddings con HNSW para búsqueda semántica. Elegir por moda, y no por patrón de acceso, es el error más caro de la capa.',
          keyPoints: [
            'Postgres cubre relacional, JSONB, full-text y pgvector: empieza ahí.',
            'Redis es caché, no fuente de verdad (salvo que aceptes persistencia asíncrona).',
          ],
          tags: ['persistencia', 'bases-de-datos'],
          widget: 'stack-selector',
          tradeoffs: {
            whenToUse: ['PostgreSQL: sistema de registro (SoR) por defecto', 'Redis: caché, colas y rate-limiting', 'Qdrant: >1M de vectores con filtros complejos'],
            whenToAvoid: ['NoSQL documental para datos financieros o con relaciones muchos-a-muchos que acabarás uniendo en código'],
            cost: 'Cada motor de base de datos adicional multiplica el coste de backups, monitorización y consistencia.',
          },
        },
        {
          slug: 'bases-vectoriales',
          name: 'Bases vectoriales y HNSW',
          tagline: 'Buscar "parecido" en 1536 dimensiones sin recorrer un millón de vectores.',
          summary:
            'Los embeddings convierten texto o imágenes en vectores; la búsqueda por similitud usa distancia coseno o euclídea. HNSW construye un grafo navegable por capas que permite búsqueda aproximada de vecinos (ANN) en milisegundos, sacrificando exhaustividad. Es la infraestructura silenciosa de RAG y de los sistemas de recomendación.',
          keyPoints: [
            'ANN es aproximado: mide recall, no solo latencia.',
            'El filtrado por metadatos cambia por completo el rendimiento del índice.',
          ],
          tags: ['persistencia', 'ia', 'vectores'],
          diagram: 'rag-pipeline',
          complexity: 'O(log N) aproximado en búsqueda HNSW',
          tradeoffs: {
            whenToUse: ['Búsqueda semántica, deduplicación difusa y RAG sobre corpus grandes'],
            whenToAvoid: ['Búsqueda de códigos exactos, SKUs o identificadores (ahí BM25 o un índice B-Tree ganan siempre)'],
            cost: 'El grafo HNSW consume bastante RAM; requiere cuantización (scalar/binary) a gran escala.',
          },
        },
      ],
    },
    {
      slug: 'seleccion-de-stack',
      title: 'Selección de stack',
      summary:
        'La decisión no es "qué lenguaje es mejor", sino "qué restricciones tiene este problema y este equipo".',
      concepts: [
        {
          slug: 'matriz-de-seleccion',
          name: 'Matriz de selección de stack',
          tagline: 'Caso de uso primero, tecnología después. Y siempre con un coste de salida en mente.',
          summary:
            'TypeScript/Node para SaaS y web con tipado de extremo a extremo. Python/FastAPI para IA y datos. Go para servicios de red con latencia baja y concurrencia masiva. Rust/C++ para control de memoria y determinismo. La matriz no elige por ti: elimina opciones que no cumplen tus NFR.',
          keyPoints: [
            'El stack que tu equipo ya domina suele ganar al stack teóricamente óptimo.',
            'El coste de contratación y mantenimiento es parte del benchmark.',
          ],
          tags: ['stack', 'decisiones'],
          widget: 'stack-selector',
          tradeoffs: {
            whenToUse: ['Siempre: escribe los criterios antes de elegir'],
            whenToAvoid: ['Reescribir por moda o por aburrimiento del stack actual'],
            cost: 'Cambiar de stack cuesta meses; el coste de no cambiarlo se mide en años.',
          },
        },
        {
          slug: 'clean-architecture',
          name: 'Clean Architecture como blindaje',
          tagline: 'El framework es un detalle. La base de datos también. El dominio es el negocio.',
          summary:
            'La regla de dependencia apunta hacia dentro: el dominio no conoce FastAPI, Prisma ni HTTP. El framework es un adaptador de entrada; la base de datos, uno de salida. Si mañana cambias de ORM o expones una CLI, la lógica de negocio no se toca. El precio es más indirección, y solo merece la pena cuando el dominio es complejo.',
          keyPoints: [
            'Si tu caso de uso importa el framework, la frontera no existe.',
            'Los DTOs en la frontera evitan filtrar el modelo de persistencia al exterior.',
          ],
          tags: ['arquitectura', 'diseño'],
          diagram: 'hexagonal-arch',
        },
      ],
    },
  ],
};
