import { useState, useCallback, memo } from "react";

// A child wrapped in React.memo — only re-renders if its PROPS actually change (by reference)
const ChildButton = memo(({ onClick, label }) => {
  console.count(label); // logs to the browser console each time this component's function body runs

  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
    >
      {label}
    </button>
  );
});

const DemoUseCallback = () => {
  const [unrelatedCount, setUnrelatedCount] = useState(0);

  const handleClickNormal = () => {
    console.log("clicked");
  };

  const handleClickMemoized = useCallback(() => {
    console.log("clicked");
  }, []);

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-3">
      <button
        onClick={() => setUnrelatedCount(unrelatedCount + 1)}
        className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors w-fit"
      >
        Trigger Parent Re-render ({unrelatedCount})
      </button>

      <ChildButton onClick={handleClickNormal} label="No useCallback" />
      <ChildButton onClick={handleClickMemoized} label="With useCallback" />
    </div>
  );
};

export default DemoUseCallback;
/*
How to see the proof now: open your browser's DevTools console, click "Trigger Parent Re-render" a few times,
and watch the log — console.count("No useCallback") will climb every click, while console.count("With useCallback")
stays at 1. Same underlying proof as before, just moved out of JSX and into the console, which is actually
the correct place to check this kind of render-count debugging in real React work anyway.
*/