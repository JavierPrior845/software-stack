# The Stack Atlas

Atlas estático de las **5 capas de ingeniería de software** y las **6 capas del stack de IA**, con un crosswalk explícito entre ambos mundos.

Fase 1: esqueleto funcional, datos completos y diagramas estáticos. Sin JS en el cliente.

## Stack

- **Astro 5** con salida estática (0 KB de JS por defecto).
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
```

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Landing: las dos pilas y el diferencial |
| `/software` | Explorador de las capas 0–4 |
| `/ia` | Explorador de las capas 1–6 |
| `/conexiones` | Crosswalk completo (Modo C) |
| `/concepto/[slug]` | Ficha prerenderizada de cada concepto |

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
│  └─ diagrams/*.astro       # 6 diagramas estáticos
├─ layouts/Base.astro
├─ pages/
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
  complexity: 'O(1) medio',        // opcional
  tradeoffs: {                     // opcional, pero es el diferencial
    whenToUse: ['...'],
    whenToAvoid: ['...'],
    cost: 'Coste real, con números si puedes.',
  },
}
```

Si el concepto merece un diagrama, añade el id a `DiagramId`, crea el componente en `src/components/diagrams/` y regístralo en `src/components/Diagram.astro`.

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

Los slugs se resuelven en build; si uno no existe, la fila se descarta en `/conexiones`. No hay validación estricta todavía (ver roadmap).

## Diseño

- Fondo `#0a0b10`, paneles `#12141f`, texto `#f8fafc`.
- **Color por pila, no por capa suelta:** software recorre cyan → violeta (hue 202–268); IA recorre ámbar → rosa (hue 42–312). La profundidad se lee por posición y luminosidad, no por ocho hues distintos que colisionan.
- El acento de cada capa se define como `hue` en los datos y se resuelve con `hsl()` + `--layer` en CSS.
- Respeta `prefers-reduced-motion`. Sin `backdrop-blur` fuera de la cabecera.

## Deploy

Cualquier hosting estático sirve. Para Cloudflare Pages (permite uso comercial, a diferencia de Vercel Hobby):

- Build command: `npm run build`
- Output directory: `dist`

Antes de publicar:

1. Define `site` en `astro.config.mjs` para activar canonical y (si se añade) sitemap.
2. Revisa `src/config.ts` (`supportUrl` vacío no renderiza el botón).
3. Añade `robots.txt`/sitemap cuando exista dominio definitivo.

## Roadmap

- **Fase 1 (hecha):** layout, 141 conceptos, 12 puentes, 6 diagramas estáticos, rutas por concepto, responsive.
- **Fase 2:** widgets interactivos (memoria, AVL, KV-cache/PagedAttention, ReAct), empezando por 2–3 y no por diez. OG images por concepto. Validación de slugs en build.
- **Fase 3:** comentarios (Giscus), PDF/cheat-sheet, difusión.

Pendiente de decisión de producto: i18n ES/EN. Afecta al esquema de datos, así que conviene resolverlo antes de multiplicar fichas.
