import type { Layer } from '../types';

export const layer2: Layer = {
  slug: 'ingenieria-software',
  number: 2,
  title: 'Ingeniería del software',
  subtitle: 'Quién hace qué, cómo se desacopla y cómo se valida antes de que el cambio duela.',
  hue: 234,
  blocks: [
    {
      slug: 'diseno-y-poo',
      title: 'Diseño, POO y patrones (TDS)',
      summary:
        'Asignar responsabilidades bien es el 80% del diseño. Los patrones son vocabulario, no recetas mágicas.',
      concepts: [
        {
          slug: 'grasp',
          name: 'Patrones GRASP',
          tagline: 'La brújula para decidir en qué clase vive cada responsabilidad.',
          summary:
            'GRASP es una guía de asignación: alta cohesión, bajo acoplamiento, experto en información, creador, fabricación pura y controlador. La regla de oro es el experto: la lógica debe vivir donde están los datos que necesita. Cuando una responsabilidad no encaja en el dominio, se crea una fabricación pura (servicio, repositorio, mapper) en vez de forzarla.',
          keyPoints: [
            'Alta cohesión y bajo acoplamiento no son eslóganes: son la métrica real de mantenibilidad.',
            'Una clase de servicio sin estado suele ser una fabricación pura, y eso es correcto.',
          ],
          tags: ['diseño', 'poo'],
        },
        {
          slug: 'solid',
          name: 'Principios SOLID',
          tagline: 'Cinco reglas para que cambiar una pieza no obligue a reescribir el sistema.',
          summary:
            'SRP: una razón para cambiar. OCP: extender sin modificar. LSP: sustituir sin romper. ISP: interfaces pequeñas y específicas. DIP: depender de abstracciones, no de implementaciones. Aplicados con dogma generan sobreingeniería; aplicados en los bordes de módulos reducen el coste de cambio de forma brutal.',
          keyPoints: [
            'DIP es lo que permite testear sin base de datos real.',
            'ISP y SRP suelen resolverse juntos: interfaces grandes acaban violando ambos.',
          ],
          tags: ['diseño', 'solid'],
        },
        {
          slug: 'composicion-sobre-herencia',
          name: 'Composición sobre herencia',
          tagline: 'La herencia acopla en compilación; la composición se cambia en ejecución.',
          summary:
            'Heredar significa "es un" y arrastra toda la implementación del padre. Componer significa "tiene un" y permite intercambiar comportamiento sin tocar la jerarquía. La herencia profunda produce el problema del diamante y clases base frágiles; la composición con interfaces mantiene las piezas sustituibles.',
          keyPoints: [
            'Si la subclase no puede sustituir a la base, la jerarquía está mal modelada (LSP).',
            'Delega en un colaborador antes de crear otra subclase.',
          ],
          tags: ['diseño', 'poo'],
        },
        {
          slug: 'patrones-gof',
          name: 'Patrones GoF',
          tagline: 'Vocabulario compartido para problemas que ya resolvió alguien en 1994.',
          summary:
            'Los 23 patrones se agrupan en creacionales, estructurales y de comportamiento. En la práctica importan diez: Factory, Builder, Singleton (con cuidado), Adapter, Facade, Decorator, Proxy, Strategy, State, Observer y Chain of Responsibility. Un patrón mal aplicado es una capa extra de indirección para un problema que no existe.',
          keyPoints: [
            'Strategy y State eliminan los switch sobre tipos.',
            'Observer es la base del event-driven; Decorator, la del middleware.',
          ],
          tags: ['diseño', 'patrones'],
        },
        {
          slug: 'ddd',
          name: 'DDD: entidades y value objects',
          tagline: 'Una entidad tiene identidad; un value object tiene solo significado.',
          summary:
            'Una entidad se define por su ID y persiste aunque cambien sus atributos. Un value object es inmutable y se define por sus valores: dos `Dinero(10, EUR)` son el mismo concepto. Modelar bien esta distinción evita bugs sutiles de igualdad, mutabilidad compartida y validación dispersa.',
          keyPoints: [
            'Value objects validan en el constructor: un objeto inválido no debería existir.',
            'Los repositorios abstraen la persistencia como si fuera una colección en memoria.',
          ],
          tags: ['ddd', 'diseño'],
        },
      ],
    },
    {
      slug: 'arquitectura-y-ciclo-de-vida',
      title: 'Arquitectura y ciclo de vida (PDS)',
      summary:
        'Requisitos, estilos arquitectónicos, testing y persistencia. El diseño sobrevive si el ciclo de vida lo acompaña.',
      concepts: [
        {
          slug: 'requisitos',
          name: 'Requisitos funcionales y no funcionales',
          tagline: 'Lo que el sistema hace es fácil; cuánto tarda, cuánto aguanta y cuánto cuesta mantenerlo es el proyecto.',
          summary:
            'Los requisitos funcionales describen comportamiento; los no funcionales (latencia, disponibilidad, seguridad, coste) deciden la arquitectura. Un sistema que cumple todas las funciones pero tarda 3 segundos por petición ha fallado. Los NFR deben expresarse con números y medirse, o son deseos.',
          keyPoints: [
            'Un NFR sin umbral medible no es un requisito.',
            'La mayoría de decisiones arquitectónicas son compromisos entre NFR incompatibles.',
          ],
          tags: ['arquitectura', 'requisitos'],
        },
        {
          slug: 'arquitectura-hexagonal',
          name: 'Arquitectura hexagonal',
          tagline: 'El dominio en el centro; la base de datos, la API y el framework son enchufes intercambiables.',
          summary:
            'Puertos y adaptadores aíslan la lógica de negocio de la infraestructura. El dominio no importa nada del framework; los adaptadores traducen el mundo exterior a las interfaces del dominio. Cambiar de PostgreSQL a Mongo, o de REST a CLI, deja el núcleo intacto y testeable sin contenedores.',
          keyPoints: [
            'La regla de dependencia apunta siempre hacia dentro.',
            'Si tu entidad importa el ORM, ya no tienes dominio: tienes un esquema con métodos.',
          ],
          tags: ['arquitectura', 'diseño'],
          tradeoffs: {
            whenToUse: ['Sistemas con vida útil larga', 'Reglas de negocio complejas y múltiples interfaces'],
            whenToAvoid: ['CRUD simple de fin de semana', 'Prototipos donde el dominio aún no existe'],
            cost: 'Más ficheros, más mapeos y una curva de entrada real para el equipo.',
          },
        },
        {
          slug: 'eventos',
          name: 'Colas y pub/sub',
          tagline: 'Desacoplar en tiempo y espacio: el productor no espera ni sabe quién consume.',
          summary:
            'Las colas punto a punto garantizan entrega y absorben picos; pub/sub distribuye a múltiples suscriptores por topic. Resuelven acoplamiento temporal y escalado, pero introducen consistencia eventual, mensajes duplicados y la necesidad de idempotencia. No son una capa gratis: son un sistema distribuido más.',
          keyPoints: [
            'Diseña consumidores idempotentes: la entrega exactly-once es casi siempre una ilusión.',
            'Sin observabilidad, una cola se convierte en un agujero negro de mensajes.',
          ],
          tags: ['arquitectura', 'distribuidos'],
        },
        {
          slug: 'monolito-vs-microservicios',
          name: 'Monolito vs microservicios',
          tagline: 'Los microservicios no son una arquitectura mejor: son un coste operativo a cambio de autonomía.',
          summary:
            'Un monolito despliega junto y transacciona en memoria; un microservicio escala y despliega solo, a cambio de latencia de red, consistencia eventual y complejidad operativa. Casi todos los equipos que empiezan con microservicios necesitaban primero un monolito modular bien separado.',
          keyPoints: [
            'Si no puedes desplegar un monolito con confianza, tampoco podrás operar microservicios.',
            'La frontera correcta es la del contexto delimitado, no la del equipo.',
          ],
          tags: ['arquitectura', 'distribuidos'],
          tradeoffs: {
            whenToUse: ['Equipos grandes con dominios realmente independientes', 'Escalado desigual por componente'],
            whenToAvoid: ['Equipos pequeños', 'Dominio aún mal entendido'],
            cost: 'Latencia de red, tracing distribuido, versionado de contratos y fallos parciales.',
          },
        },
        {
          slug: 'piramide-testing',
          name: 'Pirámide de testing',
          tagline: 'Muchos tests rápidos abajo, pocos tests lentos arriba, y ningún hueco en el medio.',
          summary:
            'Unitarios: rápidos, aislados, baratos. Integración: verifican la costura real con base de datos o HTTP. E2E: flujos completos, lentos y frágiles. La pirámide no es una ley física, pero invertirla produce suites de horas que nadie ejecuta y que fallan por motivos ajenos al código.',
          keyPoints: [
            'Un test que depende del orden de ejecución no es un test: es una bomba de relojería.',
            'Mocks verifican interacción; stubs devuelven datos; fakes implementan de verdad.',
          ],
          tags: ['testing', 'calidad'],
        },
        {
          slug: 'impedance-mismatch',
          name: 'Impedance mismatch y ORM',
          tagline: 'Los objetos son grafos; las tablas son rectángulos. Alguien tiene que pagar esa traducción.',
          summary:
            'El modelo relacional no tiene herencia ni referencias directas, y el orientado a objetos no tiene joins ni claves foráneas. Los ORM automatizan el mapeo y el ciclo de vida (transient, persistent, detached, removed), pero esconden el coste real: consultas N+1, lazy loading inesperado y transacciones mal delimitadas.',
          keyPoints: [
            'El N+1 es el bug de rendimiento más común en aplicaciones con ORM.',
            'Conoce el SQL que genera tu ORM o el ORM te conocerá a ti.',
          ],
          tags: ['persistencia', 'orm'],
        },
      ],
    },
  ],
};
