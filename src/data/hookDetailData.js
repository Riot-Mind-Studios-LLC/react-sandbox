// import components
import DemoUseState from "../components/demos/DemoUseState.jsx"; // the component that renders a useState();
import DemoUseEffect from "../components/demos/DemoUseEffect.jsx"; // the component that renders a useEffect();
import DemoUseRef from "../components/demos/DemoUseRef.jsx"; // the component that renders a useRef();
import DemoUseContext from "../components/demos/DemoUseContext.jsx"; // the component that renders a useContext();
import DemoUseMemo from "../components/demos/DemoUseMemo.jsx"; // the component that renders a useMemo();
import DemoUse from "../components/demos/DemoUse.jsx"; // the component that renders a use();
import DemoUseGSAP from "../components/demos/DemoUseGSAP.jsx"; // the component that renders a useGSAP();
import DemoUseReducer from "../components/demos/DemoUseReducer.jsx"; // the component that renders a useReducer();
import DemoCustomHook from "../components/demos/DemoCustomHook.jsx"; // the component that renders a customHook();
import DemoUseActionState from "../components/demos/DemoUseActionState.jsx"; // the component that renders a useActionState();
import DemoUseOptimistic from "../components/demos/DemoUseOptimistic.jsx"; // the component that renders a useOptimistic();
import DemoUseCallback from "../components/demos/DemoUseCallback.jsx"; // the component that renders a useCallback();

// source: https://www.w3schools.com/

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

    // ============================================
    // React useState Hook
    // ============================================
    //
    // State generally refers to data or properties that need to be tracking in an application. 
    //
    // To use the useState Hook, we first need to import it into our component.
    import { useState } from "react"; // Notice that we are destructuring useState from react as it is a named export.
    //
    // Initialize useState
    // We initialize our state by calling useState in our function component.
    // useState accepts an initial state and returns two values:
    //  - The current state.
    //  - A function that updates the state.
    //
    // Example: Initialize state at the top of the function component.
    import { useState } from "react";

    function FavoriteColor() {
      const [color, setColor] = useState("red");
    }
    //
    // Notice that again, we are destructuring the returned values from useState.
    //  - The first value, color, is our current state.
    //  - The second value, setColor, is the function that is used to update our state.
    //  - These names are variables that can be named anything you would like.
    //
    // Lastly, we set the initial state to "red": useState("red")
    //
    // READ STATE
    // We can now include our state anywhere in our component.
    //
    // Example: Use the state variable in the rendered component.
    import { useState } from 'react';
    import { createRoot } from 'react-dom/client';

    function FavoriteColor() {
      const [color, setColor] = useState("red"); // We should never directly update state. Ex: color = "blue" is not allowed.

      return <h1>My favorite color is {color}!</h1>
    }

    createRoot(document.getElementById('root')).render(
      <FavoriteColor />
    );
    //
    // UPDATE STATE
    // To update our state, we use our state updater function.
    //
    // Example: Use the state updater function to update the state:
    <button type="button"
      onClick={() => setColor("blue")} // updater function
    >
      Blue
    </button>
    //
    // WHAT CAN STATE HOLD?
    // The useState Hook can be used to keep track of strings, numbers, booleans, arrays, objects, and any combination of these.
    // We could create multiple state Hooks to track individual values.
    //
    // Example: Create multiple state Hooks:
    function MyCar() {
      const [brand, setBrand] = useState("Ford");
      const [model, setModel] = useState("Mustang");
      const [year, setYear] = useState("1964");
      const [color, setColor] = useState("red");

      return (
        <>
          <h1>My {brand}</h1>
          <p>
            It is a {color} {model} from {year}.
          </p>
        </>
      )
    }
    //
    // Or, we can just use one state and include an object instead:
    function MyCar() {
    const [car, setCar] = useState({
      brand: "Ford",
      model: "Mustang",
      year: "1964",
      color: "red"
    });

    return (
      <>
        <h1>My {car.brand}</h1>
        <p>
          It is a {car.color} {car.model} from {car.year}.
        </p>
      </>
    )
  }
  //
  // Since we are now tracking a single object: car, we need to reference that object when rendering the component. (Ex: car.brand)
  //
  // UPDATING OBJECTS AND ARRAYS IN STATE
  // When state is updated, the entire state gets overwritten.
  // What if we only want to update the color of our car?
  // If we only called setCar({color: "blue"}), this would remove the brand, model, and year from our state.
  // We can use the JavaScript spread operator to help us.
  //
  // Example: Use the JavaScript spread operator to update only the color of the car:
  const updateColor = () => {
    setCar(previousState => {
      return { ...previousState, color: "blue" }
    });
  }
  // Because we need the current value of state, we pass a function into our setCar function. This function receives the previous value.
  // We then return an object, spreading the previousState and overwriting only the color.

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

  // ============================================
  // React useState Hook
  // ============================================
  //
  // The useEffect Hook allows you to perform side effects in your components.
  // Some examples of side effects are: fetching data, directly updating the DOM, and timers.
  // useEffect accepts two arguments. The second argument is optional.
  useEffect(<function>, <dependency>)
  //
  // Example: Use setTimeout() to count 1 second after initial render:
  import { useState, useEffect } from 'react';
  import { createRoot } from 'react-dom/client';
  //
  function Timer() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      setTimeout(() => {
        setCount((count) => count + 1);
      }, 1000);
    }); // <- add empty brackets here to make the effect run once on initial render

    return <h1>I've rendered {count} times!</h1>;
  }

  createRoot(document.getElementById('root')).render(
    <Timer />
  );
  //
  // But wait!! It keeps counting even though it should only count once!
  //
  // useEffect runs on every render. That means that when the count changes, a render happens, which then triggers another effect.
  // This is not what we want. There are several ways to control when side effects run.
  // We should always include the second parameter which accepts an array. We can optionally pass dependencies to useEffect in this array.
  //
  // Example 1: No dependency passed:
    useEffect(() => {
    //Runs on every render
  });
  //
  // Example 2: An empty array:
    useEffect(() => {
    //Runs only on the first render
  }, []);
  //
  // Example 3: Props or state values:
    useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
  }, [prop, state]);
  //
  // Example: Here is an example of a useEffect Hook that is dependent on a variable. If the count variable updates, the effect will run again:
  function Counter() {
    const [count, setCount] = useState(0);
    const [calculation, setCalculation] = useState(0);

    useEffect(() => {
      setCalculation(() => count * 2);
    }, [count]); // <- add the count variable here

    return (
      <>
        <p>Count: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
        <p>Calculation: {calculation}</p>
      </>
    );
  }
  //
  // If there are multiple dependencies, they should be included in the useEffect dependency array.

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

    // ============================================
    // React useRef Hook
    // ============================================
    //
    // The useRef Hook allows you to persist values between renders.
    // It can be used to store a mutable value that does not cause a re-render when updated.
    // It can be used to access a DOM element directly.
    //
    DOES NOT CAUSE RE-RENDERS
    //
    // If we tried to count how many times our application renders using the useState Hook, we would be caught in an infinite loop since this Hook itself causes a re-render.
    // To avoid this, we can use the useRef Hook.
    //
    Example: Use useRef to track application renders.
    import { useState, useRef, useEffect } from 'react';
    import { createRoot } from 'react-dom/client';

    function App() {
      const [inputValue, setInputValue] = useState("");
      const count = useRef(0);

      useEffect(() => {
        count.current = count.current + 1;
      });

      return (
        <>
          <p>Type in the input field:</p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <h1>Render Count: {count.current}</h1>
        </>
      );
    }

    createRoot(document.getElementById('root')).render(
      <App />
    );
    //
    // useRef() only returns one item. It returns an Object called current.
    // When we initialize useRef we set the initial value: useRef(0).
    // It's like doing this: const count = {current: 0}. We can access the count by using count.current.
    //
    // ACCESSING DOM ELEMENTS
    //
    // The useRef Hook is often used to access DOM elements directly.
    // First, we create a ref using the useRef Hook: const inputElement = useRef();.
    // Then, we attach the ref to a DOM element using the ref attribute in JSX: <input type="text" ref={inputElement} />.
    // Finally, we can access the DOM element using the current property: inputElement.current.
    //
    // Example: Use useRef to focus the input:
    import { useRef } from 'react';
    import { createRoot } from 'react-dom/client';

    function App() {
      const inputElement = useRef();

      const focusInput = () => {
        inputElement.current.focus();
      };

      return (
        <>
          <input type="text" ref={inputElement} />
          <button onClick={focusInput}>Focus Input</button>
        </>
      );
    }

    createRoot(document.getElementById('root')).render(
      <App />
    );
    //
    // In the example, the input field gets focus when the button is clicked, because the onClick function calls inputElement.current.focus().
    //
    // TRACKING STATE CHANGES
    //
    // The useRef Hook can also be used to keep track of previous state values.
    // This is because we are able to persist useRef values between renders.
    //
    // Example: Use useRef to keep track of previous state values:
    function App() {
      const [inputValue, setInputValue] = useState("");
      const previousInputValue = useRef("");

      useEffect(() => {
        previousInputValue.current = inputValue;
      }, [inputValue]);

      return (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <h2>Current Value: {inputValue}</h2>
          <h2>Previous Value: {previousInputValue.current}</h2>
        </>
      );
    }
    //
    // This time we use a combination of useState, useEffect, and useRef to keep track of the previous state.
    // In the useEffect, we are updating the useRef current value each time the inputValue is updated by entering text into the input field.

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
    tags: ["useRef()", "dom targeting", ".js data-file", ".jsx demo-file"],
    demo: DemoUseRef, // calling the component that renders a useRef(); so it can be used in the Card.jsx component
    category: "React Hooks",
  },
  {
    title: "useContext() React Hook",
    description:
      "useContext lets a component read a value from a shared 'Context' without needing that value passed down as a prop through every component in between — it's React's built-in solution for prop drilling, the problem where a value needed by a deeply nested component has to be manually threaded through every intermediate component that doesn't actually use it itself, just to relay it downward. A Context has three parts: createContext() (defines the shared value), a Provider (wraps a section of your app and supplies the actual value), and useContext() (reads that value from any component nested inside the Provider, no matter how deep).",
    example: `
    ██╗   ██╗███████╗███████╗ ██████╗ ██████╗ ███╗   ██╗████████╗███████╗██╗  ██╗████████╗
    ██║   ██║██╔════╝██╔════╝██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝
    ██║   ██║███████╗█████╗  ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗   ╚███╔╝    ██║   
    ██║   ██║╚════██║██╔══╝  ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝   ██╔██╗    ██║   
    ╚██████╔╝███████║███████╗╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██╔╝ ██╗   ██║   
     ╚═════╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝   

    // ============================================
    // React useContext Hook
    // ============================================
    //
    // React Context is a way to manage state globally.
    // It can be used together with the useState Hook to share state between deeply nested components more easily than with useState alone.
    //
    // THE PROBLEM
    //
    // State should be held by the highest parent component in the stack that requires access to the state.
    // To illustrate, we have many nested components. The component at the top and bottom of the stack need access to the state.
    // To do this without Context, we will need to pass the state as "props" through each nested component. This is called "prop drilling".
    //
    // Example: Passing "props" through nested components:
    import { useState } from 'react';
    import { createRoot } from 'react-dom/client';

    // Component 1
    function Component1() {
      const [user, setUser] = useState("Linus");

      return (
        <>
          <h1>{Hello "$"{user}!}</h1>
          <Component2 user={user} />
        </>
      );
    }

     // Component 2
    function Component2({ user }) {
      return (
        <>
          <h1>Component 2</h1>
          <Component3 user={user} />
        </>
      );
    }

     // Component 3
    function Component3({ user }) {
      return (
        <>
          <h1>Component 3</h1>
          <h1>{Hello "$"{user} again!}</h1>
        </>
      );
    }

    createRoot(document.getElementById('root')).render(
      <Component1 />
    );
    //
    // Even though component 2 did not need the state, it had to pass the state along so that it could reach component 3.
    //
    // THE SOLUTION
    //
    // The solution is to create context.
    //
    // CREATE CONTEXT
    //
    // To create context, you must Import createContext and initialize it:
    import { useState, createContext, useContext } from 'react';

    const UserContext = createContext();
    //
    // Next we'll use the Context Provider to wrap the tree of components that need the state Context.
    //
    // CONTEXT PROVIDER
    //
    // Wrap child components in the Context Provider and supply the state value.
    function Component1() {
    const [user, setUser] = useState("Linus");

    return (
      <UserContext.Provider value={user}>
        <h1>{Hello "$"{user}!}</h1>
        <Component2 />
      </UserContext.Provider>
    );
  }
  //
  // Now, all components in this tree will have access to the user Context.
  //
  // THE USECONTEXT HOOK
  //
  // In order to use the Context in a child component, we need to access it using the useContext Hook.
  // First, include the useContext in the import statement:
  import { useState, createContext, useContext } from "react";
  //
  // Then you can access the user Context in all components:
  function Component3() {
    const user = useContext(UserContext);

    return (
      <>
        <h1>Component 3</h1>
        <h2>{Hello "$"{user} again!}</h2>
      </>
    );
  }
  //
  // Example: Here is the full example using React Context:
  const UserContext = createContext();

  // component 1
  function Component1() {
    const [user, setUser] = useState("Linus");

    return (
      <UserContext.Provider value={user}>
        <h1>{Hello "$"{user}!}</h1>
        <Component2 />
      </UserContext.Provider>
    );
  }

  // component 2
  function Component2() {
    return (
      <>
        <h1>Component 2</h1>
        <Component3 />
      </>
    );
  }

  // component 3
  function Component3() {
    const user = useContext(UserContext);

    return (
      <>
        <h1>Component 3</h1>
        <h2>{Hello "$"{user} again!}</h2>
      </>
    );
  }

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
  {
    title: "useMemo() React Hook",
    description:
      "useMemo caches the result of an expensive calculation between renders, so it doesn't get recomputed every single time the component re-renders — only when the specific values it depends on actually change. It's a performance optimization, not a data-storage tool like useState or useRef: you give it a function and a dependency array, and it returns the cached value, recalculating only when something in that array changes. with the React Compiler now stable, a lot of the manual memoization useMemo was traditionally used for gets handled automatically by the compiler — meaning in a React 19 project using the compiler, you'll reach for useMemo by hand far less often than in pre-compiler codebases. That said, it's still essential to understand — most real-world codebases you'll work in aren't fully on the compiler yet, it still shows up constantly in job interviews and existing code, and there are cases (like memoizing values used outside of rendering, e.g. as a dependency for another hook) where you still need it explicitly even with the compiler enabled.",
    example: `
    ██╗   ██╗███████╗███████╗███╗   ███╗███████╗███╗   ███╗ ██████╗ 
    ██║   ██║██╔════╝██╔════╝████╗ ████║██╔════╝████╗ ████║██╔═══██╗
    ██║   ██║███████╗█████╗  ██╔████╔██║█████╗  ██╔████╔██║██║   ██║
    ██║   ██║╚════██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╔╝██║██║   ██║
    ╚██████╔╝███████║███████╗██║ ╚═╝ ██║███████╗██║ ╚═╝ ██║╚██████╔╝
     ╚═════╝ ╚══════╝╚══════╝╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ 

    // ============================================
    // React useMemo Hook
    // ============================================
    //
    // The React useMemo Hook returns a memoized value.
    // Think of memoization as caching a value so that it does not need to be recalculated.
    // The useMemo Hook only runs when one of its dependencies update.
    // This can improve performance.
    //
    // The useMemo and useCallback Hooks are similar:
    //  - useMemo returns a memoized value.
    //  - useCallback returns a memoized function.
    //
    // WITHOUT USEMEMO
    //
    // The useMemo Hook can be used to keep expensive, resource intensive functions from needlessly running.
    // In this example, we have an expensive function that runs on every render.
    // When changing the count or adding a todo, you will notice a delay in execution.
    //
    // Example: A poor performing function. The expensiveCalculation function runs on every render:
    import { useState } from 'react';
    import { createRoot } from 'react-dom/client';

    const App = () => {
      const [count, setCount] = useState(0);
      const [todos, setTodos] = useState([]);
      const calculation = expensiveCalculation(count);

      const increment = () => {
        setCount((c) => c + 1);
      };
      const addTodo = () => {
        setTodos((t) => [...t, "New Todo"]);
      };

      return (
        <div>
          <div>
            <h2>My Todos</h2>
            {todos.map((todo, index) => {
              return <p key={index}>{todo}</p>;
            })}
            <button onClick={addTodo}>Add Todo</button>
          </div>
          <hr />
          <div>
            Count: {count}
            <button onClick={increment}>+</button>
            <h2>Expensive Calculation</h2>
            {calculation}
            <p>Note that this example executes the expensive function also when you click on the Add Todo button.</p>
          </div>
        </div>
      );
    };

    // runs on every render
    const expensiveCalculation = (num) => {
      console.log("Calculating...");
      for (let i = 0; i < 1000000000; i++) {
        num += 1;
      }
      return num;
    };

    createRoot(document.getElementById('root')).render(
      <App />
    );
    //
    // USE USEMEMO
    //
    // To fix this performance issue, we can use the useMemo Hook to memoize the expensiveCalculation function. This will cause the function to only run when needed.
    // We can wrap the expensive function call with useMemo.
    // The useMemoHook accepts a second parameter to declare dependencies. The expensive function will only run when its dependencies have changed.
    // In the following example, the expensive function will only run when count is changed and not when todo's are added.
    //
    // Example: Performance example using the useMemo Hook:
    const App = () => {
      const [count, setCount] = useState(0);
      const [todos, setTodos] = useState([]);
      const calculation = useMemo(() => expensiveCalculation(count), [count]);

      const increment = () => {
        setCount((c) => c + 1);
      };
      const addTodo = () => {
        setTodos((t) => [...t, "New Todo"]);
      };

      return (
        <div>
          <div>
            <h2>My Todos</h2>
            {todos.map((todo, index) => {
              return <p key={index}>{todo}</p>;
            })}
            <button onClick={addTodo}>Add Todo</button>
          </div>
          <hr />
          <div>
            Count: {count}
            <button onClick={increment}>+</button>
            <h2>Expensive Calculation</h2>
            {calculation}
          </div>
        </div>
      );
    };

    const expensiveCalculation = (num) => {
      console.log("Calculating...");
      for (let i = 0; i < 1000000000; i++) {
        num += 1;
      }
      return num;
    };

    // 1. takes two arguments:
      // a function that returns a value,
      // and a dependency array (same concept as useEffect's dependency array).

    // 2. The function runs and its return value gets cached.

    // 3. On every re-render, React checks: did anything in [dependencies] change since last time?
        // If no — React skips re-running the function entirely and just hands back the cached value from before.
        // If yes — it re-runs the function and caches the new result.

    // 4. Unlike useEffect, useMemo's function must return something — that returned value is what
        // the hook itself evaluates to, used directly in your render output (not a side effect happening off to the side).
    useMemo(() => {...}, [dependencies])

    function Example({ items }) {
      const result = useMemo(() => {
        return expensiveCalculation(items);
      }, [items]);

      return <div>{result}</div>;
    }

    // example usage
    import { useState, useMemo } from "react";

    function ShoppingCart({ items }) {
      const [count, setCount] = useState(0);

      const total = useMemo(() => {
        // adding up prices is a genuinely common, realistic calculation
        return items.reduce((sum, item) => sum + item.price, 0);
      }, [items]); // the total only recalculates when the items array itself changes (something added/removed from the cart).

      return (
        <div>
          <p>Total: $'{total}'</p>

          /*
            Clicking the counter button changes count, which re-renders the component — but since items didn't change,
            useMemo skips recalculating total and just reuses the cached value. Skip recalculation when the dependency hasn't changed.
          */
          <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
        </div>
      );
    }

    /*
      The core question useMemo answers is: "is this calculation expensive enough that recalculating
      it on every single render would actually slow things down?" — if the calculation is cheap
      (like adding two numbers), useMemo isn't worth the overhead of tracking dependencies; it earns
      its place when the calculation itself is genuinely costly (sorting/filtering a large array, heavy math, etc.).
    */

    // ============================================
    // THE useMemo WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
    //      | import DemoUseMemo from "../components/demos/DemoUseMemo.jsx";
    //      | ...
    //      | { title: "useMemo() React Hook", ..., demo: DemoUseMemo }
    //      v
    //   DemoUseMemo.jsx
    //      | const slowSum = (num) => { ... 500 million loop iterations ... }
    //      | const [number, setNumber] = useState(1);
    //      | const [unrelatedCount, setUnrelatedCount] = useState(0);
    //      | const total = useMemo(() => slowSum(number), [number]);
    //      | <button onClick={() => setNumber(number + 1)}>Increase Number</button>
    //      | <button onClick={() => setUnrelatedCount(unrelatedCount + 1)}>Increase Unrelated Count</button>
    //
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the useMemo entry, this becomes <DemoUseMemo />
    //   -> mounts two buttons: one that visibly triggers the slow recalculation,
    //      one that re-renders the component but skips it entirely
    //
    // Difference from useState's, useEffect's, useRef's, and useContext's wire:
    //   Same exact pattern at the detailData.js/Card.jsx level
    //   (import -> demo: field -> <details.demo />)
    //   The only thing that changes per hook is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the hook itself):
    //   useState's demo: state changes -> UI updates every time, on purpose
    //   useEffect's demo: runs on its own, automatically, no click needed
    //   useRef's demo: no re-render at all, direct DOM access
    //   useContext's demo: value lives in a parent, read in a child, no props between them
    //   useMemo's demo: TWO state values exist side by side specifically so you can
    //     compare what happens when a re-render is triggered by something the memoized
    //     value DOES depend on (slow) vs. something it DOESN'T depend on (instant) —
    //     the hook's entire point only becomes visible by having that unrelated state
    //     to contrast against.
     `,
    tags: [
      "useMemo()",
      "useState()",
      ".js data-file",
      ".jsx demo-file",
      "stored variables",
      "stored functions",
    ],
    demo: DemoUseMemo, // calling the component that renders a useMemo(); so it can be used in the Card.jsx component
    category: "React Hooks",
  },
  {
    title: "use() React Hook",
    description:
      "use() is a newer, more flexible way to read values in React — currently covering two main jobs: (1) reading a Context value, same job as useContext, and (2) reading the resolved value of a Promise, pausing the component's render (via Suspense) until that Promise settles. The key thing that sets it apart from every other hook you've built so far: use() can be called conditionally — inside an if statement, after an early return, inside a loop — something that breaks the Rules of Hooks for every hook we've covered (useState, useEffect, useRef, useContext, useMemo all must be called unconditionally, every render, same order every time). use() is technically not bound by that same rule, since React handles it differently under the hood.",
    example: `
    ██╗   ██╗███████╗███████╗
    ██║   ██║██╔════╝██╔════╝
    ██║   ██║███████╗█████╗  
    ██║   ██║╚════██║██╔══╝  
    ╚██████╔╝███████║███████╗
     ╚═════╝ ╚══════╝╚══════╝

    // useContext
    const value = useContext(MyContext);

    // use() — does the exact same job here
    const value = use(MyContext);

    // example usage
    import { use, createContext } from "react";

    const MyContext = createContext();

    function ChildComponent() {
      const value = use(MyContext);
      return <p>{value}</p>;
    }

     /*
      For this specific job (reading a Context value), they're functionally interchangeable — same result,
      same Provider setup required, nothing else changes. The real difference only shows up in where
      you're allowed to call them:
    */
    function ChildComponent({ showValue }) {
      // ❌ Illegal with useContext — hooks can't be conditional
      if (showValue) {
        const value = useContext(MyContext);
      }

      // ✅ Legal with use() — this is the one real advantage here
      if (showValue) {
        const value = use(MyContext);
        return <p>{value}</p>;
      }

      return <p>Hidden</p>;
    }

    // ============================================
    // DOES use() REPLACE useContext AND useMemo?
    // ============================================
    //
    // useContext -- YES, use() genuinely replaces it for reading context.
    //   use(MyContext) does the exact same job as useContext(MyContext),
    //   with one real advantage: use() can be called conditionally
    //   (inside an if, after an early return, inside a loop) — something
    //   useContext can NEVER do, since hooks must run unconditionally,
    //   every render, same order every time.
    //
    //   const value = useContext(MyContext);  // must be unconditional
    //   const value = use(MyContext);         // can be conditional
    //
    //
    // useMemo -- NO, use() does NOT replace useMemo. These solve
    //   two completely unrelated problems:
    //
    //   useMemo  -> caches an EXPENSIVE CALCULATION so it doesn't
    //               re-run on every render. It's a performance tool.
    //               const total = useMemo(() => slowSum(x), [x]);
    //
    //   use()    -> reads a value from something else entirely —
    //               either a Context, or a Promise (pausing render
    //               via Suspense until it resolves). It has nothing
    //               to do with caching or skipping recalculation.
    //               const value = use(MyContext);
    //               const data  = use(fetchPromise);
    //
    //   There's no overlap in what problem these two hooks solve —
    //   use() isn't a "newer useMemo," it's a "newer useContext"
    //   (plus a way to read Promises, which is a new capability
    //   neither useContext nor useMemo ever had).
    //
    //
    // SUMMARY:
    //   use() replaces:      useContext (for context-reading)
    //   use() partially replaces: useEffect (only its data-fetching use case)
    //   use() does NOT replace: useMemo (different job entirely — caching, not reading)

    // ============================================
    // THE use() WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
    //      | import DemoUse from "../components/demos/DemoUse.jsx";
    //      | ...
    //      | { title: "use() React Function", ..., demo: DemoUse }
    //      v
    //   DemoUse.jsx
    //      | const MessageContext = createContext("Hello from Context!");
    //      | const ConditionalReader = ({ showMessage }) => {
    //      |   if (!showMessage) { return <p>Message hidden</p>; }
    //      |   const message = use(MessageContext); // only called on SOME renders
    //      |   return <p>{message}</p>;
    //      | }
    //      | const DemoUse = () => {
    //      |   const [showMessage, setShowMessage] = useState(true);
    //      |   return (
    //      |     <MessageContext.Provider value="Hello from Context!">
    //      |       <ConditionalReader showMessage={showMessage} />
    //      |       <button onClick={() => setShowMessage(!showMessage)}>Toggle Message</button>
    //      |     </MessageContext.Provider>
    //      |   );
    //      | }
    //
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the use() entry, this becomes <DemoUse />
    //   -> mounts a Provider + toggle button + child that conditionally
    //      calls use() based on the button's current state
    //
    // Difference from every other hook's wire so far:
    //   Same exact pattern at the detailData.js/Card.jsx level
    //   (import -> demo: field -> <details.demo />)
    //   The only thing that changes per hook is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the function itself):
    //   useState's demo: state changes -> UI updates every time, on purpose
    //   useEffect's demo: runs on its own, automatically, no click needed
    //   useRef's demo: no re-render at all, direct DOM access
    //   useContext's demo: value lives in a parent, read in a child, no props between them
    //   useMemo's demo: two state values contrast a slow recalculation vs. an instant skip
    //   use()'s demo: the ONLY demo where the hook/function call ITSELF is conditional —
    //     every other demo always calls its hook the same way, every render.
    //     This one visibly skips calling use() entirely on some renders (the early
    //     return path), and calls it on others — proving the one real structural
    //     rule use() breaks that every other hook in this registry must follow.
     `,
    tags: [
      "use()",
      "useContext()",
      ".js data-file",
      ".jsx demo-file",
      "stored variables",
      "stored functions",
    ],
    demo: DemoUse, // calling the component that renders a use(); so it can be used in the Card.jsx component
    category: "React Hooks",
  },
  {
    title: "useGSAP() React Hook",
    description:
      "useGSAP is the official React hook from @gsap/react — it's a drop-in replacement for useEffect() or useLayoutEffect() that automatically handles cleanup using gsap.context(), meaning any GSAP animations, ScrollTriggers, Draggables, or SplitText instances created inside the hook get automatically added to an internal context and reverted when the component unmounts — no manual cleanup code required. It also correctly handles React 18/19's Strict Mode double-invocation in development (raw useEffect GSAP code tends to visibly double-fire animations in Strict Mode; useGSAP doesn't), and is safe to use in Next.js or other server-side rendering environments, provided it's used in a client component. You typically register the hook itself as a plugin before using it: gsap.registerPlugin(useGSAP) — a required setup step that's easy to miss. The second argument accepts either a plain dependency array (like useEffect) or a config object for more control — most notably { scope: containerRef }, which scopes any CSS selector queries inside the hook to just that container's children, so you're not accidentally grabbing elements elsewhere on the page.",
    example: `
    ██╗   ██╗███████╗███████╗ ██████╗ ███████╗ █████╗ ██████╗ 
    ██║   ██║██╔════╝██╔════╝██╔════╝ ██╔════╝██╔══██╗██╔══██╗
    ██║   ██║███████╗█████╗  ██║  ███╗███████╗███████║██████╔╝
    ██║   ██║╚════██║██╔══╝  ██║   ██║╚════██║██╔══██║██╔═══╝ 
    ╚██████╔╝███████║███████╗╚██████╔╝███████║██║  ██║██║     
     ╚═════╝ ╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝     

    // basic shape
    // 1. the second argument can be either a plain dependency array (like useEffect) or this
        // config object — { scope: container } is the config-object form, used when you need
        // more than just dependencies (scope, or other options like revertOnUpdate).
    useGSAP(() => {gsap code goes here}, { scope: container });

    // install dependancies
    npm install @gsap/react
    
    // import dependancies
    import { useRef } from "react";
    import gsap from "gsap";
    import { useGSAP } from "@gsap/react";

    // gsap.registerPlugin(useGSAP) — a required one-time setup step. Confirmed: official
    // docs show this in every example, register any plugins, including the useGSAP hook.
    gsap.registerPlugin(useGSAP); // register once, before running useGSAP or any GSAP code

    function Example() {
      // Same DOM-access pattern you already know from your useRef card.
      // This is what ties useRef and useGSAP together — GSAP needs a real DOM node,
      // and useRef is how React gives you one.
      const container = useRef();

      /*
        useGSAP(() => {...}, { scope: container }) — the callback is where your actual GSAP code goes.
        The scope option is confirmed as optional, but the docs describe it as making it safer/easier
        to write code that doesn't require you to create a useRef() for each and every element — meaning
        with a scope set, gsap.to(".box", {...}) only searches for .box inside container, not the entire page.
        Scope lets you use plain CSS selectors instead of a separate ref for every single element.
      */
      useGSAP(() => { // gsap code here...
        
        /*
          gsap.to(".box", { x: 100 }) — anything created here (tweens, timelines, ScrollTriggers) gets
          automatically added to an internal context and automatically reverted on unmount — no manual
          cleanup function needed, unlike a raw useEffect version of the same thing.
        */
        gsap.to(".box", { x: 100 }); // <-- automatically reverted on unmount
      }, { scope: container }); // <-- scope for selector text (optional)

        return (
          <div ref={container}>
            <div className="box">Animated</div>
          </div>
        );
      }

    /* use cases
      - Entrance animations
        - elements fading/sliding in when a component first mounts (exactly what your demo does) — hero sections, cards appearing on page load, modal content animating in.
      - Scroll-triggered animations (via GSAP's ScrollTrigger plugin)
        - content animating as the user scrolls it into view; parallax effects; progress bars/timelines tied to scroll position. Confirmed from the docs — ScrollTrigger works directly inside useGSAP, same scope/cleanup benefits apply.
      - Interactive UI feedback
        — button hover/click animations, icon transformations, micro-interactions that feel more polished than a CSS transition alone (more control over easing, sequencing, and timing).
      - State-driven animations
        — animating an element differently based on app state, using the dependencies array (like your demo's replay button, but more commonly: an accordion opening/closing, a sidebar collapsing, a toggle switching states) — this is confirmed directly from the docs' own example: useGSAP(() => { gsap.to('.box', { x: isActive ? 200 : 0 }) }, { scope: container, dependencies: [isActive] }).
      - Staggered list/grid animations
        — multiple elements animating in sequence rather than all at once (cards in a grid appearing one after another, list items cascading in) — GSAP's stagger option is built for exactly this.
      - Logo/branding flourishes
        — this is directly relevant to your own real work: your billboard/sidebar logo scale-and-fade "pop" in Panther Tracker is precisely this use case — a small transform-based animation layered on top of a CSS transition, not replacing it.
      - SVG and path animations
        — drawing effects, icon morphing, animated illustrations — GSAP has specific plugins for this (DrawSVG, MorphSVG) that also benefit from the same scope/cleanup handling useGSAP provides.
      - Complex sequenced timelines
        — multiple animations that need to happen in a specific order with precise timing relationships (a loading sequence, a multi-step reveal), using gsap.timeline() inside the hook.
    */

    // ============================================
    // THE useGSAP WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
    //      | import DemoUseGSAP from "../components/demos/DemoUseGSAP.jsx";
    //      | ...
    //      | { title: "useGSAP() React Hook", ..., demo: DemoUseGSAP }
    //      v
    //   DemoUseGSAP.jsx
    //      | gsap.registerPlugin(useGSAP); // one-time setup, outside the component
    //      | const container = useRef();
    //      | const [key, setKey] = useState(0);
    //      | useGSAP(() => {
    //      |   gsap.from(".animate-box", { x: -100, opacity: 0, duration: 0.8 });
    //      | }, { scope: container, dependencies: [key] });
    //      | <div ref={container}>
    //      |   <div className="animate-box" />
    //      |   <button onClick={() => setKey(key + 1)}>Replay Animation</button>
    //      | </div>
    //
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the useGSAP entry, this becomes <DemoUseGSAP />
    //   -> mounts a box that animates in immediately, plus a button
    //      that re-triggers the same animation on demand
    //
    // Difference from every other hook's wire so far:
    //   Same exact pattern at the detailData.js/Card.jsx level
    //   (import -> demo: field -> <details.demo />)
    //   The only thing that changes per hook is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the hook itself):
    //   This is the ONLY demo in the registry that combines THREE hooks
    //   working together at once, instead of showcasing one hook in isolation:
    //     useRef    -> gives useGSAP a real DOM node to scope animations to
    //     useState  -> the "key" trigger, changed on button click
    //     useGSAP   -> reads that state via its dependencies array,
    //                  reverts the previous animation, and replays a new one
    //   Every other card in this registry taught ONE hook on its own.
    //   This card is the first (and only) one that shows how earlier cards
    //   in this same registry combine to build something real —
    //   which is fitting, since it's the last card in the lineup.
     `,
    tags: [
      "useGSAP()",
      "useRef()",
      "useState()",
      "useEffect()",
      ".js data-file",
      ".jsx demo-file"
    ],
    demo: DemoUseGSAP, // calling the component that renders a useGSAP(); so it can be used in the Card.jsx component
    category: "React Hooks",
  },
  {
    title: "useReducer() React Hook",
    description:
      "useReducer is an alternative to useState for managing more complex state logic — instead of calling a setter directly, you dispatch an action (a plain object describing what happened), and a reducer function decides how state should change in response. It shines when: multiple pieces of related state need to update together, the next state depends on the previous state in a non-trivial way, or you have many possible state transitions (think a form with several fields, or a shopping cart with add/remove/update-quantity actions) — condensing what would be several useState calls and scattered update logic into one predictable, centralized function.",
    example: `
    ██╗   ██╗███████╗███████╗██████╗ ███████╗██████╗ ██╗   ██╗ ██████╗███████╗██████╗ 
    ██║   ██║██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗██║   ██║██╔════╝██╔════╝██╔══██╗
    ██║   ██║███████╗█████╗  ██████╔╝█████╗  ██║  ██║██║   ██║██║     █████╗  ██████╔╝
    ██║   ██║╚════██║██╔══╝  ██╔══██╗██╔══╝  ██║  ██║██║   ██║██║     ██╔══╝  ██╔══██╗
    ╚██████╔╝███████║███████╗██║  ██║███████╗██████╔╝╚██████╔╝╚██████╗███████╗██║  ██║
     ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚══════╝╚═╝  ╚═╝                   

    // ============================================
    // React useReducer() Hook
    // ============================================
    //
    // The useReducer Hook is similar to the useState Hook.
    // It allows for custom state logic.
    // If you find yourself keeping track of multiple pieces of state that rely on complex logic, useReducer may be useful.
    //
    // SYNTAX
    //
    // The useReducer Hook accepts three arguments.
    useReducer(reducer, initialState, init)
    //
    // The reducer function contains your custom state logic and the initialStatecan be a simple value, but generally will contain an object.
    // The init argument is optional and is used to initialize the state.
    // The useReducer Hook returns the current stateand a dispatchmethod.
    //
    // Example: Here is an example where we use useReducer to keep track of the score of two players:
    import { useReducer } from 'react';
    import { createRoot } from 'react-dom/client';

    const initialScore = [
      {
        id: 1,
        score: 0,
        name: "John",
      },
      {
        id: 2,
        score: 0,
        name: "Sally",
      },
    ];

    const reducer = (state, action) => {
      switch (action.type) {
        case "INCREASE":
          return state.map((player) => {
            if (player.id === action.id) {
              return { ...player, score: player.score + 1 };
            } else {
              return player;
            }
          });
        default:
          return state;
      }
    };

    function Score() {
      const [score, dispatch] = useReducer(reducer, initialScore);

      const handleIncrease = (player) => {
        dispatch({ type: "INCREASE", id: player.id });
      };

      return (
        <>
          {score.map((player) => (
            <div key={player.id}>
              <label>
                <input
                  type="button"
                  onClick={() => handleIncrease(player)}
                  value={player.name}
                />
                {player.score}
              </label>
            </div>
          ))}
        </>
      );
    }

    createRoot(document.getElementById('root')).render(
      <Score />
    );

    // BASIC PATTERN
    import { useReducer } from "react";

    const initialState = { /* starting state shape */ };

    /*
      reducer(state, action) — a plain function, defined outside the component (doesn't need to be,
      but it's a common convention since it doesn't depend on anything inside the component).
      Takes the current state and an action, returns the new state. Never mutates state
      directly — always returns a new object (same immutability rule as useState).
    */
    function reducer(state, action) {

      /*
        action — a plain object, conventionally shaped { type: "SOME_ACTION", payload: ... }.
        The type tells the reducer which case to run; payload (optional) carries any data
        needed to compute the new state.
      */
      switch (action.type) {
        case "SOME_ACTION":
          return { ...state /* updated fields */ };
        default:
          return state;
      }
    }

    function Example() {

      /*
        useReducer(reducer, initialState) — takes the reducer function and a starting state,
        returns an array of two things: the current state, and a dispatch function.
      */
      const [state, dispatch] = useReducer(reducer, initialState);

      return <div>...</div>;
    }
    //
    // dispatch({ type: "SOME_ACTION" }) — calling this is how you trigger a state change.
    // Instead of calling a setter directly (like setCount(count + 1)), you describe what
    // happened (dispatch({ type: "INCREMENT" })), and the reducer decides how state should respond.
    //
    // Side-by-side comparison with useState, since that's the natural comparison:
    //
    // useState — direct, simple
    const [count, setCount] = useState(0);
    setCount(count + 1);
    //
    // useReducer — describes an event, reducer decides the update
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    dispatch({ type: "INCREMENT" });
    //
    // For a single simple value like a counter, useState is genuinely simpler and the right choice
    // — useReducer earns its place once state gets complex enough that centralizing the update logic
    // in one place (rather than scattering setter calls throughout the component) actually pays off.

    // ============================================
    // THE useReducer WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
    //      | import DemoUseReducer from "../components/demos/DemoUseReducer.jsx";
    //      | ...
    //      | { title: "useReducer() React Hook", ..., demo: DemoUseReducer }
    //      v
    //   DemoUseReducer.jsx
    //      | const initialState = { count: 0 };
    //      | function reducer(state, action) {
    //      |   switch (action.type) {
    //      |     case "INCREMENT": return { count: state.count + 1 };
    //      |     case "DECREMENT": return { count: state.count - 1 };
    //      |     case "RESET": return { count: 0 };
    //      |     default: return state;
    //      |   }
    //      | }
    //      | const [state, dispatch] = useReducer(reducer, initialState);
    //      | <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    //      | <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
    //      | <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    //
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the useReducer entry, this becomes <DemoUseReducer />
    //   -> mounts a counter with three buttons, each dispatching a
    //      different action to the same centralized reducer function
    //
    // Difference from every other hook's wire so far:
    //   Same exact pattern at the detailData.js/Card.jsx level
    //   (import -> demo: field -> <details.demo />)
    //   The only thing that changes per hook is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the hook itself):
    //   useState's demo: one setter, one direct update, one job
    //   useReducer's demo: THREE different actions (dispatch calls), but only
    //     ONE function (reducer) that owns all the logic for how state responds
    //     to each of them. The component's click handlers never touch state
    //     directly — they just describe WHAT happened (the action), and the
    //     reducer decides HOW state should change. This separation — event
    //     description vs. state-transition logic — is the entire reason
    //     useReducer exists over useState once state gets complex enough.

  `,
  tags: [
    "useReducer()",
    "useState()",
    ".js data-file",
    ".jsx demo-file",
  ],
  demo: DemoUseReducer, // calling the component that renders a useReducer(); so it can be used in the Card.jsx component
  category: "React Hooks",
  },
  {
    title: "customHook() React Hook",
    description:
      "Custom hooks are just regular JavaScript functions that start with use and can call other hooks inside them (useState, useEffect, useRef, etc.). They exist to solve one specific problem: when the same piece of stateful logic is needed in multiple components, you'd otherwise have to copy-paste that logic (and its state, effects, everything) into every component that needs it. A custom hook lets you extract that logic into one reusable function instead — each component that calls it gets its own independent copy of that state/behavior, but the code for how it works lives in exactly one place.",
    example: `
    ██████╗██╗   ██╗███████╗████████╗ ██████╗ ███╗   ███╗
    ██╔════╝██║   ██║██╔════╝╚══██╔══╝██╔═══██╗████╗ ████║
    ██║     ██║   ██║███████╗   ██║   ██║   ██║██╔████╔██║
    ██║     ██║   ██║╚════██║   ██║   ██║   ██║██║╚██╔╝██║
    ╚██████╗╚██████╔╝███████║   ██║   ╚██████╔╝██║ ╚═╝ ██║
     ╚═════╝ ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝                 

    // ============================================
    // React custom() Hook
    // ============================================
    //
    // When you have components that can be used by multiple components, we can extract that component into a custom Hook.
    // Custom Hooks start with "use". Example: useFetch.
    //
    // BUILD A HOOK
    //
    // First, let us make an example without a custom Hook.
    // In the following code, we are fetching data from a URL and displaying it.
    // We will use the JSONPlaceholder service to fetch some fake data.
    // 
    // Example: Use the JSONPlaceholder service to fetch some fake titles and display them:
    import { useState, useEffect } from 'react';
    import { createRoot } from 'react-dom/client';

    const Home = () => {
      const [data, setData] = useState(null);

      useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
          .then((res) => res.json())
          .then((data) => setData(data));
    }, []);

      return (
        <>
          {data &&
            data.map((item) => {
              return <p key={item.id}>{item.title}</p>;
            })}
        </>
      );
    };

    createRoot(document.getElementById('root')).render(
      <Home />
    );
    //
    // The logic behind the fetch may be needed in other components as well, so we will turn that into a custom Hook.
    // Move the fetch logic to a new file to be used as a custom Hook.
    // The file name must start with use, and end with .js, and be placed in the same directory as the component.
    // We will name the file useFetch.js.
    //
    // Example: Move the fetch component into the new file:
    // useFetch.js
    import { useState, useEffect } from "react";

    const useFetch = (url) => {
      const [data, setData] = useState(null);

      useEffect(() => {
        fetch(url)
          .then((res) => res.json())
          .then((data) => setData(data));
      }, [url]);

      return [data];
    };

    export default useFetch;
    //
    // Now we can import this Hook, and use it in any other component:
    //
    // Example: Import and use the newly created custom Hook:
    // main.jsx
    import { createRoot } from 'react-dom/client';
    import useFetch from "./useFetch";

    const Home = () => {
      const [data] = useFetch("https://jsonplaceholder.typicode.com/todos");

      return (
        <>
          {data &&
            data.map((item) => {
              return <p key={item.id}>{item.title}</p>;
            })}
        </>
      );
    };

    createRoot(document.getElementById('root')).render(
      <Home />
    );
    //
    // We have created a new file called useFetch.js containing a function called useFetch which contains all of the logic needed to fetch our data.
    // We removed the hard-coded URL and replaced it with a url variable that can be passed to the custom Hook.
    // Lastly, we are returning our data from our Hook.
    // In main.jsx, we are importing our useFetch Hook and utilizing it like any other Hook. This is where we pass in the URL to fetch data from.
    // Now we can reuse this custom Hook in any component to fetch data from any URL.
    //
    // The use prefix isn't just convention — it's how React and linters know a function is allowed to call other hooks inside it.
    // A regular helper function calling useState internally would break the Rules of Hooks; naming it useSomething is what makes that legal.
    // They don't share state between components — each component that calls a custom hook gets its own independent state. It's the logic that's shared/reused, not the actual data.
    // They can return anything — a single value, an array (like useState does), an object with multiple named values (like your useTheme likely does), or even nothing at all.

    // a custom hook is just a regular function, named starting with "use",
    // that calls other hooks inside it

    function useSomething() {
      const [value, setValue] = useState(initialValue);

      // any logic, effects, refs, etc. can live in here

      return value; // can return one value, an array, an object — whatever makes sense
    }

    // used inside a component exactly like a built-in hook
    function Example() {
      const value = useSomething();
      return <div>{value}</div>;
    }

    // A slightly more complete shape, showing a common pattern — returning multiple values:
    function useToggle(initialValue = false) {
      const [value, setValue] = useState(initialValue);

      const toggle = () => setValue((prev) => !prev);

      return { value, toggle };   // returning an object — lets the caller destructure by name
    }

    // used in a component:
    function Example() {
      const { value, toggle } = useToggle();

      return (
        <button onClick={toggle}>
          {value ? "ON" : "OFF"}
        </button>
      );
    }
    
    /*
      The core idea to hold onto: everything inside useToggle — the useState call,
      the toggle function — is completely ordinary hook/state logic. The only thing
      that makes it a "custom hook" rather than just a component is that it doesn't
      return JSX; it returns data and functions that a component then uses to build its own JSX.
    */

    /* use cases:
        - Sharing stateful logic across multiple components
          — the core reason custom hooks exist. Your own useTheme (Panther Tracker) is a real example: theme state
          - and a toggle function, needed by multiple components, written once.

        - Toggles/booleans
          — modals, dropdowns, accordions, sidebars, any open/closed or on/off state, exactly like the useToggle demo.

        - Form field logic
          — managing a single input's value, validation state, and change handler as one reusable unit, so a form with many
          - fields doesn't repeat the same three lines of useState + onChange per field.

        - Data fetching
          — a useFetch(url) hook that wraps useState (for data/loading/error) + useEffect (to trigger the fetch) into one
          - reusable call, instead of rewriting that same loading/error/data pattern in every component that needs to hit an
          - API (this is almost exactly the shape of the ProductList example from your REST/Fetch cheat-sheet, just extracted into a hook).

        - Window/browser APIs
          — things like useWindowSize() (tracks viewport width/height on resize) or useLocalStorage(key) (syncs a piece of state with
          - localStorage automatically) — wrapping a browser API + useEffect into a clean, reusable interface.

        - Debouncing/throttling input
          — a useDebounce(value, delay) hook that delays updating a value until the user stops typing for a moment
          — common for search-as-you-type inputs, so you're not firing an API call on every keystroke.

        - Media queries / responsive logic
          — a useMediaQuery("(max-width: 768px)") hook that returns a boolean tracking whether a media query currently matches, letting
          - components conditionally render based on screen size without manually wiring up matchMedia + useEffect every time.

        - Previous value tracking — a usePrevious(value) hook (built on useRef, tying back to what you learned there)
          - that remembers what a value was on the last render, useful for comparing "did this actually change" logic.

        *** The common thread across all of these: any time you notice yourself about to copy-paste a useState + useEffect (or useRef) combo
          ** into a second component, that's the signal a custom hook belongs there instead.
    */

    // ============================================
    // THE Custom Hook (useToggle) WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
    //      | import DemoCustomHook from "../components/demos/DemoCustomHook.jsx";
    //      | ...
    //      | { title: "Custom Hooks (useToggle example)", ..., demo: DemoCustomHook }
    //      v
    //   DemoCustomHook.jsx
    //      | import useToggle from "../../hooks/useToggle.js";
    //      | const light1 = useToggle();
    //      | const light2 = useToggle(true);
    //      | <button onClick={light1.toggle}>Toggle</button>
    //      | <button onClick={light2.toggle}>Toggle</button>
    //      v
    //   useToggle.js                              <-- NEW LAYER, not seen in any hook wire before this one
    //      | function useToggle(initialValue = false) {
    //      |   const [value, setValue] = useState(initialValue);
    //      |   const toggle = () => setValue((prev) => !prev);
    //      |   return { value, toggle };
    //      | }
    //
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the custom hook entry, this becomes <DemoCustomHook />
    //   -> which itself calls useToggle() TWICE, creating two fully independent
    //      instances of the same reusable logic
    //
    // Difference from every other hook's wire so far:
    //   Every previous demo called a BUILT-IN React hook directly
    //   (useState, useEffect, useRef, etc. — imported straight from "react").
    //   This is the FIRST wire with an extra layer in between: the demo component
    //   doesn't call useState directly at all — it calls useToggle(), a hook
    //   YOU wrote, which is the one actually calling useState() underneath.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the hook itself):
    //   Every other demo taught what ONE hook call does.
    //   This demo calls the SAME custom hook TWICE (light1, light2) specifically
    //   to prove the core payoff of custom hooks: the LOGIC is written once
    //   (inside useToggle.js), but every call gets its own fully independent
    //   state — toggling light1 never touches light2, even though both are
    //   running off the exact same function.
    
  `,
  tags: [
    "customHook()",
    "useState()",
    ".js data-file",
    ".jsx demo-file",
  ],
  demo: DemoCustomHook, // calling the component that renders a customHook(); so it can be used in the Card.jsx component
  category: "React Hooks",
  },
  {
    title: "useActionState() React-19 Hook",
    description:
      "useActionState is React 19's hook for managing form state tied to a server action or form-submission function — it replaces the old manual pattern of separate useState calls for form data, a loading/pending boolean, and error state, collapsing all three into one hook. You give it an action function — one that receives (previousState, formData) and returns the new state — and it returns [state, formAction, isPending]: the current state (starting as whatever you passed as the initial value), a wrapped version of your action function to hand directly to a <form>'s action attribute, and an automatically-tracked pending boolean, with no manual setIsPending(true)/setIsPending(false) calls needed anywhere. Worth noting for accuracy: this was briefly called useFormState during React 19's canary/beta releases before shipping under its final name, useActionState — so if you ever see useFormState referenced in an older article or tutorial, that's the same hook under its old, now-deprecated name.",
    example: `
    ██╗   ██╗███████╗███████╗ █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗████████╗ █████╗ ████████╗███████╗
    ██║   ██║██╔════╝██╔════╝██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
    ██║   ██║███████╗█████╗  ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗   ██║   ███████║   ██║   █████╗  
    ██║   ██║╚════██║██╔══╝  ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  
    ╚██████╔╝███████║███████╗██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║   ██║   ██║  ██║   ██║   ███████╗
     ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝             

    // ============================================
    // useActionState() React-19 Hook
    // ============================================
    //
    /*
      The common thread: useActionState earns its place specifically when a form submission needs to do something
      asynchronous (an API call, a validation check that takes time) and you want the pending/error/result state
      handled by the hook instead of three separate useState calls plus manual try/catch/setIsPending bookkeeping.
      For a form that's purely local and instant (no async step at all), plain useState is still simpler and fine.
    */
    // Basic pattern:
    import { useActionState } from "react";

    async function myAction(previousState, formData) {
      // runs when the form is submitted
      // previousState = whatever this returned last time (or the initial value, on first submit)
      // formData      = a FormData object, automatically built from the form's inputs

      const value = formData.get("fieldName");

      // ...do something with value (validate it, send it somewhere, etc.)...

      return newState; // whatever this returns becomes the new "state"
    }

    function Example() {
      const [state, formAction, isPending] = useActionState(myAction, initialState);

      return (
        <form action={formAction}>
          <input name="fieldName" />
          <button disabled={isPending}>{isPending ? "Submitting..." : "Submit"}</button>
        </form>
      );
    }
    //
    // The pieces, broken down:
    /*
      - myAction(previousState, formData) — your action function, defined separately.
        It always receives two arguments: the previous state (this is what makes it feel
        like useReducer — each call builds on the last return value), and a FormData object
        representing whatever was in the form when it was submitted.

      - formData.get("fieldName") — this is how you read a specific field's value out of
        FormData, matched by that input's name attribute — notice there's no onChange
        handler or useState tracking each keystroke anywhere in this pattern.

      - useActionState(myAction, initialState) — takes your action function and a starting
        value, returns three things: current state, a formAction function to hand
        to the form, and isPending.

      - <form action={formAction}> — this is the key wiring. Rather than an onSubmit handler
        calling preventDefault() and manually reading input values, the form's native action
        attribute is given the wrapped function directly — React handles calling it correctly on submission.

      - isPending — automatically true while the action is running (e.g. an await inside it hasn't resolved yet),
        automatically false once it completes — no manual state management for this at all.

      - The core shift from what you already know: compare this to your useReducer card — same "previous state in,
        new state out" shape — but instead of you calling dispatch({ type: ... }) on a button click, the form
        submission itself is the trigger, and pending/loading state comes free.
    */

    /* use cases:
        - Form validation with server/async checks
          — exactly what the demo does: checking a username, email, or coupon code against something that takes
          - time (an API call, a database lookup) — while showing pending state automatically.
        
        - Login/signup forms
          — submitting credentials, showing "Signing in..." during the request, and displaying an error message
          - returned from the server (invalid password, account doesn't exist) without separate useState calls for each piece.

        - Multi-step or wizard forms
          — since state carries forward from one submission to the next, useful for forms where later steps
          - need context from what was submitted in an earlier step.

        - Comment/review submission
          — a comment form where, after submitting, you want to show either a success confirmation or a validation
          - error (empty comment, too long, etc.), with the pending state disabling the submit button during the request.

        - Newsletter/contact form signups
          — the classic "email field + submit button" pattern, showing "Subscribing..." and then either a success or
          - already-subscribed message — a simpler version of exactly what your demo builds.

        - Search-and-submit patterns tied to a real backend call
          — anywhere a form's whole purpose is triggering an async action (not just locally updating UI state),
          - and you want built-in pending/error handling instead of hand-rolling it.
    */
    
    // ============================================
    // THE useActionState WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
    //      | import DemoUseActionState from "../components/demos/DemoUseActionState.jsx";
    //      | ...
    //      | { title: "useActionState() React Hook", ..., demo: DemoUseActionState }
    //      v
    //   DemoUseActionState.jsx
    //      | async function checkUsername(previousState, formData) {
    //      |   const username = formData.get("username");
    //      |   await new Promise((resolve) => setTimeout(resolve, 1000));
    //      |   const isTaken = takenUsernames.includes(username.toLowerCase());
    //      |   return { message: ..., attempts: previousState.attempts + 1 };
    //      | }
    //      | const [state, formAction, isPending] = useActionState(checkUsername, { message: "", attempts: 0 });
    //      | <form action={formAction}>
    //      |   <input name="username" />
    //      |   <button disabled={isPending}>{isPending ? "Checking..." : "Check"}</button>
    //      | </form>
    //
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the useActionState entry, this becomes <DemoUseActionState />
    //   -> mounts a form with a native "action" attribute wired directly to
    //      the hook's returned formAction function
    //
    // Difference from every other hook's wire so far:
    //   Same exact pattern at the detailData.js/Card.jsx level
    //   (import -> demo: field -> <details.demo />)
    //   The only thing that changes per hook is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the hook itself):
    //   useReducer's demo: dispatch() is called manually, on a button's onClick
    //   useActionState's demo: the ACTION FUNCTION is never called directly by
    //     the component at all — the <form>'s native "action" attribute is what
    //     triggers it, on submission. This is the first demo in the registry
    //     where the trigger isn't a button's onClick handler, but the browser's
    //     own native form-submission behavior, wired directly into React's hook
    //     system instead of intercepted with preventDefault() + manual logic.
    //   Also the first demo with a REAL pending state, tracked automatically —
    //     every earlier "loading" concept (the useEffect clock, the useMemo
    //     slow calculation) had no formal pending flag at all; this hook
    //     provides one natively as its third return value.
    
  `,
  tags: [
    "useActionSatet()",
    "async",
    "forms",
    "api",
    ".js data-file",
    ".jsx demo-file",
  ],
  demo: DemoUseActionState, // calling the component that renders a useActionState(); so it can be used in the Card.jsx component
  category: "React Hooks",
  },
  {
    title: "useOptimistic() React-19 Hook",
    description:
      "useOptimistic is a React 19 hook that lets you immediately show what a UI change will look like, before an async action (a server request, an API call) has actually finished — instead of the UI staying in its old state while the user waits, it jumps straight to the expected result. If the async action succeeds, the real state catches up and the optimistic and real values converge. If it fails, React automatically reverts the UI back to the real value — no manual rollback code needed. Syntax: const [optimisticState, setOptimisticState] = useOptimistic(realState, updateFn?) — it takes the actual current state as its source of truth, plus an optional reducer-style function describing how to compute the temporary optimistic value.",
    example: `
    ██╗   ██╗███████╗███████╗ ██████╗ ██████╗ ████████╗██╗███╗   ███╗██╗███████╗████████╗██╗ ██████╗
    ██║   ██║██╔════╝██╔════╝██╔═══██╗██╔══██╗╚══██╔══╝██║████╗ ████║██║██╔════╝╚══██╔══╝██║██╔════╝
    ██║   ██║███████╗█████╗  ██║   ██║██████╔╝   ██║   ██║██╔████╔██║██║███████╗   ██║   ██║██║     
    ██║   ██║╚════██║██╔══╝  ██║   ██║██╔═══╝    ██║   ██║██║╚██╔╝██║██║╚════██║   ██║   ██║██║     
    ╚██████╔╝███████║███████╗╚██████╔╝██║        ██║   ██║██║ ╚═╝ ██║██║███████║   ██║   ██║╚██████╗
     ╚═════╝ ╚══════╝╚══════╝ ╚═════╝ ╚═╝        ╚═╝   ╚═╝╚═╝     ╚═╝╚═╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝            

    // ============================================
    // useOptimistic() React-19 Hook
    // ============================================
    //
    /*
      The core shift to notice: every other hook in this registry manages state that IS the truth.
      This one deliberately manages a temporary lie — a value shown on purpose because it's probably about
      to become true, specifically to make the UI feel instant instead of waiting on a network round-trip.
    */
    // Basic pattern
    import { useOptimistic } from "react";

    function Example({ realState }) {
      const [optimisticState, setOptimisticState] = useOptimistic(
        realState,
        (currentState, newValue) => {
          // returns what the UI should show OPTIMISTICALLY, before the real update completes
          return newValue;
        }
      );

      async function handleAction(newValue) {
        setOptimisticState(newValue);      // show the change immediately
        await performRealUpdate(newValue);   // the actual async work — updates the REAL state when it finishes
      }

      return <div>{optimisticState}</div>;
    }
    //
    // The pieces, broken down:
    /*
      - useOptimistic(realState, updateFn) — takes the real, source-of-truth state (usually a useState value from a
        parent, or server data) as its first argument, and an optional function describing how to compute the temporary
        optimistic value as its second.

      - optimisticState — what actually gets rendered. While nothing's pending, this equals realState exactly. The moment
        setOptimisticState is called, this temporarily diverges to show the anticipated result.

      - setOptimisticState(newValue) — calling this doesn't touch the real state at all — it only affects what's rendered temporarily, during the async action.

      - The critical rule: setOptimisticState must be called during an async action (inside a transition/Action) — calling it
        needs to happen alongside an actual pending async operation, since React uses that in-flight state to know when to automatically revert.

      - Automatic revert on completion: once the real async work finishes and the real state updates, optimisticState snaps back
        to matching realState — either the real successful value (if it matches what was optimistically shown), or, if the
        action failed, React reverts back to the original real value automatically.
    */

    /* use cases:
        - Social interactions (likes, upvotes, favorites)
          — exactly what the demo does: a like/heart/star button that visually updates the instant you click, rather than waiting on a round-trip before the count changes.

        - Adding items to a list
          — a todo app, a comment section, a chat message — showing the new item in the list immediately while it's actually being saved to a server, rather than a delay before it appears.

        - Toggling a setting/preference
          — a switch or checkbox (notifications on/off, dark mode, a follow/unfollow button) flipping instantly on click, reverting automatically if the save request fails.

        - Deleting an item
          — removing something from a list visually right away, rather than waiting for server confirmation before it disappears — with automatic restoration if the delete actually fails.

        - Editing text inline
          — a name field, a bio, a task title — showing the edited text immediately in the UI while the actual save request is still in flight in the background.

        - Shopping cart quantity changes
          — incrementing/decrementing an item's quantity, or removing it from a cart, felt instantly rather than waiting on the server to confirm the cart update.

        - Reordering/drag-and-drop lists
          — showing the new order immediately as items are dragged, while the actual persisted order is still being saved.

        - The common thread across all of these: actions with a high expected success rate but a real network delay — the whole point of
          useOptimistic is making the common case (it works) feel instant, while still handling the uncommon case (it fails) gracefully
          and automatically, without the UI ever getting stuck in an inconsistent state. It's specifically not a fit for actions where
          failure is common or the consequences of a wrong optimistic guess are serious (e.g. a payment submission) — those still deserve
          to wait for real confirmation before updating the UI.
    */

    // ============================================
    // THE useOptimistic WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
    //      | import DemoUseOptimistic from "../components/demos/DemoUseOptimistic.jsx";
    //      | ...
    //      | { title: "useOptimistic() React Hook", ..., demo: DemoUseOptimistic }
    //      v
    //   DemoUseOptimistic.jsx
    //      | const [likes, setLikes] = useState(12);
    //      | const [isPending, startTransition] = useTransition();
    //      | const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    //      |   likes,
    //      |   (currentLikes, change) => currentLikes + change
    //      | );
    //      | const handleLike = () => {
    //      |   startTransition(async () => {
    //      |     setOptimisticLikes(1);                          // instant UI update
    //      |     await new Promise((resolve) => setTimeout(resolve, 1200));
    //      |     const didSucceed = Math.random() > 0.3;
    //      |     if (didSucceed) setLikes((prev) => prev + 1);     // real update, on success only
    //      |     // on failure: nothing runs, optimisticLikes auto-reverts to match "likes"
    //      |   });
    //      | };
    //      | <button onClick={handleLike} disabled={isPending}>{isPending ? "Liking..." : "Like"}</button>
    //
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the useOptimistic entry, this becomes <DemoUseOptimistic />
    //   -> mounts a like button whose count jumps instantly on click, then either
    //      settles quietly (success) or visibly snaps back (failure) ~1.2s later
    //
    // Difference from every other hook's wire so far:
    //   Same exact pattern at the detailData.js/Card.jsx level
    //   (import -> demo: field -> <details.demo />)
    //   The only thing that changes per hook is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the hook itself):
    //   Every prior demo's displayed state was always TRUE — whatever useState/
    //   useReducer/useActionState held was the actual, correct value at all times.
    //   useOptimistic's demo is the FIRST one where the displayed value is
    //   deliberately, temporarily WRONG on purpose — optimisticLikes shows a
    //   number that hasn't been confirmed yet, specifically to feel fast, with
    //   React silently correcting it back to the truth if the guess doesn't
    //   pan out. This is also the first demo pairing TWO hooks that MUST be
    //   used together (useOptimistic + useTransition) — useOptimistic's revert
    //   behavior only works because the update happens inside a transition.
    
  `,
  tags: [
    "useOptimistic()",
    ".js data-file",
    ".jsx demo-file",
  ],
  demo: DemoUseOptimistic, // calling the component that renders a useOptimistic(); so it can be used in the Card.jsx component
  category: "React Hooks",
  },
  {
    title: "useCallback() React Hook",
    description:
      "useCallback memoizes a function itself, rather than a calculated value — it returns the same function reference between renders as long as its dependencies haven't changed, instead of creating a brand-new function on every single render. Functions in JavaScript are compared by reference, not by what they do — so even two functions with identical code are considered different on every render unless something intentionally keeps the reference stable. useCallback is that mechanism. The most common real reason to reach for it: passing a function down as a prop to a child component that's wrapped in React.memo (or is a dependency in another hook, like useEffect) — without useCallback, that child re-renders every single time the parent does, even if nothing it actually cares about changed, purely because it received a new function prop each time.",
    example: `
    ██╗   ██╗███████╗███████╗ ██████╗ █████╗ ██╗     ██╗     ██████╗  █████╗  ██████╗██╗  ██╗
    ██║   ██║██╔════╝██╔════╝██╔════╝██╔══██╗██║     ██║     ██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
    ██║   ██║███████╗█████╗  ██║     ███████║██║     ██║     ██████╔╝███████║██║     █████╔╝ 
    ██║   ██║╚════██║██╔══╝  ██║     ██╔══██║██║     ██║     ██╔══██╗██╔══██║██║     ██╔═██╗ 
    ╚██████╔╝███████║███████╗╚██████╗██║  ██║███████╗███████╗██████╔╝██║  ██║╚██████╗██║  ██╗
     ╚═════╝ ╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝                

    // ============================================
    // useCallback() React Hook
    // ============================================
    //
    // The useCallback Hook is used to memoize a callback function.
    // Memoizing a function means caching the result of a function so that it does not need to be recalculated.
    // The useCallback function only re-executes when one of its dependencies changes value.
    // This allows us to isolate resource intensive functions so that they will not automatically run on every render.
    //
    /*
      The useCallback and useMemo Hooks are similar:
        - useMemo returns a memoized value.
        - useCallback returns a memoized function.
    */
    // SYNTAX
    // The useCallback Hook accepts two arguments.
      // 1. callback: The function that you want to memoize.
      // 2. dependencies: An array of dependencies for the callback function. The memoized callback will only change if one of these dependencies has changed.
    useCallback(callback, dependencies)
    //
    // Example: Without useCallback:
    // Without useCallback:
    import React, { useState } from 'react';
    import { createRoot } from 'react-dom/client';

    // Child component that receives a function prop
    const Button = React.memo(({ onClick, text }) => {
      alert(Child "$"{text} button rendered);
      return <button onClick={onClick}>{text}</button>;
    });

    // Parent component without useCallback
    function WithoutCallbackExample() {
      const [count1, setCount1] = useState(0);
      const [count2, setCount2] = useState(0);

      // This function is recreated on every render
      const handleClick1 = () => {
        setCount1(count1 + 1);
      };

      const handleClick2 = () => {
        setCount2(count2 + 1);
      };

      alert("Parent rendered");
      return (
        <div>
          <h2>Without useCallback:</h2>
          <p>Count 1: {count1}</p>
          <p>Count 2: {count2}</p>
          <Button onClick={handleClick1} text="Button 1" />
          <Button onClick={handleClick2} text="Button 2" />
        </div>
      );
    }

    createRoot(document.getElementById('root')).render(
      <WithoutCallbackExample />
    );  
    //
    // Example: With useCallback:
    // With useCallback:
    import React, { useState, useCallback } from 'react';
    import { createRoot } from 'react-dom/client';

    // Child component that receives a function prop
    const Button = React.memo(({ onClick, text }) => {
      console.log("$"{text} button rendered);
      return <button onClick={onClick}>{text}</button>;
    });

    // Parent component with useCallback
    function WithCallbackExample() {
      const [count1, setCount1] = useState(0);
      const [count2, setCount2] = useState(0);

      // These functions are memoized and only recreated when dependencies change
      const handleClick1 = useCallback(() => {
        setCount1(count1 + 1);
      }, [count1]);

      const handleClick2 = useCallback(() => {
        setCount2(count2 + 1);
      }, [count2]);

      console.log("Parent rendered");
      return (
        <div>
          <h2>With useCallback:</h2>
          <p>Count 1: {count1}</p>
          <p>Count 2: {count2}</p>
          <Button onClick={handleClick1} text="Button 1" />
          <Button onClick={handleClick2} text="Button 2" />
        </div>
      );
    }

    createRoot(document.getElementById('root')).render(
      <WithCallbackExample />
    ); 

    // Basic pattern
    import { useCallback } from "react";

    function Example() {
      const handleClick = useCallback(() => {
        // function logic here
      }, [/* dependencies */]);

      return <ChildComponent onClick={handleClick} />;
    }
    //
    // The pieces, broken down:
    /*
      - useCallback(fn, dependencies) — takes a function and a dependency array (same shape as useEffect's and useMemo's),
        returns that same function reference across renders, as long as nothing in the dependency array has changed.

      - Without useCallback, every render creates a brand-new function — even if the code inside is identical every time,
        it's a different object in memory, so === comparisons treat it as "changed."

      - With useCallback, if the dependencies haven't changed, React hands back the exact same function from last
        render — genuinely === equal to the previous one, not just functionally equivalent.
    */
   //
   // Side-by-side comparison, since these two are always confused:
   //
   // useMemo — caches a VALUE (the result of calling a function)
   const total = useMemo(() => calculateTotal(items), [items]);
   //
   // useCallback — caches the FUNCTION ITSELF (doesn't call it, just keeps the reference stable)
   const handleClick = useCallback(() => calculateTotal(items), [items]);
   //
   //
   // A genuinely useful way to think about it, straight from how React's own docs frame it:
   /*
    useCallback(fn, deps) is functionally identical to useMemo(() => fn, deps) — useCallback
    is really just a convenience wrapper around the exact same underlying mechanism useMemo
    already uses, specifically for the "I want to memoize a function" case.
   */
  //
  //
  // Why this matters in practice
  /*
    Tying back to your useMemo card's React 19 note: just like useMemo, the React Compiler
    in React 19 can automatically handle a lot of the manual memoization useCallback used to
    require by hand — so, same as useMemo, it's shifting from "reach for constantly"
    to "understand + use deliberately when the compiler doesn't cover it," rather than something
    to wrap around every single function on instinct.
  */

  /* use cases:
      - Passing callbacks to React.memo-wrapped children
        — exactly what the demo proves: preventing an unnecessary child re-render caused
        - only by a "new" function reference, not an actual meaningful change.

      - Functions used as useEffect dependencies
        — if a function is defined inside a component and also listed in an effect's
        - dependency array, an unmemoized function causes that effect to re-run on every
        - single render (since it's "different" every time), even when nothing relevant
        - actually changed. useCallback stabilizes the reference so the effect only re-runs when it should.

      - Functions passed to useMemo
        — similarly, if a useMemo calculation depends on a function reference, an
        - unstable function defeats the whole point of memoizing the calculation.

      - Debounced/throttled functions
        — a search input's debounce handler, or a scroll/resize throttle — these often need a 
        - table function reference so the debounce timer isn't accidentally reset or recreated on every render.

      - Custom hooks that return functions
        — if you're building a custom hook (tying back to that card) that returns a function for
        - consumers to use — like your toggle function in useToggle — wrapping it in useCallback inside
        - the hook keeps that returned function stable across the hook's own re-renders, which matters
        - more the more that hook gets reused across a larger app.

      - Large lists with per-item click handlers
        — a list of many items, each rendering a memoized row component with its own click handler — without
        - useCallback, every row re-renders on any parent state change, even though only one row's data
        - or handler might actually be relevant.

      - The common thread, same caveat as useMemo: useCallback only earns its place when something is actually
        checking the function's reference — React.memo, a dependency array, a debounce timer. Wrapping every single
        function in useCallback "just in case," without one of those things depending on it, adds overhead for
        zero benefit — which is exactly why the React Compiler note applies here too: increasingly, this is
        something to reach for deliberately when it solves a specific problem, not a reflexive habit.
  */

  // ============================================
  // THE useCallback WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
  // ============================================
  //
  //   App.jsx
  //      | renders <Card />
  //      v
  //   Card.jsx
  //      | imports detail array
  //      v
  //   detailData.js
  //      | import DemoUseCallback from "../components/demos/DemoUseCallback.jsx";
  //      | ...
  //      | { title: "useCallback() React Hook", ..., demo: DemoUseCallback }
  //      v
  //   DemoUseCallback.jsx
  //      | const ChildButton = memo(({ onClick, label }) => {
  //      |   console.count(label);
  //      |   return <button onClick={onClick}>{label}</button>;
  //      | });
  //      | const [unrelatedCount, setUnrelatedCount] = useState(0);
  //      | const handleClickNormal = () => { console.log("clicked"); };      // new reference every render
  //      | const handleClickMemoized = useCallback(() => {                     // SAME reference every render
  //      |   console.log("clicked");
  //      | }, []);
  //      | <button onClick={() => setUnrelatedCount(unrelatedCount + 1)}>Trigger Parent Re-render</button>
  //      | <ChildButton onClick={handleClickNormal} label="No useCallback" />
  //      | <ChildButton onClick={handleClickMemoized} label="With useCallback" />
  //
  // At render time in Card.jsx:
  //   {details.demo && <details.demo />}
  //   -> for the useCallback entry, this becomes <DemoUseCallback />
  //   -> mounts a trigger button and two memoized child buttons, whose
  //      console-logged render counts diverge as the parent re-renders
  //
  // Difference from every other hook's wire so far:
  //   Same exact pattern at the detailData.js/Card.jsx level
  //   (import -> demo: field -> <details.demo />)
  //   The only thing that changes per hook is WHICH file gets imported
  //   and WHAT that file's internal logic does.
  //
  // What's different INSIDE this one, conceptually (not the wiring, the hook itself):
  //   This is the FIRST demo in the registry with a component nested INSIDE
  //   the demo file itself (ChildButton, wrapped in memo) rather than a single
  //   flat component. It's also the first demo where useCallback's effect is
  //   invisible in the RENDERED OUTPUT — nothing on screen looks different
  //   between the two buttons. The proof lives entirely in the browser
  //   console (console.count), which is itself the lesson: useCallback
  //   doesn't change what's shown, it changes render efficiency, a category
  //   of hook behavior no earlier demo in this registry represented.
  `,
  tags: [
    "useCallback()",
    "useState()",
    "memo",
    ".js data-file",
    ".jsx demo-file",
  ],
  demo: DemoUseCallback, // calling the component that renders a useCallback(); so it can be used in the Card.jsx component
  category: "React Hooks",
  },





































  {
    title: "() React Hook",
    description:
      "",
    example: `
    ███╗   ██╗███████╗██╗    ██╗
    ████╗  ██║██╔════╝██║    ██║
    ██╔██╗ ██║█████╗  ██║ █╗ ██║
    ██║╚██╗██║██╔══╝  ██║███╗██║
    ██║ ╚████║███████╗╚███╔███╔╝
    ╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝                      

    // ============================================
    // React Hook
    // ============================================
    //
    
  `,
  tags: [
    "()",
    ".js data-file",
    ".jsx demo-file",
  ],
  demo: DemoUseState, // calling the component that renders a (); so it can be used in the Card.jsx component
  category: "React Hooks",
  },
];

// export the data from the detail array in detailData.js
export default detail;