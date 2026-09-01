import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const DemoUseGSAP = () => {
  const container = useRef();
  const [key, setKey] = useState(0); // changing this re-triggers the animation

  useGSAP(() => {
    gsap.from(".animate-box", {
      scale: 1.9,
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, { scope: container, dependencies: [key] });

  return (
    <div ref={container} className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-3">
      <div className="animate-box w-16 h-16 rounded-md bg-amber-300 border border-amber-400" />
      <button
        onClick={() => setKey(key + 1)}
        className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors w-fit"
      >
        Replay Animation
      </button>
    </div>
  );
};

export default DemoUseGSAP;

/*
What's happening, tying everything together:

- useRef (container) — same DOM-access mechanism as your DemoUseRef card, just handed to useGSAP's scope option instead of called manually.
- useGSAP(() => {...}, { scope: container, dependencies: [key] }) — this is useEffect's dependency-array concept again, just spelled dependencies inside a config object instead of a bare array. When key changes, the animation re-runs.
- useState (key) — this is the trigger. Clicking "Replay Animation" increments key, which changes the dependencies array, which causes useGSAP to revert the previous animation and run it again.
- gsap.from(".animate-box", {...}) — animates from the given values to the element's current state (opposite of .to()) — the box slides in from the left and fades in, every time you click replay.
- No manual cleanup function anywhere — that's the whole point of useGSAP over raw useEffect: the revert-on-unmount (and revert-on-dependency-change) behavior is automatic.
*/