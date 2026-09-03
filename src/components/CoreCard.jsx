// import the data from the detail array in detailData.js
import coreDetail from "../data/coreDetailData.js";

// import dependancies
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // react-syntax-highlighter
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // react-syntax-highlighter

const CoreCard = () => {
  return (
    <>
      <div className="container mx-auto px-6 relative text-white pt-6">
        <h1 className="text-6xl pb-3">REACT CORE CONCEPTS</h1>
        <p>
          These five foundational patterns are the structural rules governing how
          React components actually communicate and render — separate from any
          hook, and true even in a component built with no hooks at all. Where
          hooks give a component new capabilities, these patterns govern the
          basic mechanics every component operates within. Props & prop drilling
          is how data flows one-directionally from parent to child, with
          drilling being what happens when that data is needed several layers
          deep, forcing intermediate components to relay a value they never use
          themselves. Conditional rendering is how a component decides what to
          show, using plain JavaScript expressions (&&, ternaries, if/else)
          embedded directly in JSX rather than any special templating syntax.
        </p>
        <br />
        <p>
          Lists & keys is how a collection of data becomes a collection of UI
          via .map(), with the key prop telling React which rendered element
          corresponds to which specific piece of data across re-renders — get it
          wrong, and state can silently attach to the wrong item. Controlled vs.
          uncontrolled components describes two ways a form input's value can be
          managed: driven live by React state on every keystroke, or left for
          the DOM to manage on its own and read only on demand via a ref.
          Component composition / children prop is how components combine to
          build larger UI by passing actual JSX — not just data — into a
          component via children, letting a wrapper like a Card or Modal stay
          flexible around genuinely unpredictable content.
        </p>
        <br />
        <p>
          These five interlock constantly in real components rather than
          existing as isolated trivia — a list commonly renders items that are
          conditionally styled, a controlled input's value is exactly the kind
          of data passed down through props, and a composed wrapper often needs
          to conditionally render around its children, not just display them.
          None of this requires a hook to exist, but every hook built in this
          same phase gets used through this exact structural layer — which is
          why this half of Core Foundation is what makes the hooks half actually
          usable in real, working UI rather than isolated syntax.
        </p>
        <br />
      </div>
      <section className="relative flex items-center">
        {/* card container */}
        <div className="container mx-auto px-6 relative">
          {/* card columns */}
          <div className="grid grid-cols-1 py-5 gap-6">
            {/* card */}
            {/* mapping over the detail array and naming each individual item "details" */}
            {/* map through the array and display content for each item in the array */}
            {coreDetail.map((details, key) => (
              <div
                key={key}
                className="p-6 rounded-lg border border-cyan-400 bg-cyan-600"
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
                      className="px-4 py-1.5 rounded-full bg-cyan-200 text-xs font-medium border border-cyan-300"
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

export default CoreCard;
