import { useState } from "react";

const DemoTestedCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-2">
      <p className="text-sm font-medium text-black">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)} // pass
        //onClick={() => setCount(count + 2)} // fail
        className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors w-fit"
      >
        Add
      </button>
    </div>
  );
};

export default DemoTestedCounter;