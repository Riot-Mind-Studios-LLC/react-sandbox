import { useState, useMemo } from "react";

// a deliberately slow function, to make the effect of useMemo visible
const slowSum = (num) => {
  let total = 0;
  for (let i = 0; i < 500000000; i++) {
    total += num;
  }
  return total;
};

const DemoUseMemo = () => {
  const [number, setNumber] = useState(1);
  const [unrelatedCount, setUnrelatedCount] = useState(0);

  const total = useMemo(() => slowSum(number), [number]);

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-3">
      <div>
        <p className="text-sm font-medium">Slow calculation result: {total}</p>
        <button
          onClick={() => setNumber(number + 1)}
          className="mt-1 px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          Increase Number (triggers recalculation)
        </button>
      </div>

      <div>
        <p className="text-sm font-medium">Unrelated count: {unrelatedCount}</p>
        <button
          onClick={() => setUnrelatedCount(unrelatedCount + 1)}
          className="mt-1 px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          Increase Unrelated Count (no recalculation)
        </button>
      </div>
    </div>
  );
};

export default DemoUseMemo;

/*
What's happening:

- slowSum is deliberately inefficient (500 million loop iterations) — purely to make the delay noticeable when it runs, so you can actually feel the difference in the demo, not just read about it.
- useMemo(() => slowSum(number), [number]) — this only re-runs slowSum when number changes.
- Clicking "Increase Number" changes number → it's in the dependency array → slowSum re-runs → you'll feel a noticeable pause before the UI updates.
- Clicking "Increase Unrelated Count" changes unrelatedCount → the component still re-renders (since some state changed) → but number didn't change, so useMemo skips slowSum entirely and hands back the cached total instantly, with no lag.
- That contrast — one button feels slow, the other feels instant, even though both trigger a re-render — is the actual, tangible proof of what useMemo is doing.
*/