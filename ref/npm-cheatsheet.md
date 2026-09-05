```js
/*
███╗   ██╗██████╗ ███╗   ███╗
████╗  ██║██╔══██╗████╗ ████║
██╔██╗ ██║██████╔╝██╔████╔██║
██║╚██╗██║██╔═══╝ ██║╚██╔╝██║
██║ ╚████║██║     ██║ ╚═╝ ██║
╚═╝  ╚═══╝╚═╝     ╚═╝     ╚═╝                                                         
*/
```
# npm & package.json - Cheatsheet

Quick reference for npm commands and package.json structure.

### 1. Initializing a Project

```bash
npm init                      # interactive setup — asks name, version, description, etc.
npm init -y                     # skips the questions, creates package.json with all defaults
npm create vite@latest            # scaffolds a new project using a starter template (e.g. Vite)
```

### 2. Installing Packages

```bash
npm install                       # installs everything listed in package.json (run after cloning a repo)
npm install react                   # installs a package, adds it to "dependencies"
npm install -D vite                   # installs as a "devDependency" (dev/build-only, not needed in production)
npm install --save-dev eslint           # same as -D, long-hand flag
npm install react@18.2.0                  # installs a specific version
npm install react@latest                    # installs the latest available version

npm install -g nodemon                        # installs GLOBALLY (available system-wide, not just this project)

npm uninstall react                              # removes a package and updates package.json
npm uninstall -D vite                              # removes a devDependency
```

### 3. Running Scripts

```bash
npm run dev                  # runs whatever the "dev" script is defined as in package.json
npm run build
npm run deploy

npm start                       # special case — "start" and "test" can be run WITHOUT "run"
npm test                          # same shorthand applies here too
```

### 4. Updating & Checking Packages

```bash
npm outdated                 # shows which installed packages have newer versions available
npm update                     # updates packages within the version ranges allowed in package.json
npm update react                 # updates a specific package

npm list                            # shows installed packages and their versions (top-level only)
npm list --depth=0                    # same, explicitly limited to top-level (common flag to reduce noise)
npm view react versions                 # shows all published versions of a package
```

### 5. `package.json` Structure

```json
{
  "name": "react-sandbox",
  "version": "1.0.0",
  "description": "A hands-on reference app for React hooks and concepts",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist",
    "predeploy": "npm run build"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "eslint": "^9.0.0"
  }
}
```

### 6. Dependencies vs. DevDependencies

```json
"dependencies": {
  "react": "^19.0.0"          // needed for the app to actually RUN, in production
},
"devDependencies": {
  "vite": "^5.0.0",             // only needed during DEVELOPMENT/BUILD — not shipped to production
  "eslint": "^9.0.0"
}
```

Rule of thumb: if the code you're writing directly imports/uses the package at runtime (like `react`, `gsap`), it's a dependency. If it's a tool that helps you build/test/lint the project (like `vite`, `eslint`, testing libraries), it's a devDependency.

### 7. Version Numbers & Semantic Versioning (SemVer)

```
19.1.4
│  │  │
│  │  └── PATCH — bug fixes, no new features, safe to update automatically
│  └───── MINOR — new features, backward-compatible
└──────── MAJOR — breaking changes, requires manual review before updating
```

```json
"react": "19.1.4"        // EXACT version only — never auto-updates
"react": "^19.1.4"          // caret — allows MINOR and PATCH updates (19.x.x, but not 20.0.0). Most common default.
"react": "~19.1.4"             // tilde — allows PATCH updates only (19.1.x, but not 19.2.0)
"react": ">=19.1.4"               // any version 19.1.4 or higher, no upper bound — rarely used, risky
"react": "*"                        // any version at all — avoid, unpredictable
```

### 8. `package-lock.json`

```
package.json          -> the version RANGES you've allowed (e.g. "^19.0.0")
package-lock.json        -> the EXACT versions actually installed, locked down precisely
```

`package-lock.json` should always be committed to git — it's what guarantees every developer (and your deployment environment) installs the exact same dependency tree, not just "something matching the range." Never hand-edit this file directly.

### 9. `node_modules`

```bash
# node_modules/ should ALWAYS be in .gitignore — never committed to git.
# It's large, fully regeneratable, and platform-specific in some cases.

rm -rf node_modules package-lock.json    # common "fix weird install issues" reset
npm install                                 # reinstalls everything fresh from package.json
```

### 10. npx — Running Packages Without Installing Them Globally

```bash
npx create-react-app my-app       # runs a package's CLI once, without permanently installing it
npx vite                             # runs a locally-installed package's binary directly
npx gh-pages -d dist                    # useful for one-off commands you don't need installed long-term
```

### 11. Peer Dependencies & Common Install Errors

```bash
# "peer dependency" warnings — a package expects a compatible version of something
# else to ALSO be installed (e.g. a plugin expecting a specific React version range)
npm install --legacy-peer-deps       # bypasses strict peer dependency checks (use cautiously, not a real fix)

# common troubleshooting sequence for a broken/corrupted install:
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### 12. Publishing a Package (less common day-to-day, good to know exists)

```bash
npm login                    # authenticates with your npm account
npm publish                    # publishes the current package.json's package to the npm registry
npm version patch                # bumps the patch version (e.g. 1.0.0 -> 1.0.1) and creates a git tag
npm version minor                  # bumps the minor version
npm version major                    # bumps the major version
```

### Notes

- **Always commit `package-lock.json`, never commit `node_modules/`** — this is the correct split, and getting it backward (committing node_modules, ignoring the lock file) causes real, avoidable problems for collaborators and deployments.
- The caret (`^`) is npm's default when you run a plain `npm install package-name` — it's a reasonable default for most projects, allowing safe minor/patch updates while blocking breaking major version bumps.
- `npm run dev`/`build`/`deploy` aren't npm built-ins — they only exist because they're defined under `"scripts"` in package.json. Any custom script name works the same way (`npm run whatever-you-name-it`), except `start` and `test`, which get a shorthand.
- This is the exact command set behind your own portfolio and React Sandbox deploy workflows (`npm run build`, `npm run deploy` via the `gh-pages` package) — see the Git & GitHub cheat-sheet for how that pairs with the git push side of the same workflow.