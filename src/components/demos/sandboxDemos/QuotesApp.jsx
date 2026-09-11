/** Project description: Inspirational Quotes API App
 *
 * the problem:
 * a user wants to recieve random inspirational quotes at the click of a button throughout the day.
 *
 * the recipe:
 * useState()
 * button - onClick
 * json api
 * fetch()
 *
 * notes:
 * call a function now: getQuote()
 * let React call the function later: getquote
 * React treats null in JSX as "render nothing at all," which is slightly more explicit about intent than an empty paragraph tag.
 */

// import dependancies
import { useState } from "react";

const QuotesApp = () => {
  // state is initially blank until a user clicks the button
  const [quoteData, setQuote] = useState(null);
  // the api's url
  const url = "https://dummyjson.com/quotes/random";

  // get the api data
  const getQuote = async () => {
    const apiResponse = await fetch(url);
    const apiData = await apiResponse.json();
    setQuote(apiData);
  };

  return (
    <div className="p-4 rounded-md border border-teal-300 bg-white flex flex-col gap-2 text-black">
      <button
        className="p-2 rounded-md border border-black hover:bg-teal-600 hover:text-white"
        onClick={getQuote}
      >
        Get Inspiration
      </button>

      {quoteData === null ? null : (
        <section>
          <p>"{quoteData.quote}"</p>
          <p className="text-sm italic">~ {quoteData.author}</p>
        </section>
      )}
    </div>
  );
};

export default QuotesApp;

/** claude recap
 *
 */
