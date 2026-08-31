// import dependancies
import { useState } from "react";

const DemoUseState = () => {
  // count = whatever is in useState(stored variable)
  // its returned whenever you call usedState() as an array
  // count = [stored variable]
  // can be destructured as 2 seperate variables
    // the state variable: count
    // the function (or variable) used to update the state variable: setCount
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white">
      <p className="text-sm font-medium mb-2">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
      >
        Add
      </button>
    </div>
  );
};

export default DemoUseState;
