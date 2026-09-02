import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

const DemoUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-3">
      <p className="text-sm font-medium">Count: {state.count}</p>
      <div className="flex gap-2">
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          -
        </button>
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DemoUseReducer;

/*
What's happening:

- Three buttons, three different actions — each just calls dispatch with a different type, and the reducer function is the single place that decides what each one actually does to state.
- Notice there's no setState-style logic scattered across three separate click handlers — all the "how does state change" logic lives in one function (reducer), and the component itself just describes what happened (dispatch({ type: "INCREMENT" })) without knowing or caring how that translates into a new state value.
- This is the real payoff: as the number of possible actions grows (imagine adding "increment by 5," "set to a specific value," "double it"), you just add more case statements to the same reducer — the component's dispatch calls stay just as simple, and all the state-transition logic stays centralized and easy to reason about in one spot, instead of growing more useState calls and handler functions scattered throughout the component.
*/