```js
/*
███████╗██╗  ██╗ █████╗ ██████╗  ██████╗███╗   ██╗
██╔════╝██║  ██║██╔══██╗██╔══██╗██╔════╝████╗  ██║
███████╗███████║███████║██║  ██║██║     ██╔██╗ ██║
╚════██║██╔══██║██╔══██║██║  ██║██║     ██║╚██╗██║
███████║██║  ██║██║  ██║██████╔╝╚██████╗██║ ╚████║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝╚═╝  ╚═══╝                                                   
*/
```
# shadcn/ui + Radix UI - Cheatsheet

Quick reference for shadcn/ui and Radix UI conventions and patterns.

**Naming note (confirmed current):** the CLI package was renamed from `shadcn-ui` to `shadcn`. Older tutorials referencing `npx shadcn-ui@latest` will fail with "command not found" — use `npx shadcn@latest` instead.

### 1. What shadcn/ui Actually Is

shadcn/ui is **not a component library you install as a dependency** — it's a CLI that copies component source code directly into your own project (usually `src/components/ui/`). You own and can freely edit every line, unlike a traditional library where components live in `node_modules` and stay closed off. It's built on top of **Radix UI** (unstyled, accessible component primitives) and styled with **Tailwind CSS**.

```
Radix UI    -> provides the BEHAVIOR: accessibility, keyboard nav, focus management, open/close state
shadcn/ui      -> provides the STYLING + STRUCTURE on top of Radix, as code you copy into your project
Tailwind CSS      -> the utility classes shadcn's copied components are styled with
```

### 2. CLI — Setup

```bash
npx shadcn@latest init          # sets up the project: installs deps, adds the cn util, configures CSS variables
# you'll be prompted for: style, base color, whether to use a src/ directory, etc.
# (or pass -y to skip prompts and accept defaults)
```

This creates a `components.json` file at your project root — shadcn's config file that tracks your chosen style, paths, and aliases, so future `add` commands know where to place files.

### 3. CLI — Adding Components

```bash
npx shadcn@latest add button          # adds one component
npx shadcn@latest add button dialog select    # adds multiple at once
npx shadcn@latest add                    # no arguments — shows an interactive list of every available component
```

Running `add` copies the component's source file into `src/components/ui/`, AND installs whatever Radix primitive/dependency that specific component actually needs (e.g. adding `dialog` installs `@radix-ui/react-dialog` automatically).

### 4. Import & Basic Usage

```jsx
import { Button } from "@/components/ui/button";

function Example() {
  return <Button variant="outline" size="lg">Click me</Button>;
}
```

Once added, a shadcn component is imported and used exactly like any other component you wrote yourself — because, structurally, it is one now.

### 5. The `cn()` Utility

```jsx
import { cn } from "@/lib/utils";

function Card({ className, isActive }) {
  return (
    <div className={cn("p-4 rounded-lg border", isActive && "border-blue-500", className)}>
      Content
    </div>
  );
}
```

```js
// what cn() actually does under the hood — combines two small libraries:
import { clsx } from "clsx";           // conditionally joins class names together
import { twMerge } from "tailwind-merge"; // resolves CONFLICTING Tailwind classes intelligently

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

Without `twMerge`, passing both a default class and an overriding class (e.g. `"p-4"` and a later `"p-8"`) would leave both in the string, and CSS's normal cascade rules would decide which wins unpredictably. `twMerge` recognizes they're the same Tailwind property and keeps only the later one — this is why every shadcn component accepts a `className` prop that can genuinely override its defaults, not just append to them.

### 6. Variants — `class-variance-authority` (cva)

```jsx
// this is roughly what's inside a shadcn component file like button.jsx
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors", // base classes, always applied
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background",
        ghost: "hover:bg-accent",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// usage: buttonVariants({ variant: "outline", size: "lg" }) returns the correct class string
```

This is the mechanism behind every shadcn component's `variant`/`size` props (as seen in section 4) — `cva` maps prop combinations to specific class strings, so you write `<Button variant="outline" size="lg" />` instead of memorizing raw class names.

### 7. Radix Primitives — Composition Pattern

```jsx
// Radix components are built from several small, composable pieces, not one monolithic component
import * as Dialog from "@radix-ui/react-dialog";

function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Title</Dialog.Title>
          <Dialog.Description>Description</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// shadcn's <Dialog> components are this exact same structure, already styled and
// re-exported with friendlier names — DialogTrigger, DialogContent, DialogTitle, etc.
```

`Root` manages shared state (open/closed) and passes it down to every other piece automatically — none of the pieces need props manually connecting them to each other.

### 8. The `asChild` Prop

```jsx
import { Button } from "@/components/ui/button";
import Link from "next/link"; // or a react-router <Link>, etc.

// WITHOUT asChild — renders a real <button>, wrapping/nesting a link inside it (invalid HTML)
<Button><Link href="/about">About</Link></Button>

// WITH asChild — Radix merges its own props/behavior ONTO the child element instead of
// rendering its own wrapper, so the link itself becomes the styled, accessible trigger
<Button asChild>
  <Link href="/about">About</Link>
</Button>
```

`asChild` is a Radix-provided pattern (shadcn components inherit it) for avoiding invalid nested-element HTML while still keeping all the component's styling and accessibility behavior intact.

### 9. Theming via CSS Variables

```css
/* Tailwind v4 — defined in your CSS file via @theme, not tailwind.config.js */
@theme {
  --color-primary: oklch(0.6 0.15 250);
  --color-background: oklch(1 0 0);
  --radius: 0.5rem;
}

.dark {
  --color-primary: oklch(0.7 0.15 250);
  --color-background: oklch(0.15 0 0);
}
```

```jsx
// components reference these tokens via Tailwind classes, never hardcoded colors
<div className="bg-background text-foreground border-border" />
```

shadcn's whole theming system is CSS variables + Tailwind color tokens — switching themes (like light/dark) means swapping which variable values are active, not swapping component code.

### 10. Customizing a Component

```jsx
// since you OWN the file (src/components/ui/button.jsx), editing it directly
// is expected and normal — not a workaround, the actual intended workflow

// example: adding a brand-new variant directly into the copied file
const buttonVariants = cva("...", {
  variants: {
    variant: {
      default: "...",
      outline: "...",
      // your own addition:
      brand: "bg-eigengrau text-white hover:bg-eigengrau/90",
    },
  },
});
```

This is the core difference from a traditional npm component library — there's no "ejecting" or fighting the library's API to customize something; you just edit the file like any other code you wrote.

### 11. Accessibility (built-in via Radix)

```
Radix primitives handle, automatically, without extra code:
  - correct ARIA attributes (role, aria-expanded, aria-controls, etc.)
  - keyboard navigation (Tab, Escape, Arrow keys — varies per component)
  - focus management (trapping focus inside an open Dialog, returning it on close)
  - screen reader announcements for state changes

This is a major reason shadcn/Radix is favored over hand-building custom UI from
scratch with plain <div>s — accessibility that's easy to get wrong by hand comes
already correct by using the primitive as intended.
```

### 12. Common Components Quick Reference

```jsx
import { Button } from "@/components/ui/button";
<Button variant="default | outline | ghost | destructive | link" size="default | sm | lg | icon">

import { Input } from "@/components/ui/input";
<Input type="email" placeholder="Email" />

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
<Select>
  <SelectTrigger><SelectValue placeholder="Choose..." /></SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Sidebar, SidebarProvider, SidebarTrigger, SidebarContent } from "@/components/ui/sidebar";
// note: Sidebar specifically requires SidebarProvider to wrap it — a Context-based
// pattern (see the useContext hook cheat-sheet) — components using useSidebar() must
// be rendered inside that Provider
```

### Notes

- The single most important mental shift with shadcn/ui: it's **copied code you own**, not an installed dependency you configure through props/config files alone — when something doesn't do quite what you want, editing the actual component file is the correct move, not a hack.
- `cn()` (section 5) should be used on every component's `className` prop that needs to merge default styles with an incoming override — skipping it and using plain template-literal concatenation instead can cause Tailwind classes to silently conflict instead of properly overriding.
- Radix's compound-component pattern (section 7 — `Root`/`Trigger`/`Content`/etc.) is worth recognizing as a general React pattern too, not just a Radix-specific thing — it's a common way to build flexible, composable components that share implicit state via Context.
- This sheet assumes Tailwind CSS v4 conventions (CSS-first `@theme` config, matching your own project setup) — shadcn also supports Tailwind v3 projects, which configure theming through `tailwind.config.js` instead.