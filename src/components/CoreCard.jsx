// import the data from the detail array in detailData.js
import coreDetail from "../data/coreDetailData.js";

// import dependancies
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // react-syntax-highlighter
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // react-syntax-highlighter

const Card = () => {
  return (
    <>
      <div className="container mx-auto px-6 relative text-white pt-6">
        <h1 className="text-6xl pb-3">REACT CORE CONCEPTS</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          vitae nibh venenatis, interdum dui non, vestibulum nisi. Fusce a arcu
          diam. Morbi placerat enim at eros convallis, at dignissim massa
          placerat. Nam hendrerit fringilla dictum. Vivamus et eleifend dolor,
          ut placerat metus. Sed et viverra felis, gravida vulputate est. Fusce
          dapibus placerat nisi, id vehicula tortor semper non.
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

export default Card;
