// import the data from the detail array in detailData.js
import sandboxDetail from "../data/sandboxDetailData.js";

const SandboxCard = () => {
  return (
    <>
      <div className="container mx-auto px-6 relative text-white pt-6">
        <h1 className="text-6xl pb-3">SANDBOX DEVELOPMENT</h1>
        <p>
          This is where I build small, standalone components and mini-apps from
          scratch to apply what I've learned in my core React study — no guided
          tutorials, no hand-holding. Each project starts from a simple problem
          statement, and I work through the logic, structure, and bugs myself,
          using Claude as a mentor who explains, questions, and critiques rather
          than hands me working code. It's the space where concepts from hooks,
          state management, and component patterns actually turn into muscle
          memory, one small working app at a time.
        </p>
        <br />
      </div>
      <section className="relative flex items-center">
        {/* card container */}
        <div className="container mx-auto px-6 relative">
          {/* card columns */}
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* card */}
            {/* mapping over the detail array and naming each individual item "details" */}
            {/* map through the array and display content for each item in the array */}
            {sandboxDetail.map((details, key) => (
              <div
                key={key}
                className="p-6 rounded-lg border border-teal-400 bg-teal-600"
              >
                {/* card content */}
                <div className="text-left mb-4">
                  {/* top of card content */}
                  <h3 className="font-semibold text-lg">{details.title}</h3>
                  <p className="text-sm pb-2">{details.description}</p>

                  {/* demo content */}
                  {/* JSX actually supports rendering a component straight from a property access like this (no need to pull it into its own capitalized variable first). It works because details.demo holds an actual component reference, not a string */}
                  {/* {details.demo && (...)} — this is a safety check. Since you're about to add more cards for other hooks (useEffect, useRef, etc.) before every single one has a demo built yet, this line means: only render the "Live Example" section if that particular data entry actually has a demo set. Cards without one yet just silently skip this block instead of crashing. */}
                  {details.demo && <details.demo />}
                </div>

                {/* card tags */}
                {/* map through the tags array in the detail array and render content for each tag item in that array */}
                <div className="flex flex-wrap gap-2">
                  <div className="w-full">
                    <h3 className="font-semibold text-sm">Recipe</h3>
                  </div>

                  {details.tags.map((tag, key) => (
                    <span
                      key={key}
                      className="px-4 py-1.5 rounded-full bg-teal-200 text-xs font-medium border border-teal-300"
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

export default SandboxCard;
