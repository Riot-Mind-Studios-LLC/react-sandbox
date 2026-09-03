// import components
import DemoPropDrilling from "../components/demos/DemoPropDrilling.jsx"; // the component that renders the demo;
import DemoConditionalRendering from "../components/demos/DemoConditionalRendering.jsx"; // the component that renders the demo;

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
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
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
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the props/prop-drilling entry, this becomes <DemoPropDrilling />
    //   -> mounts four visually nested boxes, showing the same "user" value
    //      being passed down three layers before finally being used
    //
    // Difference from every other card's wire so far:
    //   Same exact pattern at the detailData.js/Card.jsx level
    //   (import -> demo: field -> <details.demo />)
    //   The only thing that changes per card is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
    //   This is the FIRST card in the registry that isn't a hook at all — no
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
    // ============================================
    //
    //   App.jsx
    //      | renders <Card />
    //      v
    //   Card.jsx
    //      | imports detail array
    //      v
    //   detailData.js
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
    // At render time in Card.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the conditional rendering entry, this becomes <DemoConditionalRendering />
    //   -> mounts three toggleable buttons and four stacked examples of the
    //      same underlying state rendered through different conditional patterns
    //
    // Difference from every other card's wire so far:
    //   Same exact pattern at the detailData.js/Card.jsx level
    //   (import -> demo: field -> <details.demo />)
    //   The only thing that changes per card is WHICH file gets imported
    //   and WHAT that file's internal logic does.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
    //   This is the SECOND non-hook card in the registry (after Props & Prop
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
    title: "Core Concepts: ",
    description:
      "",
    example: `
    ███╗   ██╗███████╗██╗    ██╗
    ████╗  ██║██╔════╝██║    ██║

    ██║╚██╗██║██╔══╝  ██║███╗██║
    ██║ ╚████║███████╗╚███╔███╔╝
    ╚═╝  ╚═══╝╚══════╝ ╚══╝╚══╝                      

    // ============================================
    // React Core: 
    // ============================================
    //
    
  `,
  tags: [
    "tag",
  ],
  //demo: , // calling the component that renders the concept; so it can be used in the CoreCard.jsx component
  category: "Core React",
  },
];

// export the data from the detail array in detailData.js
export default detail;