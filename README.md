# Personal Portfolio

Melvika Faustine's TypeScript React portfolio.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The site includes a scroll-driven data process, selected projects, a searchable project archive, experience, leadership, interests, responsive layouts, and browser-aware light/dark mode.

## Add your photos

Put your image files in `public/photos/`, then fill in `personalPhotos` in `src/main.tsx` with paths like `/photos/portrait.jpg`. Slots are provided for your portrait, work, campus, community, and five interests. Empty paths display placeholders; missing images also fall back to placeholders. Project screenshots use the existing `image` fields in `projects`.

The landing page includes an animated scatter plot: “Connect the dots” arranges the points, “Mix it up” scatters them, and the pause button stops the dots. Motion respects the browser’s reduced-motion setting.

## Web analytics

Vercel Analytics is mounted in `src/main.tsx` using `@vercel/analytics/react` for this Vite app. Enable Web Analytics in the Vercel project dashboard and deploy the updated site to collect production page views.

The homepage features three selected projects. The full searchable archive is at `/projects/`; Vite builds both page entry points.
