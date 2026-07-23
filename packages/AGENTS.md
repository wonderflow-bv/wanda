# Wanda — General Project Info

This file collects general, long-lived facts about the project and its ecosystem that
the user shares over time. It is not tied to a single task or plan — treat it as
persistent background knowledge for future work in `/packages`.

## Consumers

- **The Wonderboard** is the main frontend application that consumes this design
  system (`wanda` / `packages/react-components`, etc.).

## Decisions

- **`apps/docs` keeps `swcMinify: false` in `next.config.mjs`, Next.js stays on `12.2.5`** (2026-07-23).
  Vercel prod build failed with `The global thread pool has not been initialized`
  (rayon-core panic): Next 12.2.5's swc-wasm fallback crashes on Vercel's build sandbox
  when the native swc binary can't load. First tried bumping Next to `12.3.4` (last
  `12.x` patch) — fixed the panic but surfaced a cascade of new build errors (stricter
  `next.config.js` validation, `AppProps` type changes breaking `pages/_app.tsx`, etc.),
  too risky for a "just get it deployed" fix. Settled on the lower-risk option instead:
  disabling `swcMinify` so the build uses Terser/Babel minify and never touches
  swc-wasm, without touching the Next version at all. If more swc-wasm-related crashes
  show up, a full Next major upgrade (with the React 18 bump it requires) is the real
  fix — patching within 12.x isn't worth it given how much broke from a single patch bump.
