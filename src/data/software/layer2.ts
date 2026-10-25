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
      title: 'Diseño, POO y patrones',
      summary:
        'Asignar responsabilidades bien es el 80% del diseño. Los patrones son vocabulario, no recetas mágicas.',
      concepts: [
        {
          slug: 'grasp',
          name: 'Patrones GRASP',
          tagline: 'La brújula para decidir en qué clase vive cada responsabilidad.',
          summary:
            'GRASP (General Responsibility Assignment Software Patterns) formaliza la asignación de responsabilidades dividiéndolas en taxonomía de Conocer (datos privados, objetos conectados, estado derivado) y Hacer (cálculos, instanciación, iniciar acciones en otros y coordinar actividades). El Experto en Información es la regla de oro: asignar el contrato a quien tiene los datos para cumplirlo. El Creador se rige por 5 reglas canónicas (agregación, composición, registro, uso específico y posesión de inicialización). El Controlador aísla la UI del modelo de dominio, y la Fabricación Pura crea abstracciones artificiales (servicios, repositorios) para no comprometer cohesión ni acoplamiento.',
          keyPoints: [
            'Experto en Información: la lógica debe residir estrictamente donde están los datos requeridos.',
            'Creador UMU: la clase B crea a A si B contiene/agrega a A, registra a A, usa íntimamente a A o tiene los datos de inicialización de A.',
            'Controlador: primer objeto del dominio que recibe eventos de UI; las clases de dominio jamás acceden a la interfaz de usuario.',
            '4 Fuentes de Acoplamiento: atributo de tipo B, parámetro/retorno/var local de tipo B, subclase de B, o implementación de interfaz B.',
            'Fabricación Pura: clases helper, servicios y repositorios sin análogo en el mundo real creadas para evitar inflar las entidades de dominio.',
          ],
          tags: ['diseño', 'poo', 'grasp', 'umu'],
          diagram: 'grasp-diagram',
          tradeoffs: {
            whenToUse: ['Siempre al diseñar el modelo de dominio y asignar responsabilidades a clases'],
            whenToAvoid: ['Crear controladores gordos (Fat Controllers) que acumulen lógica de negocio en lugar de delegar al dominio'],
            cost: 'Requiere disciplina analítica previa antes de lanzarse a escribir código desordenado.',
          },
        },
        {
          slug: 'solid',
          name: 'Principios SOLID y Mandatos de Diseño',
          tagline: 'Cinco leyes arquitectónicas y mandatos esenciales para evitar la fragilidad del software.',
          summary:
            'Formulados por Robert C. Martin y Bertrand Meyer para construir sistemas tolerantes al cambio. SRP exige una sola razón para cambiar ligada a actores de negocio. OCP permite extender capacidades mediante polimorfismo sin modificar código desplegado. LSP impone diseño por contrato (precondiciones no más fuertes, postcondiciones no más débiles, preservación de invariantes). ISP fragmenta interfaces gruesas en contratos específicos por cliente. DIP invierte el flujo de dependencias: módulos de alto nivel y bajo nivel dependen de abstracciones. Se complementan con la Ley de Deméter ("No hables con extraños") y el Principio de Acceso Uniforme.',
          keyPoints: [
            'SRP: un solo actor de negocio como motivo de cambio; evita las God Classes.',
            'OCP: sustituye switches y cadenas de ifs dependientes de tipos por polimorfismo extensible.',
            'LSP: si S es subtipo de T, debe reemplazar a T sin romper invariantes ni contratos (el cuadrado mutable NO es rectángulo).',
            'ISP: interfaces magras; ninguna clase debe depender de métodos que no consume.',
            'DIP: el dominio define las interfaces (puertos) y la infraestructura concreta las implementa (adaptadores).',
            'Ley de Deméter (LoD): un método solo habla con su propio objeto, parámetros, objetos creados localmente y atributos directos.',
          ],
          tags: ['diseño', 'solid', 'arquitectura'],
          diagram: 'solid-principles',
          tradeoffs: {
            whenToUse: ['En fronteras de módulos, componentes desacoplables y capas de integración externa'],
            whenToAvoid: ['Crear interfaces superfluas de un solo uso para clases internas privadas que nunca cambiarán'],
            cost: 'Sobrecarga de indirección inicial si se aplican con dogma ciego en scripts triviales.',
          },
          example: {
            label: 'DIP + Inyección de Dependencias (Java / TS)',
            code: `// Alto nivel depende exclusivamente de la abstracción:
interface FacturaRepository {
  save(factura: Factura): Promise<void>;
}

class FacturacionService {
  constructor(private readonly repo: FacturaRepository) {} // Inyección
  async emitir(factura: Factura) {
    // Lógica pura de dominio...
    await this.repo.save(factura);
  }
}`,
            note: 'Permite testear el servicio con un InMemoryFakeRepository instantáneo sin arrancar una BD real.',
          },
        },
        {
          slug: 'composicion-sobre-herencia',
          name: 'Composición sobre herencia',
          tagline: 'La herencia acopla en tiempo de compilación; la composición se intercambia en tiempo de ejecución.',
          summary:
            'Heredar implica una relación rígida "Es-un" de caja blanca donde cambios en la superclase rompen la encapsulación de las subclases (problema de la clase base frágil y herencia múltiple en diamante). Componer modela una relación "Tiene-un" de caja negra: delega comportamiento en colaboradores inyectados, permitiendo alterar estrategias dinámicamente en runtime mediante interfaces sin tocar la jerarquía de tipos.',
          keyPoints: [
            'La herencia profunda (> 2 niveles) acopla de manera irreversible la arquitectura del sistema.',
            'Delega en un colaborador antes de crear una nueva subclase especializada.',
            'Facilita el mocking y el testing unitario al poder inyectar sustitutos en cualquier momento.',
          ],
          tags: ['diseño', 'poo', 'mandatos'],
          tradeoffs: {
            whenToUse: ['Como diseño por defecto para reutilizar lógica y estructurar servicios colaborativos'],
            whenToAvoid: ['Jerarquías verdaderamente polimórficas donde existe relación taxonómica estricta y contrato LSP idéntico'],
            cost: 'Requiere escribir métodos delegados explícitos en lugar de herencia implícita.',
          },
        },
        {
          slug: 'patrones-gof',
          name: 'Patrones GoF (Gang of Four)',
          tagline: 'Taxonomía tripartita: Creacionales, Estructurales y de Comportamiento.',
          summary:
            'Catálogo clásico de 23 patrones clasificados por intención: Creacionales (Factory Method con reflexión, Abstract Factory para familias, Builder paso a paso, Singleton), Estructurales (Adapter vs Facade, Composite con dilema seguridad vs transparencia, Decorator para evitar explosión de subclases, Proxy de acceso/carga perezosa) y de Comportamiento (Strategy vs State, Command con Manager y Lista Historial para Undo/Redo reversible, Observer pub/sub, Chain of Responsibility). Cada patrón balancea flexibilidad frente a complejidad de indirección.',
          keyPoints: [
            'Factory Method con reflexión: Class.forName().getDeclaredConstructor().newInstance() evita jerarquías infinitas de creadores.',
            'Composite (UMU): trade-off entre Transparencia (operaciones en Componente) vs Seguridad (operaciones solo en Composite).',
            'Decorator vs Strategy: si el componente base no es ligero, prioriza Strategy para variar el algoritmo.',
            'Command con Undo/Redo: exige un Manager y una Lista de Historia que almacene copias o mementos del estado previo.',
            'Strategy vs State: Strategy resuelve "el cómo" con algoritmos intercambiables; State resuelve "el qué" según el estado interno.',
            'Adapter vs Facade: Adapter unifica dos interfaces incompatibles (1 a 1); Facade simplifica un subsistema complejo (1 a muchos).',
          ],
          tags: ['diseño', 'patrones', 'gof', 'umu'],
          diagram: 'gof-patterns',
          example: {
            label: 'Command con Undo/Redo en TypeScript',
            code: `interface Command {
  execute(): void;
  undo(): void;
}

class UndoRedoManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  executeCommand(cmd: Command) {
    cmd.execute();
    this.undoStack.push(cmd);
    this.redoStack = []; // Resetea historia futura
  }

  undo() {
    const cmd = this.undoStack.pop();
    if (cmd) {
      cmd.undo();
      this.redoStack.push(cmd);
    }
  }
}`,
            note: 'Cada comando concreto almacena un memento/copia de respaldo para restaurar el estado original.',
          },
          tradeoffs: {
            whenToUse: ['Para resolver desacoplamiento probado en problemas estructurales recurrentes'],
            whenToAvoid: ['Aplicar patrones anticipadamente antes de que emerja la complejidad real (Patternitis)'],
            cost: 'Aumenta el número de clases y añade niveles de indirección al flujo de ejecución.',
          },
        },
        {
          slug: 'ddd',
          name: 'DDD: Entidades, Value Objects y Ciclo de Vida',
          tagline: 'Una entidad tiene identidad; un value object tiene solo significado.',
          summary:
            'El Diseño Dirigido por el Dominio (DDD) clasifica los objetos en: Entidades (poseen identidad única persistente en el tiempo), Value Objects (inmutables, sin ID, definidos exclusivamente por sus atributos y auto-validados en el constructor), Servicios de Dominio (lógica orquestadora que no pertenece conceptualmente a una entidad) y Módulos. Para el ciclo de vida se definen Agregados (frontera transaccional con una raíz), Factorías (creación de agregados consistentes) y Repositorios (colecciones aparentes en memoria que median con la persistencia).',
          keyPoints: [
            'Value Object: inmutable (campos final o readonly) y con igualdad estructural (ej. Dinero, Email, Coordenada).',
            'Entidad: la igualdad se basa estrictamente en su identificador único (ID), sin importar que sus atributos muten.',
            'Agregado: unidad de consistencia transaccional; el acceso exterior solo ocurre a través de la Entidad Raíz (Aggregate Root).',
            'Repositorios: desacoplan el dominio del ORM o base de datos, simulando una colección en memoria.',
          ],
          tags: ['ddd', 'diseño', 'dominio', 'umu'],
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
          diagram: 'hexagonal-arch',
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
          tradeoffs: {
            whenToUse: ['Tareas pesadas en background (emails, inferencia IA, webhooks)', 'Absorber picos de tráfico (load leveling)'],
            whenToAvoid: ['Flujos que requieren respuesta síncrona inmediata al usuario'],
            cost: 'Operar un broker (RabbitMQ/Kafka/Redis), gestionar Dead Letter Queues (DLQ) y consistencia eventual.',
          },
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
          diagram: 'testing-pyramid',
          tradeoffs: {
            whenToUse: ['Unitarios para reglas de dominio complejas', 'Integración con BD real para repositorios SQL'],
            whenToAvoid: ['Mockear la base de datos en un test cuyo único propósito es probar una query SQL'],
            cost: 'Los tests E2E son 100-1000× más lentos y frágiles ante cambios de UI que los unitarios.',
          },
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
          example: {
            label: 'El problema N+1 clásico',
            code: `const users = await db.users.findMany(); // 1 query
for (const u of users) {
  await db.orders.findByUserId(u.id);    // +N queries por red!
} // Solución: JOIN / Eager Loading (include: { orders: true })`,
            note: 'Con 200 usuarios y 2 ms de RTT a la base de datos, un N+1 añade 400 ms de latencia invisible.',
          },
        },
      ],
    },
  ],
};
