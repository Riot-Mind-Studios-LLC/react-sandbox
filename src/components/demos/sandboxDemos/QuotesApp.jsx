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

// src: https://dummyjson.com/quotes

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
 * Built: A random quote generator — click a button, fetch a random quote from DummyJSON's API, display the quote text and author, click again for a new one.
 *
 * Concepts demonstrated:
 * * Click-triggered fetch — a deliberate contrast to WeatherApp's useEffect pattern; no effect hook needed since nothing needs to "react" to a state change, the user's click is the trigger
 * * Async/await fetch → .json() two-step, written from scratch without guidance this time
 * * null initial state + ternary guard to prevent rendering empty/undefined data on first load
 * * Passing a function reference (onClick={getQuote}) vs. calling it immediately (getQuote()) — and why the parentheses matter
 * * Verifying an API is actually live before building on it (caught a dead endpoint and switched to a more reliable source)
 * * Naming consistency between state value and setter
 *
 * Watch for later:
 * * deliberately skipped here since the API responds instantly, but worth implementing on a future project with a slower or heavier request, where the wait is actually perceptible to a user.
 */
