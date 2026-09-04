// import components
import DemoErrorBoundary from "../components/demos/DemoErrorBoundary.jsx";
import DemoSuspense from "../components/demos/DemoSuspense.jsx";
import DemoRouter from "../components/demos/DemoRouter.jsx";
import DemoReactHookForm from "../components/demos/DemoReactHookForm.jsx";
import DemoTestedCounter from "../components/demos/DemoTestedCounter.jsx";
import DemoAccessibility from "../components/demos/DemoAccessibility.jsx";

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
  category: "React Production Concepts",
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
  category: "React Production Concepts",
  },
  {
    title: "Production Concepts: Router",
    description:
      "NOTE: React Router v8 shipped June 17, 2026, and it's now the current major version. Confirmed: v6 and Remix v2 are officially End of Life as of June 2026 (no more security updates), v7 still receives security patches but isn't current, and as of v8, react-router-dom no longer exists as a separate package — everything imports from plain react-router now, and the package is ESM-only. Worth flagging clearly since a huge amount of React Router content online (including a lot of what still ranks well) is written against the old react-router-dom package name and older syntax. React Router is the standard library for client-side routing in React — letting a single-page app show different content based on the URL, without a full page reload, while keeping the browser's back/forward buttons and bookmarkable URLs working normally (unlike your Panther Tracker's activeSection state approach, which deliberately avoided this to sidestep GitHub Pages routing complications). The modern approach (confirmed current for v7/v8) is built around data routers — you define your routes as a configuration array passed to createBrowserRouter(), rather than nesting <Route> components directly in JSX the older way. This unlocks React Router's data-loading features (loader, action) that let a route fetch its data before rendering, rather than fetching inside a useEffect after the component mounts.",
    example: `
    ██████╗  ██████╗ ██╗   ██╗████████╗███████╗██████╗ 
    ██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██╔════╝██╔══██╗
    ██████╔╝██║   ██║██║   ██║   ██║   █████╗  ██████╔╝
    ██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝  ██╔══██╗
    ██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗██║  ██║
    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝                 

    // ============================================
    // React Production: Router
    // ============================================
    //
    // Core Building Blocks:
        // createBrowserRouter(routes) — defines your route configuration
        // <RouterProvider router={router} /> — the component that actually renders your routed app, replacing what <App /> used to do at the root
        // <Outlet /> — a placeholder inside a parent route's component, marking where its matched child route should render (enables nested layouts — a shared sidebar/header wrapping different page content)
        // <Link to="/path"> — the router-aware replacement for <a href="/path">, navigating without a full page reload
        // useNavigate(), useParams() — hooks for programmatic navigation and reading dynamic URL segments
    //
    // React Router is a library that provides routing capabilities for React applications.
    // Routing means handling navigation between different views.
    // React Router is the standard routing library for React applications. It enables you to:
      // Create multiple pages in your single-page application
      // Handle URL parameters and query strings
      // Manage browser history and navigation
      // Create nested routes and layouts
      // Implement protected routes for authentication
    // Without a router, your React application would be limited to a single page with no way to navigate between different views.

    // Install React Router
    // In the command line, navigate to your project directory and run the following command to install the package:
    npm install react-router-dom

    // Wrap your app with BrowserRouter
    // Your application must be wrapped with the BrowserRouter component to enable routing:
    function App() {
      return (
        <BrowserRouter>
          {/* Your app content */}
        </BrowserRouter>
      );
    }

    // Create Views
    // To demonstrate routing, we'll create three pages (or views) in our application: Home, About, and Contact...
    // We will create all three views in the same file for simplicity, but you can of course split them into separate files.
    function Home() {
      return <h1>Home Page</h1>;
    }

    function About() {
      return <h1>About Page</h1>;
    }

    function Contact() {
      return <h1>Contact Page</h1>;
    }

    // Basic Routing
    // React Router uses three main components for basic routing:
      // Link: Creates navigation links that update the URL
      // Routes: A container for all your route definitions
      // Routes: A container for all your route definitions
    
    // Example: add navigation links and routes for each link
    // Note that we need to import BrowserRouter, Routes, Route, Link from 'react-router-dom'.
    import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

    function Home() {
      return <h1>Home Page</h1>;
    }

    function About() {
      return <h1>About Page</h1>;
    }

    function Contact() {
      return <h1>Contact Page</h1>;
    }

    function App() {
      return (
        <BrowserRouter> // BrowserRouter wraps your app and enables routing functionality
          {/* Navigation */}
          <nav>
            // Link components create navigation links
            <Link to="/">Home</Link> |{" "}
            <Link to="/about">About</Link> |{" "}
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Routes */}
          // Routes and Route define your routing configuration
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      );
    }

    // Nested Routes
    // You can have a Route inside another Route, this is called nested routes.
    // Nested routes allow you change parts of the page when you navigate to a new URL,
    // while other parts is not changed or reloaded, almost like having a page within a page.
    // Let's use the example above, and add two new components that will be rendered inside the Products component.
    // One called CarProducts and one called BikeProducts:

    // Example: Note that we also need to import the Outlet component from 'react-router-dom'.
    import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

    function Home() {
      return <h1>Home Page</h1>;
    }

    function Products() {
      return (
        <div>
          <h1>Products Page</h1>
          <nav style={{ marginBottom: '20px' }}>
            <Link to="/products/car">Cars</Link> |{" "}
            <Link to="/products/bike">Bikes</Link>
          </nav> 
          <Outlet /> 
        </div>
      );
    }

    function CarProducts() {
      return (
        <div>
          <h2>Cars</h2>
          <ul>
            <li>Audi</li>
            <li>BMW</li>
            <li>Volvo</li>
          </ul>
        </div>
      );
    }

    function BikeProducts() {
      return (
        <div>
          <h2>Bikes</h2>
          <ul>
            <li>Yamaha</li>
            <li>Suzuki</li>
            <li>Honda</li>
          </ul>
        </div>
      );
    }

    function Contact() {
      return <h1>Contact Page</h1>;
    }

    function App() {
      return (
        <BrowserRouter>
          {/* Navigation */}
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/products">Products</Link> |{" "}
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />}>
              <Route path="car" element={<CarProducts />} />
              <Route path="bike" element={<BikeProducts />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      );
    }

    // Notes:
      // 1. Outlet: The <Outlet /> element in the Products component specifies where to render the child route's content.

      // 2. Routes: The Routes element contains the routes to CarProducts and BikeProducts as child routes of the Products parent route.

      // 3. URL Structure:
            // The URL structure is relative to the parent route's path. For example:
               // - When you navigate to '/products/car', the CarProducts component is rendered.
               // - When you navigate to '/products/bike', the BikeProducts component is rendered.

      // Style Active Links
      // There is a special version of the Link component called NavLink that knows whether the link's URL is "active" or not.
      // The NavLink is especially useful for:
        // Navigation menus
        // Breadcrumbs
        // Tabs

      // A NavLink is considered active if the current URL matches its to prop.
      // The NavLink component makes it easier to style active links.

      // Example:
      // Take the basic example from above, and add styles for active links using NavLink
      // Create a new element called navLinkStyles and replace <Link> with <NavLink> in App.
      // Note that we also need to import the NavLink component from 'react-router-dom'.
      import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

      // Style function for active links
      const navLinkStyles = ({ isActive }) => ({
        color: isActive ? '#007bff' : '#333',
        textDecoration: isActive ? 'none' : 'underline',
        fontWeight: isActive ? 'bold' : 'normal',
        padding: '5px 10px'
      });

      function Home() {
        return <h1>Home Page</h1>;
      }

      function About() {
        return <h1>About Page</h1>;
      }

      function Contact() {
        return <h1>Contact Page</h1>;
      }

      function App() {
        return (
          <BrowserRouter>
            {/* Navigation with NavLink for active styling */}
            <nav style={{ marginBottom: '20px' }}>
              <NavLink to="/" style={navLinkStyles}>Home</NavLink> |{" "}
              <NavLink to="/about" style={navLinkStyles}>About</NavLink> |{" "}
              <NavLink to="/contact" style={navLinkStyles}>Contact</NavLink>
            </nav>

            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </BrowserRouter>
        );
      }

      // URL Paremeters
      // URL parameters are variables that you can add to your route paths. They are often used to pass data between components.
      // In the path http://localhost:5173/customer/Tobias, the URL parameter is Tobias.
      // URL parameters let you create dynamic routes where part of the URL can change. Think of them as variables in your URL.
      // React Router provides the useParams hook to access these parameters in your components.

      // Example: a simple example with a greeting page that can say hello to different customers:
      import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

      function Info() {
        const { firstname } = useParams();
        return <h1>Hello, {firstname}!</h1>;
      }

      function App() {
        return (
          <BrowserRouter>
            <nav>
              <Link to="/customer/Emil">Emil</Link> | // If you visit /customer/Emil, you'll see "Hello, Emil"
              <Link to="/customer/Tobias">Tobias</Link> | // If you visit /customer/Tobias, you'll see "Hello, Tobias"
              <Link to="/customer/Linus">Linus</Link> // If you visit /customer/Linus, you'll see "Hello, Linus"
            </nav>

            <Routes>
              <Route path="/customer/:firstname" element={<Info />} /> // :firstname in the route path is the URL parameter
            </Routes>
          </BrowserRouter>
        );
      }

      // Basic Pattern
      import { createBrowserRouter, RouterProvider, Outlet, Link, useParams } from "react-router";

      // 1. Define your routes as a configuration array
      const router = createBrowserRouter([
        {
          path: "/",
          element: <Layout />, // a shared layout wrapping all child routes
          children: [
            { index: true, element: <Home /> }, // renders at "/" exactly
            { path: "about", element: <About /> }, // renders at "/about"
            { path: "products/:id", element: <ProductDetail /> }, // ":id" is a dynamic URL segment
          ],
        },
      ]);

      // 2. Render RouterProvider at the root — replaces plain <App /> rendering
      function Root() {
        return <RouterProvider router={router} />;
      }

      // 3. A shared layout, using <Outlet /> to mark where child routes render
      function Layout() {
        return (
          <div>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
            </nav>
            <Outlet /> {/* whichever child route matches renders HERE */}
          </div>
        );
      }

      // 4. Reading a dynamic URL segment
      function ProductDetail() {
        const { id } = useParams(); // reads ":id" from the matched URL, e.g. "/products/42" -> id = "42"
        return <p>Product ID: {id}</p>;
      }
      
      /* The pieces, broken down:
          - createBrowserRouter([...]) — an array of route objects, each with a path and an element (the component to render).
            This whole configuration lives outside the component tree, confirmed as the recommended pattern in
            the official docs — created once, passed into RouterProvider.
          
          - children: [...] — nested routes. A child's element renders inside its parent's <Outlet />, not replacing the parent
            entirely — this is how a shared layout (nav bar, sidebar) stays on screen while only the inner content changes between pages.

          - { index: true, element: <Home /> } — the "index route," matching the parent's own path exactly (/),
            distinct from a route with an actual path string.

          - :id in "products/:id" — a URL parameter placeholder; /products/42, /products/99, etc. all match this one
            route definition, with the actual value read via useParams().

          - <Link to="/about">, not <a href="/about"> — critical distinction: a plain <a> tag triggers a full browser page reload
            (losing all React state); <Link> intercepts the click and updates the URL/content via React Router instead, keeping the app's state intact.
      */

      /* use cases
          - Multi-page applications — the most fundamental use case: distinct URLs for a home page, about page, product pages, dashboard, settings, etc.,
            all within a single-page app that never does a full browser reload between them.

          - Nested layouts — a shared header/sidebar/nav that stays mounted while only the inner content changes between pages, exactly what your
            demo's <Outlet /> pattern proved — this is directly relevant to a future "production" version of Panther Tracker, which deliberately
            avoided routing in its portfolio-demo form.

          - Dynamic detail pages — product pages, user profiles, blog posts — one route definition (/products/:id) handling infinite possible
            URLs, with the specific item's data determined by reading the URL parameter, tying directly to your useParams() pattern.

          - Protected/authenticated routes — confirmed as a current, actively-documented pattern in React Router's own v8 middleware 
            system: redirecting unauthenticated users away from a route before it even renders, using route-level loader/middleware functions
            rather than manual conditional rendering scattered through components.

          - Data loading tied to navigation — a route's loader function fetching the data a page needs before that page renders, rather than 
            fetching inside a useEffect after mount — this directly replaces the loading-state dance from your REST/Fetch cheat-sheet's ProductList
            example with something React Router coordinates natively at the routing layer.

          - 404/not-found pages — a catch-all route matching any URL that doesn't fit a defined pattern, showing a proper "page not found"
            experience instead of a blank screen or crash.

          - Breadcrumbs and active-link styling — knowing the current URL/route to visually highlight which nav link is active, or build a
            breadcrumb trail reflecting nested route structure.

          - Bookmarkable, shareable URLs — the core UX benefit tying all of this together: a user can bookmark /products/42, share that link with
            someone else, hit the browser's back/forward buttons, or refresh the page, and land back exactly where they were — none of which works
            with a state-only approach like Panther Tracker's activeSection, which was a deliberate tradeoff made specifically to avoid
            GitHub Pages routing complications at the time.
      */

      // ============================================
      // THE React Router WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
      // ============================================
      //
      //   App.jsx
      //      | renders <ProductionCard />
      //      v
      //   ProductionCard.jsx
      //      | imports detail array
      //      v
      //   productionDetailData.js
      //      | import DemoRouter from "../components/demos/DemoRouter.jsx";
      //      | ...
      //      | { title: "React Router", ..., demo: DemoRouter }
      //      v
      //   DemoRouter.jsx
      //      | const DemoLayout = () => ( <nav>...</nav> <Outlet /> );
      //      | const DemoHome = () => <p>Home route</p>;
      //      | const DemoAbout = () => <p>About route</p>;
      //      | const DemoProduct = () => { const { id } = useParams(); return <p>{id}</p>; };
      //      | const demoRouter = createBrowserRouter([
      //      |   { path: "/", element: <DemoLayout />, children: [
      //      |     { index: true, element: <DemoHome /> },
      //      |     { path: "about", element: <DemoAbout /> },
      //      |     { path: "products/:id", element: <DemoProduct /> },
      //      |   ]},
      //      | ]);
      //      | const DemoRouter = () => <RouterProvider router={demoRouter} />;
      //
      // At render time in ProductionCard.jsx:
      //   {details.demo && <details.demo />}
      //   -> for the React Router entry, this becomes <DemoRouter />
      //   -> mounts its OWN self-contained router (createBrowserRouter +
      //      RouterProvider), nested inside the demo — clicking its nav links
      //      genuinely changes the browser's URL and swaps content via Outlet,
      //      without a full page reload
      //
      // Difference from every other card's wire so far:
      //   Same overall shape (ProductionCard.jsx + productionDetailData.js ->
      //   demo: field -> <details.demo />), continuing the Phase 2 routing
      //   pattern established by Error Boundaries and Suspense. What's genuinely
      //   different here: this is the FIRST demo that creates its own router
      //   INSTANCE internally (demoRouter, via createBrowserRouter) rather than
      //   just using hooks/components that assume a router already exists
      //   somewhere above them in the tree — every future real app would
      //   normally have exactly ONE router at its true root, not one per demo.
      //
      // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
      //   This is the first card whose demo genuinely changes the BROWSER'S
      //   ACTUAL URL BAR — every earlier demo's state lived entirely inside
      //   React, invisible outside the component itself. Clicking a link here
      //   produces an observable effect outside the React tree entirely (the
      //   address bar), which is also why back/forward-button behavior and
      //   bookmarkability — properties no earlier card in this registry has
      //   touched — become relevant for the first time.
  `,
  tags: [
    "Route",
    "Routes",
    "Link",
    "BrowserRouter",
    "Outlet",
    "NavLink",
    "useParams"
  ],
  demo: DemoRouter, // calling the component that renders a (); so it can be used in the Card.jsx component
  category: "React Production Concepts",
  },
  {
    title: "Production Concepts: React Hook Form",
    description:
      "React Hook Form is a library that manages form state, validation, and submission through a single custom hook, useForm() — replacing the pattern of hand-rolling a separate useState for every field (which you've done throughout Panther Tracker and this whole sandbox). Its core design decision, confirmed straight from the docs: it uses uncontrolled components by default — inputs aren't tied to React state on every keystroke, they're registered via a ref (the register() function), and React Hook Form only reads values when it actually needs to (on submit, or when validating). This directly ties back to your controlled vs. uncontrolled card — React Hook Form is essentially a sophisticated, purpose-built version of the uncontrolled pattern, engineered specifically to avoid the performance cost of re-rendering an entire form on every single keystroke across every field.",
    example: `
    ██████╗ ███████╗ █████╗  ██████╗████████╗
    ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝
    ██████╔╝█████╗  ███████║██║        ██║   
    ██╔══██╗██╔══╝  ██╔══██║██║        ██║   
    ██║  ██║███████╗██║  ██║╚██████╗   ██║   
    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   
                                         
    ██╗  ██╗ ██████╗  ██████╗ ██╗  ██╗    ███████╗ ██████╗ ██████╗ ███╗   ███╗
    ██║  ██║██╔═══██╗██╔═══██╗██║ ██╔╝    ██╔════╝██╔═══██╗██╔══██╗████╗ ████║
    ███████║██║   ██║██║   ██║█████╔╝     █████╗  ██║   ██║██████╔╝██╔████╔██║
    ██╔══██║██║   ██║██║   ██║██╔═██╗     ██╔══╝  ██║   ██║██╔══██╗██║╚██╔╝██║
    ██║  ██║╚██████╔╝╚██████╔╝██║  ██╗    ██║     ╚██████╔╝██║  ██║██║ ╚═╝ ██║
    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝    ╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝

    // ============================================
    // React Production: React Hook Form
    // ============================================
    //
    // Dependancy:
    npm install react-hook-form
    //
    // The core pieces:
    // useForm() — the custom hook itself, returns register, handleSubmit, and formState (which includes errors)
    // register("fieldName", { validationRules }) — spread onto an input ({...register("email")}), this is what wires an input up to the form without controlling its value via state
    // handleSubmit(onSubmit) — wraps your actual submit handler, running all validation first and only calling your function if the form is valid
    // formState.errors — an object holding validation errors, keyed by field name

    // Basic pattern
    import { useForm } from "react-hook-form";

    function ContactForm() {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        console.log(data); // { email: "...", message: "..." }
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}

          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Message"
          />
          {errors.message && <p>{errors.message.message}</p>}

          <button type="submit">Send</button>
        </form>
      );
    }

    /* The pieces, broken down:
        - {...register("email", { required: "Email is required" })} — this spread syntax hands 
          the input a ref, name, onChange, and onBlur all at once. Notice: no value prop, no onChange
          you wrote yourself — this is what makes it uncontrolled, tying directly back to your earlier card.
          React Hook Form tracks the value internally via the ref, not via a state variable causing re-renders.

        - required: "Email is required" — validation rules passed as the second argument to register.
          The string becomes the actual error message if that rule fails — no separate error-message logic needed elsewhere.

        - errors.email — after a failed validation attempt, formState.errors gets populated with an entry per
          invalid field, and errors.email.message holds exactly the string you defined above.

        - handleSubmit(onSubmit) — this wraps your onSubmit function. If validation fails, onSubmit never runs at all — handleSubmit
          intercepts the submission, runs validation, populates errors, and prevents your function from firing until everything passes.
    */

    // Side-by-side, the actual payoff — same form, hand-rolled vs. React Hook Form:

    // Hand-rolled — every field needs its own useState + onChange + manual validation
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    // ...repeated for every single field...

    // React Hook Form — one hook call handles every field
    const { register, handleSubmit, formState: { errors } } = useForm();

    /*
      For a form with two fields, the difference is modest. For a form with fifteen fields (validation, error messages, submit state,
      all per-field) — which is closer to real production forms — the difference becomes substantial, both in code volume and
      in the number of unnecessary re-renders avoided.
    */

    /* use cases
        - Any form with more than a handful of fields — the exact scenario your pattern comparison called out: hand-rolling
          useState/onChange/validation for fifteen fields is genuinely painful and error-prone; React Hook Form collapses all
          of it into one useForm() call regardless of field count.

        - Multi-step/wizard forms — since React Hook Form tracks all field state internally (not scattered across many separate
          useState calls), it's straightforward to validate and persist data across multiple visual "steps" without
          manually threading state between step components.

        - Forms with complex validation rules — cross-field validation (confirm password matching password), conditional
          required fields (only require a field if another field has a certain value), async validation (checking a username's
          availability against a server) — all supported through register's validation options and custom validate functions.

        - Performance-sensitive forms — confirmed directly from the docs' own framing: forms where re-rendering the entire form
          on every keystroke would be a real, measurable performance problem — think a form embedded in a page that's
          already doing other heavy rendering work nearby.

        - Paired with schema validation (Zod) — worth flagging as the natural next step, confirmed as "the standard stack
          for forms" in current sources: defining your form's shape once as a Zod schema, then using that single schema for
          both TypeScript types and React Hook Form's validation, via the zodResolver from @hookform/resolvers. This connects
          directly to your TypeScript cheat-sheet — a real, current example of TypeScript and a form library
          working together in production code.

        - Integrating with UI component libraries (including shadcn/ui) — confirmed from the docs: components that don't
          expose a native input ref directly (like some shadcn Select or Checkbox components) need to be wrapped with
          React Hook Form's Controller component instead of plain register — worth knowing since shadcn is already core
          to your stack, and this is exactly the kind of integration detail that trips people up in real projects.

        - Server-side error handling after submission — confirmed from the docs: setError() lets you manually inject an
          error (like "Invalid credentials" from a failed login attempt) back into the form's errors object after an
          async submission fails, so server-side validation feedback displays through the exact same
          error-rendering path as client-side validation.

        - The common thread: React Hook Form earns its place the moment a form's complexity (field count, validation rules,
          or performance sensitivity) outgrows what a few useState calls can comfortably handle — for a genuinely
          simple one-or-two-field form, plain useState remains perfectly reasonable and arguably simpler;
          this library is about scaling past that point cleanly.
    */

    // ============================================
    // THE React Hook Form WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <ProductionCard />
    //      v
    //   ProductionCard.jsx
    //      | imports detail array
    //      v
    //   productionDetailData.js
    //      | import DemoReactHookForm from "../components/demos/DemoReactHookForm.jsx";
    //      | ...
    //      | { title: "React Hook Form", ..., demo: DemoReactHookForm }
    //      v
    //   DemoReactHookForm.jsx
    //      | const { register, handleSubmit, formState: { errors } } = useForm();
    //      | console.count("DemoReactHookForm render");
    //      | const onSubmit = (data) => { alert(Submitted: "$"{data.email}); };
    //      | <form onSubmit={handleSubmit(onSubmit)}>
    //      |   <input {...register("email", { required: "...", pattern: {...} })} />
    //      |   {errors.email && <p>{errors.email.message}</p>}
    //      |   <button type="submit">Submit</button>
    //      | </form>
    //
    // At render time in ProductionCard.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the React Hook Form entry, this becomes <DemoReactHookForm />
    //   -> mounts a single-field form whose render count stays frozen while
    //      typing, only climbing on actual submit attempts
    //
    // Difference from every other card's wire so far:
    //   Same overall shape (ProductionCard.jsx + productionDetailData.js ->
    //   demo: field -> <details.demo />), continuing the Phase 2 pattern.
    //   This is the FIRST card in the registry built entirely around a
    //   THIRD-PARTY LIBRARY rather than a built-in React feature or a
    //   Claude-written custom hook — useForm() is react-hook-form's own
    //   exported hook, imported from node_modules, not authored in this repo
    //   at all (unlike useToggle.js, which Adrian wrote himself).
    //
    // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
    //   This card directly validates a claim made all the way back in the
    //   Controlled vs. Uncontrolled card — that uncontrolled inputs avoid
    //   per-keystroke re-renders — but this time via console.count() during
    //   REAL TYPING, not a synthetic side-by-side comparison. It's also the
    //   first form-related demo where VALIDATION and ERROR DISPLAY are
    //   handled by a library's own internal state (formState.errors) rather
    //   than a manually-written useState for errors, as every hand-rolled
    //   form throughout Panther Tracker required.
  `,
  tags: [
    "forms",
    "useForm()",
    "ref",
    "register()",
    "React Hook Form",
  ],
  demo: DemoReactHookForm, // calling the component that renders a (); so it can be used in the Card.jsx component
  category: "React Production Concepts",
  },
  {
    title: "Production Concepts: React Testing Library",
    description:
      "React Testing Library is a library for testing React components by interacting with them the way a real user would — finding elements by visible text, labels, or roles, clicking buttons, typing into inputs — rather than testing internal implementation details (state variables, which functions got called). Its core philosophy, summarized directly from its own documentation: the more your tests resemble the way your software is used, the more confidence they can give you. Vitest is the actual test runner — the tool that finds your test files, executes them, and reports pass/fail — and it's what your npm test command would actually invoke. React Testing Library provides functions for querying/interacting with rendered components; Vitest provides describe, it/test, and expect for structuring and asserting those tests. They're not competitors, they work together: Vitest runs the tests, React Testing Library helps you write what's inside them.",
    example: `
    //***************************************************************************
    // ** React Testing Library - / Vitest + / Jest
    //***************************************************************************
    ████████╗███████╗███████╗████████╗██╗███╗   ██╗ ██████╗     ██╗     ██╗██████╗ 
    ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██║████╗  ██║██╔════╝     ██║     ██║██╔══██╗
       ██║   █████╗  ███████╗   ██║   ██║██╔██╗ ██║██║  ███╗    ██║     ██║██████╔╝
       ██║   ██╔══╝  ╚════██║   ██║   ██║██║╚██╗██║██║   ██║    ██║     ██║██╔══██╗
       ██║   ███████╗███████║   ██║   ██║██║ ╚████║╚██████╔╝    ███████╗██║██████╔╝
       ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚══════╝╚═╝╚═════╝ 
                                                                               
    // ============================================
    // React Production: React Testing Library
    // ============================================
    //
    // 1. Dependancy
    npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
    //
    // Basic pattern
    import { render, screen, fireEvent } from "@testing-library/react";
    import { describe, it, expect } from "vitest";
    import Counter from "./Counter";

    describe("Counter", () => {
      it("starts at 0", () => {
        render(<Counter />);
        expect(screen.getByText("Count: 0")).toBeInTheDocument();
      });

      it("increments when the button is clicked", () => {
        render(<Counter />);
        const button = screen.getByRole("button", { name: /add/i });

        fireEvent.click(button);

        expect(screen.getByText("Count: 1")).toBeInTheDocument();
      });
    });

    /* The pieces, broken down:
        - describe("Counter", () => {...}) — groups related tests together under a shared label, purely organizational.
        - it("starts at 0", () => {...}) — one individual test case. it and test are interchangeable in Vitest; it reads more like a sentence ("it starts at 0").
        - render(<Counter />) — from React Testing Library, this mounts your component into a virtual DOM for the test to interact with.
        - screen.getByText(...) / screen.getByRole(...) — these are queries — how you find elements, matching the "test like a user"
          philosophy: getByRole("button", { name: /add/i }) finds a button by its accessible role and visible text, the same way a
          screen reader or a real user visually scanning the page would locate it — not by a CSS class or an internal implementation detail.
        - fireEvent.click(button) — simulates a real user interaction, here a click.
        - expect(...).toBeInTheDocument() — the actual assertion. toBeInTheDocument() specifically comes from @testing-library/jest-dom
          (a companion matcher library, name notwithstanding — it works with Vitest too), extending expect with DOM-specific checks beyond Vitest's built-in matchers.
        - Worth naming directly — this exact pattern tests your own DemoUseState.jsx counter, almost word for word.
          The component you built weeks ago to teach useState is also a perfect, realistic subject for testing it — which is a
          good thing to notice: testing isn't a separate skill bolted onto components you already know, it's verifying
          the same components you've been building the entire time.
    */

    /* NOTE:
        Tests don't run in the browser at all — Vitest runs in a terminal process, separate from your app entirely. So this card's "demo"
        can only be the component being tested, rendered normally — the actual proof of testing happens in your terminal via npm test,
        not by clicking anything in the card.
    */

    // 2. Configure Vitest in vite.config.js
    /// <reference types="vitest" />
    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";

    export default defineConfig({
      plugins: [react()],
      test: {
        globals: true,
        environment: "jsdom", // simulates a browser DOM in Node, since tests aren't run in a real browser
        setupFiles: "./src/setupTests.js",
      },
    });

    // 3. Create a setup file — src/setupTests.js
    // This extends Vitest's expect with DOM-specific matchers like toBeInTheDocument() — without this file, that matcher wouldn't exist.
    import "@testing-library/jest-dom";

    // 4. Add the test script to package.json
    "scripts": {
      "test": "vitest"
    }

    // 5. Create the component being tested — src/components/demos/DemoTestedCounter.jsx
    // This is genuinely just your original DemoUseState counter, renamed — this card's demo component in productionDetailData.js is this file, wired the normal way.
    import { useState } from "react";

    const DemoTestedCounter = () => {
      const [count, setCount] = useState(0);

      return (
        <div>
          <p>Count: {count}</p>
          <button
            onClick={() => setCount(count + 1)}
          >
            Add
          </button>
        </div>
      );
    };

    export default DemoTestedCounter;

    // 6. Create the actual test file — src/components/demos/DemoTestedCounter.test.jsx
    import { render, screen, fireEvent } from "@testing-library/react";
    import { describe, it, expect } from "vitest";
    import DemoTestedCounter from "./DemoTestedCounter";

    describe("DemoTestedCounter", () => {
      it("starts at 0", () => {
        render(<DemoTestedCounter />);
        expect(screen.getByText("Count: 0")).toBeInTheDocument();
      });

      it("increments when the button is clicked", () => {
        render(<DemoTestedCounter />);
        const button = screen.getByRole("button", { name: /add/i });

        fireEvent.click(button);

        expect(screen.getByText("Count: 1")).toBeInTheDocument();
      });
    });

    /* How you actually "confirm" this card, genuinely different from every other one:
        - wire DemoTestedCounter into productionDetailData.js the normal way (you'll see the
        working counter in the card, same as always) — but the real proof of this whole concept
        happens by running npm test in your terminal, watching both tests report as passing. Try
        breaking one on purpose afterward (e.g., change count + 1 to count + 2) and re-run — watch the
        second test fail with a clear diff, then revert it — that failure/pass cycle is the actual
        point of this card, not anything visible in the rendered card itself.
    */

    /* use case
      - Preventing regressions — the core reason testing exists: a test written once keeps verifying
        that behavior forever, catching it immediately if a future change accidentally breaks
        something that used to work — exactly what you just watched happen when you
        deliberately broke the increment logic.

      - Form validation logic — testing that required fields show errors, that valid submissions
        actually fire onSubmit, that invalid emails get rejected — directly applicable to your
        React Hook Form card, verifying validation rules work correctly without manually retesting by hand every time.

      - Conditional rendering paths — verifying that a component shows the right thing under different
        states (logged in vs. out, loading vs. loaded vs. errored) — ties directly to your Conditional
        Rendering card; a test can assert both branches render correctly without you manually toggling state in the browser every time.

      - Custom hooks — React Testing Library has a dedicated utility (renderHook) specifically for testing custom hooks in isolation,
        without needing to build a throwaway component just to exercise them — directly relevant to your own useToggle hook.

      - Accessibility by default, as a side effect — worth noting directly: because React Testing
        Library queries prioritize getByRole, getByLabelText, and similar accessible-first queries,
        writing tests this way naturally nudges you toward more accessible markup — if a test can't
        find your button by its role/label, a screen reader user probably can't either.
        This previews your upcoming Accessibility card.

      - Catching bugs before they reach code review or production — running npm test locally
        (or automatically in CI, on every push) catches an obvious mistake before a human
        reviewer has to spot it manually, or before it ships to real users.

      - Confidence during refactoring — this is arguably the single biggest practical payoff:
        a solid test suite means you can restructure a component's internals
        (rename variables, reorganize logic, even rewrite it from scratch) with confidence
        that the external behavior still works correctly, since the tests check behavior, not implementation.

      - What React Testing Library deliberately does NOT encourage, worth knowing since it's the philosophy's
        whole point: testing internal state values directly, testing that a specific function got called, or
        testing implementation details in general. The philosophy explicitly discourages that — tests are meant
        to survive a component being rewritten internally, as long as it still behaves the same way from a user's perspective.
    */

    // ============================================
    // THE Testing (React Testing Library + Vitest) WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
    // ============================================
    //
    //   App.jsx
    //      | renders <ProductionCard />
    //      v
    //   ProductionCard.jsx
    //      | imports detail array
    //      v
    //   productionDetailData.js
    //      | import DemoTestedCounter from "../components/demos/DemoTestedCounter.jsx";
    //      | ...
    //      | { title: "Testing (React Testing Library + Vitest)", ..., demo: DemoTestedCounter }
    //      v
    //   DemoTestedCounter.jsx                        <-- rendered normally in the card, like any other demo
    //      | const [count, setCount] = useState(0);
    //      | <button onClick={() => setCount(count + 1)}>Add</button>
    //
    // SEPARATE FROM THE ABOVE — does NOT run through App.jsx/ProductionCard.jsx at all:
    //
    //   DemoTestedCounter.test.jsx                   <-- lives alongside the component, same folder
    //      | import DemoTestedCounter from "./DemoTestedCounter";
    //      | describe("DemoTestedCounter", () => {
    //      |   it("starts at 0", () => { render + expect ... });
    //      |   it("increments when the button is clicked", () => { render + fireEvent.click + expect ... });
    //      | });
    //      v
    //   vite.config.js (test block)  +  src/setupTests.js
    //      | test: { environment: "jsdom", setupFiles: "./src/setupTests.js" }
    //      | import "@testing-library/jest-dom";
    //      v
    //   Vitest (terminal process, via npm test)
    //      -> discovers DemoTestedCounter.test.jsx automatically (any *.test.jsx file)
    //      -> runs it in a simulated DOM (jsdom), reports PASS/FAIL in the terminal
    //
    // At render time in ProductionCard.jsx:
    //   {details.demo && <details.demo />}
    //   -> for the testing entry, this becomes <DemoTestedCounter />, same as any card
    //   -> BUT the actual "proof" of this card lives entirely OUTSIDE App.jsx's
    //      render tree — in a terminal running npm test, not in the browser
    //
    // Difference from every other card's wire so far:
    //   This is the FIRST card in the entire registry where the thing being
    //   demonstrated does NOT run inside the browser/React tree at all. Every
    //   prior demo, no matter how different internally, was still something
    //   you clicked and watched respond live on screen. This wire has TWO
    //   completely separate execution contexts: the component (browser, via
    //   App.jsx like normal) and the test (Node/terminal, via Vitest,
    //   completely bypassing App.jsx, ProductionCard.jsx, and the browser
    //   entirely).
    //
    // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
    //   Every earlier "wire" diagram traced how DATA and RENDERING connect
    //   between files. This one traces something new: how a CONFIGURATION
    //   FILE (vite.config.js's test block) and a SETUP FILE (setupTests.js)
    //   silently extend a THIRD-PARTY TEST RUNNER's behavior (adding
    //   toBeInTheDocument() to expect) — infrastructure that has zero
    //   presence in App.jsx's actual component tree, yet is required for
    //   the .test.jsx file to even run correctly.

    //** RUN to initiate test: npm test **//
  `,
  tags: [
    "Vitest",
    "Jest",
    "React Testing Library",
    "npm test",
    "describe",
    "it",
    "test",
    "expect",
    "vite"
  ],
  demo: DemoTestedCounter, // calling the component that renders a (); so it can be used in the Card.jsx component
  category: "React Production Concepts",
  },
  {
    title: "Production Concepts: TypeScript",
    description:
      "TypeScript with React means writing your components in .tsx files instead of .jsx, adding type annotations to props, state, refs, and event handlers so mistakes (wrong prop type, a typo in a property name, forgetting to handle null) get caught by your editor and the build process before the code ever runs, rather than surfacing as a runtime bug. You've already got the full syntax reference for this in your TypeScript cheat-sheet (sections 13-14 specifically cover component props and hooks) — this card is about seeing it work live in this actual project, not new syntax.",
    example: `
    ████████╗██╗   ██╗██████╗ ███████╗███████╗ ██████╗██████╗ ██╗██████╗ ████████╗
    ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝
       ██║    ╚████╔╝ ██████╔╝█████╗  ███████╗██║     ██████╔╝██║██████╔╝   ██║   
       ██║     ╚██╔╝  ██╔═══╝ ██╔══╝  ╚════██║██║     ██╔══██╗██║██╔═══╝    ██║   
       ██║      ██║   ██║     ███████╗███████║╚██████╗██║  ██║██║██║        ██║   
       ╚═╝      ╚═╝   ╚═╝     ╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝                   

    // ============================================
    // React Production: TyeScript
    // ============================================
    //
    // Single File Dependancy
    npm install -D typescript @types/react @types/react-dom
    //
    // Why Use TypeScript with React?
    // TypeScript enhances React with:
      // Type safety for props, state, and context
      // Better IDE autocompletion and refactoring
      // Early error detection during development

    // Create a new React + TypeScript app with Vite:
    npm create vite@latest my-app -- --template react-ts
    cd my-app
    npm install
    npm run dev

    // Your tsconfig.json should include these recommended compiler options:
    {
      "compilerOptions": {
        "target": "ES2020",
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "moduleResolution": "Node",
        "jsx": "react-jsx",
        "strict": true,
        "skipLibCheck": true,
        "noEmit": true,
        "resolveJsonModule": true,
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true
      },
      "include": ["src"]
    }
    // The shown options work well with Vite and Create React App.
    // Note: Keep strict enabled for best type safety.

    // Component Typing
    //
    // Define props with TypeScript and use them in a functional component:

    // Greeting.tsx
    type GreetingProps = {
      name: string;
      age?: number;
    };

    export function Greeting({ name, age }: GreetingProps) {
      return (
        <div>
          <h2>Hello, {name}!</h2>
          {age !== undefined && <p>You are {age} years old</p>}
        </div>
      );
    }

    // Common Patterns:

    // Type-Safe Events: Type event handlers for inputs and buttons:

    // Input change
    function NameInput() {
      function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value);
      }
      return <input onChange={handleChange} />;
    }

    // Button click
    function SaveButton() {
      function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
      }
      return <button onClick={handleClick}>Save</button>;
    }

    // Typing State with useState: Use explicit types for numbers, unions, and nullable values:
    const [count, setCount] = React.useState<number>(0);
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'error'>('idle');

    type User = { id: string; name: string };
    const [user, setUser] = React.useState<User | null>(null);

    // useRef with DOM Elements: Type refs to DOM nodes to access properties safely:
    function FocusInput() {
      const inputRef = React.useRef<HTMLInputElement>(null);
      return <input ref={inputRef} onFocus={() => inputRef.current?.select()} />;
    }

    // Children Typing: Accept children with the React.ReactNode type:
    type CardProps = { title: string; children?: React.ReactNode };

    function Card({ title, children }: CardProps) {
      return (
        <div>
          <h2>{title}</h2>
          {children}
        </div>
      );
    }

    // Fetch Helpers with Generics: Use generics to type API responses:
    async function fetchJson<T>(url: string): Promise<T> {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error');
      return res.json() as Promise<T>;
    }

    // Usage inside an async function/component effect
    async function loadPosts() {
      type Post = { id: number; title: string };
      const posts = await fetchJson<Post[]>("/api/posts");
      console.log(posts);
    }

    // Minimal Context and Custom Hook: Provide a small, typed context and a helper hook:
    type Theme = 'light' | 'dark';
    const ThemeContext = React.createContext<{ theme: Theme; toggle(): void } | null>(null);

    function ThemeProvider({ children }: { children: React.ReactNode }) {
      const [theme, setTheme] = React.useState<Theme>('light');
      const value = { theme, toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light')) };
      return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
    }

    function useTheme() {
      const ctx = React.useContext(ThemeContext);
      if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
      return ctx;
    }

    // Vite TypeScript types: Add Vite's ambient types to avoid missing definitions.
    // src/vite-env.d.ts
    /// <reference types="vite/client" />

    // Alternatively, add to tsconfig.json:
    {
      "compilerOptions": {
        "types": ["vite/client"]
      }
    }

    // About React.FC: Prefer directly typed function components.
    // React.FC is optional; it implicitly adds children but isn't required.
    // Optional baseUrl and paths: These can simplify imports if supported by your bundler.
    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "@/*": ["src/*"]

        }
      }
    }
    // Configure only if your tooling (e.g., Vite, tsconfig-paths) is set up for path aliases.

    // Basic pattern ----------------------------------------------------- ai generated
    import { useState } from "react";

    // 1. Typing props via an interface
    interface GreetingProps {
      name: string;
      age?: number; // optional prop
    }

    function Greeting({ name, age }: GreetingProps) {
      return <p>Hello, {name}{age && , age "$"{age}}!</p>;
    }

    // 2. Typing useState — often inferred automatically from the initial value
    function Counter() {
      const [count, setCount] = useState(0); // inferred as number, no annotation needed

      return <button onClick={() => setCount(count + 1)}>{count}</button>;
    }

    // 3. Typing a more complex piece of state that TS can't infer alone
    interface User {
      name: string;
      role: string;
    }

    function Profile() {
      const [user, setUser] = useState<User | null>(null); // explicit generic — starts null, later holds a User

      return <p>{user ? user.name : "No user loaded"}</p>;
    }

    // 4. Typing an event handler
    function SearchBox() {
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
      };

      return <input onChange={handleChange} />;
    }

    /* The pieces, broken down — all of this is directly pulled from your own TypeScript cheat-sheet's sections 13-14, just seen in one place now:
      - interface GreetingProps — describes the exact shape a component's props must have. Get a prop name wrong, pass the wrong type,
        or forget a required prop, and your editor flags it immediately — before you ever run the code.

      - useState(0) — TypeScript infers number automatically from the initial value; no annotation needed for straightforward cases like this.

      - useState<User | null>(null) — here TypeScript can't infer correctly on its own, since the state starts as null but will
        eventually hold a real User object — the explicit generic tells TypeScript to expect either type, not just null forever.

      - React.ChangeEvent<HTMLInputElement> — typing an event handler's parameter so e.target.value is known to actually exist and be a string,
        rather than TypeScript treating e as a vague, unchecked value.
    */

    /* Notes:
      - Incremental adoption is the normal path, not all-or-nothing. TypeScript and JavaScript files can coexist in the same project — you don't
        have to convert everything at once. A common real-world approach is renaming files to .tsx/.ts one at a time as you touch them,
        rather than a single big-bang conversion. Worth knowing since it lowers the eventual barrier to actually adopting it in this sandbox
        or Panther Tracker's production version, whenever that becomes the right call.
      
      - A tsconfig.json is the next real step, when you're ready for it. What we set up just now (@types/react, @types/react-dom) gives your
        editor enough to type-check a single file reasonably well, but a proper tsconfig.json is what enables actual build-time type
        checking (catching type errors when you run npm run build, not just in your editor) — that's a deliberate future step,
        not something to add reflexively right now.

      - The biggest real trap when converting existing JS to TS: reaching for any to make errors go away. Your own cheat-sheet's notes
        section already flags this correctly — any doesn't fix a type problem, it just silences TypeScript for that spot. When converting
        real code later, unknown (forcing you to narrow before use) is almost always the better escape hatch than any when a type genuinely isn't clear yet.
    */
  `,
  tags: [
    "typescript",
    "tsx"
  ],
//   demo: , // calling the component that renders a (); so it can be used in the Card.jsx component
  category: "React Production Concepts",
  },
  {
  title: "Production Concepts: Accessibility a11y",
  description:
    "Accessibility (a11y) in React is the practice of writing components that work correctly with screen readers, keyboard-only navigation, and assistive technology — largely achieved through using the correct semantic HTML elements (a real <button> instead of a clickable <div>), pairing form inputs with labels via htmlFor, and adding ARIA attributes only when semantic HTML alone isn't enough to convey a component's state or purpose. Unlike most of this registry's cards, accessibility isn't one specific API to learn — it's a lens applied across everything you already build, closer in spirit to the Testing card than to a hook: it's about verifying correctness, not adding a new feature.",
  example: `
    █████╗  ██╗ ██╗██╗   ██╗
  ██╔══██╗███║███║╚██╗ ██╔╝
  ███████║╚██║╚██║ ╚████╔╝ 
  ██╔══██║ ██║ ██║  ╚██╔╝  
  ██║  ██║ ██║ ██║   ██║   
  ╚═╝  ╚═╝ ╚═╝ ╚═╝   ╚═╝   

  // ============================================
  // React Production: Accessibility a11y
  // ============================================
  //
  // Two concrete, learnable techniques worth knowing by name, since they cover a huge portion of real accessibility work:
    // Focus management
    //  — ensuring keyboard users can Tab through interactive elements in a logical order, and that focus moves sensibly when
    //    something changes (a modal opening should move focus into the modal; closing it should return focus to whatever opened it).
    //    This ties directly to your useRef card — inputRef.current.focus() is literally the mechanism used to manage focus programmatically.
    //
    // ARIA attributes as a last resort, not a first choice
    //  - confirmed directly from your own HTML5 cheat-sheet's accessibility section: "prefer a real semantic HTML element
    //    over a generic <div> + ARIA attributes whenever one exists." ARIA fills gaps semantic HTML can't cover on its own
    //    (like announcing a live-updating region), it doesn't replace using the right element to begin with.

  // Basic patterns
  //
  // 1. Semantic HTML first — the single highest-leverage accessibility habit
  // BAD — a div pretending to be a button gets none of a button's built-in behavior
  <div onClick={handleClick}>Submit</div>

  // GOOD — a real <button> is keyboard-focusable, triggers on Enter/Space, and
  // is announced correctly by screen readers, all automatically, for free
  <button onClick={handleClick}>Submit</button>


  // 2. Labels paired with inputs — required, not optional polish
  // BAD — a screen reader has no idea what this input is for
  <input type="email" placeholder="Email" />

  // GOOD — htmlFor/id pairing gives the input an accessible name
  <label htmlFor="email">Email</label>
  <input type="email" id="email" />


  // 3. Focus management — moving focus programmatically when the UI changes
  import { useRef, useEffect } from "react";

  function Modal({ isOpen }) {
    const closeButtonRef = useRef(null);

    useEffect(() => {
      if (isOpen) {
        closeButtonRef.current.focus(); // moves focus INTO the modal when it opens
      }
    }, [isOpen]);

    return (
      <div role="dialog" aria-modal="true">
        <button ref={closeButtonRef}>Close</button>
      </div>
    );
  }


  // 4. ARIA — filling a real gap semantic HTML can't cover alone
  function LiveStatus({ message }) {
    return (
      <div role="status" aria-live="polite">
        {message} {/* screen readers announce this automatically when it changes, no user action needed */}
      </div>
    );
  }

  /* The pieces, broken down:
      - role="dialog" aria-modal="true"
        — tells assistive technology this element is a modal dialog, which changes how screen readers
          navigate it (trapping attention inside until closed).

      - aria-live="polite"
        — this is a genuine ARIA-only capability, no semantic HTML equivalent exists — it tells a screen
          reader to announce content changes inside this element automatically, without the user needing
          to navigate to it manually. "polite" means it waits for a natural pause rather than
          interrupting whatever the user is currently doing.

      - The useEffect + useRef focus pattern
        — worth noting directly: this is the exact same inputRef.current.focus() mechanism from your
          original useRef card, just applied with accessibility as the reason rather than as a generic demo.
  */

  /* use cases
      - Modals, dropdowns, and popovers — exactly what the demo's focus-management piece covers: moving focus into
        the modal on open, trapping it there while open, and returning it to the trigger element on close — this is
        precisely why shadcn's Dialog (built on Radix, from your shadcn/Radix cheat-sheet) handles this automatically
        rather than something you'd want to hand-roll from scratch in a real app.

      - Custom interactive elements — anytime you build something that behaves like a button, link, or checkbox but
        isn't semantically one (a custom toggle switch, a card that's clickable as a whole) — needs explicit role,
        tabIndex, and keyboard event handling to match what a real element gets automatically, exactly the
        gap your demo's FakeButton illustrates.

      - Form validation and error messaging — connecting directly to your React Hook Form card: an error message
        needs to be programmatically associated with its input (via aria-describedby) and often needs aria-invalid,
        so a screen reader user knows which field failed and why, not just that "the form has an error" somewhere.

      - Live-updating content — toast notifications (from your react-toastify usage in Panther Tracker), loading states,
        real-time counters — anything that changes without the user directly triggering it via a click needs aria-live
        so screen reader users are actually informed, rather than the change happening silently off-screen from their perspective.

      - Images and icon-only buttons — alt text on meaningful images (from your HTML5 cheat-sheet), and aria-label on icon-only
        buttons (a trash icon with no visible text still needs an accessible name — "Delete item," not just a visual glyph).

      - Color contrast and not relying on color alone — ensuring text is readable against its background
        (a measurable, testable ratio, not just "looks fine to me"), and never using color as the only way to convey information
        (a red border alone marking an invalid field also needs an icon or text, for colorblind users).

      - Skip links and heading structure — a "Skip to main content" link for keyboard users so they don't have to Tab through
        an entire navigation menu on every single page, plus correctly nested headings (h1 → h2 → h3, never skipping levels)
        so screen reader users can navigate a page's structure the way a sighted user would visually scan it.

      - Automated + manual testing together — tools like axe-core (often integrated directly into React Testing Library)
        can catch a meaningful subset of accessibility issues automatically, but genuinely testing with a real screen
        reader and actual keyboard-only navigation (exactly what you just did with Tab) catches things automated tools
        can't — the two approaches complement each other rather than either one being sufficient alone.

      - The common thread across every one of these: accessibility issues are almost always invisible if your only
        testing method is looking at the screen and clicking with a mouse — which is exactly why this card's demo
        was built around a keyboard test rather than anything visual.
  */

  // ============================================
  // THE Accessibility (a11y) WIRE (specific instance) - HOW THE FILES ARE CONNECTED AND WIRED TOGETHER
  // ============================================
  //
  //   App.jsx
  //      | renders <ProductionCard />
  //      v
  //   ProductionCard.jsx
  //      | imports detail array
  //      v
  //   productionDetailData.js
  //      | import DemoAccessibility from "../components/demos/DemoAccessibility.jsx";
  //      | ...
  //      | { title: "Accessibility (a11y)", ..., demo: DemoAccessibility }
  //      v
  //   DemoAccessibility.jsx
  //      | const FakeButton = ({ onClick }) => ( <div onClick={onClick}>...</div> );   // BAD
  //      | const RealButton = ({ onClick }) => ( <button onClick={onClick}>...</button> ); // GOOD
  //      | const closeButtonRef = useRef(null);
  //      | useEffect(() => { if (showModal) closeButtonRef.current.focus(); }, [showModal]);
  //      | <div role="dialog" aria-modal="true">
  //      |   <button ref={closeButtonRef}>Close</button>
  //      | </div>
  //
  // At render time in ProductionCard.jsx:
  //   {details.demo && <details.demo />}
  //   -> for the accessibility entry, this becomes <DemoAccessibility />
  //   -> mounts two visually similar but behaviorally different clickable
  //      elements, plus a modal whose focus moves automatically on open
  //
  // Difference from every other card's wire so far:
  //   Same overall shape (ProductionCard.jsx + productionDetailData.js ->
  //   demo: field -> <details.demo />), continuing the Phase 2 pattern.
  //   Nothing new at the FILE-CONNECTION level — every hook/technique used
  //   here (useState, useRef, useEffect) was already built earlier in this
  //   registry. What's new is entirely in HOW they're combined and WHY.
  //
  // What's different INSIDE this one, conceptually (not the wiring, the concept itself):
  //   This is the first demo in the entire registry where the correct way
  //   to "test" it is NOT clicking with a mouse at all — it's pressing Tab
  //   and observing which elements a screen reader/keyboard user could
  //   even reach in the first place. Every earlier demo's proof was visible
  //   on screen to anyone looking; this one's proof is only visible to
  //   someone testing the specific INTERACTION METHOD (keyboard-only) that
  //   accessibility work exists to protect. It also directly reuses the
  //   useRef + useEffect focus pattern from the original useRef card,
  //   but reframes the SAME mechanism around a real-world accessibility
  //   requirement rather than an isolated hook demonstration.
    
  `,
  tags: [
    "a11y",
    "ARIA",
    "focus",
    "useRef()",
    "useEffect()",
    "useState()"
  ],
  demo: DemoAccessibility, // calling the component that renders a (); so it can be used in the Card.jsx component
  category: "React Production Concepts",
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
  category: "React Production Concepts",
  },
];

// export the data from the detail array in detailData.js
export default detail;