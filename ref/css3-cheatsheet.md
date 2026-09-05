```js
/*
 ██████╗███████╗███████╗    ██████╗ 
██╔════╝██╔════╝██╔════╝    ╚════██╗
██║     ███████╗███████╗     █████╔╝
██║     ╚════██║╚════██║     ╚═══██╗
╚██████╗███████║███████║    ██████╔╝
 ╚═════╝╚══════╝╚══════╝    ╚═════╝                                                             
*/
```
# CSS3 - Cheatsheet

Quick reference for core CSS3 syntax, selectors, and patterns.

### 1. Selectors

```css
* { }                     /* universal selector — every element */
div { }                   /* type/element selector */
.card { }                 /* class selector */
#header { }                /* id selector */
div.card { }               /* element + class combo */
.card.active { }           /* multiple classes on the same element */

/* Combinators */
div p { }                  /* descendant — any <p> inside a <div>, any depth */
div > p { }                /* child — only direct <p> children of <div> */
div + p { }                /* adjacent sibling — the <p> immediately after a <div> */
div ~ p { }                /* general sibling — any <p> after a <div>, same parent */

/* Grouping */
h1, h2, h3 { }              /* apply the same rule to multiple selectors */

/* Attribute selectors */
input[type="text"] { }      /* exact attribute value match */
a[href^="https"] { }        /* attribute value starts with */
a[href$=".pdf"] { }         /* attribute value ends with */
a[href*="example"] { }      /* attribute value contains */
```

### 2. Pseudo-classes

```css
a:hover { }                /* while the mouse is over the element */
a:active { }               /* while being clicked */
a:visited { }              /* a link that's been visited */
input:focus { }            /* while an input has focus */
input:disabled { }         /* while an input is disabled */
input:checked { }          /* a checked checkbox/radio */

li:first-child { }         /* first element among its siblings */
li:last-child { }          /* last element among its siblings */
li:nth-child(2) { }        /* the 2nd element among its siblings */
li:nth-child(odd) { }      /* every odd-positioned sibling */
li:nth-child(even) { }     /* every even-positioned sibling */
li:nth-child(3n) { }       /* every 3rd sibling */

:not(.excluded) { }        /* everything except elements matching .excluded */
:root { }                  /* the document root — commonly used for CSS variables */
```

### 3. Pseudo-elements

```css
p::before { content: "→ "; }   /* inserts content before an element's content */
p::after { content: ""; }      /* inserts content after an element's content — common for clearfix/decorative shapes */
p::first-line { }              /* styles just the first line of text */
p::first-letter { }            /* styles just the first letter */
::selection { background: yellow; } /* styles user-highlighted text */
input::placeholder { }         /* styles placeholder text in an input */
```

### 4. Box Model & Display

```css
box-sizing: content-box;   /* default — width/height exclude padding & border */
box-sizing: border-box;    /* width/height include padding & border (most common in real projects) */

display: block;            /* takes full width, starts on a new line */
display: inline;           /* flows with text, ignores width/height */
display: inline-block;     /* flows with text but accepts width/height */
display: flex;             /* one-dimensional flexible layout */
display: grid;             /* two-dimensional layout */
display: none;             /* removed from layout entirely (not just hidden) */

visibility: hidden;        /* hidden but still takes up space in layout */

width: 100%;
height: 100vh;             /* 100% of the viewport height */
max-width: 600px;
min-height: 300px;

overflow: hidden;          /* clips content that overflows the box */
overflow: auto;            /* scrollbars appear only when needed */
overflow-x: auto;
overflow-y: scroll;
```

### 5. Positioning

```css
position: static;          /* default — normal document flow */
position: relative;        /* offset relative to its own normal position */
position: absolute;        /* removed from flow, positioned relative to nearest positioned ancestor */
position: fixed;           /* removed from flow, positioned relative to the viewport, stays put on scroll */
position: sticky;          /* acts relative until a scroll threshold, then sticks like fixed */

top: 0;
right: 0;
bottom: 0;
left: 0;

z-index: 10;                /* stacking order — higher values sit on top */
```

### 6. Spacing (Margin & Padding)

```css
margin: 1rem;               /* all four sides */
margin: 1rem 2rem;           /* top/bottom, left/right */
margin: 1rem 2rem 0.5rem 2rem; /* top, right, bottom, left (clockwise) */
margin-top: 1rem;
margin-right: 1rem;
margin-bottom: 1rem;
margin-left: 1rem;
margin: 0 auto;              /* common centering trick for a block element with a set width */

padding: 1rem;                /* same shorthand rules as margin */
padding-inline: 1rem;         /* logical property — left+right in LTR languages */
padding-block: 1rem;          /* logical property — top+bottom */
```

### 7. Flexbox

```css
.container {
  display: flex;
  flex-direction: row;         /* row | row-reverse | column | column-reverse */
  flex-wrap: wrap;              /* nowrap | wrap | wrap-reverse */
  justify-content: center;      /* main-axis alignment: flex-start | center | flex-end | space-between | space-around | space-evenly */
  align-items: center;          /* cross-axis alignment: flex-start | center | flex-end | stretch | baseline */
  align-content: center;        /* aligns wrapped rows (only affects multi-line flex containers) */
  gap: 1rem;                    /* spacing between flex items */
}

.item {
  flex-grow: 1;                 /* how much this item grows to fill space */
  flex-shrink: 0;                /* whether this item is allowed to shrink */
  flex-basis: 200px;             /* starting size before growing/shrinking */
  flex: 1 1 0%;                  /* shorthand: grow shrink basis */
  align-self: flex-end;          /* overrides align-items for this one item */
  order: 2;                      /* visual order, independent of source order */
}
```

### 8. Grid

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);      /* 3 equal columns */
  grid-template-columns: 200px 1fr 1fr;        /* mixed fixed + flexible columns */
  grid-template-rows: auto 1fr auto;
  gap: 1rem;                                   /* row-gap + column-gap shorthand */
  row-gap: 1rem;
  column-gap: 2rem;
  place-items: center;                          /* align-items + justify-items shorthand */
}

.item {
  grid-column: span 2;          /* spans 2 columns */
  grid-column: 1 / 3;           /* starts at line 1, ends at line 3 */
  grid-row: span 2;
}

/* Named grid areas — a common real-world layout pattern */
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
}
.sidebar { grid-area: sidebar; }
.header  { grid-area: header; }
.main    { grid-area: main; }
```

### 9. Typography

```css
font-family: "Helvetica Neue", Arial, sans-serif; /* fallback stack — always end with a generic family */
font-size: 1rem;             /* rem = relative to root font-size (usually 16px) */
font-size: 1em;               /* em = relative to the PARENT element's font-size */
font-weight: 400;             /* 100–900, or normal (400) / bold (700) */
font-style: italic;
line-height: 1.5;              /* unitless is preferred — scales with font-size */
letter-spacing: 0.05em;
text-align: center;            /* left | center | right | justify */
text-decoration: underline;
text-transform: uppercase;     /* uppercase | lowercase | capitalize */
white-space: nowrap;           /* prevents text from wrapping */
text-overflow: ellipsis;       /* shows "…" for clipped overflow text — needs overflow: hidden + white-space: nowrap */
```

### 10. Colors & Backgrounds

```css
color: #333333;                 /* hex */
color: rgb(51, 51, 51);
color: rgb(51 51 51 / 0.5);      /* modern rgb syntax with alpha */
color: hsl(210, 50%, 40%);       /* hue, saturation, lightness */

background-color: #ffffff;
background-image: url("image.jpg");
background-size: cover;          /* cover | contain | specific dimensions */
background-position: center;
background-repeat: no-repeat;
background-attachment: fixed;    /* parallax-style fixed background */

background-image: linear-gradient(to right, #3b82f6, #a855f7);
background-image: radial-gradient(circle, #3b82f6, #a855f7);
```

### 11. Borders & Radius

```css
border: 1px solid #e5e7eb;         /* width style color, shorthand */
border-width: 2px;
border-style: solid;                /* solid | dashed | dotted | double | none */
border-color: #3b82f6;
border-top: 1px solid #e5e7eb;      /* per-side border */

border-radius: 0.5rem;               /* all corners */
border-radius: 0.5rem 0 0 0.5rem;    /* top-left, top-right, bottom-right, bottom-left */
border-radius: 9999px;               /* fully rounded — pill/circle shape */
```

### 12. Shadows & Filters

```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);          /* x-offset y-offset blur color */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06); /* multiple shadows, comma-separated */
box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);     /* inset shadow, drawn inside the box */

text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

filter: blur(4px);
filter: brightness(1.1);
filter: grayscale(100%);
filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));   /* like box-shadow, but respects transparent/irregular shapes */
```

### 13. Transitions

```css
transition: all 0.2s ease-in-out;               /* property duration timing-function */
transition: background-color 0.3s ease, transform 0.3s ease; /* multiple properties, comma-separated */
transition-property: opacity;
transition-duration: 150ms;
transition-timing-function: ease-in-out;         /* linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier(...) */
transition-delay: 0.1s;
```

### 14. Transforms

```css
transform: translateX(20px);
transform: translateY(-10px);
transform: translate(20px, -10px);
transform: scale(1.1);
transform: scaleX(0.5);
transform: rotate(45deg);
transform: skew(10deg, 0deg);
transform: translate(-50%, -50%);   /* common trick to perfectly center an absolutely positioned element */

transform-origin: center;            /* the point transforms pivot/scale around */
```

### 15. Animations & Keyframes

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  0%   { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

.element {
  animation: fadeIn 0.5s ease-in-out;
  animation: slideIn 0.6s ease-out forwards;   /* forwards keeps the end state after it finishes */
  animation-iteration-count: infinite;          /* or a number, e.g. 3 */
  animation-direction: alternate;               /* plays forward, then backward, then forward... */
  animation-delay: 0.2s;
}
```

### 16. Custom Properties (CSS Variables)

```css
:root {
  --color-primary: #2b5c8a;
  --spacing-unit: 1rem;
  --radius-base: 0.5rem;
}

.card {
  background-color: var(--color-primary);
  padding: var(--spacing-unit);
  border-radius: var(--radius-base);
}

/* Variables can be overridden in a narrower scope */
.dark-mode {
  --color-primary: #a3c9ff;
}

/* Fallback value if the variable isn't defined */
.element {
  color: var(--color-missing, black);
}
```

### 17. Media Queries & Responsive Patterns

```css
/* Mobile-first — base styles apply to smallest screens, then override upward */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }

@media (max-width: 767px) {
  .sidebar { display: none; }
}

@media (prefers-color-scheme: dark) {
  :root { --color-bg: #0f0f0f; }
}

@media (orientation: landscape) { }
```

### 18. Common Layout Recipes

```css
/* Perfectly center anything (flex method) */
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Perfectly center an absolutely positioned element */
.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Responsive grid, auto-fitting as many columns as fit */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

/* Sticky footer layout */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.page main {
  flex: 1;                 /* pushes the footer down regardless of content height */
}

/* Truncate text with ellipsis */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Custom scrollbar (WebKit browsers) */
.scroll::-webkit-scrollbar { width: 8px; }
.scroll::-webkit-scrollbar-thumb { background: #999; border-radius: 4px; }
```

### 19. Specificity & Cascade (quick reference)

```css
/* Specificity, low to high: */
/* 1. Type selectors (div, p)        -> weakest */
/* 2. Class, attribute, pseudo-class (.card, [type], :hover) */
/* 3. ID selectors (#header) */
/* 4. Inline styles (style="...")     -> stronger than any selector */
/* !important                          -> overrides everything (avoid unless truly necessary) */

/* Later rules of EQUAL specificity win — source order matters */
p { color: blue; }
p { color: red; }    /* this one wins — same specificity, comes later */
```

### Notes

- CSS3 is the current, still-evolving spec — new features (container queries, `:has()`, nesting, `@layer`) continue to be added and gain browser support over time. Worth checking [caniuse.com](https://caniuse.com/) before relying on a newer feature in production.
- `rem` units scale off the root (`html`) font-size; `em` units scale off the parent element — this distinction matters most in nested typography and spacing.
- Modern layout work leans on Flexbox (one-dimensional: rows or columns) and Grid (two-dimensional: rows and columns together) far more than older float-based layouts.
- This is a reference for vanilla CSS3 syntax and patterns — Tailwind CSS (see the companion Tailwind cheatsheet) is a utility-class layer built on top of these same underlying CSS properties.
