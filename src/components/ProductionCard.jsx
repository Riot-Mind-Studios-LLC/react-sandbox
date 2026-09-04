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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et
          ipsum ex. Pellentesque feugiat tortor vel pulvinar fringilla. Interdum
          et malesuada fames ac ante ipsum primis in faucibus. Nunc nulla dolor,
          euismod vel tristique sed, ultricies in tortor. Donec viverra lectus
          vitae mollis accumsan. Sed vestibulum turpis sit amet eros molestie
          gravida. Praesent eleifend ante at felis accumsan convallis. Aliquam
          efficitur metus a fermentum fermentum. Pellentesque facilisis congue
          velit, ac imperdiet diam bibendum et. Fusce eget leo sit amet orci
          euismod elementum. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Praesent auctor erat non diam pharetra tempor. Mauris
          convallis libero ac sodales tristique. Nulla venenatis justo quis dui
          scelerisque, at venenatis ligula feugiat.
        </p>
        <br />
        <p>
          Sed elit neque, bibendum a lorem ut, auctor consectetur metus.
          Vestibulum et magna id risus aliquam dictum et id velit. Vivamus
          pulvinar dictum libero, vel varius magna rutrum sit amet. Ut vel
          vestibulum purus. Donec commodo dui quis nunc vestibulum, id tempus
          lacus fermentum. Maecenas quis ipsum in nibh sagittis congue.
          Suspendisse euismod rutrum sem euismod pharetra. Morbi faucibus at
          erat eget tempor. Donec non ipsum lectus. Integer magna ex, accumsan
          quis lorem sed, hendrerit mollis risus. Curabitur tempor est at risus
          tincidunt mollis. Ut hendrerit odio ut euismod rhoncus. Fusce
          fringilla ex at rutrum consequat. Maecenas rutrum leo sit amet risus
          tempus elementum. Curabitur facilisis, odio et auctor maximus, justo
          quam porttitor ligula, aliquet tincidunt eros dolor ut nisl. Nulla
          facilisi.
        </p>
        <br />
        <p>
          Quisque posuere iaculis augue, sit amet dapibus magna rutrum sit amet.
          Aliquam at porta massa. Quisque viverra enim orci, sollicitudin
          fermentum nunc vulputate ac. Pellentesque iaculis augue sed tellus
          porta ornare. Curabitur volutpat, quam id rhoncus pretium, mauris
          lorem porta neque, non hendrerit dolor nibh vitae magna. Nulla libero
          odio, accumsan et lorem ut, vehicula auctor ipsum. Aenean tempor
          blandit nisl, quis hendrerit est ornare quis.
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
