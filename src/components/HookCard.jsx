// import the data from the detail array in detailData.js
import hookDetail from "../data/hookDetailData.js";

// import dependancies
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // react-syntax-highlighter
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // react-syntax-highlighter

const HookCard = () => {
  return (
    <>
      <div className="container mx-auto px-6 relative text-white pt-6">
        <h1 className="text-6xl pb-3">REACT HOOKS</h1>
        <p>
          React Hooks are functions that let a plain function component tap into
          React's internal features — state, side effects, refs, context, and
          more — without needing to write a class component. Before hooks
          existed, things like state and lifecycle events were only available in
          class components; hooks changed that, letting any function component
          do the same things. Every hook name starts with use, which isn't just
          a naming convention — it's how React and linters know a function is
          allowed to participate in React's hook system, which is also what lets
          custom hooks like the ones you built work the same way.
        </p>
        <br />
        <p>
          Functionally, hooks fall into a few categories: state hooks hold a
          value that persists across renders and can trigger a re-render when it
          changes (useState, useReducer, useOptimistic); effect hooks let a
          component reach outside normal rendering to do something like fetch
          data or start a timer (useEffect); ref hooks hold a value or DOM
          reference that persists across renders without causing a re-render
          (useRef); context hooks read a shared value from elsewhere in the
          component tree without manually passing it down through props
          (useContext, use()); performance hooks cache a value or function
          between renders to skip unnecessary work (useMemo, useCallback); and
          React 19's form/action hooks manage state tied to async submissions
          with pending and error handling built in (useActionState, paired again
          with useOptimistic). Custom hooks are simply your own functions, built
          out of the hooks above, that package up reusable logic so it doesn't
          need to be copy-pasted across components.
        </p>
        <br />
        <p>
          Using them correctly comes down to a small set of rules that never
          change: hooks must only be called at the top level of a component or
          custom hook, never inside a condition, loop, or nested function, since
          every hook has to run in the exact same order on every render (the one
          exception being use(), which is specifically designed to break this
          rule); hooks can only be called from a function component or another
          hook, never a regular helper function; hooks that take a dependency
          array only re-run when something in that array actually changes, with
          an empty array meaning "run once" and no array at all usually meaning
          "run on every render"; and state updates trigger re-renders while ref
          updates don't, which is the core distinction driving whether useState
          or useRef is the right choice for a given value. The real skill this
          builds isn't memorizing each hook's syntax, but recognizing which hook
          fits which problem — and that same kind of judgment is what the next
          phase, the foundational patterns, builds on from a different angle.
        </p>
      </div>

      <section className="relative min-h-screen flex items-center">
        {/* card container */}
        <div className="container mx-auto px-6 relative">
          {/* card columns */}
          <div className="grid grid-cols-1 py-5 gap-6">
            {/* card */}
            {/* mapping over the detail array and naming each individual item "details" */}
            {/* map through the array and display content for each item in the array */}
            {hookDetail.map((details, key) => (
              <div
                key={key}
                className="p-6 rounded-lg border border-amber-200 bg-amber-100"
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
                      className="px-4 py-1.5 rounded-full bg-amber-200 text-xs font-medium border border-amber-300"
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

export default HookCard;
