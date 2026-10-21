import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { site } from '../../config';
import {
  allConceptSlugs,
  getConcept,
  stackConceptCount,
  stacks,
  totalBridges,
  totalConcepts,
} from '../../data';

export const prerender = true;

const regular = readFileSync(join(process.cwd(), 'src/assets/fonts/Inter-Regular.ttf'));
const semibold = readFileSync(join(process.cwd(), 'src/assets/fonts/Inter-SemiBold.ttf'));

interface Card {
  slug: string;
  title: string;
  kicker: string;
  subtitle: string;
  hue: number;
  watermark: string;
  footer: string;
}

const TOTAL_LAYERS = stacks.software.layers.length + stacks.ai.layers.length;

const PAGE_CARDS: Card[] = [
  {
    slug: 'home',
    title: 'De la caché L1 al bucle ReAct.',
    kicker: 'Atlas de ingeniería',
    subtitle: site.tagline,
    hue: 202,
    watermark: '11',
    footer: `${totalConcepts} conceptos · ${totalBridges} puentes`,
  },
  {
    slug: 'software',
    title: stacks.software.title,
    kicker: 'Stack de software',
    subtitle: stacks.software.claim,
    hue: 218,
    watermark: '5',
    footer: `${stackConceptCount(stacks.software)} conceptos · ${stacks.software.layers.length} capas`,
  },
  {
    slug: 'ia',
    title: stacks.ai.title,
    kicker: 'Stack de IA',
    subtitle: stacks.ai.claim,
    hue: 312,
    watermark: '6',
    footer: `${stackConceptCount(stacks.ai)} conceptos · ${stacks.ai.layers.length} capas`,
  },
  {
    slug: 'conexiones',
    title: 'Las conexiones que nadie dibuja.',
    kicker: 'Modo C · crosswalk',
    subtitle:
      'El mismo problema de ingeniería resuelto dos veces: una en software, otra en IA, con vocabularios distintos.',
    hue: 330,
    watermark: '12',
    footer: `${totalBridges} puentes entre las dos pilas`,
  },
];

function conceptCards(): Card[] {
  return allConceptSlugs().map((slug) => {
    const location = getConcept(slug);
    if (!location) throw new Error(`Concepto no encontrado para OG: ${slug}`);

    const { concept, layer, stack } = location;
    return {
      slug,
      title: concept.name,
      kicker: `${stack.short} · Capa ${layer.number}`,
      subtitle: concept.tagline,
      hue: layer.hue,
      watermark: String(layer.number).padStart(2, '0'),
      footer: layer.title,
    };
  });
}

export function getStaticPaths() {
  return [...PAGE_CARDS, ...conceptCards()].map((card) => ({
    params: { slug: card.slug },
    props: { card },
  }));
}

function hslToRgb(hue: number, saturation: number, lightness: number): [number, number, number] {
  const s = saturation / 100;
  const l = lightness / 100;
  const a = s * Math.min(l, 1 - l);
  const channel = (n: number) => {
    const k = (n + hue / 30) % 12;
    return Math.round((l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255);
  };
  return [channel(0), channel(8), channel(4)];
}

function clamp(value: string, max: number): string {
  if (value.length <= max) return value;
  const cut = value.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).trim()}…`;
}

function titleSize(title: string): number {
  if (title.length <= 20) return 78;
  if (title.length <= 32) return 68;
  if (title.length <= 48) return 58;
  return 50;
}

function cardElement(card: Card) {
  const [r, g, b] = hslToRgb(card.hue, 85, 64);
  const accent = `hsl(${card.hue} 85% 64%)`;
  const soft = `rgba(${r}, ${g}, ${b}, 0.14)`;
  const line = `rgba(${r}, ${g}, ${b}, 0.28)`;

  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: '#0a0b10',
        color: '#f8fafc',
        padding: '54px 64px 46px',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              width: 560,
              height: 560,
              borderRadius: 9999,
              border: `1px solid ${line}`,
              right: -170,
              top: -170,
              display: 'flex',
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              width: 360,
              height: 360,
              borderRadius: 9999,
              border: `1px solid ${line}`,
              right: -40,
              bottom: -150,
              display: 'flex',
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              right: 24,
              bottom: -84,
              fontSize: 300,
              lineHeight: 1,
              fontWeight: 600,
              color: `rgba(${r}, ${g}, ${b}, 0.10)`,
              display: 'flex',
            },
            children: card.watermark,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: 14 },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          border: `1px solid ${line}`,
                          backgroundColor: soft,
                          color: accent,
                          fontSize: 22,
                          fontWeight: 600,
                        },
                        children: 'S',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', flexDirection: 'column' },
                        children: [
                          {
                            type: 'div',
                            props: {
                              style: { fontSize: 23, fontWeight: 600, letterSpacing: -0.4 },
                              children: site.name,
                            },
                          },
                          {
                            type: 'div',
                            props: {
                              style: { fontSize: 14, color: '#7e8ca2', marginTop: 2 },
                              children: 'Atlas de ingeniería y IA',
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontSize: 13,
                    letterSpacing: 2.6,
                    color: '#7e8ca2',
                  },
                  children: `${TOTAL_LAYERS} CAPAS · ${totalConcepts} CONCEPTOS`,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              paddingTop: 22,
              paddingBottom: 26,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    fontSize: 17,
                    letterSpacing: 2.2,
                    color: accent,
                  },
                  children: card.kicker.toUpperCase(),
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    marginTop: 16,
                    maxWidth: 960,
                    fontSize: titleSize(card.title),
                    fontWeight: 600,
                    lineHeight: 1.06,
                    letterSpacing: -2,
                    color: '#f8fafc',
                  },
                  children: card.title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    marginTop: 20,
                    maxWidth: 880,
                    fontSize: 25,
                    lineHeight: 1.4,
                    color: '#a7b4c6',
                  },
                  children: clamp(card.subtitle, 150),
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: 20,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: 12 },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          width: 34,
                          height: 3,
                          borderRadius: 2,
                          backgroundColor: accent,
                        },
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', fontSize: 16, color: '#7e8ca2' },
                        children: clamp(card.footer, 70),
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

export const GET: APIRoute = async ({ props }) => {
  const card = props.card as Card;
  const element = cardElement(card) as unknown as Parameters<typeof satori>[0];

  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: regular, weight: 400, style: 'normal' },
      { name: 'Inter', data: semibold, weight: 600, style: 'normal' },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
