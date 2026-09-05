```js
/*
 ██████╗ ███████╗ █████╗ ██████╗ 
██╔════╝ ██╔════╝██╔══██╗██╔══██╗
██║  ███╗███████╗███████║██████╔╝
██║   ██║╚════██║██╔══██║██╔═══╝ 
╚██████╔╝███████║██║  ██║██║     
 ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝                                                 
*/
```
# GSAP - Cheatsheet

Quick reference for GSAP (GreenSock Animation Platform) core syntax and patterns.

**Licensing note (confirmed current):** GSAP is 100% free, including every plugin (SplitText, MorphSVG, DrawSVG, ScrollTrigger, ScrollSmoother, Draggable, etc.) — even for commercial use. Webflow acquired GreenSock in October 2024 and made the entire toolset free in April 2025. There is no more "Club GreenSock" paid tier; nothing in this sheet requires a license or membership.

### 1. Setup & Installation

```bash
npm install gsap
```

```js
import gsap from "gsap";

// plugins are included in the same package — import them individually as needed
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText); // register once, before using any plugin
```

### 2. Core Tweens — `.to()` / `.from()` / `.fromTo()`

```js
gsap.to(".box", {
  x: 100,           // animates TO this value, starting from current state
  duration: 1,        // in seconds
});

gsap.from(".box", {
  x: -100,             // animates FROM this value TO the element's current/CSS state
  opacity: 0,
  duration: 1,
});

gsap.fromTo(
  ".box",
  { x: -100, opacity: 0 },  // starting values (explicit, not read from current state)
  { x: 0, opacity: 1, duration: 1 } // ending values
);

gsap.set(".box", { x: 100 });  // instantly sets values, no animation — useful for initial state setup
```

### 3. Common Animatable Properties

```js
gsap.to(".box", {
  x: 100,              // translateX in px (also accepts "50%", "10rem", etc.)
  y: 50,                 // translateY
  rotation: 360,           // degrees
  scale: 1.5,                // uniform scale
  scaleX: 2,                   // scale on one axis only
  opacity: 0.5,
  backgroundColor: "#3b82f6",
  width: "200px",
  height: 100,
  borderRadius: "50%",
  duration: 1,
  ease: "power2.out",
});

// x/y use TRANSFORMS under the hood (translateX/Y), not left/top —
// this is why GSAP recommends them over animating position properties directly (better performance)
```

### 4. Duration, Delay & Easing

```js
gsap.to(".box", {
  x: 100,
  duration: 1.5,      // seconds
  delay: 0.5,            // waits before starting
  ease: "power2.out",      // controls the acceleration curve of the animation

  // common eases:
  // "none"           -> linear, constant speed
  // "power1.out"      -> gentle deceleration
  // "power2.out"       -> moderate deceleration (very common default)
  // "power3.out"         -> strong deceleration
  // "back.out(1.7)"        -> slight overshoot before settling
  // "elastic.out(1, 0.3)"    -> springy, bouncy overshoot
  // "bounce.out"                -> bounces like a dropped ball
});
```

### 5. Callbacks

```js
gsap.to(".box", {
  x: 100,
  duration: 1,
  onStart: () => console.log("animation started"),
  onUpdate: () => console.log("running every frame"),
  onComplete: () => console.log("animation finished"),
  onRepeat: () => console.log("repeated"),
});
```

### 6. Repeat & Yoyo

```js
gsap.to(".box", {
  x: 100,
  duration: 1,
  repeat: 3,            // repeats 3 additional times (4 total plays); use -1 for infinite
  repeatDelay: 0.5,        // pause between each repeat
  yoyo: true,                // reverses direction on each repeat instead of snapping back to start
});
```

### 7. Timelines — Sequencing Multiple Animations

```js
const tl = gsap.timeline();

tl.to(".box-1", { x: 100, duration: 1 })
  .to(".box-2", { y: 50, duration: 1 })          // starts after box-1 finishes (default: sequential)
  .to(".box-3", { opacity: 0, duration: 1 }, "-=0.5"); // starts 0.5s BEFORE the previous one ends (overlap)

// position parameter (the 3rd argument) controls timing:
// "-=0.5"    -> starts 0.5s before the previous tween ends (overlap)
// "+=0.5"    -> starts 0.5s after the previous tween ends (gap)
// 2            -> starts at the 2-second mark of the whole timeline (absolute time)
// "<"           -> starts at the same time as the previous tween (parallel)

// timeline defaults — applied to every tween added to this timeline
const tl2 = gsap.timeline({
  defaults: { duration: 1, ease: "power2.out" },
});

// timeline controls
tl.play();
tl.pause();
tl.reverse();
tl.restart();
tl.seek(1.5);       // jumps to the 1.5-second mark
tl.timeScale(2);      // plays at 2x speed
```

### 8. Stagger — Animating Multiple Elements in Sequence

```js
gsap.from(".item", {
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.1,           // 0.1s delay between each element's start time
});

gsap.from(".item", {
  opacity: 0,
  stagger: {
    each: 0.1,               // delay between each item
    from: "center",             // stagger origin: "start" | "end" | "center" | "edges" | "random"
    grid: "auto",                 // treats the elements as a grid for directional stagger
  },
});
```

### 9. `useGSAP` (React Hook — from `@gsap/react`)

```jsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP); // register once, before using useGSAP or any GSAP code

function Example() {
  const container = useRef();

  useGSAP(() => {
    // gsap code here...
    gsap.to(".box", { x: 100 }); // <-- automatically reverted on unmount
  }, { scope: container }); // <-- scope for selector text (optional but recommended)

  return (
    <div ref={container}>
      <div className="box">Animated</div>
    </div>
  );
}
```

- Drop-in replacement for `useEffect`/`useLayoutEffect` for GSAP work — handles cleanup automatically via `gsap.context()`.
- `scope` lets you use plain CSS selectors (`.box`) instead of a `useRef()` for every single element — selectors only match inside the scoped container.
- Second argument accepts either a plain dependency array (like `useEffect`) or a config object (`{ scope, dependencies }`) for more control.
- Correctly handles React Strict Mode's double-invocation in development — raw `useEffect` GSAP code tends to visibly double-fire.

### 10. `contextSafe` — Event-Handler-Triggered Animations

```jsx
function Example() {
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });

  const handleClick = contextSafe(() => {
    gsap.to(".box", { scale: 1.2 }); // properly tracked/cleaned up, even though it's not inside useGSAP's callback
  });

  return (
    <div ref={container}>
      <div className="box" onClick={handleClick} />
    </div>
  );
}
```

Animations created inside a raw event handler (click, hover, etc.) aren't automatically tracked by `useGSAP`'s context the way animations inside the hook's own callback are — `contextSafe` wraps the handler so those animations get properly reverted too.

### 11. ScrollTrigger — Scroll-Based Animations

```js
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x: 200,
  scrollTrigger: {
    trigger: ".box",         // the element that triggers the animation
    start: "top center",       // when ".box"'s top hits the viewport's center
    end: "bottom center",
    scrub: true,                 // ties animation progress directly to scroll position (not autoplay)
    markers: true,                 // shows visual debug markers — remove before production
    pin: true,                       // pins the trigger element in place while scrolling through it
  },
});

// shorthand for a simple reveal-on-scroll animation
gsap.from(".card", {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: ".card",
    start: "top 80%",   // starts when the card's top is 80% down the viewport
    toggleActions: "play none none reverse", // onEnter, onLeave, onEnterBack, onLeaveBack
  },
});
```

### 12. SplitText — Text Animation

```js
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const split = new SplitText(".heading", { type: "chars, words, lines" });

gsap.from(split.chars, {
  opacity: 0,
  y: 20,
  stagger: 0.02,
});

// split.revert() restores the original, unsplit markup — important to call this
// on cleanup (useGSAP handles this automatically if used inside its scope)
```

### 13. Other Notable Plugins

```js
// Draggable — makes elements draggable with inertia, snapping, bounds
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
Draggable.create(".box", { bounds: container.current, inertia: true });

// Flip — animates elements smoothly between two different DOM/CSS states
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);
const state = Flip.getState(".box");
// ...make a DOM/class change...
Flip.from(state, { duration: 0.5 });

// MorphSVG — morphs one SVG shape into another
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);
gsap.to("#shape1", { morphSVG: "#shape2" });

// DrawSVG — animates SVG stroke paths being "drawn"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);
gsap.from(".path", { drawSVG: "0%" });

// Observer — detects scroll/touch/pointer gestures without tying to scroll position
import { Observer } from "gsap/Observer";
gsap.registerPlugin(Observer);
Observer.create({
  target: "#area",
  onUp: () => console.log("swiped/scrolled up"),
  onDown: () => console.log("swiped/scrolled down"),
});
```

### 14. `gsap.context()` (what `useGSAP` wraps internally)

```js
import { useRef, useLayoutEffect } from "react";

function Example() {
  const container = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".box", { x: 100 }); // scoped to the container, selector-safe
    }, container);

    return () => ctx.revert(); // reverts everything created inside the context on cleanup
  }, []);

  return <div ref={container}><div className="box" /></div>;
}

// this is the manual, pre-useGSAP version of the same pattern —
// useGSAP exists specifically so you don't have to write this by hand
```

### 15. `gsap.matchMedia()` — Responsive Animations

```js
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  gsap.to(".box", { x: 200 }); // only runs on screens 768px and wider
});

mm.add("(max-width: 767px)", () => {
  gsap.to(".box", { x: 50 }); // a different animation for mobile
});
```

### Notes

- **Always prefer transform-based properties** (`x`, `y`, `scale`, `rotation`) over layout properties (`width`, `height`, `top`, `left`) when possible — transforms are GPU-accelerated and don't trigger browser reflow, meaning better performance, especially for anything animating frequently or alongside other elements.
- **Cleanup matters in React** — any GSAP animation, ScrollTrigger, or SplitText instance needs to be reverted/killed when a component unmounts, or it can keep running against DOM nodes that no longer exist. `useGSAP` (section 9) and `gsap.context()` (section 14) both handle this automatically — don't skip it if writing raw `useEffect` GSAP code.
- **Scope selectors to their container** — plain selector strings like `.box` search the entire page by default. Always pass a `scope` (via `useGSAP`) or use `gsap.context(fn, container)` so `.box` only matches elements inside the component that owns it, not identical class names elsewhere on the page.
- This is a reference for core GSAP + the React-specific `useGSAP` hook — see the React hooks cheat-sheet for how `useGSAP` fits alongside `useRef` and `useState` in a full working demo.