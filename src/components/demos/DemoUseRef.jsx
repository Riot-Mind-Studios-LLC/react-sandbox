import { useRef } from "react";

const DemoUseRef = () => {
  const inputRef = useRef(null); // useRef(null) — starts as null since there's no DOM node yet on first render.

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        className="px-3 py-1.5 rounded-md border border-amber-300 text-sm"
      />
      <button
        onClick={handleFocus}
        className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors w-fit"
      >
        Focus Input
      </button>
    </div>
  );
};

export default DemoUseRef;