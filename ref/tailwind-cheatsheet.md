```js
/*
████████╗ █████╗ ██╗██╗     ██╗    ██╗██╗███╗   ██╗██████╗      ██████╗███████╗███████╗
╚══██╔══╝██╔══██╗██║██║     ██║    ██║██║████╗  ██║██╔══██╗    ██╔════╝██╔════╝██╔════╝
   ██║   ███████║██║██║     ██║ █╗ ██║██║██╔██╗ ██║██║  ██║    ██║     ███████╗███████╗
   ██║   ██╔══██║██║██║     ██║███╗██║██║██║╚██╗██║██║  ██║    ██║     ╚════██║╚════██║
   ██║   ██║  ██║██║███████╗╚███╔███╔╝██║██║ ╚████║██████╔╝    ╚██████╗███████║███████║
   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝ ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝╚═════╝      ╚═════╝╚══════╝╚══════╝                                                             
*/
```
# Tailwind css - Cheatsheet

Quick reference for https://tailwindcss.com/

### 1. Layout & Display

```bash
.block                -> display: block;
.inline               -> display: inline;
.inline-block         -> display: inline-block;
.flex                 -> display: flex;
.inline-flex          -> display: inline-flex;
.grid                 -> display: grid;
.hidden               -> display: none;

.visible              -> visibility: visible;
.invisible            -> visibility: hidden;

.overflow-hidden      -> overflow: hidden;
.overflow-auto        -> overflow: auto;
.overflow-scroll      -> overflow: scroll;
.overflow-x-auto      -> overflow-x: auto;
.overflow-y-auto      -> overflow-y: auto;
```

### 2. Positioning

```bash
.static               -> position: static;
.relative             -> position: relative;
.absolute             -> position: absolute;
.fixed                -> position: fixed;
.sticky               -> position: sticky;
.inset-0              -> top: 0; right: 0; bottom: 0; left: 0;
.inset-x-0            -> left: 0; right: 0;
.inset-y-0            -> top: 0; bottom: 0;
.top-0                -> top: 0;
.right-0              -> right: 0;
.bottom-0             -> bottom: 0;
.left-0               -> left: 0;

/* Common offsets (Tailwind spacing scale) */
.top-1                -> top: 0.25rem;        /* 4px */
.top-2                -> top: 0.5rem;         /* 8px */
.top-4                -> top: 1rem;           /* 16px */
.top-8                -> top: 2rem;           /* 32px */
.z-0                  -> z-index: 0;
.z-10                 -> z-index: 10;
.z-20                 -> z-index: 20;
.z-30                 -> z-index: 30;
.z-40                 -> z-index: 40;
.z-50                 -> z-index: 50;
.z-auto               -> z-index: auto;
```

### 3. Spacing (Margin & Padding)

```bash
/* Margin (all sides) */
.m-0                  -> margin: 0;
.m-px                 -> margin: 1px;
.m-4                  -> margin: 1rem;

/* Margin (axis) */
.mx-4                 -> margin-left: 1rem; margin-right: 1rem;
.my-2                 -> margin-top: 0.5rem; margin-bottom: 0.5rem;

/* Margin (sides) */
.mt-6                 -> margin-top: 1.5rem;
.mr-3                 -> margin-right: 0.75rem;
.mb-8                 -> margin-bottom: 2rem;
.ml-1.5               -> margin-left: 0.375rem;

/* Auto centering */
.mx-auto              -> margin-left: auto; margin-right: auto;

/* Negative margins */
.-mt-4                -> margin-top: -1rem;

/* Padding mirrors margin */
.p-4                  -> padding: 1rem;
.px-6                 -> padding-left: 1.5rem; padding-right: 1.5rem;
.py-2.5               -> padding-top: 0.625rem; padding-bottom: 0.625rem;
.pt-3                 -> padding-top: 0.75rem;
```

### 4. Flexbox

```bash
.flex-row             -> flex-direction: row;
.flex-row-reverse     -> flex-direction: row-reverse;
.flex-col             -> flex-direction: column;
.flex-col-reverse     -> flex-direction: column-reverse;

.flex-wrap            -> flex-wrap: wrap;
.flex-nowrap          -> flex-wrap: nowrap;
.flex-wrap-reverse    -> flex-wrap: wrap-reverse;

.items-start          -> align-items: flex-start;
.items-center         -> align-items: center;
.items-end            -> align-items: flex-end;
.items-stretch        -> align-items: stretch;
.items-baseline       -> align-items: baseline;

.justify-start        -> justify-content: flex-start;
.justify-center       -> justify-content: center;
.justify-end          -> justify-content: flex-end;
.justify-between      -> justify-content: space-between;
.justify-around       -> justify-content: space-around;
.justify-evenly       -> justify-content: space-evenly;

.content-start        -> align-content: flex-start;
.content-center       -> align-content: center;
.content-end          -> align-content: flex-end;
.content-between      -> align-content: space-between;
.content-around       -> align-content: space-around;
.content-evenly       -> align-content: space-evenly;

.gap-0                -> gap: 0;
.gap-2                -> gap: 0.5rem;
.gap-4                -> gap: 1rem;
.gap-x-6              -> column-gap: 1.5rem;
.gap-y-3              -> row-gap: 0.75rem;

.self-auto            -> align-self: auto;
.self-start           -> align-self: flex-start;
.self-center          -> align-self: center;
.self-end             -> align-self: flex-end;
.self-stretch         -> align-self: stretch;

.flex-1               -> flex: 1 1 0%;
.flex-auto            -> flex: 1 1 auto;
.flex-initial         -> flex: 0 1 auto;
.flex-none            -> flex: none;

.grow                 -> flex-grow: 1;
.grow-0               -> flex-grow: 0;
.shrink               -> flex-shrink: 1;
.shrink-0             -> flex-shrink: 0;

.order-first          -> order: -9999;
.order-last           -> order: 9999;
.order-none           -> order: 0;
.order-1              -> order: 1;
```

### 5. Grid

```bash
.grid-cols-1          -> grid-template-columns: repeat(1, minmax(0, 1fr));
.grid-cols-2          -> grid-template-columns: repeat(2, minmax(0, 1fr));
.grid-cols-3          -> grid-template-columns: repeat(3, minmax(0, 1fr));
.grid-cols-12         -> grid-template-columns: repeat(12, minmax(0, 1fr));

.col-span-1           -> grid-column: span 1 / span 1;
.col-span-3           -> grid-column: span 3 / span 3;
.col-start-2          -> grid-column-start: 2;
.col-end-4            -> grid-column-end: 4;

.grid-rows-3          -> grid-template-rows: repeat(3, minmax(0, 1fr));
.row-span-2           -> grid-row: span 2 / span 2;

.gap-4                -> gap: 1rem;
.gap-x-8              -> column-gap: 2rem;
.gap-y-2              -> row-gap: 0.5rem;

.place-items-center   -> place-items: center;
.place-content-center -> place-content: center;
```

### 6. Sizing

```bash
/* Width */
.w-0                  -> width: 0;
.w-px                 -> width: 1px;
.w-4                  -> width: 1rem;
.w-10                 -> width: 2.5rem;
.w-1/2                -> width: 50%;
.w-1/3                -> width: 33.333333%;
.w-2/3                -> width: 66.666667%;
.w-1/4                -> width: 25%;
.w-3/4                -> width: 75%;
.w-full               -> width: 100%;
.w-screen             -> width: 100vw;
.max-w-xs             -> max-width: 20rem;      /* 320px */
.max-w-sm             -> max-width: 24rem;      /* 384px */
.max-w-md             -> max-width: 28rem;      /* 448px */
.max-w-lg             -> max-width: 32rem;      /* 512px */
.max-w-xl             -> max-width: 36rem;      /* 576px */
.max-w-2xl            -> max-width: 42rem;      /* 672px */
.max-w-4xl            -> max-width: 56rem;      /* 896px */
.max-w-7xl            -> max-width: 80rem;      /* 1280px */

/* Height */
.h-0                  -> height: 0;
.h-px                 -> height: 1px;
.h-4                  -> height: 1rem;
.h-10                 -> height: 2.5rem;
.h-full               -> height: 100%;
.h-screen             -> height: 100vh;
.min-h-screen         -> min-height: 100vh;
```

### 7. Typography

**Font sizes (default scale):**

```bash
.text-xs              -> font-size: 0.75rem; line-height: 1rem;
.text-sm              -> font-size: 0.875rem; line-height: 1.25rem;
.text-base            -> font-size: 1rem; line-height: 1.5rem;
.text-lg              -> font-size: 1.125rem; line-height: 1.75rem;
.text-xl              -> font-size: 1.25rem; line-height: 1.75rem;
.text-2xl             -> font-size: 1.5rem; line-height: 2rem;
.text-3xl             -> font-size: 1.875rem; line-height: 2.25rem;
.text-4xl             -> font-size: 2.25rem; line-height: 2.5rem;
.text-5xl             -> font-size: 3rem; line-height: 1;
.text-6xl             -> font-size: 3.75rem; line-height: 1;
```

**Weights, style, alignment:**

```bash
.font-light           -> font-weight: 300;
.font-normal          -> font-weight: 400;
.font-medium          -> font-weight: 500;
.font-semibold        -> font-weight: 600;
.font-bold            -> font-weight: 700;

.italic               -> font-style: italic;
.not-italic           -> font-style: normal;

.text-left            -> text-align: left;
.text-center          -> text-align: center;
.text-right           -> text-align: right;
.text-justify         -> text-align: justify;

/* Line-height */
.leading-none         -> line-height: 1;
.leading-tight        -> line-height: 1.25;
.leading-snug         -> line-height: 1.375;
.leading-normal       -> line-height: 1.5;
.leading-relaxed      -> line-height: 1.625;
.leading-loose        -> line-height: 2;

/* Letter-spacing */
.tracking-tighter     -> letter-spacing: -0.05em;
.tracking-tight       -> letter-spacing: -0.025em;
.tracking-normal      -> letter-spacing: 0;
.tracking-wide        -> letter-spacing: 0.025em;
.tracking-wider       -> letter-spacing: 0.05em;
.tracking-widest      -> letter-spacing: 0.1em;
```

**Colors (examples from default palette):**

```bash
.text-black           -> color: #000000;
.text-white           -> color: #ffffff;
.text-gray-500        -> color: #6b7280;
.text-slate-700       -> color: #334155;
.text-blue-500        -> color: #3b82f6;
.text-emerald-600     -> color: #059669;

.bg-white             -> background-color: #ffffff;
.bg-gray-100          -> background-color: #f3f4f6;
.bg-slate-900         -> background-color: #0f172a;
.bg-blue-600          -> background-color: #2563eb;
.bg-rose-500          -> background-color: #f43f5e;

.decoration-sky-500   -> text-decoration-color: #0ea5e9;
.underline            -> text-decoration-line: underline;
.no-underline         -> text-decoration-line: none;
```

### 8. Borders & Radius

```bash
.border               -> border-width: 1px;
.border-0             -> border-width: 0;
.border-2             -> border-width: 2px;
.border-4             -> border-width: 4px;
.border-t             -> border-top-width: 1px;
.border-x-2           -> border-left-width: 2px; border-right-width: 2px;

.border-solid         -> border-style: solid;
.border-dashed        -> border-style: dashed;
.border-dotted        -> border-style: dotted;

.border-gray-200      -> border-color: #e5e7eb;
.border-slate-700     -> border-color: #334155;
.border-blue-500      -> border-color: #3b82f6;

/* Radius */
.rounded-none         -> border-radius: 0;
.rounded-sm           -> border-radius: 0.125rem;
.rounded               -> border-radius: 0.25rem;
.rounded-md           -> border-radius: 0.375rem;
.rounded-lg           -> border-radius: 0.5rem;
.rounded-xl           -> border-radius: 0.75rem;
.rounded-2xl          -> border-radius: 1rem;
.rounded-3xl          -> border-radius: 1.5rem;
.rounded-full         -> border-radius: 9999px;
.rounded-t-lg         -> border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;
```

### 9. Shadows, Rings, Filters

**Shadows (default set):**

```bash
.shadow-sm            -> box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
.shadow               -> box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
.shadow-md            -> box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
.shadow-lg            -> box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
.shadow-xl            -> box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
.shadow-2xl           -> box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
.shadow-inner         -> box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
.shadow-none          -> box-shadow: 0 0 #0000;

/* Rings */
.ring                 -> box-shadow: 0 0 0 3px rgb(59 130 246 / 0.5);  /* default ring color blue-500 at 50% */
.ring-2               -> box-shadow: 0 0 0 2px currentColor;
.ring-4               -> box-shadow: 0 0 0 4px currentColor;
.ring-offset-2        -> box-shadow: 0 0 0 2px #fff, 0 0 0 calc(2px + var(--tw-ring-offset-width, 0px)) currentColor;

/* Filters */
.blur-sm              -> filter: blur(4px);
.blur                 -> filter: blur(8px);
.blur-lg              -> filter: blur(16px);
.brightness-110       -> filter: brightness(1.1);
.contrast-125         -> filter: contrast(1.25);
.grayscale            -> filter: grayscale(100%);
.hue-rotate-60        -> filter: hue-rotate(60deg);
.saturate-150         -> filter: saturate(1.5);
.sepia                -> filter: sepia(100%);
```

### 10. Transitions & Transforms

```bash
.transition           -> transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-duration: 150ms; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
.transition-colors    -> transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
.transition-opacity   -> transition-property: opacity;
.duration-75          -> transition-duration: 75ms;
.duration-150         -> transition-duration: 150ms;
.duration-300         -> transition-duration: 300ms;
.ease-linear          -> transition-timing-function: linear;
.ease-in              -> transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
.ease-out             -> transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
.ease-in-out          -> transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

.transform            -> transform: translate(var(--tw-translate-x,0), var(--tw-translate-y,0)) rotate(var(--tw-rotate,0)) skewX(var(--tw-skew-x,0)) skewY(var(--tw-skew-y,0)) scaleX(var(--tw-scale-x,1)) scaleY(var(--tw-scale-y,1));
.scale-50             -> --tw-scale-x: .5; --tw-scale-y: .5; transform: ...;
.scale-95             -> --tw-scale-x: .95; --tw-scale-y: .95; transform: ...;
.scale-100            -> --tw-scale-x: 1; --tw-scale-y: 1; transform: ...;
.rotate-45            -> --tw-rotate: 45deg; transform: ...;
.-rotate-12           -> --tw-rotate: -12deg; transform: ...;
.translate-x-4        -> --tw-translate-x: 1rem; transform: ...;
.-translate-y-1/2     -> --tw-translate-y: -50%; transform: ...;
```

### 11. Opacity, Cursor, Pointer Events, Select

```bash
.opacity-0            -> opacity: 0;
.opacity-50           -> opacity: 0.5;
.opacity-100          -> opacity: 1;

.cursor-pointer       -> cursor: pointer;
.cursor-not-allowed   -> cursor: not-allowed;

.pointer-events-none  -> pointer-events: none;
.pointer-events-auto  -> pointer-events: auto;

.select-none          -> user-select: none;
.select-text          -> user-select: text;
```

### 12. Object Fit & Backgrounds

```bash
.object-contain       -> object-fit: contain;
.object-cover         -> object-fit: cover;
.object-center        -> object-position: center;
.object-left          -> object-position: left;

.bg-fixed             -> background-attachment: fixed;
.bg-local             -> background-attachment: local;
.bg-scroll            -> background-attachment: scroll;

.bg-center            -> background-position: center;
.bg-top               -> background-position: top;
.bg-bottom            -> background-position: bottom;

.bg-no-repeat         -> background-repeat: no-repeat;
.bg-repeat-x          -> background-repeat: repeat-x;

.bg-contain           -> background-size: contain;
.bg-cover             -> background-size: cover;

.bg-gradient-to-r     -> background-image: linear-gradient(to right, var(--tw-gradient-stops));
.from-blue-500        -> --tw-gradient-from: #3b82f6; --tw-gradient-to: rgb(59 130 246 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
.via-purple-500       -> --tw-gradient-via: #a855f7;
.to-pink-500          -> --tw-gradient-to: #ec4899;
```

### 13. Lists, Tables, Misc

```bash
.list-disc            -> list-style-type: disc;
.list-decimal         -> list-style-type: decimal;
.list-none            -> list-style-type: none;

.table                -> display: table;
.table-fixed          -> table-layout: fixed;
.border-collapse      -> border-collapse: collapse;
.border-separate      -> border-collapse: separate;

.align-top            -> vertical-align: top;
.align-middle         -> vertical-align: middle;
.align-bottom         -> vertical-align: bottom;

.shadow-none          -> box-shadow: 0 0 #0000;
.outline-none         -> outline: 2px solid transparent; outline-offset: 2px;
```

### 14. Responsive & State Variants (How to read them)

**Responsive prefixes generate media queries using default breakpoints:**

```bash
/* Example: md:text-lg */
@media (min-width: 768px) {
  .md\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
}
```

**State variants:**

```bash
/* Example: hover:bg-blue-600 */
.button:hover { background-color: #2563eb; }

/* Example: focus:ring */
.input:focus { box-shadow: 0 0 0 3px rgb(59 130 246 / 0.5); }
```

### Snippets

```bash
# ------------------------------------------------------ apply to tailwind.css file

@theme { 
  # create a custom color
  --color-eigengrau: #16161d;
}

@layer base {
  # all h1's will get these css properties applied to them
    h1 {
      @apply /* insert tailwind styles here */;
    }

  # all h2's will get these css properties applied to them
    h2 {
      @apply /* insert tailwind styles here */;
    }

  # all h3's will get these css properties applied to them
    h3 {
      @apply /* insert tailwind styles here */;
    }

  # all h4's will get these css properties applied to them
    h4 {
      @apply /* insert tailwind styles here */;
    }

  # all h5's will get these css properties applied to them
    h5 {
      @apply /* insert tailwind styles here */;
    }

  # all ps will get these css properties applied to them
    p {
      @apply /* insert tailwind styles here */;
    }

  # all buttons will get these css properties applied to them
    button {
      @apply /* insert tailwind styles here */;
    }
}

# ------------------------------------------------------ apply to html elements
# note: class names must be renamed from class="" to className="" in react / jsx

# custom accent colors
  <div class="my-4 flex flex-col text-white ml-2">
    <label> <input type="checkbox" checked /> Browser Default </label>
    <label> <input type="checkbox" class="accent-pink-500" checked /> Customized </label>
  </div>

# change text size based on screen size
  <p class="text-[min(10vw,70px)]">Fluid text here</p>

# choose file button
  <label>
    <input type="file" class="block w-full text-sm text-slate-500 file:mr4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-400 hover:file:text-white"
    />Choose File
  </label>

# change highlight color when user selects copy
  <div class="selection:bg-green-400 selection:text-white">
    <p>
      "Duis condimentum justo non odio dictum commodo. Sed eu gravida ante. Ut vitae velit a nunc tempor accumsan in sed nisl. Nulla tincidunt orci dolor, nec congue ligula varius vitae. Sed nunc dolor, malesuada at quam eu, mattis dictum felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin id ante quis elit luctus tincidunt eget quis mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla eros risus, pretium in enim vel, scelerisque vulputate arcu. Donec aliquet elit accumsan facilisis porta. Aliquam suscipit, ipsum eu rutrum lobortis, neque elit tempus purus, at hendrerit libero velit sit amet leo. Praesent et metus lacus. Ut congue, mi dapibus laoreet consequat, arcu quam ultricies dui, at sagittis mauris nunc eget mi."
    </p>
  </div>

# modify color of a cursor in a text area
  <textarea class="w-full caret-red-800 p2 text-white" placeholder="Write your story here"></textarea>

# ------------------------------------------------------ quick tailwind recipes
/* Center a div */
.flex.items-center.justify-center -> display: flex; align-items: center; justify-content: center;

/* Card */
.rounded-lg.shadow-md.p-6.bg-white -> border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); padding: 1.5rem; background-color: #fff;

/* Responsive grid */
.grid.grid-cols-1.md\:grid-cols-2.lg\:grid-cols-3.gap-6 ->
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;

@media (min-width: 768px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
@media (min-width: 1024px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }
```

### Notes

- Values shown reflect the default Tailwind theme. If you've customized your tailwind.config, your CSS equivalents will match your theme values.
- Many utilities set CSS custom properties that compose into one transform or filter. The important part is the resulting effect shown here.
- Color utilities map to fixed hex values in the default palette. Only a representative set is listed to keep this cheat practical.
- src: https://www.webdevultra.com/articles/tailwindcss-cheatsheet-css-equivalents