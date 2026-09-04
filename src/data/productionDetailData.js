// import components
import DemoErrorBoundary from "../components/demos/DemoErrorBoundary.jsx";
import DemoSuspense from "../components/demos/DemoSuspense.jsx";

// source: https://www.w3schools.com/

const detail = [
  {
    title: "Production Concepts: Error Boundaries",
    description:
      "Error boundaries are special React components that catch JavaScript errors occurring anywhere in their child component tree, log them, and display a fallback UI instead of letting the entire app crash to a blank white screen. Without one, an uncaught error thrown during rendering (a bug in a component, unexpected data shape, a failed calculation) unmounts the entire React tree — even parts of the UI completely unrelated to where the error happened. An error boundary contains the damage to just the part of the tree it wraps. A genuinely important technical detail, confirmed from React's own docs: error boundaries cannot be written as function components with hooks — as of today, there's no hook equivalent (no useErrorBoundary). They must be written as a class component, using two specific lifecycle methods: static getDerivedStateFromError() (updates state so the next render shows the fallback UI) and componentDidCatch() (used for logging the error). This makes error boundaries the first genuinely unavoidable class-component pattern in this whole registry — everything else in React 19 can be written with function components and hooks, but this one specific case still requires the older class syntax. What error boundaries do NOT catch, also worth knowing upfront: errors inside event handlers (a button's onClick throwing), errors in asynchronous code (setTimeout, a fetch callback), errors during server-side rendering, and errors thrown in the error boundary's own code. They're specifically for errors thrown during rendering.",
    example: `
███████╗██████╗ ██████╗  ██████╗ ██████╗     ██████╗  ██████╗ ██╗   ██╗███╗   ██╗██████╗  █████╗ ██████╗ ██╗███████╗███████╗
██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔══██╗    ██╔══██╗██╔═══██╗██║   ██║████╗  ██║██╔══██╗██╔══██╗██╔══██╗██║██╔════╝██╔════╝
█████╗  ██████╔╝██████╔╝██║   ██║██████╔╝    ██████╔╝██║   ██║██║   ██║██╔██╗ ██║██║  ██║███████║██████╔╝██║█████╗  ███████╗
██╔══╝  ██╔══██╗██╔══██╗██║   ██║██╔══██╗    ██╔══██╗██║   ██║██║   ██║██║╚██╗██║██║  ██║██╔══██║██╔══██╗██║██╔══╝  ╚════██║
███████╗██║  ██║██║  ██║╚██████╔╝██║  ██║    ██████╔╝╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝██║  ██║██║  ██║██║███████╗███████║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝    ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝             

    // ============================================
    // React Production: Error Boundaries
    // ============================================
    //
    // Basic pattern
    import { Component } from "react";

    class ErrorBoundary extends Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false };
      }

      /*
        static getDerivedStateFromError(error):
          a special static lifecycle method, called automatically the moment a child
          component throws during rendering. Its only job is returning new state that
          flags "an error happened" — this alone is enough to display a fallback.
      */
      static getDerivedStateFromError(error) {
        // update state so the NEXT render shows the fallback UI
        return { hasError: true };
      }

      /*
      componentDidCatch(error, info):
        called right after, optional, meant for side effects like logging — sending the
        error to a reporting service, console logging for debugging. info includes a
        component stack trace showing where the error occurred.
      */
      componentDidCatch(error, info) {
        // log the error somewhere (console, an error reporting service, etc.)
        console.error("Caught by ErrorBoundary:", error, info);
      }

      render() {
        if (this.state.hasError) {
          return <h1>Something went wrong.</h1>; // fallback UI
        }

        /*
        this.props.children:
          worth connecting directly to your previous card: ErrorBoundary itself is a
          composition pattern. It doesn't know or care what it's wrapping, it just
          renders children normally unless an error has been caught.
        */
        return this.props.children; // normal rendering — composition/children prop, ties directly to that card
      }
    }

    /*
    Wrapping usage:
      exactly like any other children-based wrapper (<Card>, <Modal>): <ErrorBoundary><RiskyComponent /></ErrorBoundary>.
      usage — wrap any part of the tree you want protected
    */
    <ErrorBoundary>
      <SomeComponentThatMightThrow />
    </ErrorBoundary>

    /*
    Worth knowing, confirmed current for React 19 specifically:
      React 19 added root-level options (onCaughtError, onUncaughtError, onRecoverableError) on createRoot/hydrateRoot,
      useful for centralized error logging outside of any individual error boundary — but they're a supplement to error
      boundaries, not a replacement; you still need actual ErrorBoundary components to control what fallback UI gets shown.
    */

    /* use cases
      - Isolating risky/data-dependent components
        — a component that renders based on external API data, user-generated content, or complex calculations is more likely
          to hit an unexpected shape or edge case — wrapping it means a bad response doesn't take down the whole page.

      - Third-party component integration
        — wrapping a widget, embedded library, or any component you don't fully control, so a bug in someone else's code
          can't cascade into your entire app.

      - Route-level boundaries
        — wrapping each page/route in its own error boundary (commonly paired with React Router, coming up next in this phase)
          so a crash on one page doesn't also break navigation or other pages the user might switch to.

      - Widget/section-level isolation in a dashboard
        — a page with multiple independent panels (a chart, a table, a notification feed) each wrapped in their own
          boundary, so one broken widget shows an error message in its own space while every other panel keeps working
          normally — exactly the kind of thing your demo illustrated in miniature.

      - A top-level "catch-all" boundary around the whole app
        — a broad safety net at the root, so literally any uncaught rendering error shows a friendly "Something went wrong"
          screen instead of a blank white page — often paired with more granular boundaries deeper in the tree for better, more specific fallback messages.

      - Logging/monitoring integration
        — componentDidCatch is commonly wired up to a real error-reporting service (Sentry, LogRocket, etc.) in
          production apps, turning every caught error into a trackable, debuggable event instead of a silent failure a
          user just quietly abandons the page over.

      - What error boundaries are NOT the right tool for, worth repeating since it's a common misconception:
          form validation errors, failed API requests handled in a .catch(),
          or any error you can reasonably anticipate and handle with normal conditional rendering — those are expected,
          everyday states, not the kind of unexpected rendering crash error boundaries exist to catch.
          Error boundaries are a last line of defense for the unexpected, not a replacement for
          proper error handling in async code and event handlers.
    */

    // ============================================
    // THE Error Boundaries WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // (corrected: routes through ProductionCard.jsx / productionDetailData.js)
    // ============================================
    //
    //   App.jsx
    //      | renders <ProductionCard />
    //      v
    //   ProductionCard.jsx
    //      | imports detail array
    //      v
    //   productionDetailData.js
    //      | import DemoErrorBoundary from "../components/demos/DemoErrorBoundary.jsx";
    //      | ...
    //      | { title: "Error Boundaries", ..., demo: DemoErrorBoundary }
    //      v
    //   DemoErrorBoundary.jsx
    //      | import ErrorBoundary from "../ErrorBoundary.jsx";
    //      | const BuggyComponent = ({ shouldThrow }) => {
    //      |   if (shouldThrow) throw new Error("Intentional crash for demo purposes");
    //      |   return <p>Everything is fine.</p>;
    //      | };
    //      | <ErrorBoundary><BuggyComponent shouldThrow={shouldThrow} /></ErrorBoundary>
    //      v
    //   ErrorBoundary.jsx                          <-- lives in src/components/, not demos/
    //      | class ErrorBoundary extends Component { ... }
    //
    // At render time in ProductionCard.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the error boundaries entry, this becomes <DemoErrorBoundary />
    //
    // Difference from every Core Foundation / Hook card's wire so far:
    //   This is the FIRST card in the registry to route through the THIRD
    //   card/data pair: ProductionCard.jsx + productionDetailData.js — marking
    //   the start of Phase 2: Production & Ecosystem, separate from both
    //   CoreCard/coreDetailData (Phase 1 patterns) and HookCard/hookDetailData
    //   (all 12 hooks). Also the first CLASS component in the registry
    //   (ErrorBoundary.jsx), and the first demo file living outside
    //   src/components/demos/ entirely.
    
  `,
  tags: [
    "error boundaries",
    "error handeling",
    "useState()"
  ],
  demo: DemoErrorBoundary, // calling the component that renders a (); so it can be used in the Card.jsx component
  category: "React Hooks",
  },
  {
    title: "Production Concepts: Suspense",
    description:
      "<Suspense> is a component that lets you show a fallback UI while its children aren't yet ready to render — most commonly, while waiting on lazy-loaded component code or a Promise being read via use(). When a component inside a <Suspense> boundary suspends (React's term for I'm not ready yet, come back later), React shows the boundary's fallback instead, then automatically swaps in the real content once the wait is over. This ties directly back to your use() card — a component that reads a Promise with use() requires being wrapped in a <Suspense> boundary, since that's what actually displays something while the Promise is still pending. Confirmed straight from React's own docs, what <Suspense> actually supports waiting on: lazy-loading component code via lazy(), reading a Promise via use() (including data streamed from Server Components), and — worth flagging as genuinely new — waiting for a stylesheet to load via <link rel='stylesheet'> with a precedence prop. Notably, <Suspense> does NOT automatically wait for images or fonts by default — those need to be explicitly integrated with newer, still-Canary-only features if you want that behavior; don't assume wrapping an <img> in Suspense delays anything on its own. One more accurate, React-19-specific detail worth knowing: React 19 changed how Suspense fallbacks commit — previously, React would render all the suspended siblings first, then commit the fallback; now, React commits the fallback immediately, then renders the suspended siblings afterward in the background to pre-warm them. Practical effect: fallbacks now display faster in React 19 than they did before.",
    example: `
    ███████╗██╗   ██╗███████╗██████╗ ███████╗███╗   ██╗███████╗███████╗
    ██╔════╝██║   ██║██╔════╝██╔══██╗██╔════╝████╗  ██║██╔════╝██╔════╝
    ███████╗██║   ██║███████╗██████╔╝█████╗  ██╔██╗ ██║███████╗█████╗  
    ╚════██║██║   ██║╚════██║██╔═══╝ ██╔══╝  ██║╚██╗██║╚════██║██╔══╝  
    ███████║╚██████╔╝███████║██║     ███████╗██║ ╚████║███████║███████╗
    ╚══════╝ ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚══════╝╚══════╝                 

    // ============================================
    // React Production: Suspense
    // ============================================
    //
    // React Suspense lets you display an alternative HTML while waiting for code or data to load.
    // The alternative HTML can be a component, text, or any valid content.
    //
    // What is Suspense?
    // Suspense is a React feature that lets your components display an alternative HTML while waiting for code or data to load.
    // 
    // The most common use cases are:
    //  Data fetching with suspense-enabled frameworks
    //  Loading components dynamically with React.lazy()
    //
    // Using Suspense:
    // If a component takes time to load, you can use a Suspense component, and it will display the fallback content while the component is loading.
    //
    // Example: The Fruits component takes two seconds to load, so we wrap it in a Suspense component to display a loading message while it is loading.
    import { Suspense } from 'react';
    import Fruits from './Fruits';

    function App() {
      return (
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Fruits />
          </Suspense>
        </div>
      );
    }
    
    // Using Suspense with lazy loading:
    // Another common use of the Suspense component is when importing components with lazy loading:
    // In the example above we had to fake a delay of two seconds to see the loading message.
    // A task like displaying three fruits from an array would be too fast to see the loading message at all.
    // But with lazy loading, we can import a component dynamically, and it will display a loading message while it is loading, even if the task is very fast.
    //
    // Example: using lazy loading
    import { Suspense, lazy } from 'react';

    // lazy() lets you load a component dynamically
    const Cars = lazy(() => import('./Cars'));

    function App() {
      return (
        <div>

          // Suspense shows a fallback while the component loads
          <Suspense fallback={<div>Loading...</div>}>
            <Cars />
          </Suspense>

        </div>
      );
    }

    // Multiple Components: One Suspense component can wrap multiple lazy components
    import { Suspense, lazy } from 'react';

    const Header = lazy(() => import('./Header'));
    const Content = lazy(() => import('./Content'));
    const Sidebar = lazy(() => import('./Sidebar'));

    function App() {
      return (
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <Content />
            </div>
          </Suspense>
        </div>
      );
    }

    // Basic pattern
    import { Suspense } from "react";

    function App() {
      return (
        <Suspense fallback={<p>Loading...</p>}>
          <SomeComponentThatMightSuspend />
        </Suspense>
      );
    }

    // The two most common real triggers for suspending, shown separately:
    //
    // 1. Lazy-loaded component code
    import { lazy, Suspense } from "react";

    /* lazy(() => import("./HeavyComponent"))
        tells React to load that component's code as a separate chunk, only
        when it's actually needed, rather than bundling it into the initial
        page load. The component "suspends" while that code is still downloading.
    */
    const HeavyComponent = lazy(() => import("./HeavyComponent"));

    function App() {
      return (

        /* fallback={<p>Loading...</p>}
            any JSX at all, shown in place of the children while they're not ready.
            This is the required prop that makes <Suspense> do anything.
        */
        <Suspense fallback={<p>Loading component...</p>}>
          <HeavyComponent />
        </Suspense>
      );
    }

    // 2. Reading a Promise with use()
    import { use, Suspense } from "react";

    function UserProfile({ userPromise }) {

      /* use(userPromise)
          this is the direct link back to your use() card: calling use() on a Promise
          that hasn't resolved yet is exactly what makes a component suspend, and it
          requires being nested inside a <Suspense> boundary — calling it outside
          one throws an error, confirmed straight from the docs.
      */
      const user = use(userPromise); // suspends until the promise resolves
      return <p>{user.name}</p>;
    }

    function App() {
      const userPromise = fetchUser();

      return (
        <Suspense fallback={<p>Loading user...</p>}>
          <UserProfile userPromise={userPromise} />
        </Suspense>
      );
    }

    /*
      A required rule worth flagging clearly, since it's easy to miss: any component using use()
      to read a Promise must have a <Suspense> boundary somewhere above it in the tree — use()
      always activates a Suspense boundary, so skipping the wrapper isn't optional the
      way it might be for other patterns.
    */

    /* use cases
      - Route-level code splitting
        — the most common real-world use: each page/route lazy-loaded with lazy(), wrapped in <Suspense>,
          so users only download the code for the page they're actually visiting instead of the entire app upfront.
          Ties directly into React Router, coming up next in this phase.

      - Data fetching with use()
        — showing a loading state while a component reads a Promise, replacing the manual if (loading) return <Spinner />
          pattern from your REST/Fetch cheat-sheet with something React coordinates natively.

      - Heavy/rarely-used components
        — a complex chart library, a rich text editor, a modal's contents — anything substantial that most users won't
          touch on every visit, lazy-loaded so it doesn't bloat the initial bundle.

      - Parallel independent loading regions
        — multiple <Suspense> boundaries on the same page, each resolving independently, so a fast-loading widget can
          appear while a slower one is still pending, rather than the whole page waiting on the slowest piece.

      - Image-heavy or media-heavy sections
        — though worth repeating the caveat from the pattern: Suspense doesn't automatically wait for images/fonts by
        default, so this only applies when explicitly wired up, not out of the box.

      - Combined with useTransition
        — avoiding a jarring fallback flash on quick updates by keeping old content on screen a moment longer
          while new content loads, rather than instantly swapping to a loading state for every tiny change.
    */

    // ============================================
    // THE Suspense WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <ProductionCard />
    //      v
    //   ProductionCard.jsx
    //      | imports detail array
    //      v
    //   productionDetailData.js
    //      | import DemoSuspense from "../components/demos/DemoSuspense.jsx";
    //      | ...
    //      | { title: "Suspense", ..., demo: DemoSuspense }
    //      v
    //   DemoSuspense.jsx
    //      | const LazyPanel = lazy(() => new Promise((resolve) => {
    //      |   setTimeout(() => resolve(import("./LazyPanel.jsx")), 1500);
    //      | }));
    //      | const [showPanel, setShowPanel] = useState(false);
    //      | <button onClick={() => setShowPanel(true)}>Load Panel</button>
    //      | {showPanel && (
    //      |   <Suspense fallback={<p>Loading panel...</p>}>
    //      |     <LazyPanel />
    //      |   </Suspense>
    //      | )}
    //      v
    //   LazyPanel.jsx                              <-- the actual lazily-loaded component
    //      | const LazyPanel = () => ( <div>I loaded!...</div> );
    //
    // At render time in ProductionCard.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the Suspense entry, this becomes <DemoSuspense />
    //   -> mounts a button that, on click, triggers a real lazy-loaded
    //      component after an artificial 1.5s delay, with a visible
    //      fallback shown the entire time
    //
    // Difference from every other card's wire so far:
    //   Same ProductionCard.jsx + productionDetailData.js routing as Error
    //   Boundaries — the second card in Phase 2. Also the first demo with a
    //   sibling demo-support file (LazyPanel.jsx) that lives alongside
    //   DemoSuspense.jsx inside components/demos/ itself, rather than in
    //   src/components/ like ErrorBoundary.jsx did — the distinction being
    //   ErrorBoundary is genuinely reusable infrastructure, while LazyPanel
    //   only exists to be lazy-loaded by this one specific demo.
    //
    // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
    //   This is the first demo where the ACT OF WAITING is the entire point —
    //   every earlier async-related demo (useEffect's clock, useActionState's
    //   pending check) showed something happening automatically or via a form.
    //   This is the first card demonstrating React's actual mechanism for
    //   coordinating "not ready yet" across a whole subtree, directly building
    //   on the use() card's rule that reading a Promise requires a Suspense
    //   boundary above it.   

    
  `,
  tags: [
    "fallback ui",
    "suspense",
    "lazy()",
    "use()",
    "promise"
  ],
  demo: DemoSuspense, // calling the component that renders a (); so it can be used in the Card.jsx component
  category: "React Hooks",
  },

















  {
    title: "Production Concepts: ***",
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
    // React Production: 
    // ============================================
    //
    
  `,
  tags: [
    "",
  ],
//   demo: , // calling the component that renders a (); so it can be used in the Card.jsx component
  category: "React Hooks",
  },
];

// export the data from the detail array in detailData.js
export default detail;