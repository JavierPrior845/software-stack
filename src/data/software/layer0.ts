import type { Layer } from '../types';

export const layer0: Layer = {
  slug: 'silicio-y-so',
  number: 0,
  title: 'Silicio, Arquitectura y SO',
  subtitle: 'Cómo la electricidad se convierte en memoria, procesos y aislamiento.',
  hue: 202,
  blocks: [
    {
      slug: 'logica-digital',
      title: 'Lógica digital y circuitos',
      summary:
        'De un interruptor de silicio a una unidad que suma, compara y recuerda. Aquí nace todo lo demás.',
      concepts: [
        {
          slug: 'cmos-y-puertas-logicas',
          name: 'CMOS y puertas lógicas',
          tagline: 'Del transistor al NAND: el ladrillo con el que se construye cualquier circuito.',
          summary:
            'Un transistor MOS es un interruptor controlado por voltaje; CMOS combina NMOS y PMOS para que en reposo casi no circule corriente. Esa pareja forma las puertas lógicas, y NAND y NOR son funcionalmente completas: con un solo tipo de puerta se construye cualquier función booleana. El coste real no es el número de transistores, sino la profundidad: cada nivel añade retardo de propagación.',
          keyPoints: [
            'CMOS consume sobre todo energía dinámica al conmutar; el consumo estático es mínimo.',
            'NAND y NOR son universales: de ahí que las fábricas estandaricen su producción.',
            'Cada nivel de puertas añade retardo: la latencia de un circuito es su camino crítico, no su número de transistores.',
            'El fan-out y la capacidad de carga limitan cuántas puertas puede alimentar una salida.',
          ],
          tags: ['hardware', 'lógica'],
          widget: 'logic-gates',
          tradeoffs: {
            whenToUse: ['Diseño digital estándar: CMOS para bajo consumo estático', 'NAND/NOR cuando necesitas una puerta universal'],
            whenToAvoid: ['Familias antiguas o lógica dominó cuando importan consumo y densidad'],
            cost: 'Cada puerta añade retardo y área; el reloj debe esperar al camino crítico.',
          },
        },
        {
          slug: 'multiplexor-decodificador',
          name: 'Multiplexor y decodificador',
          tagline: 'El multiplexor es un conmutador de canales; el decodificador, un portero que abre una sola puerta.',
          summary:
            'Un MUX selecciona una de N entradas con log2(N) líneas de control; un decodificador toma un código binario y activa exactamente una de sus 2^k salidas. Son la base del direccionamiento: elegir qué registro escribe, qué banco de memoria responde o qué instrucción se ejecuta.',
          keyPoints: [
            'MUX: N entradas de datos, log2(N) bits de selección, 1 salida.',
            'Decodificador: el corazón del direccionamiento físico de memoria y del banco de registros.',
          ],
          tags: ['hardware', 'lógica'],
        },
        {
          slug: 'alu-y-flags',
          name: 'ALU y flags de estado',
          tagline: 'La calculadora de la CPU, y los cuatro semáforos que hacen posible un `if`.',
          summary:
            'La ALU recibe dos operandos y un opcode, y produce un resultado más flags: Zero, Carry, Overflow y Negative. Las instrucciones de salto condicional no evalúan expresiones: consultan esos bits. Todo `if`, `while` o comparación acaba siendo un salto que mira los flags.',
          keyPoints: [
            'Mismo sumador para restar: A - B se calcula como A + (~B + 1) en complemento a dos.',
            'Overflow (V) y Carry (C) no son lo mismo: uno es con signo, el otro sin signo.',
          ],
          tags: ['hardware', 'cpu'],
        },
        {
          slug: 'flip-flop-registros',
          name: 'Flip-Flop D y registros',
          tagline: 'Un bit que se aferra a su valor hasta que el reloj le da permiso para cambiar.',
          summary:
            'Un flip-flop tipo D captura la entrada en el flanco del reloj y la mantiene estable en su salida. Varios flip-flops en paralelo, gobernados por la misma señal, forman un registro de 32 o 64 bits: el almacenamiento más rápido que existe y la razón por la que la CPU puede tener estado.',
          keyPoints: [
            'La memoria estática es realimentación: el circuito se sostiene a sí mismo.',
            'En la industria solo se usa el tipo D; JK y T son ruido académico.',
          ],
          tags: ['hardware', 'memoria'],
        },
        {
          slug: 'reloj-y-pc',
          name: 'Reloj y Program Counter',
          tagline: 'El metrónomo y el marcador de página del programa en ejecución.',
          summary:
            'El reloj marca cuándo se actualiza el estado; el Program Counter guarda la dirección de la siguiente instrucción y se incrementa sola en cada ciclo. Un salto no es magia: es escribir otra dirección en el PC.',
          keyPoints: [
            'La frecuencia de reloj es una cota superior, no una medida de rendimiento real: importa el IPC.',
            'El PC es parte del contexto que se guarda en cada cambio de hilo.',
          ],
          tags: ['hardware', 'cpu'],
        },
      ],
    },
    {
      slug: 'representacion-de-datos',
      title: 'Representación de datos',
      summary:
        'Bits no significan nada hasta que acuerdas un formato. Los formatos explican media docena de bugs que parecen inexplicables.',
      concepts: [
        {
          slug: 'complemento-a-dos',
          name: 'Enteros y complemento a dos',
          tagline: 'La representación que permite restar con el mismo circuito que suma.',
          summary:
            'Los negativos se codifican invirtiendo los bits y sumando uno. La ventaja no es estética: la ALU reutiliza el sumador para la resta y evita un circuito dedicado. El precio es que el rango es asimétrico (-128 a 127 en 8 bits) y que el desbordamiento con signo es silencioso en la mayoría de lenguajes.',
          keyPoints: [
            'En 8 bits, 127 + 1 = -128: overflow con signo, comportamiento indefinido en C.',
            'El bit más significativo actúa como signo, pero no con la lógica de "signo y magnitud".',
          ],
          tags: ['datos', 'binario'],
          diagram: 'bit-layout',
        },
        {
          slug: 'ieee-754',
          name: 'Punto flotante IEEE 754',
          tagline: 'Por qué 0.1 + 0.2 no es 0.3, y no es un bug de tu lenguaje.',
          summary:
            'Un float es signo, exponente sesgado y mantisa: una notación científica en binario. La mayoría de decimales finitos en base 10 no tienen representación exacta en base 2, así que se redondea. De ahí los clásicos 0.30000000000000004, los NaN que no son iguales a sí mismos y el -0.',
          keyPoints: [
            'Usa enteros o decimales exactos para dinero; nunca float.',
            'NaN siempre compara falso, incluso contra sí mismo: comprueba con Number.isNaN.',
          ],
          tags: ['datos', 'numérico'],
          tradeoffs: {
            whenToUse: ['Cálculo científico y gráficos', 'Medidas físicas con error tolerado'],
            whenToAvoid: ['Dinero, contabilidad, impuestos', 'Comparaciones exactas de igualdad'],
            cost: 'Error relativo ~2⁻⁵³ en doble precisión; los desnormalizados pierden precisión gradualmente.',
          },
          diagram: 'bit-layout',
        },
        {
          slug: 'endianness',
          name: 'Endianness',
          tagline: 'Si guardas 0x12345678, alguien tiene que decidir qué byte va primero.',
          summary:
            'Big-endian guarda el byte más significativo primero; little-endian, el menos significativo. x86 y ARM son little-endian, pero los protocolos de red son big-endian (network byte order). Leer un binario o hablar con hardware sin respetarlo produce números invertidos que parecen corrupción aleatoria.',
          keyPoints: [
            'En red usa htons/htonl y sus inversos: el orden de red es big-endian.',
            'No mandes structs crudos por la red: padding y endianness cambian entre plataformas.',
          ],
          tags: ['datos', 'binario'],
          diagram: 'bit-layout',
        },
        {
          slug: 'alineamiento-memoria',
          name: 'Alineamiento y padding',
          tagline: 'La CPU lee en bloques: un dato mal colocado cuesta dos lecturas y una operación de bits.',
          summary:
            'Si un entero de 4 bytes no empieza en una dirección múltiplo de 4, la CPU necesita dos accesos y recomponer el valor. Para evitarlo, los compiladores insertan bytes de relleno en los structs. Por eso `sizeof(struct)` suele ser mayor que la suma de sus campos, y por eso el orden de los campos altera el tamaño.',
          keyPoints: [
            'Ordena los campos de mayor a menor para reducir padding (regla habitual, no garantía).',
            'En binarios serializados, define el layout byte a byte: no dependas del compilador.',
          ],
          tags: ['memoria', 'rendimiento'],
          example: {
            label: 'Layout en memoria C/C++ (64-bit)',
            code: `struct Malo  { char a; int b; char c; }; // sizeof = 12 B (6 B de padding)
struct Bueno { int b; char a; char c; }; // sizeof = 8 B  (2 B de padding)`,
            note: 'En un array de 10 millones de structs, reordenar dos campos ahorra 40 MB de RAM y mejora el uso de caché L1.',
          },
          tradeoffs: {
            whenToUse: ['Estructuras alineadas de forma natural en memoria (por defecto)'],
            whenToAvoid: ['`__attribute__((packed))` en structs de uso frecuente en CPU (penaliza lecturas)'],
            cost: 'Desperdicio por fragmentación interna (padding) si no ordenas los campos por tamaño.',
          },
        },
      ],
    },
    {
      slug: 'arquitectura-cpu',
      title: 'Arquitectura y CPU',
      summary:
        'Qué hace una CPU en cada ciclo, por qué el pipeline se atasca y cómo el hardware intenta adivinar el futuro.',
      concepts: [
        {
          slug: 'von-neumann-harvard',
          name: 'Von Neumann vs Harvard',
          tagline: 'Un solo bus para datos e instrucciones crea el cuello de botella que aún hoy condiciona el rendimiento.',
          summary:
            'En Von Neumann, instrucciones y datos comparten memoria y bus: no puedes leer una instrucción y un dato a la vez. Harvard los separa, y aunque las CPUs modernas son Von Neumann en el espacio de direcciones, internamente usan cachés L1 separadas para instrucciones y datos para recuperar el paralelismo.',
          keyPoints: [
            'El cuello de botella de Von Neumann es la raíz real de la jerarquía de cachés.',
            'Harvard separado en L1 es la norma en microarquitectura moderna.',
          ],
          tags: ['cpu', 'arquitectura'],
        },
        {
          slug: 'ciclo-de-instruccion',
          name: 'Ciclo de instrucción',
          tagline: 'Fetch, decode, execute, memory, write-back: la cadencia de cinco tiempos de toda CPU.',
          summary:
            'Cada instrucción atraviesa cinco etapas. Entender este ciclo explica por qué un acceso a memoria puede costar decenas de ciclos, por qué los accesos alineados importan y por qué compilar a mano rara vez supera a un buen compilador: el hardware lleva décadas optimizando exactamente este flujo.',
          keyPoints: [
            'Solo las instrucciones load/store tocan memoria; la aritmética vive en registros.',
            'El PC se actualiza en fetch, no al final de la instrucción.',
          ],
          tags: ['cpu', 'arquitectura'],
          diagram: 'cpu-pipeline',
        },
        {
          slug: 'pipeline-y-hazards',
          name: 'Pipeline y hazards',
          tagline: 'Una cadena de montaje: cinco instrucciones a la vez, hasta que una depende de otra.',
          summary:
            'El pipeline solapa las etapas de instrucciones consecutivas y multiplica el throughput sin subir la frecuencia. Los hazards lo rompen: estructurales (recurso ocupado), de datos (RAW) y de control (saltos). El hardware los mitiga con forwarding, burbujas y predicción; cuando falla, vacía el pipeline y pierde ciclos.',
          keyPoints: [
            'Forwarding reenvía el resultado de la ALU sin esperar al write-back.',
            'Un fallo de predicción de salto puede costar entre 10 y 20 ciclos.',
          ],
          tags: ['cpu', 'rendimiento'],
          diagram: 'cpu-pipeline',
          tradeoffs: {
            whenToUse: ['Código con bucles predecibles y datos contiguos'],
            whenToAvoid: ['Saltos impredecibles en el path crítico', 'Dependencias en cadena sin paralelismo'],
            cost: 'Cada stall es tiempo de CPU sin trabajo útil; un mal predictor puede degradar un 30% o más.',
          },
        },
        {
          slug: 'branch-prediction',
          name: 'Branch prediction',
          tagline: 'La CPU apuesta a qué rama vendrá y ejecuta la apuesta antes de saber si acierta.',
          summary:
            'Ante un salto condicional, la CPU predice el camino y ejecuta especulativamente. Si acierta, no hay coste; si falla, descarta el trabajo y recarga el pipeline. Los predictores modernos usan historial y patrones, y por eso un `if` con distribución aleatoria es mucho más caro que uno sesgado al 99%.',
          keyPoints: [
            'Ordenar las ramas por probabilidad importa en bucles calientes.',
            'La ejecución especulativa es la base conceptual del speculative decoding en LLMs.',
          ],
          tags: ['cpu', 'rendimiento'],
        },
        {
          slug: 'risc-cisc',
          name: 'RISC vs CISC',
          tagline: '¿Instrucciones complejas o un repertorio pequeño que el compilador compone?',
          summary:
            'CISC (x86) admite instrucciones de longitud variable que operan sobre memoria; RISC (ARM, RISC-V) impone load/store estricto e instrucciones de tamaño fijo. En la práctica la frontera se difumina: x86 decodifica internamente a micro-operaciones tipo RISC, y ARM domina móvil por eficiencia energética.',
          keyPoints: [
            'RISC no es "más rápido": es más regular, lo que simplifica pipeline y decodificación.',
            'La compatibilidad binaria es la razón por la que x86 sigue vivo en servidores.',
          ],
          tags: ['cpu', 'isa'],
        },
        {
          slug: 'simd-y-gpu',
          name: 'SIMD y GPU',
          tagline: 'Una instrucción, muchos datos: el patrón que hace posible entrenar un transformer.',
          summary:
            'SIMD ejecuta la misma operación sobre varios datos en una sola instrucción: AVX-512 mueve 512 bits (16 float32) por registro y NEON, 128 bits en ARM. Una GPU lleva la idea al extremo: miles de ALUs simples que ocultan latencia con warps en lugar de cachés enormes, y memoria coalescida. Gana cuando hay paralelismo de datos masivo; pierde con ramas divergentes y dependencias en cadena.',
          keyPoints: [
            'AVX-512 procesa 16 float32 por instrucción; NEON, 4.',
            'La GPU no es "una CPU más rápida": son miles de núcleos simples que ocultan latencia con paralelismo.',
            'Accesos coalescidos y ausencia de divergencia valen más que el pico teórico de FLOPS.',
          ],
          tags: ['rendimiento', 'paralelismo', 'hardware'],
          tradeoffs: {
            whenToUse: ['Bucles regulares sobre arrays', 'Matmul, convoluciones y procesamiento de imagen', 'Cargas con paralelismo de datos masivo'],
            whenToAvoid: ['Control de flujo impredecible (branch divergence)', 'Cadenas de dependencias secuenciales', 'Datos pequeños: la transferencia domina'],
            cost: 'Pasar de escalar a AVX2 da 4–8×; una GPU solo compensa si el trabajo paralelo amortiza la transferencia y el kernel launch.',
          },
        },
      ],
    },
    {
      slug: 'jerarquia-de-memoria',
      title: 'Jerarquía de memoria',
      summary:
        'No puedes tener memoria rápida, grande y barata a la vez. Todo el rendimiento moderno es una consecuencia de ese compromiso.',
      concepts: [
        {
          slug: 'localidad',
          name: 'Localidad temporal y espacial',
          tagline: 'Los programas no acceden a memoria al azar, y toda la caché existe por ese milagro estadístico.',
          summary:
            'Localidad temporal: lo que usaste hace poco se usará pronto (variables de un bucle). Localidad espacial: lo que está cerca de lo que usaste también se usará (recorrer un array). Sin estos dos patrones, ninguna caché funcionaría; explotarlos es la optimización de rendimiento más rentable que existe.',
          keyPoints: [
            'Recorrer una matriz por filas puede ser 5-10× más rápido que por columnas.',
            'Estructuras de datos contiguas ganan a punteros dispersos incluso con peor Big-O.',
          ],
          tags: ['memoria', 'rendimiento'],
          diagram: 'memory-hierarchy',
          widget: 'memory-scale',
        },
        {
          slug: 'sram-dram',
          name: 'SRAM vs DRAM',
          tagline: 'Seis transistores que recuerdan solos contra un condensador que se olvida miles de veces por segundo.',
          summary:
            'SRAM usa 6 transistores por bit y no necesita refresco: es rápida y cara, y vive dentro del chip como caché. DRAM usa 1 transistor y 1 condensador, hay que refrescarla constantemente, es más lenta pero mucho más densa y barata: es la RAM principal. La diferencia de latencia entre ambas es de dos órdenes de magnitud.',
          keyPoints: [
            'SRAM: ~1-2 ns. DRAM: ~60-100 ns. SSD: ~50-150 µs. HDD: ~5-10 ms.',
            'La DRAM es el último nivel antes del abismo del almacenamiento persistente.',
          ],
          tags: ['memoria', 'hardware'],
          diagram: 'memory-hierarchy',
          widget: 'memory-scale',
          tradeoffs: {
            whenToUse: ['SRAM para caché y registros', 'DRAM para el working set del proceso'],
            whenToAvoid: ['No puedes sustituir DRAM por SRAM: el coste por bit se multiplica'],
            cost: 'Un acceso a DRAM cuesta ~100× un acierto en L1.',
          },
        },
        {
          slug: 'cache-line',
          name: 'Línea de caché',
          tagline: 'La CPU nunca lee un byte: se lleva el bloque entero de 64 bytes, te guste o no.',
          summary:
            'La unidad de transferencia entre RAM y caché es la línea, típicamente 64 bytes. Esto premia la contigüidad y castiga el acceso disperso. También explica el false sharing: dos hilos escribiendo variables distintas que comparten línea se pelean por la coherencia de caché sin tocar el mismo dato.',
          keyPoints: [
            'Alinear estructuras calientes a 64 bytes evita false sharing.',
            'Un array de punteros carga datos inútiles; un array de structs contiguos no.',
          ],
          tags: ['memoria', 'concurrencia'],
          diagram: 'memory-hierarchy',
          tradeoffs: {
            whenToUse: ['Datos recorridos secuencialmente', 'Hot loops sobre arrays'],
            whenToAvoid: ['Listas enlazadas y grafos con nodos dispersos', 'Accesos aleatorios a tablas enormes'],
            cost: 'Un fallo de L1 cuesta ~10-20 ciclos; uno de DRAM, ~200-300.',
          },
        },
        {
          slug: 'mapeo-cache',
          name: 'Mapeo de caché',
          tagline: 'Dónde puede vivir cada bloque: una sola línea, cualquiera, o las N de un conjunto.',
          summary:
            'En mapeo directo cada bloque tiene una única línea posible: simple y propenso a conflictos. En totalmente asociativa puede ir a cualquiera: sin conflictos pero con comparadores caros. El estándar real es asociativa por conjuntos: el índice elige el conjunto y el bloque puede ocupar cualquiera de sus N vías.',
          keyPoints: [
            'La dirección se parte en Tag | Índice | Offset.',
            'Más vías = menos conflictos y más coste hardware; 8-way es habitual.',
          ],
          tags: ['memoria', 'hardware'],
        },
        {
          slug: 'cache-misses',
          name: 'Fallos de caché',
          tagline: 'Frío, capacidad o conflicto: solo dos de los tres se arreglan con más memoria.',
          summary:
            'Compulsory (primer acceso, inevitable), capacity (el working set no cabe) y conflict (varios bloques compiten por el mismo conjunto). Distinguirlos evita optimizaciones inútiles: ampliar la caché no arregla un conflicto causado por un stride desafortunado, y reordenar accesos no arregla un working set que simplemente no cabe.',
          keyPoints: [
            'Compulsory: no hay nada que hacer salvo prefetch.',
            'Capacity: reducir el working set. Conflict: cambiar el patrón de acceso o el layout.',
          ],
          tags: ['memoria', 'rendimiento'],
        },
        {
          slug: 'politicas-escritura',
          name: 'Write-through vs write-back',
          tagline: '¿Escribes en RAM siempre, o solo cuando te obligan a desalojar la línea?',
          summary:
            'Write-through escribe en caché y RAM a la vez: simple y seguro, pero cada escritura paga latencia de memoria. Write-back marca la línea como sucia y solo la vuelca al expulsarla: mucho más rápido, a costa de coherencia y de perder datos si el sistema cae antes del flush.',
          keyPoints: [
            'Write-back + dirty bit es el estándar en CPUs modernas.',
            'La coherencia entre núcleos se resuelve con protocolos como MESI.',
          ],
          tags: ['memoria', 'hardware'],
        },
      ],
    },
    {
      slug: 'memoria-virtual',
      title: 'Memoria virtual y SO',
      summary:
        'La ilusión más rentable de la informática: cada proceso cree tener toda la memoria para sí mismo.',
      concepts: [
        {
          slug: 'user-vs-kernel-space',
          name: 'User mode vs kernel mode',
          tagline: 'Dos anillos, un bit de privilegio y una frontera que sostiene toda la seguridad del sistema.',
          summary:
            'En modo usuario ciertas instrucciones están prohibidas: tocar tablas de páginas, deshabilitar interrupciones o acceder al hardware. El bit de privilegio de la CPU decide qué se puede ejecutar. Sin esa frontera, cualquier proceso podría leer la memoria de otro o gobernar el disco.',
          keyPoints: [
            'Un fallo de protección no es un bug: es el mecanismo funcionando.',
            'Cada transición a kernel tiene coste; por eso existen vDSO y syscalls batched.',
          ],
          tags: ['so', 'seguridad'],
        },
        {
          slug: 'syscalls',
          name: 'Llamadas al sistema',
          tagline: 'La única puerta legal entre tu programa y el hardware.',
          summary:
            'El programa coloca argumentos en registros y ejecuta una instrucción especial (syscall). La CPU cambia a modo kernel y salta a una tabla de manejadores. Es una puerta estrecha y cara: por eso leer un fichero en bloques pequeños es mucho más lento que en bloques grandes, y por eso existen buffers en espacio de usuario.',
          keyPoints: [
            'Cada syscall implica cambio de modo, validación y a menudo copia de datos.',
            'strace es el microscopio para ver qué está pidiendo realmente tu proceso.',
          ],
          tags: ['so', 'rendimiento'],
          diagram: 'process-memory-layout',
        },
        {
          slug: 'paginacion',
          name: 'Paginación',
          tagline: 'La memoria se divide en páginas de 4 KB para que el aislamiento sea barato y la fragmentación tolerable.',
          summary:
            'El espacio virtual se divide en páginas y la RAM física en marcos del mismo tamaño. La MMU traduce dirección virtual (VPN + offset) a física (PFN + offset) usando la tabla de páginas del proceso. El offset nunca se traduce. Esto permite aislamiento, memoria dispersa y swapping sin mover datos.',
          keyPoints: [
            '4 KB es el tamaño típico; existen huge pages de 2 MB para reducir presión en la TLB.',
            'El aislamiento entre procesos es, literalmente, que no comparten tabla de páginas.',
          ],
          tags: ['so', 'memoria'],
          diagram: 'virtual-memory',
          tradeoffs: {
            whenToUse: ['Páginas de 4 KB para propósito general', 'HugePages (2 MB) en bases de datos y motores de IA'],
            whenToAvoid: ['HugePages en procesos pequeños con asignaciones dispersas (desperdicio por fragmentación interna)'],
            cost: 'Sobrecarga de tablas de páginas y traducción por cada acceso que falle en la TLB.',
          },
        },
        {
          slug: 'tablas-de-paginas',
          name: 'Tablas de páginas multinivel',
          tagline: 'Un árbol de tablas para no reservar terabytes de traducciones que nunca usarás.',
          summary:
            'Una tabla plana para 64 bits sería inviable. Se usan jerarquías de 4 niveles (x86-64) que solo asignan las ramas realmente usadas. El coste es que una traducción puede requerir hasta 4 accesos a memoria; precisamente lo que la TLB evita en el caso común.',
          keyPoints: [
            'Menos niveles = menos accesos, pero más memoria desperdiciada.',
            'Cada proceso tiene su propio árbol; cambiar de proceso cambia la raíz (CR3).',
          ],
          tags: ['so', 'memoria'],
          diagram: 'virtual-memory',
        },
        {
          slug: 'tlb',
          name: 'TLB',
          tagline: 'La agenda rápida de la CPU para no recorrer el árbol de páginas en cada acceso.',
          summary:
            'La TLB es una caché de traducciones VPN → PFN. Sin ella, cada lectura de variable costaría varios accesos a memoria solo para saber dónde está. Un TLB miss no es un page fault: es una traducción lenta. Un cambio de proceso invalida la TLB, y ahí está la diferencia de coste entre cambiar de hilo y cambiar de proceso.',
          keyPoints: [
            'TLB hit: ~1 ciclo. TLB miss con page walk: decenas de ciclos.',
            'Huge pages reducen misses porque cubren más rango con una entrada.',
          ],
          tags: ['so', 'memoria', 'rendimiento'],
          diagram: 'virtual-memory',
          tradeoffs: {
            whenToUse: ['Procesos con working set grande y accesos dispersos (huge pages ayudan)'],
            whenToAvoid: ['No fuerces huge pages en cargas con mucha fragmentación interna'],
            cost: 'Un TLB miss puede costar 10-30 ciclos; un page fault, millones.',
          },
        },
        {
          slug: 'page-fault',
          name: 'Page fault',
          tagline: 'No es un error: es el SO tomando el control porque la página no está donde toca.',
          summary:
            'La MMU lanza una excepción cuando la página no está en RAM (swap o lazy allocation) o cuando el acceso es ilegal. En el primer caso el kernel trae la página, actualiza la tabla y reanuda la instrucción; en el segundo, mata el proceso con SIGSEGV. La diferencia entre ambos casos es solo el bit de validez y los permisos.',
          keyPoints: [
            'Minor fault: la página existe en memoria pero no está mapeada. Major fault: hay que ir a disco.',
            'SIGSEGV es un page fault de protección, no un acceso "a memoria inexistente" en abstracto.',
          ],
          tags: ['so', 'memoria'],
        },
        {
          slug: 'mmap-y-zero-copy',
          name: 'mmap y zero-copy',
          tagline: 'Mapear en vez de copiar: cómo un fichero se vuelve memoria y un LLM carga pesos sin duplicarlos.',
          summary:
            'mmap proyecta las páginas de un fichero en el espacio de direcciones del proceso: el page cache del kernel se comparte y las páginas se traen bajo demanda por page fault. Zero-copy va un paso más allá y evita la copia a espacio de usuario con sendfile o splice. Es la base de Kafka, de la carga de .safetensors con mmap y de muchas bases de datos; el precio son fallos de página, coherencia con escrituras y señales si el fichero se trunca.',
          keyPoints: [
            'mmap evita la copia, no el page fault: el primer acceso a cada página sigue costando.',
            'sendfile y splice llevan datos de página a socket sin pasar por espacio de usuario.',
            'safetensors permite mmap porque el layout es explícito; pickle obliga a deserializar y copiar.',
            'Mide en frío y en caliente: con page cache caliente, mmap y read pueden parecerse.',
          ],
          tags: ['memoria', 'so', 'rendimiento'],
          tradeoffs: {
            whenToUse: ['Ficheros grandes de solo lectura (pesos, índices, logs)', 'Serving estático y Kafka', 'Compartir páginas entre procesos'],
            whenToAvoid: ['Ficheros que se truncan mientras están mapeados (SIGBUS)', 'Escrituras pequeñas y aleatorias', 'Cuando necesitas control explícito de cuándo se lee'],
            cost: 'Un minor o major fault por página; el dirty writeback y el truncado añaden casos límite.',
          },
        },
      ],
    },
    {
      slug: 'procesos-y-hilos',
      title: 'Procesos, hilos y concurrencia',
      summary:
        'Aislar es caro, compartir es rápido y peligroso. Toda la concurrencia de sistema vive en ese eje.',
      concepts: [
        {
          slug: 'proceso-vs-hilo',
          name: 'Proceso vs hilo',
          tagline: 'El proceso es la caja fuerte; el hilo, la mano que trabaja dentro.',
          summary:
            'Un proceso tiene espacio de direcciones propio, descriptores de fichero y un PCB. Los hilos de un proceso comparten código, heap y ficheros, pero tienen registros, pila y PC propios. Compartir hace la comunicación barata y los bugs caros: un hilo puede corromper el heap de todos.',
          keyPoints: [
            'Cambiar de proceso implica cambiar tabla de páginas y vaciar parte de la TLB.',
            'La pila es privada; el heap es compartido y por eso necesita sincronización.',
          ],
          tags: ['so', 'concurrencia'],
          diagram: 'process-memory-layout',
          tradeoffs: {
            whenToUse: ['Procesos: aislamiento de fallos y seguridad (workers en Python para saltar el GIL)', 'Hilos: paralelismo con memoria compartida de baja latencia'],
            whenToAvoid: ['Hilos sin sincronización estricta sobre estado mutable', 'Miles de procesos pesados cuando basta un event loop asíncrono'],
            cost: 'Proceso: mayor huella de RAM y coste de IPC. Hilo: riesgo de data races y deadlocks.',
          },
        },
        {
          slug: 'context-switch',
          name: 'Context switch',
          tagline: 'Guardar los registros, cambiar el mundo y rezar para que la TLB no se enfríe.',
          summary:
            'El planificador guarda registros y PC del hilo saliente, carga los del entrante y, si cambia de proceso, cambia la tabla de páginas. Ese cambio de CR3 provoca invalidación de TLB y convierte un cambio de proceso en algo órdenes de magnitud más caro que un cambio de hilo.',
          keyPoints: [
            'El coste no es solo guardar registros: es la pérdida de localidad.',
            'Menos hilos que núcleos evita contención; demasiados hilos solo añaden latencia.',
          ],
          tags: ['so', 'concurrencia', 'rendimiento'],
          diagram: 'process-memory-layout',
        },
        {
          slug: 'race-conditions',
          name: 'Race conditions',
          tagline: 'El resultado depende del orden en que el planificador decida ejecutar.',
          summary:
            'Dos hilos leen y modifican memoria compartida sin coordinación: la operación deja de ser atómica aunque en el código fuente parezca una sola línea. El bug es no determinista, aparece bajo carga y desaparece al depurar. La única solución fiable es sincronizar o no compartir estado.',
          keyPoints: [
            '`x++` no es atómico: es leer, sumar y escribir.',
            'Detectores como ThreadSanitizer o el modelo de memoria de Rust atacan el problema de raíz.',
          ],
          tags: ['concurrencia', 'bugs'],
        },
        {
          slug: 'atomicas-cas',
          name: 'Instrucciones atómicas y CAS',
          tagline: 'El silicio garantiza que compare y escriba ocurran como un solo acto indivisible.',
          summary:
            'Compare-and-Swap compara una dirección con un valor esperado y, solo si coincide, escribe el nuevo. Es la primitiva sobre la que se construyen locks, contadores y estructuras lock-free. Sin soporte hardware no hay forma correcta de implementar exclusión mutua en software.',
          keyPoints: [
            'CAS puede fallar por contención: los bucles de reintento no son gratis.',
            'Las operaciones atómicas imponen barreras de memoria y afectan al reordenamiento.',
          ],
          tags: ['concurrencia', 'hardware'],
        },
        {
          slug: 'mutex-semaforo-spinlock',
          name: 'Mutex, semáforo y spinlock',
          tagline: 'Dormir al hilo ahorra CPU; girar ahorra latencia. Elegir mal cuesta caro en ambos sentidos.',
          summary:
            'Un spinlock espera activamente y solo tiene sentido para esperas de pocos ciclos. Un mutex duerme el hilo y libera la CPU, pero pagar dos cambios de contexto puede costar más que la sección crítica. Un semáforo generaliza el mutex con un contador para limitar N accesos concurrentes.',
          keyPoints: [
            'Sección crítica corta + alta contención = spinlock. Sección larga = mutex.',
            'Un semáforo no es un mutex con otro nombre: modela permisos, no propiedad.',
          ],
          tags: ['concurrencia', 'so'],
          tradeoffs: {
            whenToUse: ['Mutex para secciones críticas largas o con I/O', 'Spinlock para esperas de pocos ciclos'],
            whenToAvoid: ['Spinlock con hilos que pueden dormir', 'Mutex por cada operación trivial'],
            cost: 'Context switch: ~1-10 µs. Spin mal usado: un núcleo entero quemado.',
          },
        },
      ],
    },
  ],
};
