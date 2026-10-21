# The Stack Atlas

Atlas estático de las **5 capas de ingeniería de software** y las **6 capas del stack de IA**, con un crosswalk explícito entre ambos mundos.

Fase 2 en curso: esqueleto, datos y diagramas estáticos de la Fase 1, más validación en build, SEO, dos widgets interactivos y OG images. JavaScript solo en los dos widgets.

## Stack

- **Astro 5** con salida estática; dos islas de TypeScript vanilla, sin framework de UI.
- **Tailwind CSS 4** mediante `@tailwindcss/vite`.
- **TypeScript** para el modelo de datos.
- Fuentes self-hosted: Inter + JetBrains Mono (`@fontsource-variable`).

## Comandos

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/
npm run check     # astro check (tipos + plantillas)
npm test          # tests de las fórmulas de los widgets
```

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Landing: las dos pilas y el diferencial |
| `/software` | Explorador de las capas 0–4 |
| `/ia` | Explorador de las capas 1–6 |
| `/conexiones` | Crosswalk completo (Modo C) |
| `/concepto/[slug]` | Ficha prerenderizada de cada concepto |
| `/og/[slug].png` | Tarjeta 1200×630 para redes (145 imágenes) |

Cada concepto tiene URL propia y contenido completo en el HTML: el panel lateral no es estado de cliente, así que es indexable.

## Estructura

```
src/
├─ config.ts                 # nombre, descripción y URL de apoyo
├─ data/
│  ├─ types.ts               # Concept, Block, Layer, Stack
│  ├─ software/layer0..4.ts  # contenido del stack de software
│  ├─ ai/a1..a6.ts           # contenido del stack de IA
│  ├─ bridges.ts             # conexiones cruzadas (Modo C)
│  └─ index.ts               # registro, índices y helpers
├─ components/
│  ├─ Header.astro
│  ├─ LayerNav.astro         # navegador de capas y chips
│  ├─ ConceptPanel.astro     # ficha + trade-offs + conexiones
│  ├─ Explorer.astro         # layout de dos zonas
│  ├─ Diagram.astro          # registro de diagramas
│  ├─ Widget.astro           # registro de widgets
│  ├─ diagrams/*.astro       # 6 diagramas estáticos
│  └─ widgets/*.astro        # jerarquía de memoria y KV-cache
├─ lib/
│  ├─ memory.ts            # latencias, escala logarítmica y duraciones
│  └─ kv.ts                # fórmula del KV-cache y PagedAttention
├─ assets/fonts/           # Inter TTF para las OG images (+ licencia OFL)
├─ layouts/Base.astro
├─ pages/
│  └─ og/[slug].png.ts     # satori + sharp
└─ styles/global.css
```

## Añadir o editar contenido

Todo el contenido vive en TypeScript. No hay CMS ni base de datos.

### Un concepto

En `src/data/software/layerX.ts` o `src/data/ai/aX.ts`, dentro del `block` correspondiente:

```ts
{
  slug: 'tlb',                    // único en todo el sitio → /concepto/tlb
  name: 'TLB',
  tagline: 'Una frase con gancho.',
  summary: 'Dos o tres frases claras. Qué resuelve y por qué importa.',
  keyPoints: ['Dato accionable', 'Otro dato'],
  tags: ['memoria', 'rendimiento'],
  diagram: 'memory-hierarchy',    // opcional (ver DiagramId en types.ts)
  widget: 'memory-scale',          // opcional: 'memory-scale' | 'kv-cache'
  complexity: 'O(1) medio',        // opcional
  tradeoffs: {                     // opcional, pero es el diferencial
    whenToUse: ['...'],
    whenToAvoid: ['...'],
    cost: 'Coste real, con números si puedes.',
  },
}
```

Si el concepto merece un diagrama, añade el id a `DiagramId`, crea el componente en `src/components/diagrams/` y regístralo en `src/components/Diagram.astro`. Para un widget, sigue el mismo patrón con `WidgetId`, `src/components/widgets/` y `Widget.astro`.

### Una conexión cruzada

En `src/data/bridges.ts`:

```ts
{
  id: 'memoria-virtual',
  theme: 'Paginación bajo presión de memoria',
  software: 'paginacion',      // slug existente
  ai: 'paged-attention',       // slug existente
  note: 'Por qué es el mismo problema resuelto dos veces.',
}
```

Los slugs se validan en build: si un puente apunta a un concepto inexistente o al stack equivocado, `npm run build` falla con el listado de errores. Lo mismo ocurre con slugs duplicados, diagramas desconocidos y campos obligatorios vacíos (`src/data/validate.ts`).

## Diseño

- Fondo `#0a0b10`, paneles `#12141f`, texto `#f8fafc`.
- **Color por pila, no por capa suelta:** software recorre cyan → violeta (hue 202–268); IA recorre ámbar → rosa (hue 42–312). La profundidad se lee por posición y luminosidad, no por ocho hues distintos que colisionan.
- El acento de cada capa se define como `hue` en los datos y se resuelve con `hsl()` + `--layer` en CSS.
- Respeta `prefers-reduced-motion`. Sin `backdrop-blur` fuera de la cabecera.
- Los widgets renderizan sus valores por defecto en el HTML y mejoran con JS: funcionan sin JavaScript.
- Las OG images se generan en build con `satori` y `sharp`; el texto usa Inter TTF (licencia OFL incluida).

## Tests

`npm test` ejecuta `node:test` con type stripping sobre `tests/widgets.test.ts`: bytes por token, KV-cache a 8K/128K, desperdicio de PagedAttention, formato de bytes y escala humana de latencias. Las fórmulas viven en `src/lib/` y no dependen de Astro.

## Deploy

Cualquier hosting estático sirve. Para Cloudflare Pages (permite uso comercial, a diferencia de Vercel Hobby):

- Build command: `npm run build`
- Output directory: `dist`

Antes de publicar, define el dominio en build:

```bash
SITE_URL=https://tudominio.com npm run build
```

Con `SITE_URL` definido se activan el `<link rel="canonical">`, `og:url`, `og:image` (apuntando a `/og/[slug].png`), `twitter:card=summary_large_image`, el sitemap (`sitemap-index.xml`) y la línea `Sitemap:` en `/robots.txt`. Sin esa variable no se emite ninguno, para no publicar canonical a un dominio equivocado. Las imágenes OG se generan igualmente (145 archivos).

Revisa también `src/config.ts` (`supportUrl` vacío no renderiza el botón). El `404.astro` se genera siempre.

## Roadmap

- **Fase 1 (hecha):** layout, 141 conceptos, 12 puentes, 6 diagramas estáticos, rutas por concepto, responsive.
- **Fase 2 (hecha):** validación de contenido en build, SEO condicionado a `SITE_URL`, OG images por página y concepto, y widgets de jerarquía de memoria y KV-cache/PagedAttention.
- **Fase 3:** comentarios (Giscus), PDF/cheat-sheet, analítica y difusión.

Pendiente de decisión de producto: i18n ES/EN. Afecta al esquema de datos, así que conviene resolverlo antes de multiplicar fichas.
