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
        'Requisitos, modelado de dominio, estilos arquitectónicos, APIs REST, testing y persistencia. El diseño sobrevive si el ciclo de vida lo acompaña.',
      concepts: [
        {
          slug: 'requisitos',
          name: 'Requisitos de Software, Casos de Uso e Historias de Usuario',
          tagline: 'Lo que el sistema debe hacer: elicitación, especificación formal y criterios BDD ejecutables.',
          summary:
            'La ingeniería de requisitos (Tema 2 PDS) abarca elicitación, análisis, especificación y validación. Se dividen en Requisitos Funcionales (servicios del sistema bajo caja negra) y No Funcionales (rendimiento, seguridad, disponibilidad: deben definirse con métricas y umbrales verificables). Los Casos de Uso (CdU) especifican secuencias completas de interacción de valor entre un actor principal y el sistema, organizados en un Flujo Básico (Happy Path numerado) y Flujos Alternativos/Excepciones. Se relacionan mediante Inclusión (<<include>>, obligatoria para reutilizar lógica común), Extensión (<<extend>>, opcional anclada a un Extension Point) y Generalización de actores. Se contrastan con las Historias de Usuario ágiles (Como/Quiero/Para) formalizadas mediante criterios de aceptación BDD (Given-When-Then).',
          keyPoints: [
            'Criterios de Calidad: necesario, libre de implementación, consistente, completo, no ambiguo, trazable y verificable.',
            'Casos de Uso: especificación formal duradera; Flujo Básico numerado + Flujos Alternativos (ej. 2a.1) + Pre/Postcondiciones.',
            'Relaciones CdU: <<include>> es incondicional y factoriza flujos; <<extend>> es condicional en puntos de extensión.',
            'Historias de Usuario & BDD: granularidad ágil de 1 sprint con criterios ejecutables Given-When-Then (Gherkin).',
          ],
          tags: ['requisitos', 'cdu', 'bdd', 'casos-de-uso', 'umu'],
          diagram: 'requirements-engineering',
          tradeoffs: {
            whenToUse: ['En la fase inicial de definición y refinamiento de alcance con usuarios y stakeholders'],
            whenToAvoid: ['Incorporar detalles tecnológicos (ej. tablas SQL o frameworks) dentro de la especificación funcional'],
            cost: 'Inversión de análisis previo que previene la causa número uno de proyectos fallidos: requisitos ambiguos.',
          },
        },
        {
          slug: 'modelado-software',
          name: 'Modelado de Software y Modelo de Dominio',
          tagline: 'Las clases conceptuales del mundo real: las 6 relaciones UML y el ciclo de vida en memoria.',
          summary:
            'El modelo de dominio (Tema 3 PDS) es una abstracción visual de las clases conceptuales del mundo real en el problema analizado (no son clases de software). Cada clase conceptual posee Símbolo (nombre visual), Intensión (definición y responsabilidades) y Extensión (conjunto de instancias). Regla de Oro UMU: nunca se modelan claves ajenas (FKs) ni punteros como atributos, solo asociaciones directas. Se definen las 6 relaciones canónicas: Dependencia (- - > uso temporal en método), Asociación (── enlace estructural), Agregación débil (◇── todo-parte débil; si el todo muere, la parte sobrevive), Composición fuerte (◆── todo-parte fuerte; si el todo muere, la parte se destruye con él), Generalización (──▷ herencia) y Realización (- - ▷ interfaces).',
          keyPoints: [
            'Regla de Oro: cero FKs o IDs técnicos como atributos conceptuales; las relaciones se trazan como asociaciones puras.',
            'Agregación (◇──): Concesionario-Coche / Departamento-Profesor; ciclo de vida independiente (shared_ptr o referencia externa).',
            'Composición (◆──): Coche-Motor / Pedido-LíneasPedido; ciclo de vida subordinado (por valor directo o unique_ptr).',
            'Dependencia (- - >): un objeto recibe a otro como parámetro de método sin almacenarlo como atributo.',
            'Realización (- - ▷): una clase concreta implementa y garantiza el contrato de una interfaz abstracta pura.',
          ],
          tags: ['modelado', 'uml', 'dominio', 'ciclo-de-vida', 'umu'],
          diagram: 'domain-modeling',
          tradeoffs: {
            whenToUse: ['Siempre antes de picar código para plasmar la semántica del dominio y el ciclo de vida de los datos'],
            whenToAvoid: ['Confundir el modelo de dominio con el esquema físico de tablas de la base de datos'],
            cost: 'Requiere rigor analítico para distinguir agregación de composición y evitar dependencias cíclicas.',
          },
        },
        {
          slug: 'arquitectura-software',
          name: 'Arquitectura y Diseño de Software: Estilos Arquitectónicos',
          tagline: 'Todos los estilos juntos: Capas, Hexagonal, Microkernel, Colas, Pub/Sub, Pipes, Cliente-Servidor y Microservicios.',
          summary:
            'La arquitectura de software (Tema 4 PDS) define los componentes, conectores, configuración y propiedades de calidad del sistema. Reúne todos los estilos en una matriz comparativa unificada: Capas (N-Tier jerárquico), Hexagonal (Puertos y Adaptadores con regla de dependencia hacia adentro), Microkernel (núcleo mínimo estable + plugins dinámicos), Colas de Mensajes (Point-to-Point asíncrono pull para load leveling), Pub/Sub (Push 1 a N sobre topics), Pipes & Filters (pipeline funcional unidireccional), Cliente-Servidor (request-reply centralizado) y Microservicios (descomposición en tiempo de ejecución con BD propia vs Monolito modular). Se complementa con el diseño de APIs REST, el respeto estricto a la idempotencia (GET, PUT, DELETE idempotentes; POST no idempotente) y los 4 niveles de madurez de Richardson (0 a 3 con HATEOAS).',
          keyPoints: [
            'Componentes y Conectores: cada estilo equilibra acoplamiento, latencia, coste y tolerancia a fallos.',
            'Hexagonal: dominio puro sin dependencias; Puertos de Entrada (Use Cases) y Salida (Repos); Adaptadores Driving y Driven.',
            'Microkernel: núcleo ultra estable que se extiende en runtime mediante plugins (VS Code, Eclipse, navegadores).',
            'Eventos: Colas (Pull / Point-to-Point / FIFO / RabbitMQ) vs Pub/Sub (Push / Broadcast / Kafka).',
            'Pipes & Filters: acotado por el filtro más lento; Monolito vs Microservicios: modularizar antes de distribuir.',
            'APIs REST e Idempotencia: GET, PUT y DELETE son idempotentes; POST crea nuevos registros; Nivel 3 Richardson incluye links HATEOAS.',
          ],
          tags: ['arquitectura', 'estilos', 'hexagonal', 'microservicios', 'rest', 'umu'],
          diagram: 'arch-styles',
          tradeoffs: {
            whenToUse: ['Para seleccionar y fundamentar el estilo del sistema según sus atributos de calidad (escalabilidad, mantenibilidad, latencia)'],
            whenToAvoid: ['Adoptar microservicios prematuramente por moda antes de consolidar los límites de los módulos de dominio'],
            cost: 'Cada estilo impone un trade-off: desacoplar añade latencia de red, serialización e indirección de código.',
          },
        },
        {
          slug: 'piramide-testing',
          name: 'Verificación, Pirámide y los 5 Test Doubles',
          tagline: 'Muchos tests rápidos abajo, pocos tests lentos arriba, y la taxonomía canónica de Gerard Meszaros.',
          summary:
            'La verificación comprueba si construimos el producto correctamente (foco técnico); la validación comprueba si construimos el producto correcto (requisitos del cliente). La cadena formal de defectología define: Error humano -> Defecto/Bug en el código -> Fallo observable en ejecución. Las pruebas de Caja Negra emplean partición de equivalencia y análisis de valores límite. Las pruebas de Caja Blanca miden cobertura de líneas, ramas y MC/DC (Modified Condition Decision Coverage). La taxonomía de Gerard Meszaros formaliza los 5 Dobles de Prueba: Dummy (relleno no utilizado), Stub (respuestas fijas enlatadas), Spy (stub que audita llamadas y argumentos), Mock (simulador con expectativas estrictas de comportamiento) y Fake (implementación funcional real ligera en memoria).',
          keyPoints: [
            'Pirámide de Testing: Unitarios (~70%, < 1 ms, lógica aislada), Integración (~20%, BD real), E2E (~10%, navegador/flujo completo).',
            'Dummy: objeto ficticio para rellenar firmas de métodos obligatorias; nunca se invoca.',
            'Stub: devuelve datos preconfigurados para alimentar al sistema bajo prueba (SUT).',
            'Spy: registra cuántas veces y con qué parámetros se invocó un método.',
            'Mock: verifica comportamiento y orden de llamadas; falla si la interacción difiere de lo previsto.',
            'Fake: implementación real simplificada en memoria (ej. InMemoryUserRepository) para tests ultrarrápidos y deterministas.',
            'MC/DC: estándar de cobertura que demuestra que cada condición atómica altera el resultado de una decisión booleana.',
          ],
          tags: ['testing', 'calidad', 'v&v', 'umu'],
          diagram: 'testing-pyramid',
          tradeoffs: {
            whenToUse: ['Unitarios con Fakes/Stubs para reglas de negocio; Integración con Testcontainers para repositorios SQL'],
            whenToAvoid: ['Usar Mocks para emular la base de datos en tests cuyo propósito es validar queries complejas'],
            cost: 'Tests E2E son 100-1000× más lentos y vulnerables a cambios estéticos que los unitarios.',
          },
        },
        {
          slug: 'impedance-mismatch',
          name: 'Persistencia, Ciclo de Vida JPA y SQL vs NoSQL',
          tagline: 'Los objetos son grafos; las tablas son rectángulos. Superar el desfase objeto-relacional y elegir el motor correcto.',
          summary:
            'El desfase objeto-relacional (Impedance Mismatch) radica en las diferencias de granularidad, herencia, identidad y navegabilidad entre el modelo OO y el relacional. En JPA/Hibernate, las entidades transitan por 4 estados gestionados por el EntityManager: Transient (new, no gestionado), Persistent (gestionado con Dirty Checking automático al hacer flush), Detached (sesión cerrada, cambios en memoria no persistidos) y Removed (marcado para DELETE). Se analizan las estrategias de herencia (@Inheritance: SINGLE_TABLE, JOINED, TABLE_PER_CLASS) y el peligroso problema N+1 (resuelto con JOIN FETCH). Finalmente, se contrastan las bases de datos Relacionales (SQL / ACID / escalabilidad vertical) frente a NoSQL (BASE / CAP / particionado horizontal masivo) y sus 5 familias: Documentales, Clave-Valor, Columnas Anchas, Grafos y Vectoriales.',
          keyPoints: [
            'Ciclo de Vida JPA: Transient -> persist() -> Persistent (Dirty Checking) -> detach() -> Detached -> merge() -> Persistent; y remove() -> Removed.',
            'Problema N+1: 1 consulta para $N$ entidades + $N$ consultas perezosas (lazy loading) por red. Solución: JOIN FETCH o Eager Loading.',
            'Herencia ORM: SINGLE_TABLE (rápida pero llena de nulos), JOINED (normalizada pero exige JOINs), TABLE_PER_CLASS (exige UNIONs).',
            'ACID vs BASE: consistencia inmediata transaccional en SQL frente a consistencia eventual y alta disponibilidad en NoSQL.',
            '5 Familias NoSQL: Documental (MongoDB), Clave-Valor (Redis), Columnar (Cassandra), Grafos (Neo4j) y Vectorial para IA (Qdrant).',
          ],
          tags: ['persistencia', 'orm', 'jpa', 'sql', 'nosql', 'umu'],
          diagram: 'jpa-lifecycle',
          example: {
            label: 'Dirty Checking automático vs Consulta N+1 en JPA',
            code: `// 1. Dirty Checking (Entidad Persistent muta y se guarda sola en commit):
User user = em.find(User.class, id); // Estado: Persistent
user.setEmail("nuevo@correo.com");   // No hace falta llamar a save()!
// Al hacer commit() / flush(), Hibernate emite automáticamente:
// UPDATE users SET email = 'nuevo@correo.com' WHERE id = ?;

// 2. Solución al N+1 mediante JOIN FETCH:
List<User> users = em.createQuery(
  "SELECT u FROM User u JOIN FETCH u.orders", User.class
).getResultList(); // 1 sola consulta SQL con JOIN!`,
            note: 'JOIN FETCH recupera las colecciones relacionadas en un solo viaje de red, evitando el desastre del N+1.',
          },
          tradeoffs: {
            whenToUse: ['SQL/JPA para modelos transaccionales con relaciones ricas e integridad referencial estricta; NoSQL para alta concurrencia y modelos especializados'],
            whenToAvoid: ['Usar NoSQL cuando el negocio requiere consistencia financiera inmediata multirregistro'],
            cost: 'Sobrecarga de memoria de la caché de primer nivel de JPA y complejidad de mapeo relacional.',
          },
        },
      ],
    },
  ],
};
