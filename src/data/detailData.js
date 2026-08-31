// import components
import DemoUseState from "../components/demos/DemoUseState.jsx"; // the component that renders a useState();
import DemoUseEffect from "../components/demos/DemoUseEffect.jsx"; // the component that renders a useEffect();
import DemoUseRef from "../components/demos/DemoUseRef.jsx"; // the component that renders a useRef();
import DemoUseContext from "../components/demos/DemoUseContext.jsx"; // the component that renders a useContext();

/*
-- Notes:
  - This detailData.js isn't just a pass-through — it's the one place doing double-duty. It imports DemoUseState.jsx/DemoUseEffect.jsx at the top of the file, then stores a reference to each one on its matching array entry (demo: DemoUseState).
  - Card.jsx never imports the demo files directly — it just receives that reference as part of details, and renders whichever one applies with <details.demo />.
  - So the real chain per card is:
    - demo component gets built → imported into detailData.js → attached to that entry's demo field → handed to Card.jsx as part of the array → rendered live when the card maps over it.
*/

const detail = [
  {
    title: "useState() React Hook",
    description:
      "Anytime a component needs to 'remember' something and re-render when it changes — form inputs, toggles, counters, etc. Use state is good for capturing user inputs in form fields like inputs text areas and selects. It can be good to show or hide components like modals, tooltips or dropdowns when you give it a boolean state value. You can also use a boolean state value to conditionally apply classes and styles and you can work with number values like in shopping carts or counters. State is immutable (can't modify directly) while refs are mutable (can modify directly).",
    example: `
    ██╗   ██╗███████╗███████╗███████╗████████╗ █████╗ ████████╗███████╗
    ██║   ██║██╔════╝██╔════╝██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
    ██║   ██║███████╗█████╗  ███████╗   ██║   ███████║   ██║   █████╗
    ██║   ██║╚════██║██╔══╝  ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝
    ╚██████╔╝███████║███████╗███████║   ██║   ██║  ██║   ██║   ███████╗
     ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝

    // 1. give it an initial value (can be any javascript value)
    // 2. that will be stored in your state variable thats returned when you call useState()
    // 3. its returned in an array which can be destructured as 2 seperate variables
    const [stateVariable, functionOrVariableToUpdateTheStateVariable] = useState('Initial Value');

    // example usage
    import { useState } from "react";

    function Counter() {
      const [count, setCount] = useState(0);

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Add</button>
        </div>
      );

    }

    // count = whatever is in useState(stored variable);
    // its returned whenever you call usedState() as an array
    // count = [stored variable]
    // can be destructured as 2 seperate variables
      // the state variable: count
      // the function (or variable) used to update the state variable: setCount

    // ============================================
    // THE useState WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
    //      | import DemoUseState from "../components/demos/DemoUseState.jsx";
    //      | ...
    //      | { title: "useState() React Hook", ..., demo: DemoUseState }
    //      v
    //   DemoUseState.jsx
    //      | const [count, setCount] = useState(0);
    //      | renders a button that increments count on click
    //
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the useState entry, this becomes <DemoUseState />
    //   -> mounts the real, live counter component on the page
     `,
    tags: [
      "useState()",
      ".js data-file",
      ".jsx demo-file",
      "stored variables",
      "stored functions",
    ],
    demo: DemoUseState, // calling the component that renders a useState(); so it can be used in the Card.jsx component
    category: "React Hooks",
  },
  {
    title: "useEffect() React Hook",
    description:
      "This hook is used to perform side-effects in react. It lets you synchronize with a system outside of react and is asynchronous. useEffect lets a component 'step outside' normal rendering to do something that isn't about what's on screen — things like starting a timer, subscribing to an event, fetching data, or syncing with something outside React (the DOM, browser APIs, a server). It runs automatically after render, and re-runs whenever the values in its dependency array change — so instead of the user triggering something (like a click or typing in a form field), the effect triggers itself in response to state/props changing, or once on mount if the dependency array is empty. Types of effects include: event based side effects (i.e. button click, filling out a form field) and render-based side effects (i.e. fetching data) - runs after render. You can use this hook when you need to sync your react code with a browser api. useEffect is a broad tool for lots of side effects (timers, subscriptions, DOM syncing, event listeners).",
    example: `
    ██╗   ██╗███████╗███████╗███████╗███████╗███████╗███████╗ ██████╗████████╗
    ██║   ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝╚══██╔══╝
    ██║   ██║███████╗█████╗  █████╗  █████╗  █████╗  █████╗  ██║        ██║
    ██║   ██║╚════██║██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██║        ██║
    ╚██████╔╝███████║███████╗███████╗██║     ██║     ███████╗╚██████╗   ██║
     ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝   ╚═╝

    // 1. give use effect a function to run - by default, it will run after each render
    // 2. to change that behavior, you can give it a dependancies array
    // 3. whan any value in this array changes,the effect function will run
    // 4. when it changes or an action is taken it will be updated in state which, will cause the effect to run and update
    // 5. useEffect (like every React hook) can only be called from inside a function component or a custom hook. React will throw an error if you dont.
    useEffect(() => {
      // code that runs here is your actual effect (fetch data, start a timer, subscribe to something, etc.)
    }, [someValue]); // dependency array controls when the effect re-runs:
              // [] (empty) → runs once, right after the component first renders
              // [someValue] → runs once after first render, then again anytime someValue changes
              // no array at all → runs after every render, no matter what changed (rarely what you want)
              // [] = only run when these specific things change

    // example usage - no dependancy array
    import { useState, useEffect } from "react";

    function Clock() {
      const [time, setTime] = useState(new Date()); // useState(new Date()) — holds the current time as state, starting at "right now."

      useEffect(() => { // useEffect(() => { ... }, []) — runs once, right after the component first renders (empty dependency array).

        // the effect running in this case
        const interval = setInterval(() => { // setInterval(() => setTime(new Date()), 1000) — every 1000ms (1 second), updates time to the current moment.
          setTime(new Date()); // each setTime call triggers a re-render, so the displayed time visibly ticks forward.
        }, 1000);

        return () => clearInterval(interval); // cleanup
        // return () => clearInterval(interval) — this is the cleanup function. When the component unmounts
            // (gets removed from the page), React calls this automatically to stop the interval — otherwise
            // the timer would keep running in the background forever, even after the clock's no longer on screen.
            // This return-a-cleanup-function pattern is unique to useEffect and one of the most important things to understand about it.

      }, []); // end useEffect

      return (
          <p>
            Current Time: <span className="font-mono">{time.toLocaleTimeString()}</span>
            // time.toLocaleTimeString() — formats the Date object into a readable time string like 2:31:12 PM
          </p>
      );

    }

    // example usage - with dependancy array
    import { useState, useEffect } from "react";

    function VehicleSearch() {
      // Every time the user types a new character in the input field, setMake: 
        // updates state →
        // component re-renders →
        // React compares the new make value to the one from the last render →
        // since it changed, the effect runs again with the new value.
      
      // If make hasn't changed between renders (say, some unrelated state updated instead),
        // React skips re-running the effect — that's the whole point of the dependency array
      const [make, setMake] = useState("");
      const [results, setResults] = useState([]);

      useEffect(() => {
        console.log('Searching for vehicles matching: {make}'); // the effect running in this case
        // e.g. fetch('/api/vehicles?make={make}').then(...)
      }, [make]); // re-run this effect any time [make] changes, not just once on mount.

      /*
        One rule to keep in mind going forward:
        any state or prop your effect actually uses inside its function body should generally be listed in the dependency array.
        If you use make inside the effect but leave it out of [], React (and most linters, including your ESLint setup) will warn
        you — the effect would keep reading a "stale" value of make from whenever it first ran, instead of the current one.
      */

      return (
        <div>
          <input
            value={make}
            onChange={(e) => setMake(e.target.value)}
            placeholder="Search by make..."
          />
          <p>Results for: {make}</p>
        </div>
      );
    }
    
    // ============================================
    // THE useEffect WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
    //      | import DemoUseEffect from "../components/demos/DemoUseEffect.jsx";
    //      | ...
    //      | { title: "useEffect() React Hook", ..., demo: DemoUseEffect }
    //      v
    //   DemoUseEffect.jsx
    //      | const [time, setTime] = useState(new Date());
    //      | useEffect(() => {
    //      |   const interval = setInterval(() => setTime(new Date()), 1000);
    //      |   return () => clearInterval(interval); // cleanup
    //      | }, []);
    //
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the useEffect entry, this becomes <DemoUseEffect />
    //   -> mounts the real, live ticking clock component on the page
    //
    // Difference from useState's wire:
    //   Same exact pattern (import -> demo: field -> <details.demo />)
    //   The only thing that changes per hook is WHICH file gets imported
    //   and WHAT that file's internal logic does.
     `,
    tags: [
      "useEffect()",
      "useState()",
      ".js data-file",
      ".jsx demo-file",
      "stored functions",
    ],
    demo: DemoUseEffect, // calling the component that renders a useEffect(); so it can be used in the Card.jsx component
    category: "React Hooks",
  },
  {
    title: "useRef() React Hook",
    description:
      "useRef gives you a value that persists across renders without causing a re-render when it changes — unlike useState, updating a ref never triggers React to redraw the component. It has two main uses: (1) grabbing a direct reference to a DOM element (like focusing an input, measuring size, or scrolling to something), or (2) storing a value you need to keep around between renders but that shouldn't affect what's displayed on screen (like a timer ID, a previous value, or a 'first render' flag). When you pass a ref into an element's ref prop, React automatically sets .current to point at that actual DOM node once it's mounted — that's how you get a direct handle to the real <input> element, <div>, etc., to call native browser methods on it (.focus(), .scrollIntoView(), .play(), and so on). A ref is literally a reference to something (a DOM node, or a value) that persists across renders.",
    example: `
    ██╗   ██╗ ███████╗ ███████╗ ██████╗  ███████╗ ███████╗
    ██║   ██║ ██╔════╝ ██╔════╝ ██╔══██╗ ██╔════╝ ██╔════╝
    ██║   ██║ ███████╗ █████╗   ██████╔╝ █████╗   █████╗
    ██║   ██║ ╚════██║ ██╔══╝   ██╔══██╗ ██╔══╝   ██╔══╝
    ╚██████╔╝ ███████║ ███████╗ ██║  ██║ ███████╗ ██║
     ╚═════╝  ╚══════╝ ╚══════╝ ╚═╝  ╚═╝ ╚══════╝ ╚═╝

    // 1. pass in an initial value
    // 2. access ref directly
    // 3. to access the underlying value, use the "current" property
    const myRef = useRef(initialValue);
    // useRef(initialValue) — creates a ref object, starting with whatever you pass in (can be null, a number, a string, anything).
    // It returns a single object, not an array like useState — that object always has exactly one property: .current

    <input ref={myRef} /> // attach it to an element using jsx

    // myRef.current — this is where the actual value lives. You read it and write it directly (myRef.current = something), no setter function involved.
    myRef.current.focus(); // later, access the actual DOM node

    // example usage
    import { useRef } from "react";

    function Example() {
      const myRef = useRef(null); // useRef(null) — starts as null since there's no DOM node yet on first render.

      /*
        handleFocus — calls .focus(), a native browser method that exists on every input element. This isn't React-specific
        at all — it's the same thing you'd call in plain vanilla JS with document.querySelector(...).focus(). useRef is just
        how you get that direct handle in React instead of querying the DOM manually.
      */
      const handleFocus = () => {
        myRef.current.focus(); // myRef.current holds the value. reading/writing myRef.current does NOT cause a re-render.
      };

      return (
        <div>

          // ref={myRef} on the <input> — this is what tells React "when this element mounts, point myRef.current at it."
          // after mounting, myRef.current is the actual <input> DOM element.
          <input ref={myRef} type='text' placeholder='Click the button to focus the input' />

          <button onClick={handleFocus}>
            Focus Input
          </button>

        </div>
      )
    }

    // use-cases:
      // A modal that auto-focuses its first input the moment it opens
      // A "Search" icon button that focuses a search bar
      // A form that focuses the first invalid field after a failed validation check

    // refs are an "escape hatch"
    // refs let us remember data kind of like useState but without triggering a re-render
    // refs can be given any data value
    // ref only return 1 value, which is whatever you passed it
    // refs are mutable (can modify directly), while state is immutable (can't modify directly)
        // mutable: current property can be modified directly using the equals operator
    // dom elements can also be stored in refs
        // you can do this by connecting a created ref to the ref prop of an element  

    // ============================================
    // THE useRef WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
    //      | import DemoUseRef from "../components/demos/DemoUseRef.jsx";
    //      | ...
    //      | { title: "useRef() React Hook", ..., demo: DemoUseRef }
    //      v
    //   DemoUseRef.jsx
    //      | const inputRef = useRef(null);
    //      | <input ref={inputRef} />
    //      | const handleFocus = () => { inputRef.current.focus(); };
    //      | <button onClick={handleFocus}>Focus Input</button>
    //
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the useRef entry, this becomes <DemoUseRef />
    //   -> mounts the real, live focus-on-click input component on the page
    //
    // Difference from useState's wire and useEffect's wire:
    //   Same exact pattern (import -> demo: field -> <details.demo />)
    //   The only thing that changes per hook is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the hook itself):
    //   useState's demo re-renders the page every time you click (count changes -> UI updates)
    //   useEffect's demo runs on its own, automatically, without any click at all (the timer)
    //   useRef's demo does neither — clicking the button changes NOTHING visible via React;
    //   it just reaches directly into the DOM and calls a native browser method (.focus())
    //   No state changed, no re-render happened — that's the whole point of this hook.
     `,
    tags: [
      "useRef()",
      "dom targeting",
      ".js data-file",
      ".jsx demo-file",
    ],
    demo: DemoUseRef, // calling the component that renders a useRef(); so it can be used in the Card.jsx component
    category: "React Hooks",
  },
  {
    title: "useState() React Hook",
    description:
      "useContext lets a component read a value from a shared 'Context' without needing that value passed down as a prop through every component in between — it's React's built-in solution for prop drilling, the problem where a value needed by a deeply nested component has to be manually threaded through every intermediate component that doesn't actually use it itself, just to relay it downward. A Context has three parts: createContext() (defines the shared value), a Provider (wraps a section of your app and supplies the actual value), and useContext() (reads that value from any component nested inside the Provider, no matter how deep).",
    example: `
    ██╗   ██╗███████╗███████╗ ██████╗ ██████╗ ███╗   ██╗████████╗███████╗██╗  ██╗████████╗
    ██║   ██║██╔════╝██╔════╝██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝
    ██║   ██║███████╗█████╗  ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗   ╚███╔╝    ██║   
    ██║   ██║╚════██║██╔══╝  ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝   ██╔██╗    ██║   
    ╚██████╔╝███████║███████╗╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██╔╝ ██╗   ██║   
     ╚═════╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝   

    // 3 parts of a context:
      // createContext() : defines the shared value
      // Provider : wraps a section of your app and supplies the actual value
      // useContext() : reads that value from any component nested inside the Provider, no matter how deep

    // 1. Create the context
    // createContext() — defines the "box" the shared value will live in. Nothing's stored yet, this just creates the mechanism.
    const MyContext = createContext();

    // 2. Provide it — wraps whatever part of the app needs access
    function App() {
      return (
        // <MyContext.Provider value={...}> — wraps a section of your component tree
        // and supplies the actual value. Anything nested inside this Provider (at any depth) can read that value.
        <MyContext.Provider value="some shared value">

          <ChildComponent />

        </MyContext.Provider>
      );
    }
    
    // 3. Consume it — any nested component can read it, no matter how deep
    function ChildComponent() {
      // useContext(MyContext) — called inside any component nested under the Provider,
      // this reads the current value straight out of Context — no props passed down manually,
      // no matter how many components sit between the Provider and this one.
      const value = useContext(MyContext);

      return <p>{value}</p>;
    }
    
    /*
    <MyContext.Provider value="hello">
      <A>                          <- doesn't need the value
        <B>                        <- doesn't need the value either
          <C>
            useContext(MyContext)  <- reads "hello" directly, skips A and B entirely
    ================================================================================
    Without Context, "hello" would have to be passed as a prop into <A>, then <A>
    passes it to <B>, then <B> passes it to <C> — even though A and B never actually
    use it themselves. That's prop drilling, and it's the exact pain Context exists
    to solve.
    ================================================================================
    */

    // example usage
    import { createContext, useContext, useState } from "react";

    // 1. Create the context
    // ThemeContext is created once, outside any component — this is the shared "box."
    const ThemeContext = createContext();

    // 2. Child component -- reads the value via useContext, no props needed
    const ThemedBox = () => {
      const themeValue = useContext(ThemeContext); // themeValue.isDark and themeValue.toggleTheme
      const isDark = themeValue.isDark;
      const toggleTheme = themeValue.toggleTheme;

      return (
        <div>
          <p>Current theme label goes here</p>

          // Clicking "Toggle" updates isDark in the parent, which flows back down through Context
          // to ThemedBox, re-rendering it with the new theme — visually flipping the box's colors.
          <button onClick={toggleTheme}>
            Toggle
          </button>

        </div>
      );
    };

    // 3. Parent component — creates the Provider, supplies the actual value
    // DemoUseContext (the component your card actually renders) holds the
    // real state (isDark) and wraps ThemedBox in the Provider, passing both
    // the value and the updater function down as one object: { isDark, toggleTheme }
    const DemoUseContext = () => {
      const [isDark, setIsDark] = useState(false);
      const toggleTheme = () => setIsDark((prev) => !prev);

      return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>

          // ThemedBox never receives any props directly — it pulls everything it needs
          // straight out of Context with useContext(ThemeContext), then reads isDark to
          // style itself and calls toggleTheme on click.
          <ThemedBox />
          
        </ThemeContext.Provider>
      );
    };

    export default DemoUseContext;

    // use-cases:
      // Theme (light/dark mode)
      // Authentication / current user
      // Language / localization
      // Shopping cart state
      // Form state across multi-step forms
      // Modal/dialog visibility
      // Feature flags / permissions

    // ============================================
    // THE useContext WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
    //      | import DemoUseContext from "../components/demos/DemoUseContext.jsx";
    //      | ...
    //      | { title: "useContext() React Hook", ..., demo: DemoUseContext }
    //      v
    //   DemoUseContext.jsx
    //      | const ThemeContext = createContext();
    //      | const ThemedBox = () => { useContext(ThemeContext) ... }
    //      | const DemoUseContext = () => {
    //      |   const [isDark, setIsDark] = useState(false);
    //      |   return (
    //      |     <ThemeContext.Provider value={{ isDark, toggleTheme }}>
    //      |       <ThemedBox />
    //      |     </ThemeContext.Provider>
    //      |   );
    //      | }
    //
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the useContext entry, this becomes <DemoUseContext />
    //   -> mounts the Provider + child component together as one unit,
    //      since the Provider has to wrap the component that consumes it
    //
    // Difference from useState's, useEffect's, and useRef's wire:
    //   Same exact pattern at the detailData.js/Card.jsx level
    //   (import -> demo: field -> <details.demo />)
    //   The only thing that changes per hook is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the hook itself):
    //   useState's demo: one component, state and UI live in the same place
    //   useEffect's demo: one component, runs on its own without user interaction
    //   useRef's demo: one component, reaches directly into the DOM, no re-render
    //   useContext's demo: TWO components working together —
    //     the value lives in the PARENT (DemoUseContext),
    //     but gets READ in the CHILD (ThemedBox) with no props passed between them
    //   This is the first demo where the hook's whole point only shows up
    //   because there's a parent/child split at all.
     `,
    tags: [
      "createContext()",
      "Provider",
      "useContext()",
      "useState()",
      ".js data-file",
      ".jsx demo-file",
    ],
    demo: DemoUseContext, // calling the component that renders a useContext(); so it can be used in the Card.jsx component
    category: "React Hooks",
  },
];

// export the data from the detail array in detailData.js
export default detail;
