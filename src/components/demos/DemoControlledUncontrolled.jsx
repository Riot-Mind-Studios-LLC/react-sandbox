import { useState, useRef } from "react";

const DemoControlledUncontrolled = () => {
  // controlled
  const [controlledValue, setControlledValue] = useState("");

  // uncontrolled
  const uncontrolledRef = useRef(null);
  const [uncontrolledDisplay, setUncontrolledDisplay] = useState("(not read yet)");

  const readUncontrolled = () => {
    setUncontrolledDisplay(uncontrolledRef.current.value);
  };

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-4">
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1">Controlled — updates live, every keystroke</p>
        <input
          value={controlledValue}
          onChange={(e) => setControlledValue(e.target.value.toUpperCase())}
          placeholder="Type here..."
          className="px-3 py-1.5 rounded-md border border-amber-300 text-sm w-full"
        />
        <p className="text-sm mt-1">
          Live (forced uppercase via state): <span className="font-mono">{controlledValue}</span>
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1">Uncontrolled — only read when you ask for it</p>
        <input
          ref={uncontrolledRef}
          defaultValue=""
          placeholder="Type here..."
          className="px-3 py-1.5 rounded-md border border-amber-300 text-sm w-full"
        />
        <button
          onClick={readUncontrolled}
          className="mt-1 px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          Read Value
        </button>
        <p className="text-sm mt-1">
          Last read: <span className="font-mono">{uncontrolledDisplay}</span>
        </p>
      </div>
    </div>
  );
};

export default DemoControlledUncontrolled;

/** What proves the concept here:
 * The controlled input forces uppercase as you type — onChange transforms every keystroke through state before it's ever redisplayed, so you can watch React actively rewriting what you typed, live. This is something genuinely impossible with an uncontrolled input, since nothing intercepts each keystroke — this is exactly the kind of "reformat/validate as you type" use case that requires the controlled pattern.
 * The uncontrolled input's "Last read" text stays frozen at whatever it was last time you clicked "Read Value" — type into that input all you want, and the display below it won't budge until you explicitly click the button, proving React genuinely isn't tracking each keystroke there at all.
 * Type in both inputs side by side and the difference is immediate: one is reactive in real time, the other is silent until asked.
 */