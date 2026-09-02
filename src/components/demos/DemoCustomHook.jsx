import useToggle from "../../hooks/useToggle.js";

const DemoCustomHook = () => {
  const light1 = useToggle();      // first call — its own independent state
  const light2 = useToggle(true);    // second call — a SEPARATE independent state, started as true

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Light 1: {light1.value ? "ON" : "OFF"}</span>
        <button
          onClick={light1.toggle}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          Toggle
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Light 2: {light2.value ? "ON" : "OFF"}</span>
        <button
          onClick={light2.toggle}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          Toggle
        </button>
      </div>
    </div>
  );
};

export default DemoCustomHook;

/*
What proves the point here:

- useToggle() is called twice in the same component — once for light1, once for light2.
- Clicking Light 1's button never affects Light 2's state, and vice versa — each call to useToggle() creates its own completely separate useState internally.
- light2 even starts with a different initial value (true) than light1 (defaults to false) — proving each call is independently configured, not sharing anything.

This is the exact thing that makes custom hooks genuinely useful: you wrote the toggle logic once, but you get as many independent instances of it as you want, just by calling the hook again.
*/