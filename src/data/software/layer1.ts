import type { Layer } from '../types';

export const layer1: Layer = {
  slug: 'algoritmia',
  number: 1,
  title: 'Estructuras de datos y algoritmia',
  subtitle: 'Dónde viven los datos y cuánto cuesta tocarlos. Luego, qué patrón aplicar para no reinventar la rueda.',
  hue: 218,
  blocks: [
    {
      slug: 'estructuras-de-datos',
      title: 'Estructuras de datos',
      summary:
        'El TAD define el contrato; la estructura física decide el rendimiento real. Casi siempre gana quien respeta la caché.',
      concepts: [
        {
          slug: 'tad-vs-estructura',
          name: 'TAD vs estructura física',
          tagline: 'El TAD es el menú; la estructura de datos es la cocina.',
          summary:
            'Un Tipo Abstracto de Datos define operaciones (insertar, buscar, borrar) sin decir cómo se implementan. La estructura de datos es la disposición real en memoria. Separar ambas es lo que permite cambiar de implementación sin tocar a los consumidores, y es la base de toda abstracción útil.',
          keyPoints: [
            'El contrato importa más que la implementación: es lo que puedes prometer.',
            'El mismo TAD (diccionario) admite hash, árbol o lista, con costes radicalmente distintos.',
          ],
          tags: ['fundamentos', 'diseño'],
        },
        {
          slug: 'arrays-vs-listas',
          name: 'Arrays vs listas enlazadas',
          tagline: 'El array gana casi siempre, y no por su Big-O: gana por la caché.',
          summary:
            'En arrays, el acceso es O(1) por aritmética de punteros y la memoria contigua aprovecha las líneas de caché L1 (64 bytes); insertar o borrar en medio exige desplazar memoria en bloque O(N). En listas enlazadas, insertar en cabeza o con nodo en mano es O(1), pero acceder por índice o buscar cuesta O(N), cada nodo paga 8-24 bytes de punteros y los saltos dispersos en el Heap destruyen la caché.',
          keyPoints: [
            'Acceso indexado: array O(1) matemático directo; lista O(N) por traversal secuencial.',
            'Inserción/Borrado: array O(N) por memmove salvo al final O(1) amortizado; lista O(1) con puntero local.',
            'La notación asintótica ignora las constantes; la jerarquía de caché de la CPU no.',
          ],
          tags: ['estructuras', 'rendimiento', 'lineales'],
          tradeoffs: {
            whenToUse: ['Array: acceso por índice, búsquedas binarias, tamaño predecible, máximo rendimiento', 'Lista: colas donde solo tocas cabeza/cola, buffers con inserciones locales continuas'],
            whenToAvoid: ['Lista para búsquedas frecuentes o conjuntos de datos numéricos pequeños', 'Array para inserciones masivas en cabeza'],
            cost: 'Acceso: array O(1) real (~1 ns en L1); lista O(N) con saltos en RAM (~50-100 ns por fallo).',
          },
        },
        {
          slug: 'hash-tables',
          name: 'Tablas hash',
          tagline: 'Conviertes una clave en un índice y, si tienes suerte, buscas en tiempo constante.',
          summary:
            'Una función hash proyecta claves a índices de un array. Con un buen hash y un factor de carga controlado, búsqueda, inserción y borrado son O(1) de media. Todo el rendimiento depende de dos decisiones: cómo resuelves colisiones (dispersión abierta vs cerrada) y cuándo haces rehash.',
          keyPoints: [
            'Dispersión Abierta (Encadenamiento): cubetas con listas o árboles en Heap, tolera α > 1.',
            'Dispersión Cerrada (Open Addressing): todo en el array con sondeo lineal, cuadrático o doble hash.',
            'Un hash predecible es un vector de ataque (HashDoS): usa hash aleatorizado con salting.',
          ],
          tags: ['estructuras', 'diccionarios', 'dispersión'],
          complexity: 'O(1) medio · O(N) peor caso',
          widget: 'hash-probing',
          tradeoffs: {
            whenToUse: ['Búsquedas por igualdad exacta (`clave → valor`)', 'Deduplicación rápida de conjuntos'],
            whenToAvoid: ['Consultas por rango (`entre A y B`) o recorridos ordenados (usa B-Tree / AVL)'],
            cost: 'Sobrecarga de memoria para mantener factor de carga α < 0.7 y picos de latencia durante el rehash.',
          },
        },
        {
          slug: 'tombstones',
          name: 'Tombstones y factor de carga',
          tagline: 'Borrar una celda en direccionamiento abierto puede romper la cadena de búsqueda de otros.',
          summary:
            'Si vacías una celda en dispersión cerrada, las búsquedas que colisionaron después dejan de encontrarse (falso negativo). Por eso se marca como "eliminado" (tombstone) para que la búsqueda siga avanzando. Los tombstones se acumulan y degradan la tabla: hay que rehashear periódicamente. El factor de carga α = N/M dispara colisiones por encima de ~0.7.',
          keyPoints: [
            'Tombstone: marca centinela que permite a las búsquedas continuar y a las inserciones reutilizar la celda.',
            'Rehash: O(N), reserva el doble de memoria, reubica las claves y purga todos los tombstones.',
            'En Python (dict/set) y C++ (absl::flat_hash_set) se usa direccionamiento abierto optimizado.',
          ],
          tags: ['estructuras', 'implementación', 'dispersión'],
          widget: 'hash-probing',
          tradeoffs: {
            whenToUse: ['Tablas en direccionamiento abierto (Robin Hood / SwissTable) que soportan borrados'],
            whenToAvoid: ['Si borras e insertas masivamente sin rehash periódico, los tombstones degradan todo a O(N)'],
            cost: 'Las celdas con tombstone siguen contando como ocupadas para las búsquedas hasta el siguiente rehash.',
          },
        },
        {
          slug: 'bst-avl',
          name: 'BST y AVL (4 Rotaciones)',
          tagline: 'Un árbol binario es rápido si está equilibrado; ante el desbalance, 4 rotaciones restauran el O(log N).',
          summary:
            'Un BST mantiene el orden y busca en O(log N) si está balanceado, pero insertar en orden degenera en una lista lenta O(N). El árbol AVL garantiza |altura(der) - altura(izq)| ≤ 1 en todo nodo. Al insertar, si un nodo alcanza FE = ±2, se rebalancea en O(1) con 4 rotaciones: Simples (Derecha RSD o Izquierda RSI) para ramas rectas, o Dobles (Izq-Der RDID o Der-Izq RDDI) para zig-zag.',
          keyPoints: [
            'Factor de Equilibrio: FE = altura(der) - altura(izq) ∈ {-1, 0, +1}.',
            '4 Rotaciones O(1): RSD (caso II), RSI (caso DD), RDID (caso ID), RDDI (caso DI).',
            'AVL prioriza lecturas rápidas; los árboles rojo-negro son más permisivos en escrituras.',
          ],
          tags: ['estructuras', 'árboles', 'jerárquicas'],
          diagram: 'avl-vs-bst',
          complexity: 'Búsqueda O(log N) · Rotación O(1)',
          tradeoffs: {
            whenToUse: ['Lecturas frecuentes con orden garantizado', 'Rangos y búsquedas por intervalo'],
            whenToAvoid: ['Todo el working set cabe en un hash O(1) y no necesitas orden'],
            cost: 'Cada rotación es barata O(1), pero rebalancear en cada escritura cuesta en cargas write-heavy.',
          },
        },
        {
          slug: 'trie',
          name: 'Trie (Árbol de Prefijos)',
          tagline: 'La búsqueda deja de depender de cuántas palabras tienes y pasa a depender de cuánto miden.',
          summary:
            'Un trie comparte nodos por prefijo: la búsqueda cuesta O(L), la longitud de la clave, independientemente de N. Es la estructura de autocompletado, correctores y routers de prefijos IP. A cambio, consume mucha memoria por puntero; las variantes comprimidas (radix tree) lo mitigan.',
          keyPoints: [
            'O(L) con L = longitud de la clave, no O(N).',
            'Útil para prefijos, no para claves arbitrarias o muy largas.',
            'Palabras con prefijo compartido ("mar", "marea", "marino") reutilizan los mismos nodos.',
          ],
          tags: ['estructuras', 'strings', 'árboles'],
          diagram: 'trie-horizontal',
          complexity: 'O(L) búsqueda e inserción',
          tradeoffs: {
            whenToUse: ['Autocompletado por prefijo, enrutamiento CIDR IP y diccionarios léxicos'],
            whenToAvoid: ['Claves largas sin prefijos comunes (alto consumo de RAM por punteros vacíos)'],
            cost: 'Un Trie ingenuo gasta un array de punteros por nodo; en producción se usa Radix Tree / Patricia Trie.',
          },
        },
        {
          slug: 'union-find',
          name: 'Conjuntos y Union-Find (DSU)',
          tagline: 'El TAD Conjunto modela elementos únicos; Union-Find particiona y conecta componentes en O(1).',
          summary:
            'El TAD Conjunto almacena elementos únicos sin orden (HashSet O(1) o TreeSet O(log N)). Para particiones disjuntas, Union-Find (DSU) responde en tiempo casi constante si dos elementos pertenecen al mismo conjunto mediante un array de padres, unión por rango y compresión de caminos O(α(N)). Es el motor de Kruskal y la detección de ciclos.',
          keyPoints: [
            'TAD Conjunto: colecciones sin duplicados con operaciones de pertenencia e intersección.',
            'Union-Find: array plano con find(x) y union(x,y) para conjuntos disjuntos.',
            'Compresión de caminos + rango: coste amortizado O(α(N)) con α(N) < 5 para todo N real.',
            'Pilar de Kruskal (árbol de expansión mínimo) y conectividad dinámica en redes.',
          ],
          tags: ['estructuras', 'conjuntos', 'grafos'],
          complexity: 'O(α(N)) amortizado',
          example: {
            label: 'Compresión de caminos en 3 líneas',
            code: `int find(int x) {
  return parent[x] == x ? x : (parent[x] = find(parent[x]));
}`,
            note: 'Al subir buscando la raíz, aplana el árbol dejando todos los nodos visitados enganchados directamente a la raíz.',
          },
        },
        {
          slug: 'representacion-grafos',
          name: 'Grafos: propiedades y modelos de memoria',
          tagline: 'Propiedades topológicas (dirigido, ponderado, cíclico) y modelos de memoria (matriz vs listas).',
          summary:
            'Un grafo modela relaciones complejas entre vértices y aristas. Sus propiedades definen la solución: dirigido vs no dirigido, ponderado vs sin pesos, cíclico vs DAG (acíclico), denso vs disperso. En memoria, la matriz de adyacencia O(V²) consulta aristas en O(1) pero penaliza espacio; las listas de adyacencia O(V+E) iteran vecinos en O(grado) y son el estándar para grafos reales.',
          keyPoints: [
            'Propiedades clave: Dígrafo (orientado), Ponderado (pesos), Conexo/SCC y DAG (acíclico).',
            'Matriz de Adyacencia: array contiguo 2D [V][V], ideal para grafos densos E ≈ V².',
            'Listas de Adyacencia: array de punteros a cabeceras de lista, óptimo para grafos dispersos E ≪ V².',
          ],
          tags: ['grafos', 'estructuras', 'relacionales'],
          diagram: 'graph-representation',
          tradeoffs: {
            whenToUse: ['Listas de adyacencia: redes reales, rutas, dependencias (E ≪ V²)', 'Matriz: grafos pequeños y densos o álgebra matricial en GPU'],
            whenToAvoid: ['Matriz de adyacencia con V > 50.000 (10 GB de RAM solo en ceros)'],
            cost: 'Matriz: O(V²) espacio fijo. Listas: O(V + E) espacio, comprobar arista (u,v) cuesta O(grado(u)).',
          },
        },
        {
          slug: 'dfs-bfs-toposort',
          name: 'DFS, BFS y ordenación topológica',
          tagline: 'Explorar hasta el fondo con una pila, por olas con una cola, o linealizar dependencias en un DAG.',
          summary:
            'DFS (profundidad) usa una pila o recursión y sirve para detectar ciclos, componentes fuertemente conexas y puntos de articulación. BFS (anchura) usa una cola FIFO y garantiza el camino más corto en grafos sin pesos. En un Grafo Acíclico Dirigido (DAG), la ordenación topológica pone cada nodo antes que sus dependientes. Estos recorridos se conectan con Dijkstra, Prim y Kruskal.',
          keyPoints: [
            'Si la ordenación topológica no puede visitar todos los nodos, existe un ciclo de dependencias (deadlock).',
            'BFS en grafos ponderados se convierte en Dijkstra al cambiar la cola FIFO por un Min-Heap.',
            'Prim (con Min-Heap) y Kruskal (con Union-Find) resuelven el Árbol de Expansión Mínimo (MST).',
          ],
          tags: ['grafos', 'algoritmos'],
          complexity: 'O(V + E) en listas de adyacencia',
          widget: 'graph-traversal',
          tradeoffs: {
            whenToUse: ['BFS: distancia mínima en saltos', 'DFS: ciclos y topología', 'TopoSort: pipelines, builds y orquestadores'],
            whenToAvoid: ['BFS en árboles con factor de ramificación masivo si solo buscas una hoja cualquiera (consume mucha RAM)'],
            cost: 'O(V + E) tiempo y O(V) memoria auxiliar para el conjunto de visitados y la pila/cola.',
          },
        },
      ],
    },
    {
      slug: 'algoritmos-complejidad',
      title: 'Algoritmos y complejidad',
      summary:
        'El problema no es escribir código: es reconocer qué forma tiene y qué estrategia no te va a hacer perder semanas.',
      concepts: [
        {
          slug: 'notacion-asintotica',
          name: 'Notación asintótica (O, Ω, Θ, o, ω)',
          tagline: 'La familia completa: cotas holgadas (O, Ω), ajustadas (Θ) y estrictas por límites (o, ω).',
          summary:
            'Clasifica el crecimiento del coste algorítmico cuando n → ∞. O es cota superior (f ≤ g), Ω inferior (f ≥ g) y Θ ajustada (f = g). Little-o (o) denota una cota superior estrictamente menor (f < g), definida formalmente por lim(f/g) = 0: 3n² es O(n²) pero NO es o(n²); en cambio sí es o(n³). Su contraparte Little-ω denota cota inferior estricta (lim = ∞). Sirven para evaluar crecimientos matemáticos independientes del hardware.',
          keyPoints: [
            'Big-O (O) y Big-Ω (Ω): cotas asintóticas débiles (admiten igualdad de ritmo de crecimiento).',
            'Big-Θ (Theta): orden exacto f(n) = Θ(g(n)) ↔ lim(f/g) = k ∈ (0, ∞).',
            'Little-o (o): cota superior estricta lim(f/g) = 0. Ejemplo: 3n² + 5n ∈ o(n³), pero ∉ o(n²).',
            'Little-ω (omega): cota inferior estricta lim(f/g) = ∞. Ejemplo: 3n² + 5n ∈ ω(n), pero ∉ ω(n²).',
            'Propiedad traspuesta: f(n) ∈ o(g(n)) ⟺ g(n) ∈ ω(f(n)).',
          ],
          tags: ['complejidad', 'fundamentos', 'matemáticas'],
          diagram: 'asymptotic-bounds',
          widget: 'big-o-playground',
          example: {
            label: 'Criterio de Límites para Cotas Asintóticas',
            code: `// Evaluar f(n) = 3n² + 5n + 10 frente a g(n) = n² y g(n) = n³
// 1. Frente a n²:
//    lim (3n² + 5n + 10) / n² = 3 (constante finita > 0)
//    --> f(n) ∈ Θ(n²), f(n) ∈ O(n²), f(n) ∈ Ω(n²)
//    --> f(n) ∉ o(n²) y f(n) ∉ ω(n²) (NO son estrictas)

// 2. Frente a n³:
//    lim (3n² + 5n + 10) / n³ = 0
//    --> f(n) ∈ o(n³) [estrictamente menor] y f(n) ∈ O(n³)

// 3. Frente a n:
//    lim (3n² + 5n + 10) / n = ∞
//    --> f(n) ∈ ω(n) [estrictamente mayor] y f(n) ∈ Ω(n)`,
            note: 'El límite infinitesimal elimina la necesidad de buscar a mano constantes c y umbrales n₀.',
          },
        },
        {
          slug: 'teorema-maestro',
          name: 'Teorema maestro y recurrencias',
          tagline: 'Resolver T(n) = aT(n/b) + f(n): división logarítmica (n/b) vs explosión exponencial por sustracción (n-c).',
          summary:
            'Las recurrencias modelan algoritmos recursivos. Dividir el problema (n/b) produce árboles de profundidad logarítmica O(log n); restar (n-c) genera árboles de profundidad lineal O(n) con explosión exponencial O(2ⁿ) de hojas (el riesgo de intentar resolver la Mochila 0/1 con recursión pura). El Teorema Maestro resuelve T(n) = aT(n/b) + f(n) comparando las hojas n^log_b(a) contra la combinación f(n). Strassen usa 7 multiplicaciones en n/2 logrando O(n^2.807) frente al clásico O(n³).',
          keyPoints: [
            'División (n/d) genera altura logarítmica; sustracción (n-c) genera altura lineal y 2ⁿ hojas.',
            'Caso 1 (Hojas dominan): f(n) < n^log_b(a) → Θ(n^log_b(a)).',
            'Caso 2 (Equilibrio): f(n) = Θ(n^log_b(a)) → Θ(n^log_b(a) · log n) (MergeSort: 2T(n/2) + O(n)).',
            'Caso 3 (Raíz domina): f(n) > n^log_b(a) y regularidad → Θ(f(n)).',
            'Strassen: a=7, b=2, f(n)=O(n²) → O(n^log₂ 7) ≈ O(n^2.807).',
          ],
          tags: ['complejidad', 'matemáticas', 'recurrencias'],
          diagram: 'recurrence-tree',
          complexity: 'T(n) = aT(n/b) + f(n)',
        },
        {
          slug: 'divide-y-venceras',
          name: 'Divide y vencerás',
          tagline: 'Descomponer en subproblemas disjuntos, resolver recursivamente y combinar las soluciones.',
          summary:
            'Exige subproblemas estrictamente disjuntos del mismo tipo. Si los subproblemas se solapan (como en la Mochila 0/1 o Fibonacci), divide y vencerás recalcula estados idénticos miles de veces y colapsa en O(2ⁿ). MergeSort garantiza O(N log N) con O(N) de memoria auxiliar; QuickSort particiona in-place sin coste de combinación y es el más rápido en CPU real gracias a su excelente localidad de caché.',
          keyPoints: [
            'Esquema canónico: Dividir en punto de corte m, resolver mitades disjuntas y Combinar.',
            'Si los subproblemas se solapan, Divide y Vencerás puro fracasa: requiere Programación Dinámica.',
            'QuickSort in-place supera a MergeSort en la práctica al no pagar asignaciones dinámicas en Heap.',
          ],
          tags: ['algoritmos', 'ordenación', 'divide-y-venceras'],
          complexity: 'O(N log N) típico',
          widget: 'sorting-visualizer',
          example: {
            label: 'Esquema Canónico DyV: MergeSort y QuickSort en C++',
            code: `// 1. MergeSort: Dividir trivial O(1), Combinar no trivial O(N)
void mergeSort(std::vector<int>& A, int p, int q) {
  if (p >= q) return; // Caso base Pequeño(p, q)
  int m = p + (q - p) / 2;
  mergeSort(A, p, m);     // Vencer subproblema izquierdo
  mergeSort(A, m + 1, q); // Vencer subproblema derecho
  merge(A, p, m, q);      // Combinar con 2 punteros y buffer auxiliar O(N)
}

// 2. QuickSort: Dividir/Partición no trivial O(N), Combinar gratis O(1)
void quickSort(std::vector<int>& A, int p, int q) {
  if (p >= q) return;
  int s = particionLomuto(A, p, q); // Coloca pivote en A[s] in-place
  quickSort(A, p, s - 1);           // Subproblema izquierdo in-place
  quickSort(A, s + 1, q);           // Subproblema derecho in-place
  // Combinar = O(1) (¡gratis! no requiere trabajo)`,
            note: 'MergeSort garantiza estabilidad y O(N log N) pagando O(N) memoria; QuickSort es in-place y gana en CPU por localidad de caché.',
          },
          tradeoffs: {
            whenToUse: ['Subproblemas independientes sin solapamiento', 'Paralelización natural en múltiples núcleos o máquinas'],
            whenToAvoid: ['Cuando los subproblemas se repiten una y otra vez (usa Programación Dinámica)'],
            cost: 'Profundidad de pila O(log N) y, en algoritmos como MergeSort, O(N) de memoria auxiliar.',
          },
        },
        {
          slug: 'algoritmos-voraces',
          name: 'Algoritmos voraces (Greedy)',
          tagline: 'Miopía estratégica: decisiones locales irrevocables. Óptimo en mochila fraccionaria, trampa en 0/1.',
          summary:
            'Greedy construye la solución paso a paso seleccionando en cada etapa el candidato localmente más prometedor sin volver atrás (sin backtracking). En la Mochila Fraccionaria, ordenar por densidad de valor b_i / p_i garantiza el óptimo global en O(n log n). En la Mochila 0/1, la indivisibilidad rompe la propiedad de Matroide: un objeto pequeño con ratio alto agota el espacio e impide meter un objeto grande con valor 95 veces superior.',
          keyPoints: [
            'Criterio de proporción b_i / p_i: óptimo probado en mochila fraccionaria por argumento de sustitución.',
            'Fallo Matroide en 0/1: contraejemplo UMU M=100 con (1kg, 2€) y (100kg, 190€) da 2€ frente a 190€ óptimos.',
            'Fallo en cambio de monedas: objetivo 8 con monedas {7, 3, 2} se bloquea con 7; óptimo es 3+3+2 (3 monedas).',
            'Dijkstra, Prim y Kruskal son voraces canónicos que sí convergen a la solución global óptima.',
          ],
          tags: ['algoritmos', 'optimización', 'greedy'],
          complexity: 'O(n log n) por ordenación inicial',
          widget: 'knapsack-solver',
          example: {
            label: 'Criterio Voraz de Densidad (Mochila Fraccionaria)',
            code: `// Ordenar objetos por densidad b_i / p_i descendente
std::sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
  return (double)a.b / a.p > (double)b.b / b.p;
});
double profit = 0, remCap = M;
for (const auto& it : items) {
  if (remCap <= 0) break;
  if (it.p <= remCap) { // Toma 100%
    profit += it.b; remCap -= it.p;
  } else { // Toma fracción residual x_i in (0, 1)
    profit += it.b * (remCap / it.p); remCap = 0;
  }
}`,
            note: 'En la variante fraccionaria garantiza el óptimo global; en 0/1 es solo una cota superior relajada.',
          },
          tradeoffs: {
            whenToUse: ['Mochila fraccionaria, Árboles de Expansión Mínimo (Kruskal, Prim) y caminos mínimos positivos (Dijkstra)'],
            whenToAvoid: ['Problemas combinatorios con variables discretas indivisibles donde falta la propiedad de matroide'],
            cost: 'O(n log n) tiempo por ordenar y O(n) memoria para los candidatos.',
          },
        },
        {
          slug: 'programacion-dinamica',
          name: 'Programación dinámica (DP)',
          tagline: 'Principio de optimalidad de Bellman: memorizar en matriz bottom-up para domar la explosión combinatoria.',
          summary:
            'DP resuelve problemas con subestructura óptima y solapamiento masivo de subproblemas. Para la Mochila 0/1, define la matriz V[i, j] como el beneficio máximo con los primeros i objetos y capacidad j: V[i, j] = max(V[i-1, j], b_i + V[i-1, j-p_i]). Es pseudo-polinomial: su coste O(n · M) depende del valor numérico de M, no de sus bits log₂(M). Si M fuera 10⁹, la matriz colapsaría la memoria RAM.',
          keyPoints: [
            'Principio de Bellman: la solución óptima global se compone de decisiones óptimas en sus etapas.',
            'Ecuación canónica: V[i, j] = si p_i > j: V[i-1, j] | si p_i ≤ j: max(V[i-1, j], b_i + V[i-1, j-p_i]).',
            'Algoritmo de recomposición: retrocede desde V[n, M] para reconstruir el vector binario X de objetos incluidos.',
            'Complejidad pseudo-polinomial O(n · M): factible para M moderada; inviable si M es astronómica.',
          ],
          tags: ['algoritmos', 'optimización', 'dp'],
          complexity: 'O(n · M) tiempo y memoria (optimizable a O(M) espacio)',
          widget: 'knapsack-solver',
          example: {
            label: 'Ecuación de Bellman Bottom-Up en C++',
            code: `// V[i][j]: beneficio óptimo con primeros i objetos y capacidad j
std::vector<std::vector<int>> V(n + 1, std::vector<int>(M + 1, 0));
for (int i = 1; i <= n; ++i) {
  for (int j = 1; j <= M; ++j) {
    if (p[i - 1] > j) {
      V[i][j] = V[i - 1][j]; // Objeto no cabe: hereda
    } else {
      V[i][j] = std::max(V[i - 1][j], b[i - 1] + V[i - 1][j - p[i - 1]]);
    }
  }
}
// Valor óptimo en V[n][M]`,
            note: 'Permite recomponer la solución óptima comparando V[i][j] con V[i-1][j] en O(n).',
          },
          tradeoffs: {
            whenToUse: ['Mochila 0/1 con M moderada, caminos Floyd-Warshall, alineamiento de secuencias (Levenshtein)'],
            whenToAvoid: ['Capacidades M gigantescas (M > 10⁸) donde la tabla no cabe físicamente en RAM (usa Backtracking con cota)'],
            cost: 'O(n · M) tiempo y espacio en tabla completa; optimizable a O(M) de memoria si no se requiere el camino.',
          },
        },
        {
          slug: 'backtracking-branch-bound',
          name: 'Backtracking y Branch & Bound',
          tagline: 'Árbol de decisiones binario: poda por factibilidad y cota superior optimista (bestimado ≤ VOA).',
          summary:
            'Explora sistemáticamente el espacio de estados. En la Mochila 0/1, cada nivel bifurca en x_i = 1 y x_i = 0. Se implementa con 5 funciones canónicas: Generar, Criterio (peso ≤ M), Solución (hoja), MasHermanos y Retroceder. El poder reside en la poda por cota superior: en cada nodo se calcula bestimado relajando la capacidad restante con la Mochila Voraz Fraccionaria; si bestimado ≤ VOA (valor óptimo actual), se poda el subárbol completo.',
          keyPoints: [
            'Las 5 funciones de UMU: Generar(), Criterio(), Solución(), MasHermanos(), Retroceder().',
            'Poda por Cota Superior: bestimado = beneficio_actual + voraz_fraccionaria(capacidad_restante).',
            'Condición de corte: si bestimado ≤ VOA, imposibilidad matemática de superar el récord → Poda total.',
            'Aceleración: ordenar previamente por ratio b_i / p_i e ir primero a x_i = 1 para inflar VOA rápido.',
            'Branch & Bound: en vez de DFS, usa Best-First Search con cola de prioridad según la cota optimista.',
          ],
          tags: ['algoritmos', 'búsqueda', 'backtracking'],
          complexity: 'O(2ⁿ) peor caso · podas masivas en práctica',
          widget: 'knapsack-solver',
          example: {
            label: 'Poda por Cota Superior (Bound) en Backtracking',
            code: `void mochilaBT(int i, int peso, int ben) {
  if (peso > M) return; // 1. Poda por criterio (inviable)
  if (i == n) { // 2. Hoja alcanzada: actualiza récord
    if (ben > voa) voa = ben;
    return;
  }
  // 3. Poda por cota superior: relajación voraz fraccionaria
  double bestimado = ben + cotaVorazFraccionaria(i + 1, M - peso);
  if (bestimado <= voa) return; // ¡PODA DEL SUBÁRBOL COMPLETO!

  mochilaBT(i + 1, peso + p[i], ben + b[i]); // Rama 1: incluir
  mochilaBT(i + 1, peso, ben);              // Rama 0: no incluir
}`,
            note: 'Ordenar previamente por b_i / p_i eleva el VOA en los primeros pasos y maximiza las podas.',
          },
          tradeoffs: {
            whenToUse: ['Mochila 0/1 cuando n ≤ 40 pero M es gigantesca (protege la memoria RAM)', 'Problemas NP exactos como SAT, N-Reinas y TSP'],
            whenToAvoid: ['Problemas polinomiales o cuando n > 60 sin podas muy estrictas (explosión combinatoria 2⁶⁰)'],
            cost: 'Espacio mínimo O(n) en la pila de llamadas; tiempo exponencial mitigado por podas agresivas.',
          },
        },
        {
          slug: 'p-vs-np',
          name: 'P, NP, NP-Completo y Pseudo-Polinomial',
          tagline: 'Por qué la Mochila 0/1 es NP-Completa y O(n·M) no demuestra P = NP: la trampa de los bits.',
          summary:
            'P agrupa problemas resolubles en tiempo polinomial O(Nᵏ) respecto al tamaño en bits de la entrada. NP agrupa problemas cuya solución puede ser verificada en tiempo polinomial. La Mochila 0/1 es NP-Completa (decisión) y NP-Hard (optimización). Su algoritmo de DP en O(n · M) no prueba P = NP porque M se codifica en log₂(M) bits: respecto a la longitud real de entrada L, el tiempo es O(n · 2ᴸ) (exponencial). Es un algoritmo pseudo-polinomial.',
          keyPoints: [
            'Clase P: resoluble en tiempo polinómico de la entrada en bits (Mochila fraccionaria: O(n log n)).',
            'Clase NP: verificable en tiempo polinómico con un certificado (un vector binario X).',
            'NP-Completo: los problemas más duros de NP (Mochila 0/1, TSP, SAT, Coloración de grafos).',
            'Pseudo-polinomial: O(n · M) es polinomial en el valor de M, pero exponencial en su número de bits.',
            'Impacto en ingeniería: ante problemas NP, no busques el algoritmo exacto mágico; usa DP con memoria acotada, Branch & Bound o metaheurísticas (GRASP, Genéticos).',
          ],
          tags: ['complejidad', 'teoría', 'np-completo'],
          widget: 'big-o-playground',
        },
      ],
    },
  ],
};
