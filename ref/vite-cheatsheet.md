```js
/*
██╗   ██╗██╗████████╗███████╗
██║   ██║██║╚══██╔══╝██╔════╝
██║   ██║██║   ██║   █████╗  
╚██╗ ██╔╝██║   ██║   ██╔══╝  
 ╚████╔╝ ██║   ██║   ███████╗
  ╚═══╝  ╚═╝   ╚═╝   ╚══════╝                                        
*/
```
# Vite - Cheatsheet

Quick reference for Vite project setup, configuration, and common patterns.

### 1. What Vite Is

Vite is a build tool and dev server for modern frontend projects. Two main jobs: (1) an extremely fast **dev server** that serves your code using native browser ES modules — no full bundling needed during development, so it starts almost instantly regardless of project size, and (2) a **build command** that bundles everything (via Rollup under the hood) into optimized static files for production/deployment.

```
npm run dev      -> starts the dev server (fast, unbundled, instant updates)
npm run build       -> creates an optimized production bundle in dist/
npm run preview        -> serves the built dist/ folder locally, to sanity-check the production build
```

### 2. Creating a New Project

```bash
npm create vite@latest             # interactive — asks project name, framework (React, Vue, etc.), variant (JS/TS)
npm create vite@latest my-app -- --template react   # skips prompts, scaffolds directly with a chosen template

cd my-app
npm install
npm run dev
```

### 3. Project Structure (typical React + Vite)

```
my-app/
├── index.html            <- the actual entry HTML file (not buried in public/, unlike older tools)
├── vite.config.js           <- Vite's own configuration file
├── package.json
├── public/                     <- static assets served AS-IS, untouched by the build process
└── src/
    ├── main.jsx                   <- JS entry point — mounts <App /> into index.html's #root
    ├── App.jsx
    └── assets/                        <- images/fonts that DO get processed/optimized by the build
```

### 4. `vite.config.js` — Basic Structure

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/my-repo-name/",       // important for GitHub Pages deployment — see section 10
  resolve: {
    alias: {
      "@": "/src",                // enables import Something from "@/components/Something"
    },
  },
  server: {
    port: 3000,
    open: true,                     // auto-opens the browser when the dev server starts
  },
});
```

### 5. Path Aliases

```js
// vite.config.js
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

```jsx
// without alias
import Button from "../../../components/Button";

// with alias — cleaner, doesn't break when files move
import Button from "@/components/Button";
```

**Note:** if using TypeScript or a `jsconfig.json`, the alias also needs to be declared there too (for the editor's IntelliSense/autocomplete to understand it), separately from `vite.config.js` (which is what actually makes the alias WORK at build/runtime).

```json
// jsconfig.json (or tsconfig.json)
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 6. Environment Variables

```bash
# .env                  <- loaded in all modes
# .env.development         <- loaded only in development
# .env.production             <- loaded only in production builds

VITE_API_URL=https://api.example.com
```

```js
// accessed via import.meta.env — NOT process.env (that's a Node.js convention, not a browser one)
console.log(import.meta.env.VITE_API_URL);

import.meta.env.MODE;         // "development" | "production"
import.meta.env.DEV;             // true in development
import.meta.env.PROD;              // true in production builds
import.meta.env.BASE_URL;             // the base path set in vite.config.js (see section 10)
```

**Only variables prefixed with `VITE_` are exposed to client-side code.** This is a deliberate security measure — unprefixed variables in a `.env` file are readable by `vite.config.js`/build-time code, but never bundled into the actual browser-facing JS, preventing accidental leaks of secrets that don't belong in the client.

### 7. Asset Imports

```jsx
// importing an image — Vite processes it, returns the final resolved URL as a string
import logo from "./assets/logo.png";
<img src={logo} alt="Logo" />

// importing raw text/SVG content as a string
import svgContent from "./icon.svg?raw";

// public/ folder assets — referenced by path directly, NOT imported, never processed/optimized
<img src="/favicon.ico" alt="Favicon" />
// (this only works correctly with a plain "/", or via import.meta.env.BASE_URL — see section 10)
```

**`src/assets/` vs. `public/`, the common point of confusion:** anything in `src/assets/` gets imported into your JS, is processed by the build (optimized, given a cache-busting hash in its filename), and only exists in the final bundle if something actually imports it. Anything in `public/` is copied as-is into the final build, referenced by plain URL path, and always included whether or not anything references it.

### 8. Dynamic Imports & Code Splitting

```jsx
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

Vite automatically code-splits anything imported this way into a separate file, only loaded when it's actually needed — reduces the initial bundle size for pages/features not everyone visits.

### 9. Hot Module Replacement (HMR)

```
HMR is Vite's default, automatic behavior during development — when you save a file,
Vite updates just that changed module in the browser instantly, WITHOUT a full page
reload, and (for React specifically, via the React plugin) without losing component
state — e.g. editing a component with open form input keeps the typed value intact.

Nothing to configure — this is on by default with @vitejs/plugin-react.
```

### 10. `base` Path — Critical for GitHub Pages Deployment

```js
// vite.config.js — this exact setting is what makes your portfolio/sandbox deploy correctly
export default defineConfig({
  base: "/react-sandbox/",   // must match your GitHub repo name exactly, with leading/trailing slashes
});
```

```jsx
// any hardcoded root-relative asset path breaks once base isn't "/" —
// use import.meta.env.BASE_URL instead of a raw "/" for public/ assets
<img src={`${import.meta.env.BASE_URL}resume.pdf`} />   // correct — respects the configured base
<img src="/resume.pdf" />                                  // breaks on GitHub Pages — assumes root domain
```

Without setting `base` correctly, a project deployed to `https://username.github.io/repo-name/` will have all its asset/script paths pointing to the wrong location (assuming it's served from the domain root instead of a subfolder), commonly causing a blank white page after deployment even though the build succeeded.

### 11. CSS & Tailwind Integration

```js
// vite.config.js — Tailwind v4's Vite plugin (matches your project setup)
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

```css
/* Vite supports CSS imports directly, no config needed for plain CSS */
@import "tailwindcss";
```

Vite also supports CSS Modules automatically (`Component.module.css`), Sass/Less (once the relevant package is installed), and PostCSS out of the box.

### 12. Common Commands Summary

```bash
npm run dev              # start the dev server
npm run build               # production build -> dist/
npm run preview                # locally preview the production build
npm create vite@latest             # scaffold a brand-new project
```

### Notes

- **`process.env` doesn't work in Vite client code** — this trips people up coming from older tooling (like Create React App or plain webpack setups). Always use `import.meta.env` in anything that runs in the browser.
- The `base` setting (section 10) is the single most common cause of a "works locally, breaks on GitHub Pages" deployment — if a build succeeds but the deployed site is blank, check this first.
- `src/assets/` vs. `public/` (section 7) is a genuinely easy mix-up — the rule of thumb: if you're `import`-ing it in a JS/JSX file, it belongs in `src/assets/`; if you're referencing it by a plain URL path (favicon, robots.txt, a downloadable PDF), it belongs in `public/`.
- This sheet reflects your own project's actual setup (React + Vite + Tailwind v4 via `@tailwindcss/vite`, `gh-pages`-based deployment with a configured `base`) — see the npm & package.json cheat-sheet for how `npm run build`/`deploy` fit into the broader script/versioning picture.