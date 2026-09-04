// import the data from the detail array in detailData.js
import productionDetail from "../data/productionDetailData.js";

// import dependancies
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // react-syntax-highlighter
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // react-syntax-highlighter

const Card = () => {
  return (
    <>
      <div className="container mx-auto px-6 relative text-white pt-6">
        <h1 className="text-6xl pb-3">REACT PRODUCTION CONCEPTS</h1>
        <p>
          Production & Ecosystem — is a shift from how React works (Phase 1's
          hooks and patterns) to how real, deployed apps actually get built
          around React. Error boundaries and Suspense are React's own built-in
          tools for handling the unexpected and the not-yet-ready: an error
          boundary catches a genuine JavaScript crash during rendering and shows
          a fallback instead of taking down the whole app, while Suspense shows
          a fallback while something is still loading — a lazy-loaded
          component's code, or a Promise being read via use(). React Router adds
          client-side navigation on top of that foundation, letting a
          single-page app show different content for different URLs without a
          full page reload, while keeping the browser's back button,
          bookmarking, and shareable links all working the way users expect.
        </p>
        <br />
        <p>
          React Hook Form and React Testing Library/Vitest both address a
          different kind of scaling problem — not "how does one component work,"
          but "how does this stay manageable as the app grows." React Hook Form
          replaces hand-rolled useState-per-field forms with a single hook that
          tracks values, validation, and errors internally, using uncontrolled
          inputs specifically to avoid re-rendering the whole form on every
          keystroke — a real performance win once a form has more than a couple
          of fields. Testing verifies that all of this — hooks, forms, rendered
          output — actually behaves correctly, by simulating how a real user
          would interact with a component (clicking, typing, reading visible
          text) rather than checking internal implementation details, and it
          runs entirely outside the browser, in a terminal, as its own separate
          step from the app actually running.
        </p>
        <br />
        <p>
          The remaining items were about breadth and professional context rather
          than new mechanics: TypeScript layers type safety over everything
          already learned, without introducing new React concepts of its own;
          accessibility is less a new tool and more a lens applied to everything
          already built — using real semantic elements, pairing labels with
          inputs, and managing keyboard focus so the app works for people who
          can't use a mouse or can't see the screen; and styling architecture
          beyond Tailwind rounds out the picture with what else exists in the
          ecosystem (CSS Modules, the now-declining styled-components),
          confirming that the Tailwind + shadcn stack already in use is the
          current, industry-dominant choice rather than one option among equals.
          Two items were deliberately set aside rather than forced in — Server
          Components/Next.js, since it isn't resume-relevant and can't be
          meaningfully demonstrated without a full framework the sandbox doesn't
          have — a reminder that a complete roadmap isn't the same as covering
          literally everything that exists, but covering what's genuinely useful
          for where this skill set is actually headed.
        </p>
        <br />
      </div>
      <section className="relative flex items-center text-white">
        {/* card container */}
        <div className="container mx-auto px-6 relative">
          {/* card columns */}
          <div className="grid grid-cols-1 py-5 gap-6">
            {/* card */}
            {/* mapping over the detail array and naming each individual item "details" */}
            {/* map through the array and display content for each item in the array */}
            {productionDetail.map((details, key) => (
              <div
                key={key}
                className="p-6 rounded-lg border border-fuchsia-400 bg-fuchsia-500"
              >
                {/* card content */}
                <div className="text-left mb-4">
                  {/* top of card content */}
                  <h3 className="font-semibold text-lg">{details.title}</h3>
                  <p className="text-sm">{details.description}</p>

                  {/* code block content */}
                  <h4 className="font-semibold text-md pt-3">Code Example</h4>
                  <hr className="border-t my-2" />
                  <SyntaxHighlighter
                    language="javascript"
                    style={oneDark}
                    className="rounded-md text-xs"
                  >
                    {details.example}
                  </SyntaxHighlighter>

                  {/* hook demo content */}
                  <h4 className="font-semibold text-md pt-3">Live Demo</h4>
                  <hr className="border-t my-2" />
                  {/* JSX actually supports rendering a component straight from a property access like this (no need to pull it into its own capitalized variable first). It works because details.demo holds an actual component reference, not a string */}
                  {/* {details.demo && (...)} — this is a safety check. Since you're about to add more cards for other hooks (useEffect, useRef, etc.) before every single one has a demo built yet, this line means: only render the "Live Example" section if that particular data entry actually has a demo set. Cards without one yet just silently skip this block instead of crashing. */}
                  {details.demo && <details.demo />}
                </div>

                {/* card tags */}
                {/* map through the tags array in the detail array and render content for each tag item in that array */}
                <div className="flex flex-wrap gap-2">
                  {details.tags.map((tag, key) => (
                    <span
                      key={key}
                      className="px-4 py-1.5 rounded-full bg-fuchsia-200 text-xs font-medium border border-fuchsia-300 text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {/* end array map */}
          </div>
          {/* end card columns */}
        </div>
        {/* end card container */}
      </section>
    </>
  );
};

export default Card;
