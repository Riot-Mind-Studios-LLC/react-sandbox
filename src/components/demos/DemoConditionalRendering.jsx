import { useState } from "react";

const DemoConditionalRendering = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          Toggle Login
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          Increase Count
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          Reset Count
        </button>
      </div>

      <div className="text-sm space-y-1">
        <p className="text-xs font-semibold text-gray-500">&& operator:</p>
        {isLoggedIn && <p>Welcome back!</p>}

        <p className="text-xs font-semibold text-gray-500 pt-2">Ternary:</p>
        <p>{isLoggedIn ? "Welcome back!" : "Please log in"}</p>

        <p className="text-xs font-semibold text-gray-500 pt-2">The "0" gotcha with && (broken):</p>
        <p>Count is: {count && count}</p>

        <p className="text-xs font-semibold text-gray-500 pt-2">Fixed version:</p>
        <p>Count is: {count > 0 ? count : "zero, rendered correctly"}</p>
      </div>
    </div>
  );
};

export default DemoConditionalRendering;

/*
What proves the concept here:

- oggle Login flips the && line on/off entirely and switches the ternary's two outcomes — same state, two different rendering patterns responding to it.
- Reset Count sets count back to 0 — watch the "broken" line: instead of showing nothing (or "0"), it literally renders a bare 0 on the page, exactly matching the gotcha explained in the pattern.
- The fixed version right below it handles 0 correctly, so you can directly compare the broken and correct approaches side by side, with the same underlying state.
*/