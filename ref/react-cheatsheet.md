```js
/*
██████╗ ███████╗ █████╗  ██████╗████████╗         ██╗███████╗██╗  ██╗
██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝         ██║██╔════╝╚██╗██╔╝
██████╔╝█████╗  ███████║██║        ██║            ██║███████╗ ╚███╔╝ 
██╔══██╗██╔══╝  ██╔══██║██║        ██║       ██   ██║╚════██║ ██╔██╗ 
██║  ██║███████╗██║  ██║╚██████╗   ██║       ╚█████╔╝███████║██╔╝ ██╗
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝        ╚════╝ ╚══════╝╚═╝  ╚═╝                                                     
*/
```
# React jsx - Cheatsheet

Quick reference for https://react.dev/ & https://www.w3schools.com/react/default.asp 

### useState()

Adds state to a function component — a value that persists across renders and triggers a re-render whenever it's updated. Returns an array of exactly two items: the current value, and a function to update it. Best for anything the UI needs to reflect directly (form inputs, toggles, counters, visibility flags).

```jsx
import { useState } from "react";

const [state, setState] = useState(initialValue);

// multiple state hooks
function MyCar(){
  const [brand, setBrand] = useState("Ford");
  const [model, setModel] = useState("Mustang");
  const [year, setYear] = useState("1964");
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My {brand}</h1>
      <p>
        It is a {color} {model} from {year}.
      </p>
    </>
  )

};

// state hook that holds an object
function MyCar() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
    </>
  )
};
```

---

### useEffect()

Runs a side effect after render — anything that reaches outside normal rendering (data fetching, subscriptions, timers, syncing with the DOM or browser APIs). Runs once on mount if the dependency array is empty, re-runs whenever a listed dependency changes, or runs after every render if the array is omitted entirely. Can return a cleanup function that runs before the next effect and on unmount.

```jsx
import { useEffect } from "react";

useEffect(() => {
  // effect logic here

  return () => {
    // cleanup logic here (optional)
  };
}, [/* dependencies */]);
```

---

### useRef()

Creates a persistent value that survives across renders without causing a re-render when it changes. Returns a single object with one property, `.current`. Two main uses: grabbing a direct reference to a DOM element (via the `ref` prop), or storing a mutable value that shouldn't affect what's rendered.

```jsx
import { useRef } from "react";

const myRef = useRef(initialValue);

// attach to a DOM element:
<div ref={myRef} />
```

---

### useContext()

Reads a shared value from a Context without passing it down manually through every component in between (avoids prop drilling). Requires three parts: `createContext()` to define the shared value, a `Provider` to supply it to a section of the tree, and `useContext()` inside any nested component to read it.

```jsx
import { createContext, useContext } from "react";

const MyContext = createContext(defaultValue);

// wrap the part of the tree that needs access:
<MyContext.Provider value={someValue}>
  {/* children */}
</MyContext.Provider>

// read it anywhere inside the Provider:
const value = useContext(MyContext);
```

---

### useMemo()

Caches the return value of a calculation between renders, only recomputing it when a listed dependency changes. A performance optimization — worth using when the calculation is genuinely expensive; unnecessary for cheap operations.

```jsx
import { useMemo } from "react";

const memoizedValue = useMemo(() => {
  return computeValue();
}, [/* dependencies */]);
```

---

### use()

A more flexible way to read a Context value or a Promise's resolved value (the latter pauses rendering via Suspense until it resolves). Unlike every other hook, `use()` can be called conditionally — inside an `if`, after an early return, or in a loop — since it isn't bound by the standard Rules of Hooks.

```jsx
import { use } from "react";

const value = use(MyContext);
// or
const data = use(somePromise);
```

---

### useGSAP()

The official React hook from `@gsap/react` — a drop-in replacement for `useEffect`/`useLayoutEffect` for GSAP animations. Automatically handles cleanup (reverting tweens, timelines, ScrollTriggers) on unmount or dependency change, with no manual cleanup function needed. Accepts a `scope` option so selector strings only match elements inside a given container, and a `dependencies` array/config to control when it re-runs. Requires `gsap.registerPlugin(useGSAP)` once, before use.

```jsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register the hook as a plugin
gsap.registerPlugin(useGSAP);

const container = useRef();

useGSAP(() => {
  // gsap code here...
}, { scope: container, dependencies: [] });

/* *** PLUGINS : These are separate imports/registrations on top of core GSAP
- These require separate installs/imports/registration beyond the base `gsap` + `@gsap/react` setup.
*/

// *** ScrollTrigger : animations tied to scroll position (parallax, reveal-on-scroll, scroll-scrubbed progress).
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the hook as a plugin
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
  y: 100,
});

// *** Timelines : sequencing multiple animations with precise, controllable timing relationships (instead of one standalone tween).
const tl = gsap.timeline();
tl.from(".box-1", { x: -100, opacity: 0 })
  .from(".box-2", { x: -100, opacity: 0 }, "-=0.3") // overlaps previous by 0.3s
  .to(".box-1", { rotation: 360 });

// *** Stagger : animates multiple elements in sequence rather than all at once (list items, grid cards).
gsap.from(".item", {
  opacity: 0,
  y: 20,
  stagger: 0.1, // 0.1s delay between each element
});

// *** contextSafe : wraps event-handler-triggered animations so they're properly tracked and cleaned up by useGSAP's context (needed when an animation is created inside a click/hover handler, not on mount).
const { contextSafe } = useGSAP({ scope: container });

const handleClick = contextSafe(() => {
  gsap.to(".box", { scale: 1.2 });
});

// *** Draggable : makes elements draggable with physics-based inertia, snapping, and bounds.
import { Draggable } from "gsap/Draggable";

// Register the hook as a plugin
gsap.registerPlugin(Draggable);

Draggable.create(".box", { bounds: container.current });

// *** SplitText : splits text into individual characters/words/lines for animating each piece separately (letter-by-letter reveals, typewriter effects).
import { SplitText } from "gsap/SplitText";

// Register the hook as a plugin
gsap.registerPlugin(SplitText);

const split = new SplitText(".heading", { type: "chars" });
gsap.from(split.chars, { opacity: 0, y: 20, stagger: 0.02 });

// *** DrawSVG : animates SVG stroke paths being "drawn" on screen.
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// Register the hook as a plugin
gsap.registerPlugin(DrawSVGPlugin);

gsap.from(".path", { drawSVG: "0%" });

// *** MorphSVG : animates one SVG shape smoothly morphing into another.
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Register the hook as a plugin
gsap.registerPlugin(MorphSVGPlugin);

gsap.to("#shape1", { morphSVG: "#shape2" });
```

---

### useReducer()

An alternative to `useState` for managing more complex state logic. Instead of calling a setter directly, you `dispatch` an action (a plain object describing what happened), and a separate `reducer` function decides how state should respond. Centralizes all state-transition logic in one place — best when multiple related state updates need to happen together, or when there are several distinct ways state can change.

```jsx
import { useReducer } from "react";

const initialState = { /* starting state shape */ };

function reducer(state, action) {
  switch (action.type) {
    case "ACTION_TYPE":
      return { ...state /* updated fields */ };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);

// trigger a state change:
dispatch({ type: "ACTION_TYPE" });
```

---

### customHooks()

**Description:** A custom hook is just a regular JavaScript function, named starting with `use`, that can call other hooks inside it (`useState`, `useEffect`, `useRef`, etc.). They exist to extract and reuse stateful logic across multiple components — instead of copy-pasting the same `useState`/`useEffect` combo into every component that needs it, that logic is written once and called wherever it's needed. Each call to a custom hook creates its own fully independent state — the *logic* is shared, not the *data*. The `use` prefix isn't just convention — it's what tells React and linters a function is allowed to call other hooks inside it, which is otherwise against the Rules of Hooks.

```jsx
// the custom hook itself — plain function, calls other hooks inside it
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);

  return { value, toggle }; // can return a single value, an array, or an object
}

// used inside a component exactly like a built-in hook
const { value, toggle } = useToggle();
```

---

### useActionState()

**Description:** A React 19 hook for managing form state tied to an async action (a form submission, a server request). Replaces the manual pattern of separate `useState` calls for form data, a pending/loading boolean, and error state. Takes an action function — which receives `(previousState, formData)` and returns the new state — and returns `[state, formAction, isPending]`. Wire `formAction` directly to a `<form>`'s `action` attribute; pending state is tracked automatically, with no manual `setIsPending` calls needed. Note: this hook was briefly called `useFormState` during React 19's canary releases before shipping under its final name.

```jsx
import { useActionState } from "react";

async function myAction(previousState, formData) {
  const value = formData.get("fieldName");

  // ...perform the action (validate, submit, fetch, etc.)...

  return newState; // becomes the new state, and the previousState on the NEXT submission
}

const [state, formAction, isPending] = useActionState(myAction, initialState);

// wire directly to a form's native action attribute:
<form action={formAction}>
  <input name="fieldName" />
  <button disabled={isPending}>{isPending ? "Submitting..." : "Submit"}</button>
</form>
```

---

### useOptimistic()

**Description:** A React 19 hook that immediately shows what a UI change will look like, before an async action (a server request) has actually finished — instead of waiting on a network round-trip, the UI jumps straight to the expected result. If the async action succeeds, the real state catches up. If it fails, React automatically reverts the UI back to the real value — no manual rollback code needed. Must be paired with `useTransition` (or an Action) — the optimistic update needs to happen inside an async transition for React to know when to revert.

```jsx
import { useOptimistic, useTransition } from "react";

const [optimisticState, setOptimisticState] = useOptimistic(
  realState,
  (currentState, newValue) => {
    return newValue; // computes the TEMPORARY optimistic value
  }
);

const [isPending, startTransition] = useTransition();

function handleAction(newValue) {
  startTransition(async () => {
    setOptimisticState(newValue);        // show it immediately
    await performRealUpdate(newValue);      // the actual async work
    // on success: update the REAL state to match
    // on failure: do nothing — optimisticState auto-reverts to realState
  });
}
```

---

### useCallback()

**Description:** Memoizes a *function*, returning the same function reference across renders as long as its dependencies haven't changed — instead of a new function being created (and instantly discarded) on every render. Functions are compared by reference, not by behavior, so this matters specifically when something else checks that reference: `React.memo` on a child component, a `useEffect`/`useMemo` dependency array, or a debounce/throttle timer. `useCallback(fn, deps)` is functionally equivalent to `useMemo(() => fn, deps)` — a convenience wrapper around the same underlying mechanism. As with `useMemo`, React 19's Compiler can automate a lot of this by hand — still essential to understand, but reach for it deliberately rather than by default.

```jsx
import { useCallback } from "react";

const handleClick = useCallback(() => {
  // function logic here
}, [/* dependencies */]);

// most common real use — paired with a memoized child:
const ChildButton = memo(({ onClick }) => { /* ... */ });
<ChildButton onClick={handleClick} />
```

---

### Props & Prop Drilling

**Description:** Props are how data flows from a parent component to a child — passed as attributes when rendering a component, read by the child as its function's argument, and read-only from the child's side (only the owning parent can change the underlying value). Data flows in one direction: parent to child, never child to parent directly. Prop drilling is what happens when a value is needed several component layers deep, but every intermediate component has to accept and re-pass it along, even though it never actually uses that value itself — just relaying it. Shallow drilling (one or two levels) is normal and fine; it only becomes worth solving differently (via Context or a custom hook) once it's happening across many layers or several unrelated branches of the tree.

```jsx
// plain props
function Child({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

<Child label="Click me" onClick={() => {}} />

// prop drilling — relayed through layers that don't use it themselves
function GrandParent({ value }) {
  return <Parent value={value} />;
}

function Parent({ value }) {
  return <Child value={value} />;
}

function Child({ value }) {
  return <p>{value}</p>; // the only layer that actually needs it
}
```

---

### Conditional Rendering

**Description:** How a component decides what to show (or whether to show anything) based on a condition. JSX has no special if/else syntax of its own — conditional rendering is just plain JavaScript expressions embedded in `{ }` that return JSX or nothing. Three common patterns: `&&` for "render something or nothing" (no else case), a ternary for "render one of two things," and `if`/`else` before the `return` for more complex branching that doesn't fit cleanly inline. Gotcha: `count && <p>{count}</p>` renders a literal `0` on screen if `count` is `0`, since `0` is falsy but still a valid renderable value in JSX (unlike `false`/`null`/`undefined`) — use `count > 0 && ...` or a ternary instead when a numeric value could be zero.

```jsx
// && — something or nothing
{condition && <p>Shown only if true</p>}

// ternary — one of two things
{condition ? <p>True case</p> : <p>False case</p>}

// if/else before return — more complex branching
function Component({ condition }) {
  if (condition) {
    return <p>True case</p>;
  }
  return <p>False case</p>;
}
```

---

### Lists & Keys

**Description:** Rendering a collection of data as JSX, typically via `.map()` — each array item is transformed into a piece of JSX, and the resulting array of elements is what actually renders. Every element produced inside a `.map()` needs a `key` prop: a stable, unique identifier React uses to track which specific item is which across re-renders. Without a correct key, React can't reliably tell what changed when the underlying array is reordered, filtered, or has items added/removed — it falls back to comparing by position, which can cause real bugs (state like a checked checkbox or a text input's value ending up attached to the wrong item). Using the array *index* as the key works for static lists that never change order or length, but breaks the moment the list becomes dynamic — the correct key is a stable value from the data itself (usually an `id`), not the item's position in the array.

```jsx
const items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" },
];

<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

---

### Component Composition / children prop

**Description:** Building complex UI by combining smaller components together, rather than one component handling every possible variation internally. The `children` prop is the mechanism that enables this — any JSX placed between a component's opening and closing tags is automatically passed to it as `children`, letting the component render whatever content it's given without knowing in advance what that content will be. Unlike regular props (which pass data), `children` passes actual renderable JSX — this is what makes wrapper components (Card, Modal, Layout, Provider) genuinely reusable across unpredictable content, instead of needing a new prop added every time a new kind of content needs to be supported.

```jsx
function Card({ title, children }) {
  return (
    <div className="p-4 rounded-lg border">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// anything nested between the tags becomes "children" automatically
<Card title="My Card">
  <p>Any content at all can go here.</p>
</Card>
```

---

### Controlled vs. Uncontrolled Components

**Description:** Two approaches to handling form inputs in React. Controlled inputs have their `value` driven entirely by React state, updated via `onChange` on every keystroke — React is the single source of truth for what the input holds, enabling live validation, formatting, and conditional logic as the user types. Uncontrolled inputs manage their own value internally (like plain HTML always has), with React only reading the current value on demand via a `ref`, rather than tracking every keystroke. Controlled is the right default for most real form work, but uncontrolled has genuine use cases — simple submit-once forms, and file inputs specifically, which are always uncontrolled in React since a `value` can't be set programmatically for security reasons.

```jsx
// Controlled
const [value, setValue] = useState("");
<input value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled
const inputRef = useRef(null);
<input ref={inputRef} defaultValue="" />
// read later, only when needed:
inputRef.current.value;
```

---

### Error Boundaries

**Description:** Special components that catch JavaScript errors thrown during rendering anywhere in their child component tree, and display a fallback UI instead of letting the entire app crash to a blank screen. Without one, an uncaught rendering error unmounts the entire React tree, even parts completely unrelated to where the error happened. Error boundaries must be written as class components — as of React 19, there is still no hooks-based equivalent. They do NOT catch errors in event handlers, async code (`setTimeout`, `fetch` callbacks), server-side rendering, or errors in the boundary's own code — those still need normal `try`/`catch` or conditional error-state handling.

```jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong.</p>; // fallback UI
    }
    return this.props.children;
  }
}

// usage — wrap any part of the tree you want protected
<ErrorBoundary>
  <SomeComponent />
</ErrorBoundary>
```

---

### Suspense

**Description:** A component that shows a fallback UI while its children aren't ready to render — most commonly while waiting on lazy-loaded component code (`lazy()`) or a Promise being read via `use()`. When a component inside a `<Suspense>` boundary "suspends," React displays the boundary's `fallback` and automatically swaps in the real content once ready. Any component using `use()` to read a Promise requires a `<Suspense>` boundary somewhere above it in the tree — this is not optional. Suspense does NOT automatically wait for images or fonts by default; that requires explicit newer (Canary-only, as of writing) integration.

```jsx
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

<Suspense fallback={<p>Loading...</p>}>
  <HeavyComponent />
</Suspense>

// or, reading a Promise with use():
import { use, Suspense } from "react";

function Profile({ userPromise }) {
  const user = use(userPromise);
  return <p>{user.name}</p>;
}

<Suspense fallback={<p>Loading user...</p>}>
  <Profile userPromise={userPromise} />
</Suspense>
```

---

### React Router

**Description:** The standard library for client-side routing in React — showing different content based on the URL without a full page reload, while keeping the browser's back/forward buttons, bookmarking, and refresh behaving normally. As of the current version (v8, package renamed from `react-router-dom` to plain `react-router` starting in v7), routes are defined as a configuration array passed to `createBrowserRouter()`, then rendered via `<RouterProvider>` — this "data router" approach also unlocks route-level data loading (`loader`/`action`) instead of fetching inside a `useEffect` after mount. Nested routes render inside a parent's `<Outlet />`, enabling a shared layout (nav/sidebar) that stays mounted while only the inner content changes. Use `<Link to="...">` instead of `<a href="...">` — a plain anchor tag triggers a full page reload and loses React state; `<Link>` doesn't.

```jsx
import { createBrowserRouter, RouterProvider, Outlet, Link, useParams } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "products/:id", element: <ProductDetail /> },
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams(); // reads ":id" from the matched URL
  return <p>Product ID: {id}</p>;
}
```

---

### React Hook Form

**Description:** A library that manages form state, validation, and submission through a single custom hook, `useForm()` — replacing the pattern of a separate `useState` per field. Uses uncontrolled components by default (inputs are wired via `register()`, which hands them a `ref`, not a `value`/`onChange` pair), so the form doesn't re-render on every keystroke the way a fully controlled form would — a real performance win, especially in forms with many fields. `formState.errors` holds validation errors keyed by field name, populated automatically based on the rules passed into `register()`. Commonly paired with Zod (a schema validation library) via `@hookform/resolvers` for combined runtime validation + TypeScript types from one shared schema — described as the standard modern stack for forms.

```jsx
import { useForm } from "react-hook-form";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: "Email is required" })} />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### Testing (React Testing Library + Vitest)

**Description:** React Testing Library tests components the way a real user interacts with them — finding elements by visible text, label, or role, then clicking/typing — rather than testing internal implementation details like state values or which functions got called. Vitest is the test runner that actually executes the tests and reports pass/fail; for Vite-based projects specifically (confirmed current guidance, not Create React App/Webpack), Vitest is the recommended choice over Jest, since it reuses the existing Vite config and pipeline directly. `@testing-library/jest-dom` extends `expect` with DOM-specific matchers like `toBeInTheDocument()`. Tests run in a terminal via `npm test`, in a simulated DOM (`jsdom`) — not in an actual browser, and not inside the app's own render tree.

```jsx
// setup (once per project): vite.config.js test block + src/setupTests.js
// import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Counter from "./Counter";

describe("Counter", () => {
  it("starts at 0", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("increments when the button is clicked", () => {
    render(<Counter />);
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
```

---

### Accessibility (a11y)

**Description:** Building components that work correctly with screen readers, keyboard-only navigation, and other assistive technology — not one specific API, but a lens applied across everything already built. The single highest-leverage habit: use real semantic HTML elements (`<button>`, not a clickable `<div>`) — they get keyboard focusability, Enter/Space activation, and correct screen-reader announcement automatically, for free. Pair every form input with a `<label>` via `htmlFor`/`id`. Manage focus programmatically when the UI changes (move focus into a modal on open, via `useRef` + `useEffect`). Reach for ARIA attributes only when semantic HTML genuinely can't cover something (like `aria-live` for announcing dynamic content changes) — prefer a real element over a `<div>` + ARIA whenever one exists.

```jsx
// semantic element — accessible by default
<button onClick={handleClick}>Submit</button>

// label paired with input
<label htmlFor="email">Email</label>
<input type="email" id="email" />

// focus management on open
const closeButtonRef = useRef(null);
useEffect(() => {
  if (isOpen) closeButtonRef.current.focus();
}, [isOpen]);

<div role="dialog" aria-modal="true">
  <button ref={closeButtonRef}>Close</button>
</div>

// ARIA for dynamic content announcements
<div role="status" aria-live="polite">{message}</div>
```

---

### Good Practices

```jsx
// when you have multiple lines of html elements in jsx : best practice is to wrap them in ()
const div = (
  <div>
    <button>Hello</button>
    <p>paragraph of text</p>
  </div>
);
```

---

### Snippets

```bash
snippets here
```

### Notes

- "Failed to resolve import" almost always means the package genuinely isn't installed yet, not a typo in your code.
- note

---