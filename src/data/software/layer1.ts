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
      title: 'Estructuras de datos (AED1)',
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
            'El array da acceso O(1) por aritmética de punteros y máxima localidad espacial; insertar en medio cuesta O(N). La lista enlazada inserta en O(1) con el puntero en mano, pero buscar cuesta O(N), cada nodo paga 8-16 bytes de punteros y los saltos destruyen la caché. En la práctica, un array de 10.000 elementos suele barrer a una lista de 10.000.',
          keyPoints: [
            'La notación asintótica ignora las constantes; la caché no.',
            'La lista enlazada solo brilla con inserciones/borrados masivos y nodos ya localizados.',
          ],
          tags: ['estructuras', 'rendimiento'],
          tradeoffs: {
            whenToUse: ['Array: recorridos, índices, tamaño estable', 'Lista: colas, inserciones con nodo conocido'],
            whenToAvoid: ['Lista para búsquedas frecuentes o datos pequeños', 'Array para inserciones en cabeza masivas'],
            cost: 'Acceso: array O(1) real; lista O(N) con penalización de caché.',
          },
        },
        {
          slug: 'hash-tables',
          name: 'Tablas hash',
          tagline: 'Conviertes una clave en un índice y, si tienes suerte, buscas en tiempo constante.',
          summary:
            'Una función hash proyecta claves a índices de un array. Con un buen hash y un factor de carga controlado, búsqueda, inserción y borrado son O(1) de media. Todo el rendimiento depende de dos decisiones: cómo resuelves colisiones y cuándo haces rehash.',
          keyPoints: [
            'Encadenamiento: cubetas con listas, simple y tolerante. Direccionamiento abierto: todo dentro del array, mejor localidad.',
            'Un hash predecible es un vector de ataque (HashDoS): usa hash aleatorizado.',
          ],
          tags: ['estructuras', 'diccionarios'],
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
            'Si vacías una celda, las búsquedas que colisionaron después dejan de encontrarse. Por eso se marca como "eliminado" (tombstone) para que la búsqueda siga avanzando. Los tombstones se acumulan y degradan la tabla: hay que rehashear periódicamente. El factor de carga α = N/M dispara colisiones por encima de ~0.7.',
          keyPoints: [
            'Rehash: O(N), reserva el doble y reubica todo limpiando las marcas de borrado.',
            'En Python, dict y set usan direccionamiento abierto con sondeo.',
          ],
          tags: ['estructuras', 'implementación'],
          widget: 'hash-probing',
          tradeoffs: {
            whenToUse: ['Tablas en direccionamiento abierto (Robin Hood / SwissTable) que soportan borrados'],
            whenToAvoid: ['Si borras e insertas masivamente sin rehash periódico, los tombstones degradan todo a O(N)'],
            cost: 'Las celdas con tombstone siguen contando como ocupadas para las búsquedas hasta el siguiente rehash.',
          },
        },
        {
          slug: 'bst-avl',
          name: 'BST y AVL',
          tagline: 'Un árbol binario es rápido si está equilibrado; insertado en orden, se convierte en una lista lenta.',
          summary:
            'Un BST mantiene el orden y busca en O(log N) si está balanceado. Insertar 1, 2, 3, 4, 5 en orden lo degenera en una lista con O(N). Los AVL garantizan que la diferencia de altura entre subárboles nunca supera 1, restaurando el equilibrio con rotaciones simples o dobles en O(1). El precio: escrituras más lentas.',
          keyPoints: [
            'AVL prioriza búsqueda; los árboles rojo-negro priorizan escritura.',
            'En bases de datos relacionales el equivalente son los B-Tree, optimizados para páginas de disco.',
          ],
          tags: ['estructuras', 'árboles'],
          diagram: 'avl-vs-bst',
          complexity: 'Búsqueda O(log N) · Rotación O(1)',
          tradeoffs: {
            whenToUse: ['Lecturas frecuentes con orden garantizado', 'Rangos y búsquedas por intervalo'],
            whenToAvoid: ['Todo el working set cabe en un hash O(1) y no necesitas orden'],
            cost: 'Cada rotación es barata, pero rebalancear en cada escritura cuesta en cargas write-heavy.',
          },
        },
        {
          slug: 'trie',
          name: 'Trie',
          tagline: 'La búsqueda deja de depender de cuántas palabras tienes y pasa a depender de cuánto miden.',
          summary:
            'Un trie comparte nodos por prefijo: la búsqueda cuesta O(L), la longitud de la clave, independientemente de N. Es la estructura de autocompletado, correctores y routers de prefijos IP. A cambio, consume mucha memoria por puntero; las variantes comprimidas (radix tree) lo mitigan.',
          keyPoints: [
            'O(L) con L = longitud de la clave, no O(N).',
            'Útil para prefijos, no para claves arbitrarias o muy largas.',
          ],
          tags: ['estructuras', 'strings'],
          complexity: 'O(L) búsqueda e inserción',
          tradeoffs: {
            whenToUse: ['Autocompletado por prefijo, enrutamiento CIDR IP y diccionarios léxicos'],
            whenToAvoid: ['Claves largas sin prefijos comunes (alto consumo de RAM por punteros vacíos)'],
            cost: 'Un Trie ingenuo gasta un array de punteros por nodo; en producción se usa Radix Tree / Patricia Trie.',
          },
        },
        {
          slug: 'union-find',
          name: 'Union-Find (DSU)',
          tagline: '¿Están estos dos elementos conectados? Con dos optimizaciones, la respuesta es casi instantánea.',
          summary:
            'Modela componentes conexas con punteros al padre. Unión por rango evita árboles altos y la compresión de caminos reorienta los nodos visitados directamente a la raíz. Juntas dan un coste amortizado O(α(N)), prácticamente constante. Es la pieza que hace viable Kruskal en O(E log E).',
          keyPoints: [
            'Sin compresión de caminos, el árbol degenera y el coste sube.',
            'α(N) < 5 para cualquier N representable: se puede tratar como O(1).',
          ],
          tags: ['estructuras', 'grafos'],
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
          name: 'Representación de grafos',
          tagline: 'Matriz para grafos densos, listas de adyacencia para grafos reales.',
          summary:
            'La matriz de adyacencia ocupa O(V²) pero comprueba aristas en O(1). Las listas de adyacencia ocupan O(V+E) e iteran vecinos en O(grado). Casi todos los grafos del mundo real son dispersos, así que las listas ganan por defecto; la matriz solo brilla en densidad alta o cuando necesitas operaciones matriciales.',
          keyPoints: [
            'Denso: E ≈ V². Disperso: E ≪ V².',
            'Para pesos, la lista guarda pares (vecino, peso).',
          ],
          tags: ['grafos', 'estructuras'],
          tradeoffs: {
            whenToUse: ['Listas de adyacencia: redes reales, rutas, dependencias (E ≪ V²)', 'Matriz: grafos pequeños y densos o álgebra en GPU'],
            whenToAvoid: ['Matriz de adyacencia con V > 50.000 (10 GB de RAM solo en ceros)'],
            cost: 'Matriz: O(V²) espacio fijo. Listas: O(V + E) espacio, comprobar arista (u,v) cuesta O(grado(u)).',
          },
        },
        {
          slug: 'dfs-bfs-toposort',
          name: 'DFS, BFS y ordenación topológica',
          tagline: 'Explorar hasta el fondo con una pila, por olas con una cola, o linealizar dependencias en un DAG.',
          summary:
            'DFS (profundidad) usa una pila o recursión y sirve para detectar ciclos, componentes fuertemente conexas y puntos de articulación. BFS (anchura) usa una cola FIFO y garantiza el camino más corto en grafos sin pesos. En un Grafo Acíclico Dirigido (DAG), la ordenación topológica pone cada nodo antes que sus dependientes: es el motor exacto de cualquier compilador, gestor de paquetes o grafo de agentes.',
          keyPoints: [
            'Si la ordenación topológica no puede visitar todos los nodos, existe un ciclo de dependencias (deadlock).',
            'BFS en grafos ponderados se convierte en Dijkstra al cambiar la cola FIFO por un Min-Heap.',
          ],
          tags: ['grafos', 'algoritmos'],
          complexity: 'O(V + E) en listas de adyacencia',
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
      title: 'Algoritmos y complejidad (AED2)',
      summary:
        'El problema no es escribir código: es reconocer qué forma tiene y qué estrategia no te va a hacer perder semanas.',
      concepts: [
        {
          slug: 'notacion-asintotica',
          name: 'Notación asintótica',
          tagline: 'Big-O describe cómo empeora el coste cuando el problema crece, no cuánto tarda hoy.',
          summary:
            'O es cota superior, Ω cota inferior y Θ cota ajustada. Sirven para comparar crecimientos, no tiempos absolutos: un O(N²) con constante minúscula puede ganar a un O(N log N) para N pequeño. La notación ignora caché, constantes y distribución de datos, y por eso nunca sustituye a medir.',
          keyPoints: [
            'Mide con datos representativos: N pequeño invierte conclusiones.',
            'O(N) con saltos de memoria puede perder contra O(N log N) contiguo.',
          ],
          tags: ['complejidad', 'fundamentos'],
          widget: 'big-o-playground',
        },
        {
          slug: 'teorema-maestro',
          name: 'Teorema maestro',
          tagline: 'La receta para resolver T(n) = aT(n/b) + f(n) sin desplegar el árbol a mano.',
          summary:
            'Para recurrencias de divide y vencerás, compara el coste de los subproblemas con el de combinarlos. Si domina la división, gana el término n^log_b(a); si domina la combinación, gana f(n); si están equilibrados, aparece un factor logarítmico. Es el atajo para no perderse en sustituciones.',
          keyPoints: [
            'MergeSort: T(n) = 2T(n/2) + O(n) → O(n log n).',
            'No aplica a recurrencias no uniformes: ahí toca el método del árbol o Akra-Bazzi.',
          ],
          tags: ['complejidad', 'matemáticas'],
        },
        {
          slug: 'divide-y-venceras',
          name: 'Divide y vencerás',
          tagline: 'Parte el problema en trozos que no se solapan, resuélvelos y une los resultados.',
          summary:
            'Requiere subproblemas disjuntos del mismo tipo. MergeSort es O(N log N) estable pero paga O(N) extra; QuickSort es in-place y más rápido en la práctica, pero degenera a O(N²) con un pivote malo. Entender el caso base y la fusión es lo que separa una implementación correcta de una que solo funciona en el ejemplo.',
          keyPoints: [
            'La fusión es donde vive la mayor parte del coste real.',
            'QuickSort moderno usa pivote aleatorio o mediana de tres para evitar el peor caso.',
          ],
          tags: ['algoritmos', 'ordenación'],
          complexity: 'O(N log N) típico',
          widget: 'big-o-playground',
          tradeoffs: {
            whenToUse: ['Subproblemas independientes sin solapamiento', 'Paralelización natural en múltiples núcleos o máquinas'],
            whenToAvoid: ['Cuando los subproblemas se repiten una y otra vez (usa Programación Dinámica)'],
            cost: 'Profundidad de pila O(log N) y, en algoritmos como MergeSort, O(N) de memoria auxiliar.',
          },
        },
        {
          slug: 'algoritmos-voraces',
          name: 'Algoritmos voraces',
          tagline: 'Decide lo mejor ahora y no mires atrás. Funciona solo si el problema lo permite.',
          summary:
            'Greedy construye la solución con decisiones localmente óptimas e irrevocables. Solo es correcto si se cumplen la propiedad de elección voraz y la subestructura óptima. Dijkstra, Kruskal y Prim lo son; la mochila 0/1 no, y ahí necesitas programación dinámica.',
          keyPoints: [
            'Si no puedes demostrar el intercambio (exchange argument), no es greedy: es una heurística.',
            'Kruskal usa Union-Find para detectar ciclos en O(E log E).',
          ],
          tags: ['algoritmos', 'optimización'],
          tradeoffs: {
            whenToUse: ['Problemas con propiedad matroide o subestructura voraz demostrada (Dijkstra, MST, Huffman)'],
            whenToAvoid: ['Decisiones donde elegir el mejor paso inmediato bloquea un óptimo global mayor (Mochila 0/1)'],
            cost: 'Suele reducirse a ordenar primero O(N log N) y recorrer en una sola pasada O(N).',
          },
        },
        {
          slug: 'programacion-dinamica',
          name: 'Programación dinámica',
          tagline: 'Cuando los subproblemas se repiten, memoriza en vez de recalcular.',
          summary:
            'DP aplica cuando hay subestructura óptima y subproblemas superpuestos. Top-down con memoización es más fácil de escribir; bottom-up con tabulación evita la pila de recursión y permite optimizar memoria. Sin subproblemas superpuestos, DP solo añade complejidad: eso es divide y vencerás.',
          keyPoints: [
            'Identifica el estado antes que la recurrencia: un estado mal elegido arruina la complejidad.',
            'Muchos problemas de DP se reducen a optimizar el espacio de una fila del tablero.',
          ],
          tags: ['algoritmos', 'optimización'],
          tradeoffs: {
            whenToUse: ['Optimización combinatoria con subproblemas solapados (Levenshtein, Mochila 0/1, Bellman-Ford)'],
            whenToAvoid: ['Espacios de estado continuos o de alta dimensión (explosión exponencial de la tabla: curse of dimensionality)'],
            cost: 'Cambias tiempo exponencial O(2ᴺ) por tiempo y espacio polinómico O(N·W).',
          },
        },
        {
          slug: 'backtracking-branch-bound',
          name: 'Backtracking y Branch & Bound',
          tagline: 'Explora el árbol de decisiones entero, pero corta de raíz las ramas que ya no pueden ganar.',
          summary:
            'Backtracking recorre sistemáticamente todas las configuraciones posibles dando marcha atrás en cuanto una restricción se viola (SAT, N-Reinas, Sudoku). Branch & Bound añade una cota optimista de coste: si la mejor solución posible de una rama ya es peor que una solución conocida, poda el subárbol entero sin explorarlo.',
          keyPoints: [
            'La eficacia depende del orden en que pruebas candidatos y de la dureza de la poda.',
            'Es la base de los solvers industriales (MILP, SAT solvers) cuando un problema NP no admite atajos.',
          ],
          tags: ['algoritmos', 'búsqueda'],
          complexity: 'Exponencial peor caso · drásticamente menor con buena poda',
        },
        {
          slug: 'p-vs-np',
          name: 'P, NP y NP-Completo',
          tagline: 'Saber que un problema es NP-Completo te ahorra tres semanas buscando el algoritmo imposible.',
          summary:
            'P son los problemas resolubles en tiempo polinómico; NP, aquellos cuya solución se verifica en tiempo polinómico. Los NP-Completos son los más difíciles de NP: un algoritmo polinómico para uno resolvería todos. Reconocerlos es una habilidad de ingeniería: te dice cuándo pasar a heurísticas, aproximaciones o búsqueda guiada.',
          keyPoints: [
            'TSP, SAT y coloración de grafos son NP-Completos.',
            'En la práctica: relaja restricciones, aproxima con garantía o usa un solver.',
          ],
          tags: ['complejidad', 'teoría'],
          widget: 'big-o-playground',
        },
      ],
    },
  ],
};
