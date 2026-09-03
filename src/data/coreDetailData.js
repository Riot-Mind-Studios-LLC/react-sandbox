// import components
import DemoPropDrilling from "../components/demos/DemoPropDrilling.jsx"; // the component that renders the demo;
import DemoConditionalRendering from "../components/demos/DemoConditionalRendering.jsx"; // the component that renders the demo;
import DemoListsKeys from "../components/demos/DemoListsKeys.jsx"; // the component that renders the demo;
import DemoControlledUncontrolled from "../components/demos/DemoControlledUncontrolled.jsx"; // the component that renders the demo;
import DemoComposition from "../components/demos/DemoComposition.jsx"; // the component that renders the demo;

// source: https://www.w3schools.com/

const detail = [
  {
    title: "Core Concepts: Props & Prop Drilling",
    description:
      "Props are how data flows from a parent component down to a child — passed as attributes when a component is rendered, then read by the child as arguments to its function. They're read-only from the child's perspective: a child can never modify a prop it received, only the parent that owns the actual value can change it (usually by updating its own state, which then flows back down as a new prop value). This one-directional flow — parent to child, never child to parent directly — is one of React's core design principles, often summarized as data flows down. Prop drilling is what happens when a value is needed by a component nested several layers deep, but every component in between has to accept and re-pass that prop along, even though those intermediate components never actually use the value themselves — they're just relaying it. This is exactly the pain point your useContext and use() cards exist to solve, so this concept ties directly back to hooks you've already built.",
    example: `
    ██████╗ ██████╗  ██████╗ ██████╗ ███████╗
    ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔════╝
    ██████╔╝██████╔╝██║   ██║██████╔╝███████╗
    ██╔═══╝ ██╔══██╗██║   ██║██╔═══╝ ╚════██║
    ██║     ██║  ██║╚██████╔╝██║     ███████║
    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚══════╝           

    // ============================================
    // React Core: Props
    // ============================================
    //
    // Props are arguments passed into React components.
    // Props are passed to components via HTML attributes.
    // Props are passed to components via HTML attributes.
    // React Props are like function arguments in JavaScript and attributes in HTML.
    // To send props into a component, use the same syntax as HTML attributes:
    //
    // Example: Add a brand attribute to the Car element:
    createRoot(document.getElementById('root')).render(
        <Car brand="Ford" />
    );
    //
    // The component receives the argument as a props object
    //
    // Example: Use the brand attribute in the Car component:
    function Car(props) {
        return (
            <h2>I am a {props.brand}!</h2>
        );
    }
    //
    // The name of the object is props, but you can call it anything you want.
    //
    // Example: You can use myobj instead of props in the component:
    function Car(myobj) {
        return (
            <h2>I am a {myobj.brand}!</h2>
        );
    }
    //
    // PASS MULTIPLE PROPERTIES
    //
    // You can send as many properties as you want.
    // Every attribute is sent to the Car component as object properties.
    // 
    // Example: Send multiple properties to the Car component:
    createRoot(document.getElementById('root')).render(
      <Car brand="Ford" model="Mustang" color="red" />
    );
    //
    // All properties are received in the Car component inside the props object
    //
    // Example: Use the property values in the Car component:
    function Car(props) {
        return (
            <h2>I am a {props.color} {props.brand} {props.model}!</h2>
        );
    }
    //
    // DIFFERENT DATA TYPES
    //
    // React props can be of any data type, including variables, numbers, strings, objects, arrays, and more.
    // Strings can be sent inside quotes as in the examples above, but numbers, variables, and objects need to be sent inside curly brackets.
    //
    // Examples:
    // 
    // Numbers have to be sent inside curly brackets to be treated as numbers:
    createRoot(document.getElementById('root')).render(
        <Car year={1969} />
    );
    //
    // Variables has to be sent inside curly brackets:
    let x = "Ford";

    createRoot(document.getElementById('root')).render(
        <Car brand={x} />
    );
    //
    // Objects and Arrays has to be sent inside curly brackets:
    let x = [1964, 1965, 1966];
    let y = {name: "Ford", model: "Mustang"};

    createRoot(document.getElementById('root')).render(
        <Car years={x} carinfo={y} />
    );
    //
    // OBJECT PROPS
    //
    // The component treats objects like objects, and you can use the dot notation to access the properties.
    //
    // Example: Use the dot notation to access object properties:
    function Car(props) {
        return (
            <>
            <h2>My {props.carinfo.name} {props.carinfo.model}!</h2>
            <p>It is {props.carinfo.color} and it is from {props.carinfo.year}!</p>
            </>
        );
    }

    const carInfo = {
    name: "Ford",
    model: "Mustang",
    color: "red",
    year: 1969
    };

    createRoot(document.getElementById('root')).render(
        <Car carinfo={carInfo} />
    );
    //
    // ARRY PROPS
    //
    // Array props can be accessed using the indexes.
    //
    // Example: Use the indexes to access array properties:
    function Car(props) {
        return (
            <h2>My car is a {props.carinfo[0]} {props.carinfo[1]}!</h2>
        );
    }

    const carInfo = ["Ford", "Mustang"];

    createRoot(document.getElementById('root')).render(
        <Car carinfo={carInfo} />
    );
    //
    // PASS PROPS FROM COMPONENT TO COMPONENT
    //
    // Attributes are also how you pass data from one component to another, as parameters.
    //
    // Example: Send the brand attribute from the Garage component to the Car component:
    function Car(props) {
        return (
            <h2>I am a {props.brand}!</h2>
        );
    }

    function Garage() {
        return (
            <>
            <h1>Who lives in my garage?</h1>
            <Car brand="Ford" />
            </>
        );
    }

    createRoot(document.getElementById('root')).render(
        <Garage />
    );
    //
    // Note: React Props are read-only! You will get an error if you try to change their value.

    // Basic patterns:
    //
    // PLAIN PROPS 
    function Greeting({ name, role }) {
        return <p>Hello, {name}! You're a {role}.</p>;
    }

    function App() {
        return <Greeting name="Adrian" role="Developer" />;
    }
    /*
        - name="Adrian" and role="Developer" are passed as attributes when Greeting
          is rendered — this is identical in spirit to HTML attributes, just carrying
          JS values instead of only strings.

        - Inside Greeting, { name, role } is destructuring the single props object
          React automatically passes to every component — this is shorthand for
          the longer version: function Greeting(props) { return <p>Hello, {props.name}!</p>; }.

        - Greeting has zero knowledge of where name came from — it just receives whatever the parent gives it.
    */
   //
   // PROP DRILLING: the same value, needed several layers deep
    function App() {
        const user = { name: "Adrian", role: "Developer" };

        return <PageLayout user={user} />;
    }

    function PageLayout({ user }) {
        // PageLayout doesn't use "user" itself — it only exists to relay it downward
        return <Sidebar user={user} />;
    }

    function Sidebar({ user }) {
        // Sidebar doesn't use "user" either — same story
        return <UserProfile user={user} />;
    }

    function UserProfile({ user }) {
        // finally, the component that actually NEEDS it
        return <p>{user.name} - {user.role}</p>;
    }
    /*
        - The user object is only genuinely used in the last component, UserProfile.

        - PageLayout and Sidebar both have to accept user as a prop and manually pass
          it along, purely to relay it — that's the drilling. Neither of them cares about
          user at all; they're just plumbing.

        - If a fifth layer needed a different piece of data, you'd have to thread that
          through the same chain too — and every intermediate component gets a little
          more cluttered with props it doesn't actually use, purely to serve components further down.

        - The visual shape of the problem, side by side:
            App (has "user")
            └─ PageLayout (doesn't need "user", but must accept + pass it)
                └─ Sidebar (doesn't need "user", but must accept + pass it)
                        └─ UserProfile (finally needs "user")

        - This is exactly the shape your useContext demo's comment described a few cards back — and it's
          why Context (or a custom hook wrapping Context) exists: to let UserProfile read user directly,
          skipping PageLayout and Sidebar entirely, without either of them needing to know or care that user even exists.
   */

    /* use cases:
        - Passing configuration/display data
            — text, numbers, booleans, style variants — down to presentational components that render based
              on what they're given (like your Card/Button variants throughout this whole project).

        - Passing event handlers down
            — a parent owns a piece of state, but a deeply nested button is what actually triggers the
              change (tied directly to your useCallback card's ChildButton pattern) — the handler function
              itself is a prop, same mechanism as passing data.

        - Passing components as props (including children)
            — layout wrappers, cards, modals that don't know or care what's rendered inside them, just that
              something will be — this previews the composition/children pattern coming up next in this same phase.

        - Reasonable, shallow prop drilling
            — one or two levels of passing a prop through isn't automatically a problem worth solving with
              Context; it's a completely normal, simple pattern for small component trees. Prop drilling only becomes
              a real pain point once it's happening across many layers, or the same prop needs to be threaded
              through several unrelated branches of the tree.

        - Recognizing when to reach for Context/custom hooks instead
            — the practical use case of understanding prop drilling is knowing when you've crossed the line from "fine,
              just pass it" into "this is genuinely worth solving differently," which is exactly the judgment
              call your useContext/use() cards exist to support.

        - API/data-fetching results flowing downward
            — a parent component fetches data (tying back to your REST/Fetch cheat-sheet), then passes pieces of
              that response down as props to whichever child components need to display different parts of it.

        - The core thing worth internalizing: props and prop drilling aren't opposing concepts — prop drilling is just
          what plain props naturally do at scale. Nothing about props themselves is wrong; the pattern only earns a "problem"
          label once the drilling gets deep or wide enough that Context becomes the better tool, which is exactly
          the tradeoff your earlier hooks already taught you to recognize.
    */

    // ============================================
    // THE Props & Prop Drilling WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // (updated to reflect the CoreCard.jsx / coreDetailData.js split)
    // ============================================
    //
    //   App.jsx
    //      | renders <CoreCard />
    //      v
    //   CoreCard.jsx
    //      | imports detail array
    //      v
    //   coreDetailData.js
    //      | import DemoPropDrilling from "../components/demos/DemoPropDrilling.jsx";
    //      | ...
    //      | { title: "Props & Prop Drilling", ..., demo: DemoPropDrilling }
    //      v
    //   DemoPropDrilling.jsx
    //      | const Level3 = ({ user }) => ( ...actually uses user... );
    //      | const Level2 = ({ user }) => ( ...doesn't use it, just passes it... <Level3 user={user} /> );
    //      | const Level1 = ({ user }) => ( ...doesn't use it, just passes it... <Level2 user={user} /> );
    //      | const DemoPropDrilling = () => {
    //      |   const user = { name: "Adrian", role: "Developer" };
    //      |   return ( ...owns user... <Level1 user={user} /> );
    //      | }
    //
    // At render time in CoreCard.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the props/prop-drilling entry, this becomes <DemoPropDrilling />
    //   -> mounts four visually nested boxes, showing the same "user" value
    //      being passed down three layers before finally being used
    //
    // Difference from every other card's wire so far:
    //   Same overall shape, but this card now routes through the split
    //   structure: CoreCard.jsx + coreDetailData.js, not the original single
    //   Card.jsx + detailData.js. All hook cards (useState through useCallback)
    //   still route through the separate HookCard.jsx + hookDetailData.js pair —
    //   the two phases now live in fully separate card/data pairs, both
    //   rendered together by App.jsx.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
    //   This is the first card in the registry that isn't a hook at all — no
    //   useState, useEffect, useRef, or any React hook is used anywhere in this
    //   demo. It's pure component composition and prop-passing — proving that
    //   React's most fundamental data-flow mechanism (props) doesn't require
    //   any hook to exist or be understood. Also the first demo built entirely
    //   from STATIC, non-interactive nesting — there's nothing to click, because
    //   the point is the STRUCTURE of the component tree itself, not a behavior
    //   change over time.
  `,
  tags: [
    "props",
    "props drilling",
    "components"
  ],
  demo: DemoPropDrilling, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
  category: "Core React",
  },
  {
    title: "Core Concepts: Conditional Rendering",
    description:
      "Conditional rendering is how a component decides what to show (or whether to show anything at all) based on a condition — a piece of state, a prop, or any JS expression that evaluates to true/false. Unlike a templating language with special if/else tags, JSX doesn't have its own conditional syntax at all — conditional rendering in React is really just plain JavaScript expressions, embedded inside { }, that happen to return JSX (or null) depending on the condition. You've actually already used this pattern constantly throughout this whole project — every {details.demo && <details.demo />} line in Card.jsx is conditional rendering. There are a few common patterns for it, each suited to slightly different situations, which we'll cover one at a time: the && operator (render something or nothing), the ternary operator (render one of two things), and full if/else statements before the return (for more complex branching logic that doesn't fit cleanly inline).",
    example: `
     ██████╗ ██████╗ ███╗   ██╗██████╗ ██╗████████╗██╗ ██████╗ ███╗   ██╗ █████╗ ██╗     
    ██╔════╝██╔═══██╗████╗  ██║██╔══██╗██║╚══██╔══╝██║██╔═══██╗████╗  ██║██╔══██╗██║     
    ██║     ██║   ██║██╔██╗ ██║██║  ██║██║   ██║   ██║██║   ██║██╔██╗ ██║███████║██║     
    ██║     ██║   ██║██║╚██╗██║██║  ██║██║   ██║   ██║██║   ██║██║╚██╗██║██╔══██║██║     
    ╚██████╗╚██████╔╝██║ ╚████║██████╔╝██║   ██║   ██║╚██████╔╝██║ ╚████║██║  ██║███████╗
     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
                                                                                        
    ██████╗ ███████╗███╗   ██╗██████╗ ███████╗██████╗ ██╗███╗   ██╗ ██████╗ 
    ██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗██║████╗  ██║██╔════╝ 
    ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝██║██╔██╗ ██║██║  ███╗
    ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗██║██║╚██╗██║██║   ██║
    ██║  ██║███████╗██║ ╚████║██████╔╝███████╗██║  ██║██║██║ ╚████║╚██████╔╝
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 

    // ============================================
    // React Core: Conditional Rendering
    // ============================================
    //
    // In React, you can conditionally render components.
    // There are several ways to do this.
    //
    // IF STATEMENT
    // We can use the if JavaScript operator to decide which component to render.
    //
    // Example: We'll use these two components:
    function MissedGoal() {
        return <h1>MISSED!</h1>;
    }

    function MadeGoal() {
        return <h1>Goal!</h1>;
    }
    //
    // Example: Now, we'll create another component that chooses which component to render based on a condition:
    function Goal(props) {
    const isGoal = props.isGoal;
        if (isGoal) {
            return <MadeGoal/>;
        }
        return <MissedGoal/>;
    }

    createRoot(document.getElementById('root')).render(
        <Goal isGoal={false} />
    );
    //
    // LOGICAL && OPERATOR
    // Another way to conditionally render a React component is by using the && operator.
    // In the example below, the heading will only be rendered if the props.brand property is not empty:
    //
    // Example: The right side of && will only be rendered if the left side is true:
    // If props.brand evaluates to true, the expression after && will render.
    function Car(props) {
        return (
            <>
            {props.brand && <h1>My car is a {props.brand}!</h1>}
            </>
        );
    }

    createRoot(document.getElementById('root')).render(
        <Car brand="Ford" />
    );
    //
    // TERNARY OPERATOR
    // Another way to conditionally render elements is by using a ternary operator.
    condition ? true : false
    //
    // Example: Return the MadeGoal component if isGoal is true, otherwise return the MissedGoal component:
    function Goal(props) {
    const isGoal = props.isGoal;
        return (
            <>
            { isGoal ? <MadeGoal/> : <MissedGoal/> }
            </>
        );
    }

    createRoot(document.getElementById('root')).render(
        <Goal isGoal={false} />
    );
    
    // Basic patterns:
    //
    // 1. && operator — render SOMETHING, or render NOTHING
    {isLoggedIn && <p>Welcome back!</p>}
    // if isLoggedIn is true  -> renders the <p>
    // if isLoggedIn is false -> renders nothing (false itself isn't rendered to the screen)

    // 2. Ternary operator — render ONE of TWO things
    {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in</p>}
    // always renders SOMETHING — just picks which of the two

    // 3. if / else BEFORE the return — for more complex branching
    function Greeting({ isLoggedIn }) {
    if (isLoggedIn) {
        return <p>Welcome back!</p>;
    }
    return <p>Please log in</p>;
    }
    // can't be written inline inside JSX — if/else are STATEMENTS, not expressions,
    // and JSX's { } only accepts expressions (something that evaluates to a value)
    
    /*
        When to reach for which, as a rule of thumb:

        - &&
            — when there's no "else" case at all; you either show something, or show nothing.
              This is exactly what every {details.demo && <details.demo />} line in your own Card.jsx is doing.

        - Ternary
            — when there are exactly two possible outcomes, and both are simple enough to write inline.

        - if/else before return
            — when the logic is more involved (multiple conditions, computing a variable first, more
              than two outcomes) and cramming it into a single JSX expression would hurt readability.
    */

    // One real gotcha worth knowing with &&, since it trips people up:
    {count && <p>Count: {count}</p>}
    // if count is 0, this renders the NUMBER 0 on the page, not nothing!
    // 0 is falsy, so JS short-circuits and returns 0 itself — and 0 IS a
    // valid, renderable value in JSX (unlike false/null/undefined, which render as nothing)

    // fix: make sure the left side is an actual boolean, not a number
    {count > 0 && <p>Count: {count}</p>}
    {Boolean(count) && <p>Count: {count}</p>}

    /* use cases:
        - Auth-gated UI
            — showing a login button vs. a user menu/avatar depending on isLoggedIn, exactly like the demo — one of
              the most common real-world uses of the &&/ternary pattern.

        - Loading/error/data states
            — this ties directly back to your REST/Fetch cheat-sheet's ProductList example: if (loading) return <Spinner />,
              if (error) return <ErrorMessage />, then the actual content — a real, everyday use of the if/else-before-return pattern.

        - Empty states
            — showing "No results found" or "Your cart is empty" instead of an empty list when an array has zero items, versus
              rendering the actual list when it doesn't.

        - Feature flags / permissions
            — conditionally rendering an admin panel, a beta feature, or a specific button only for users who have access,
            checked the same way isLoggedIn was checked in the demo.

        - Toggling UI visibility
            — modals, dropdowns, accordions, tooltips — all fundamentally "render this, or don't," almost always via && or
              a ternary tied to a boolean piece of state.

        - Every {details.demo && <details.demo />} line in your own Card.jsx
            — worth naming explicitly, since it's the most concrete, already-proven example you have: conditionally rendering
              the "Live Example" section only for cards that actually have a demo set, using the exact && pattern from this card.

        - Form validation messages
            — showing an error message beneath a field only when that field is actually invalid, hiding it otherwise.

        - The common thread, tying back to the gotcha you just tested: conditional rendering is just JavaScript truthiness
          applied to JSX — which means every quirk you already know about truthy/falsy values (from the JS cheat-sheet) applies
          directly here, for better or worse. Understanding why 0 renders but false/null/undefined don't isn't
          trivia — it's the actual mechanism this whole pattern runs on.
    */

    // ============================================
    // THE Conditional Rendering WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // (updated to reflect the CoreCard.jsx / coreDetailData.js split)
    // ============================================
    //
    //   App.jsx
    //      | renders <CoreCard />
    //      v
    //   CoreCard.jsx
    //      | imports detail array
    //      v
    //   coreDetailData.js
    //      | import DemoConditionalRendering from "../components/demos/DemoConditionalRendering.jsx";
    //      | ...
    //      | { title: "Conditional Rendering", ..., demo: DemoConditionalRendering }
    //      v
    //   DemoConditionalRendering.jsx
    //      | const [isLoggedIn, setIsLoggedIn] = useState(false);
    //      | const [count, setCount] = useState(0);
    //      | {isLoggedIn && <p>Welcome back!</p>}                          // && operator
    //      | <p>{isLoggedIn ? "Welcome back!" : "Please log in"}</p>          // ternary
    //      | <p>Count is: {count && count}</p>                                 // broken "0" gotcha
    //      | <p>Count is: {count > 0 ? count : "zero, rendered correctly"}</p>   // fixed version
    //
    // At render time in CoreCard.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the conditional rendering entry, this becomes <DemoConditionalRendering />
    //   -> mounts three toggleable buttons and four stacked examples of the
    //      same underlying state rendered through different conditional patterns
    //
    // Difference from every other card's wire so far:
    //   Same overall shape, but this card now routes through the split
    //   structure: CoreCard.jsx + coreDetailData.js, not the original single
    //   Card.jsx + detailData.js. All hook cards (useState through useCallback)
    //   still route through the separate HookCard.jsx + hookDetailData.js pair —
    //   the two phases now live in fully separate card/data pairs, both
    //   rendered together by App.jsx.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
    //   This is the second non-hook card in the registry (after Props & Prop
    //   Drilling) — again, no custom hook logic is the point here, just plain
    //   useState paired with JS expressions. It's also the first demo that
    //   deliberately shows a BROKEN version side by side with a FIXED version
    //   of the same output — every earlier demo showed one correct working
    //   pattern; this one is built specifically to expose a common mistake
    //   (the "0" gotcha) as directly observable, not just described in a comment.
  `,
  tags: [
    "conditional",
    "ternary",
    "logic"
  ],
  demo: DemoConditionalRendering, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
  category: "Core React",
  },
  {
    title: "Core Concepts: Lists & Keys ",
    description:
      "Lists in React are typically rendered using .map() — you already know this cold, since it's literally the mechanism your entire Card.jsx is built on (detail.map((details, key) => (...))). Given an array of data, .map() transforms each item into a piece of JSX, and the resulting array of JSX elements is what actually gets rendered to the page. Keys are a special prop React requires on every element produced inside a .map() — a unique identifier, per item, that lets React track which specific item is which across re-renders. Without a stable key, if the underlying array changes (an item gets added, removed, or reordered), React can't reliably tell which rendered element corresponds to which piece of data anymore — it falls back to comparing by position instead, which can cause real bugs: form inputs holding onto the wrong values, animations firing on the wrong element, or component state getting mixed up between items after a reorder. The one gotcha worth flagging immediately, since it's extremely common: using the array index as the key (arr.map((item, index) => <div key={index}>) works fine for lists that never reorder, get filtered, or have items added/removed from the middle — but breaks exactly the scenarios keys exist to protect against, the moment the list becomes dynamic. The correct key is a value that's stable and unique to that specific piece of data — usually an id field from the data itself, not its position in the array.",
    example: `
    ██╗     ██╗███████╗████████╗███████╗        ██╗    ██╗  ██╗███████╗██╗   ██╗███████╗
    ██║     ██║██╔════╝╚══██╔══╝██╔════╝       ██╔╝    ██║ ██╔╝██╔════╝╚██╗ ██╔╝██╔════╝
    ██║     ██║███████╗   ██║   ███████╗      ██╔╝     █████╔╝ █████╗   ╚████╔╝ ███████╗
    ██║     ██║╚════██║   ██║   ╚════██║     ██╔╝      ██╔═██╗ ██╔══╝    ╚██╔╝  ╚════██║
    ███████╗██║███████║   ██║   ███████║    ██╔╝       ██║  ██╗███████╗   ██║   ███████║
    ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝    ╚═╝        ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝           

    // ============================================
    // React Core: Lists & Keys
    // ============================================
    // 
    // In React, you will render lists with some type of loop.
    // The JavaScript map() array method is generally the preferred method.
    //
    // Example: a simple list using the map() method:
    function MyCars() {
        const cars = ['Ford', 'BMW', 'Audi']; // the name of the array is called cars

        return (
            <>
            <h1>My Cars:</h1>
            <ul>
                // map the cars array
                // every item in the array can be targeted using the keyword: car
                // this will return every item in the array as a list item
                {cars.map((car) => <li>I am a { car }</li>)}
            </ul>
            </>
        );
    }
    //
    // When you run this code in your React environment, it will work but you will
    // receive a warning that there is no "key" provided for the list items.
    //
    // KEYS IN REACT LISTS
    //
    /*
        Keys allow React to keep track of elements. This way, if an item is updated or
        removed, only that item will be re-rendered instead of the entire list.

        Keys must be unique among siblings, but they don't have to be unique across the entire application.

        Generally, the key should be a unique ID assigned to each item. As a last resort,
        you can use the array index as a key.
    */
   //
   // Example: Here the example from above, with keys:
   function MyCars() {

        const cars = [
            {id: 1001, brand: 'Ford'},
            {id: 1002, brand: 'BMW'},
            {id: 1003, brand: 'Audi'}
        ];

        return (
            <>
            <h1>My Cars:</h1>
            <ul>
                {cars.map((car) => <li key={car.id}>I am a { car.brand }</li>)}
            </ul>
            </>
        );

    }
    //
    // USING ARRAY INDEX AS KEYS
    //
    // While it's possible to use the array index as a key, it's not recommended unless:
        // The list is static (won't change)
        // The list will never be reordered or filtered
        // The items in the list have no IDs
    //
    // Example: Using array indexes as keys (not recommended for dynamic lists):
    function MyCars() {
        const cars = ['Ford', 'BMW', 'Audi'];

        return (
            <>
            <h1>My Cars:</h1>
            <ul>
                // using the index keyword in the map, grabs the index position of items in the array
                // then you can just reference the keyword in the key fot the li
                {cars.map((car, index) => <li key={index}>I am a { car }</li>)}
            </ul>
            </>
        );

    }
    
    // Basic patterns
    const items = [
    { id: 1, name: "Sticker Pack" },
    { id: 2, name: "Vanity Plate" },
    { id: 3, name: "Snapback Hat" },
    ];

    function List() {
        return (
            <ul>
                {items.map((item) => ( // runs once per array item, returning a piece of JSX for each li

                // key={item.id} goes on the outermost element returned by .map(), not somewhere buried inside it.
                // React reads this prop specially — it's never passed down to the component itself
                // as a real prop, it's consumed entirely by React's own internal tracking.
                // item.id, not the map's index — this is the "stable and unique to the data" key discussed a moment ago.
                    <li key={item.id}>{item.name}</li>
                    
                ))}
            </ul>
        );
    }
    
    // Side-by-side: the common mistake vs. the correct version:

    // WRONG — using the array index as the key
    // works fine for a static list, but breaks if items are reordered/filtered/inserted —
    // React ends up matching the WRONG rendered element to the wrong data after a change
    {items.map((item, index) => (
        <li key={index}>{item.name}</li>
    ))}

    // CORRECT — using a stable, unique value FROM the data itself
    {items.map((item) => (
        <li key={item.id}>{item.name}</li>
    ))}
    
    /*
        What if the data genuinely has no unique id? Sometimes true for static, hardcoded lists — in that
        case, a value that's actually unique per item (even a combination of fields) is still better than
        the index, but generating a real id at the data source (a database, an API, or crypto.randomUUID()
        when creating the item is the correct long-term fix, not a workaround.
    */

    /* use cases:
        - Rendering any array of data as UI — the single most common pattern in React, full stop: product lists,
          blog posts, comments, search results, navigation menus, table rows — anywhere a collection of similar
          items needs to become a collection of similar components.

        - Your own Card.jsx — worth naming directly, since it's the clearest example you have: every single
          card in this entire sandbox app exists because of detail.map((details, key) => ...). This whole project
          has been a live, ongoing lists-and-keys demo the entire time, even before this card formalized it.

        - Dynamic, editable lists — todo apps, shopping carts, form field arrays (adding/removing rows) — anywhere
          items can be added, removed, or reordered by the user, which is exactly the scenario where correct keys
          stop being optional and start being load-bearing (as your demo just proved).

        - Rendering tags/chips/pills — your own details.tags.map((tag, key) => ...) pattern used throughout every card's tag section.

        - Table rows — mapping an array of records into <tr> elements, each needing a stable key tied to a record's actual ID, not its row position.

        - Nested lists — a list of categories, each containing a list of items within it — requires careful key
          uniqueness at each level of nesting, since a key only needs to be unique among its immediate siblings, not globally unique across the whole app.

        - Generated form fields — dynamically rendering a form's inputs from a config array (similar in spirit to
          your own maintenanceTypes, reminderTypes, partCategories dropdown data) rather than hand-writing each input.

        - The common thread, and the real lesson underneath this whole card: keys aren't a React formality to silence
          a console warning — they're how React knows what "the same thing" means across two renders. Your demo made
          that concrete: the checkbox didn't move because of some quirky bug, it moved because index-based keys told
          React "item 0 is still item 0," which was simply false the moment the list's order changed.
    */

    // ============================================
    // THE Lists & Keys WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <CoreCard />
    //      v
    //   CoreCard.jsx
    //      | imports detail array
    //      v
    //   coreDetailData.js
    //      | import DemoListsKeys from "../components/demos/DemoListsKeys.jsx";
    //      | ...
    //      | { title: "Lists & Keys", ..., demo: DemoListsKeys }
    //      v
    //   DemoListsKeys.jsx
    //      | const ListItem = ({ label }) => { const [isChecked, setIsChecked] = useState(false); ... }
    //      | const [items, setItems] = useState(initialItems);
    //      | const removeFirst = () => setItems(items.slice(1));
    //      | {items.map((item, index) => <ListItem key={index} label={item.name} />)}   // buggy
    //      | {items.map((item) => <ListItem key={item.id} label={item.name} />)}          // correct
    //
    // At render time in CoreCard.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the lists & keys entry, this becomes <DemoListsKeys />
    //   -> mounts two parallel lists (index-keyed vs. id-keyed) with a shared
    //      "Remove First Item" trigger, so checkbox state visibly desyncs in
    //      one list and stays correctly attached in the other
    //
    // Difference from every other card's wire so far:
    //   Same overall shape as before, but this is the FIRST card to route
    //   through the NEW split structure: CoreCard.jsx + coreDetailData.js,
    //   instead of the original single Card.jsx + detailData.js. Every hook
    //   card (useState through useCallback) still routes through the ORIGINAL
    //   HookCard.jsx + hookDetailData.js pairing — the two phases now live
    //   in fully separate card/data pairs, both rendered together by App.jsx.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
    //   This is the first demo with a component (ListItem) that holds ITS OWN
    //   independent state (isChecked) and gets rendered TWICE, side by side,
    //   from the same source array — once with a fragile key strategy, once
    //   with a correct one. Every earlier list-like pattern in this registry
    //   (the .map() over "detail" itself, tags.map()) used stable, unique keys
    //   without ever demonstrating what breaks when that's NOT the case. This
    //   is the first card to make the failure mode itself the demo.
  `,
  tags: [
    ".map()",
    "objects",
    "arrays",
    "prop",
    "lists",
    "keys",
    "index",
    "loop"
  ],
  demo: DemoListsKeys, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
  category: "Core React",
  },
  {
    title: "Core Concepts: Controlled v Uncontrolled Components",
    description:
      "Controlled components are form inputs (<input>, <textarea>, <select>) whose value is driven entirely by React state — the input's value comes from a state variable, and every keystroke updates that state via onChange, which then re-renders the input with the new value. React is the single source of truth for what the input currently holds. Uncontrolled components are the opposite — the input manages its own value internally, the way a plain HTML form always has, and React only reaches in to read the current value when it actually needs it (usually via a ref, tying directly back to your useRef card), rather than tracking every keystroke as it happens.",
    example: `
     ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗     ██╗   ██╗
    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗    ██║   ██║
    ██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██║  ██║    ██║   ██║
    ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██║  ██║    ╚██╗ ██╔╝
    ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██████╔╝     ╚████╔╝ 
     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═════╝       ╚═══╝                                                                                              
            
     ██╗   ██╗███╗   ██╗ ██████╗ ██████╗ ███╗   ██╗████████╗██████╗  ██████╗ ██╗     ██╗     ███████╗██████╗ 
    ██║   ██║████╗  ██║██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔═══██╗██║     ██║     ██╔════╝██╔══██╗
    ██║   ██║██╔██╗ ██║██║     ██║   ██║██╔██╗ ██║   ██║   ██████╔╝██║   ██║██║     ██║     █████╗  ██║  ██║
    ██║   ██║██║╚██╗██║██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██╗██║   ██║██║     ██║     ██╔══╝  ██║  ██║
    ╚██████╔╝██║ ╚████║╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╔╝███████╗███████╗███████╗██████╔╝
     ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═════╝ 
                
     ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗███████╗
    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
    ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
    ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   ╚════██║
    ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   ███████║
     ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
                                                                                          
    // ================================================
    // React Core: COntrolled v Uncontrolled Components
    // ================================================
    //
    // Just like in HTML, React uses forms to allow users to interact with the web page.
    // You add a form with React like any other element
    //
    // Example: You add a form with React like any other element:
    function MyForm() {
        return (
            <form>
                <label>Enter your name:
                    <input type="text" />
                </label>
            </form>
        )
    }
    //
    // This will work as normal, the form will submit and the page will refresh.
    // But this is generally not what we want to happen in React.
    // We want to prevent this default behavior and let React control the form.

    // HTML FORMS VS. REACT FORMS
    //
    // In React, form elements like <input>, <textarea>, and <select> work a bit differently from traditional HTML.
    // In standard HTML, form elements maintain their own value based on user input.
    // For example, an <input type="text"> field keeps track of its own value in the HTML DOM.
    //
    // In React, the value of the form element is kept in the component's state property and updated only with the setState() function.
    // In other words; React provides a way to manage form data through component state, leading to what are known as "controlled components."

    // CONTROLLED COMPONENTS
    //
    // In a controlled component, form data is handled by the React component.
    // The value of the input element is driven by the React state, and any changes to that value are managed through event handlers that update the state.
    // When the data is handled by the components, all the data is stored in the component state.
    // We can use the useState Hook to keep track of each input value and provide a "single source of truth" for the entire application.
    //
    // Example: Use the useState Hook to manage the input:

    // 1. Import the useState Hook from React:
    import { useState } from 'react';
    import { createRoot } from 'react-dom/client';

    function MyForm() {
        // 2. Declare a state variable to hold the input's value and a function to update it:
        const [name, setName] = useState("");

        // 3. Create a function to handle the change event:
        function handleChange(e) {
            setName(e.target.value);
        }

        return (
            <form>

                <label>Enter your name:
                    // 4. Set the value of the input field to the state variable and the onChange attribute to handle the change event:
                    <input
                    type="text" 
                    value={name}
                    onChange={handleChange}
                    />
                </label>

                // 5. Display the current value to show that the value is being updated:
                <p>Current value: {name}</p>

            </form>
        )
    }

    createRoot(document.getElementById('root')).render(
    <MyForm />
    );

    // INITIAL VALUES
    // To add an initial value to the input field in the example above, add a value to the useState object:
    //
    // Example: Use initial value for name:
    function MyForm() {
        const [name, setName] = useState("John");
    ...

    // Basic patterns:

    // Controlled component
    function ControlledExample() {
        const [name, setName] = useState("");

        return (
            <input
            value={name} // React state drives what's shown
            onChange={(e) => setName(e.target.value)} // every keystroke updates state
            />
        );
    }

    // Uncontrolled component
    function UncontrolledExample() {
        const inputRef = useRef(null);

        const handleSubmit = () => {
            console.log(inputRef.current.value); // read the value only when needed, not on every keystroke
        };

        return (
            <>
            <input ref={inputRef} defaultValue="" />
            <button onClick={handleSubmit}>Submit</button>
            </>
        );
    }

    /* The pieces, broken down:
        - Controlled: value={name} is what makes this controlled — React is explicitly telling the
          input what to display, every render. onChange is required alongside it — without it,
          the input would be stuck permanently displaying whatever name currently is, since nothing
          would ever update state to reflect what the user types (React would actually warn you about
          this exact mistake: a value prop with no onChange handler).

        - Uncontrolled: defaultValue (not value) sets the starting value only — after that, the DOM
          owns it entirely, and React doesn't re-render or know anything changed until inputRef.current.value
          is explicitly read.

        - The onChange requirement is the tell: if you see value on an input with no onChange, that's either a
        bug, or an intentionally read-only controlled input (which needs a readOnly attribute to be valid,
        since React will otherwise complain).
    */

    // One more real distinction worth knowing — checkboxes/radios use checked, not value, for controlled state:
    <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
    />

    /* use cases
        - Live validation as the user types — showing an error message, a strength meter, or a checkmark the moment
          input becomes valid/invalid, rather than waiting until submission — requires controlled inputs, since React
          needs to see every keystroke to react to it.

        - Formatting input as it's typed — auto-inserting dashes in a phone number, forcing uppercase (like the demo),
          auto-capitalizing names, limiting character count with a live counter — all controlled patterns, same
          mechanism as the demo's uppercase transform.

        - Conditionally enabling/disabling a submit button — disabling submit until all required fields are
          filled or valid, checked continuously as state changes.

        - Syncing one field based on another — a "confirm password" field that live-compares against the "password"
          field, or a state dropdown that filters based on a selected country — needs both fields' current values
          accessible as state, not locked away in the DOM.

        - Search-as-you-type inputs — tied directly back to your REST/Fetch cheat-sheet's AbortController
          example — a search box firing a new query on every keystroke needs the current value as state to
          trigger effects/fetches off of.

        - Simple forms with no live behavior — a basic contact form that's only read once, at submission — a solid case
          for uncontrolled inputs, since there's no benefit to re-rendering on every keystroke if nothing needs to
          react to it in real time. This is the honest use case for uncontrolled, not just controlled.

        - File inputs — this one's worth calling out specifically: <input type="file"> is always uncontrolled in React —
          you cannot set its value programmatically for security reasons (a webpage isn't allowed to silently populate
          a file input with an arbitrary file path). This ties directly to your own real code — your Panther Tracker
          photoInputRef had to be uncontrolled by necessity, not by choice.

        - Integrating with non-React code/libraries — a third-party widget or plain JS library that expects to manage
          its own input directly often works more smoothly left uncontrolled, read via ref only when React
          actually needs the value.

        - The real judgment call this card teaches: controlled is the right default for most real form work, since
          almost every practical form eventually needs some live behavior (validation, formatting, cross-field logic) —
          but uncontrolled has genuine, non-workaround use cases too, especially file inputs and simple submit-once
          forms, rather than being purely "the old/wrong way" of doing things.
    */

    // ============================================
    // THE Controlled vs. Uncontrolled Components WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <CoreCard />
    //      v
    //   CoreCard.jsx
    //      | imports detail array
    //      v
    //   coreDetailData.js
    //      | import DemoControlledUncontrolled from "../components/demos/DemoControlledUncontrolled.jsx";
    //      | ...
    //      | { title: "Controlled vs. Uncontrolled Components", ..., demo: DemoControlledUncontrolled }
    //      v
    //   DemoControlledUncontrolled.jsx
    //      | const [controlledValue, setControlledValue] = useState("");
    //      | <input value={controlledValue} onChange={(e) => setControlledValue(e.target.value.toUpperCase())} />
    //      | const uncontrolledRef = useRef(null);
    //      | const [uncontrolledDisplay, setUncontrolledDisplay] = useState("(not read yet)");
    //      | <input ref={uncontrolledRef} defaultValue="" />
    //      | const readUncontrolled = () => setUncontrolledDisplay(uncontrolledRef.current.value);
    //      | <button onClick={readUncontrolled}>Read Value</button>
    //
    // At render time in CoreCard.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the controlled/uncontrolled entry, this becomes <DemoControlledUncontrolled />
    //   -> mounts two inputs side by side: one reactive on every keystroke,
    //      one silent until its value is explicitly read via a button click
    //
    // Difference from every other card's wire so far:
    //   Same overall shape as every other card in the split structure
    //   (CoreCard.jsx + coreDetailData.js -> demo: field -> <details.demo />).
    //   The only thing that changes per card is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
    //   This is the first card to combine TWO earlier concepts on purpose,
    //   side by side, as its entire point: useState (controlled) directly next
    //   to useRef (uncontrolled) — not introducing new hook mechanics, but
    //   showing the same job (getting a value out of an input) done two
    //   completely different ways. Every earlier demo taught ONE approach in
    //   isolation; this is the first comparison-style demo since useMemo's
    //   two-button contrast, but here the contrast is between two entirely
    //   different HOOKS, not two branches of the same hook's behavior.
  `,
  tags: [
    "useState()",
    "forms",
    "inputs",
    "controlled",
    "uncontrolled",
    "handler"
  ],
  demo: DemoControlledUncontrolled, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
  category: "Core React",
  },
  {
    title: "Core Concepts: Component Composition",
    description:
      "Component composition is the practice of building complex UI by combining smaller, simpler components together — rather than one giant component trying to handle every possible variation internally. The children prop is the specific mechanism that makes this possible: any JSX you place between a component's opening and closing tags automatically gets passed to that component as a special prop called children — letting a component render whatever content it's given, without needing to know in advance what that content will be.",
    example: `
     ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ██╗████████╗
    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗  ██║╚══██╔══╝
    ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔██╗ ██║   ██║   
    ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██║╚██╗██║██╔══╝  ██║╚██╗██║   ██║   
    ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝██║ ╚████║███████╗██║ ╚████║   ██║   
     ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═══╝   ╚═╝   
                                                                                    
     ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███████╗██╗████████╗██╗ ██████╗ ███╗   ██╗
    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗██╔════╝██║╚══██╔══╝██║██╔═══██╗████╗  ██║
    ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║███████╗██║   ██║   ██║██║   ██║██╔██╗ ██║
    ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║╚════██║██║   ██║   ██║██║   ██║██║╚██╗██║
    ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝███████║██║   ██║   ██║╚██████╔╝██║ ╚████║
     ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚══════╝╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

    // ============================================
    // React Core: Component Composition
    // ============================================
    //
    // Regular props (like the user object from your prop-drilling card) pass data. children passes
    // JSX itself — actual renderable content, decided by whoever is using the component, not by the
    // component itself. This is what makes a wrapper component like a Card, Modal, or Layout genuinely
    // reusable — it can provide consistent styling/structure/behavior around any content, without
    // ever needing to know what that content will be ahead of time.
    //
    // Basic shapes
    <Component>
        <p>This paragraph is this components "children"</p>
    </Component>

    // { children } — destructured off props, exactly like name or role would be — children isn't
    // magic syntax, it's just the specific prop name React automatically populates with
    // whatever's nested between a component's tags.
    function Card({ children }) {
        return (
            <div className="p-4 rounded-lg border border-amber-300 bg-white">

                // {children} inside Card's return — this is where that nested content
                // actually gets rendered. Card itself has no idea what's inside —
                // it just knows where to put it.
                {children}

            </div>
        );
    }

    function App() {
        return (

            // <Card>...</Card> — anything written between the opening and closing tags becomes
            // Card's children prop automatically. You never explicitly write children={...} —
            // JSX nesting syntax does that for you.
            <Card>
                <h2>Title</h2>
                <p>Any content at all can go here.</p>
            </Card>

        );
    }
    
    // A component can accept children alongside regular props too — this is extremely common:
    function Card({ title, children }) {
        return (
            <div className="p-4 rounded-lg border border-amber-300 bg-white">
                <h3 className="font-semibold mb-2">{title}</h3>
                {children}
            </div>
        );
    }

    <Card title="My Card">
        <p>This is the body content.</p>
    </Card>

    // Composition vs. what you might otherwise reach for — a config-prop approach
    // The composition version scales far better — Card never needs new props added
    // just to support a new kind of content (an image, a button, another nested
    // component) — anything can be dropped in as children without ever touching Card's own code.

    // without composition — Card has to know about every possible content type in advance
    <Card title="My Card" bodyText="This is the body content." />

    // with composition — Card doesn't care WHAT it's given, just that it's given SOMETHING
    <Card title="My Card">
        <p>This is the body content.</p>
    </Card>

    /* use cases
        - Layout wrappers — a PageLayout, Card, Panel, or Section component that provides consistent
          padding, borders, and structure around whatever content gets placed inside it — exactly what your demo's Card does.

        - Modals/dialogs — a Modal component that handles the overlay, positioning, close button, and
          animation, while the actual content inside it (a form, a confirmation message, an image) is
          entirely up to whoever uses it. This ties directly to shadcn's Dialog composition pattern
          from your shadcn/Radix cheat-sheet — DialogContent doesn't know or care what's rendered inside it.

        - Buttons and interactive wrappers — a styled Button component that accepts icon + text + whatever
          else as children, rather than separate iconProp/textProp fields, letting the button's content
          vary freely while its styling/behavior stays consistent.

        - List/grid containers — a Grid or List wrapper that handles the layout (columns, gaps, responsive behavior)
          while the actual items rendered inside are passed as children, decoupling "how things are arranged"
          from "what the things actually are."

        - Provider components — this connects directly back to your useContext and useOptimistic cards:
          <ThemeContext.Provider> and <SidebarProvider> (from shadcn) both use children as their core mechanism —
          they wrap whatever's inside them, providing shared context, without needing to know what that content is.

        - Conditional wrappers — a component that conditionally renders a tooltip, a loading overlay, or an error
          boundary around its children, only when a certain condition is true — combining this pattern directly
          with conditional rendering from that earlier card.

        - Your own shadcn components, used every day — <Card>, <CardHeader>, <CardContent>, <DialogContent>,
          <SidebarContent> — every one of these is composition in action; you've been using this pattern
          extensively throughout Panther Tracker without necessarily having a name for it until now.

        - The core lesson this card closes Phase 1 on: a huge amount of "good React architecture" comes
          down to knowing when to make a component flexible via children versus when to make it rigid via
          specific named props. Rigid is simpler and fine for components that will only ever hold one kind
          of content — composition earns its place the moment a component needs to wrap genuinely varied,
          unpredictable content, which is most of what real-world layout and UI-shell components actually do.
    */

    // ============================================
    // THE Component Composition / children prop WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <CoreCard />
    //      v
    //   CoreCard.jsx
    //      | imports detail array
    //      v
    //   coreDetailData.js
    //      | import DemoComposition from "../components/demos/DemoComposition.jsx";
    //      | ...
    //      | { title: "Component Composition / children prop", ..., demo: DemoComposition }
    //      v
    //   DemoComposition.jsx
    //      | const Card = ({ title, children }) => ( <div>{title}{children}</div> );
    //      | const RigidCard = ({ title, bodyText }) => ( <div>{title}<p>{bodyText}</p></div> );
    //      | <Card title="..."><p>plain text</p></Card>
    //      | <Card title="..."><button>a button</button></Card>
    //      | <Card title="..."><p>...</p><ul><li>...</li></ul></Card>
    //      | <RigidCard title="..." bodyText="..." />
    //
    // At render time in CoreCard.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the composition entry, this becomes <DemoComposition />
    //   -> mounts the SAME Card component rendered three different ways
    //      (text, a button, multiple elements), plus one RigidCard for contrast
    //
    // Difference from every other card's wire so far:
    //   Same overall shape as every other card in the split structure
    //   (CoreCard.jsx + coreDetailData.js -> demo: field -> <details.demo />).
    //   The only thing that changes per card is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
    //   This is the FIRST demo with a component (Card) rendered MULTIPLE TIMES
    //   with genuinely different CONTENT SHAPES each time — not different prop
    //   VALUES (like every earlier demo), but different prop TYPES entirely
    //   (a string's worth of text vs. a button element vs. multiple nested
    //   elements) all flowing through the exact same unchanged component code.
    //   It's also the LAST card in Core Foundation — structurally, this wire
    //   marks the close of Phase 1 in the registry, with Production &
    //   Ecosystem (error boundaries, Suspense, React Router, and beyond)
    //   as the next phase to build on top of everything wired so far.
  `,
  tags: [
    "components",
    "composition",
    "children"
  ],
  demo: DemoComposition, // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
  category: "Core React",
  },
];

// export the data from the detail array in detailData.js
export default detail;