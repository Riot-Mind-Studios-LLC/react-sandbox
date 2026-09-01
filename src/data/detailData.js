// import components
import DemoUseState from "../components/demos/DemoUseState.jsx"; // the component that renders a useState();
import DemoUseEffect from "../components/demos/DemoUseEffect.jsx"; // the component that renders a useEffect();
import DemoUseRef from "../components/demos/DemoUseRef.jsx"; // the component that renders a useRef();
import DemoUseContext from "../components/demos/DemoUseContext.jsx"; // the component that renders a useContext();
import DemoUseMemo from "../components/demos/DemoUseMemo.jsx"; // the component that renders a useMemo();
import DemoUse from "../components/demos/DemoUse.jsx"; // the component that renders a use();
import DemoUseGSAP from "../components/demos/DemoUseGSAP.jsx"; // the component that renders a use();

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
];

// export the data from the detail array in detailData.js
export default detail;