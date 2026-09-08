/** Project description:
 *
 * the problem:
 * a user needs to check current weather for every american state in on application
 *
 * the recipe:
 * weather api
 * drop down menu selector
 * useState()
 * state coordinates array
 * div to display chart info to map() through
 *
 * notes:
 * react only re-renders when a state setter is called
 * once React controls a form element via value, you don't need HTML's native "default" attributes anymore (selected for <select>, checked for checkboxes/radios work the same way) — React's value always wins and dictates what's shown.
 * useEffect lets you say "whenever this specific thing changes, automatically run this code afterward" — without you having to manually trigger it from every place that thing might change. It's less "run this when clicked" and more "watch this value, and react whenever it's different."
 * template literals let you mix plain text and live variable values into one string, without manually gluing pieces together with +. Everything outside ${ } is literal text; everything inside ${ } gets evaluated as JavaScript and dropped in as a value.
 * useEffect's main function cannot be async directly. useEffect expects its function to either return nothing, or return a specific kind of cleanup function. But an async function always secretly returns a Promise instead — even if you don't write an explicit return. React sees that Promise and gets confused, since it's not what useEffect expects back.
 * the common workaround: define a separate async function inside the useEffect, then call it immediately.
 * an async function always returns a Promise, whether you explicitly return something or not.
 * hooks (useState, useEffect, etc.) must always be called at the top level of your component — never inside conditions, loops, or other functions. React relies on hooks running in the exact same order every single render to keep track of which state belongs to what.
 * hooks always go on top, before any other logic
 */

// src: https://open-meteo.com/

// import dependancies
import { useState, useEffect } from "react";

// assets
const stateCoordinates = {
  al: { lat: 32.361538, long: -86.279118 },
  ak: { lat: 58.301935, long: -134.41974 },
  az: { lat: 33.448457, long: -112.073844 },
  ar: { lat: 34.736009, long: -92.331122 },
  as: { lat: -14.2756, long: -170.702 },
  ca: { lat: 38.555605, long: -121.468926 },
  co: { lat: 39.739167, long: -104.984167 },
  ct: { lat: 41.767, long: -72.677 },
  de: { lat: 39.161921, long: -75.526755 },
  dc: { lat: 38.9072, long: -77.0369 },
  fl: { lat: 30.4518, long: -84.27277 },
  ga: { lat: 33.76, long: -84.39 },
  gu: { lat: 13.4443, long: 144.7937 },
  hi: { lat: 21.307442, long: -157.857376 },
  id: { lat: 43.613739, long: -116.237651 },
  il: { lat: 39.78325, long: -89.650373 },
  in: { lat: 39.790942, long: -86.147685 },
  ia: { lat: 41.590939, long: -93.620866 },
  ks: { lat: 39.04, long: -95.69 },
  ky: { lat: 38.197274, long: -84.86311 },
  la: { lat: 30.45809, long: -91.140229 },
  me: { lat: 44.323535, long: -69.765261 },
  md: { lat: 38.972945, long: -76.501157 },
  ma: { lat: 42.2352, long: -71.0275 },
  mi: { lat: 42.7335, long: -84.5467 },
  mn: { lat: 44.95, long: -93.094 },
  ms: { lat: 32.32, long: -90.207 },
  mo: { lat: 38.572954, long: -92.189283 },
  mt: { lat: 46.595805, long: -112.027031 },
  ne: { lat: 40.809868, long: -96.675345 },
  nv: { lat: 39.160949, long: -119.753877 },
  nh: { lat: 43.220093, long: -71.549896 },
  nj: { lat: 40.221741, long: -74.756138 },
  nm: { lat: 35.667231, long: -105.964575 },
  ny: { lat: 42.659829, long: -73.781339 },
  nc: { lat: 35.771, long: -78.638 },
  nd: { lat: 48.813343, long: -100.779004 },
  mp: { lat: 15.1848, long: 145.7514 },
  oh: { lat: 39.961176, long: -82.998794 },
  ok: { lat: 35.482309, long: -97.534994 },
  or: { lat: 44.931109, long: -123.029159 },
  pa: { lat: 40.269789, long: -76.875613 },
  pr: { lat: 18.4655, long: -66.1057 },
  ri: { lat: 41.82355, long: -71.422132 },
  sc: { lat: 34.0, long: -81.035 },
  sd: { lat: 44.367966, long: -100.336378 },
  tn: { lat: 36.165, long: -86.784 },
  tx: { lat: 30.266667, long: -97.75 },
  ut: { lat: 40.7547, long: -111.892622 },
  vt: { lat: 44.26639, long: -72.57194 },
  va: { lat: 37.54, long: -77.46 },
  vi: { lat: 18.3419, long: -64.9307 },
  wa: { lat: 47.042418, long: -122.893077 },
  wv: { lat: 38.349497, long: -81.633294 },
  wi: { lat: 43.074684, long: -89.384445 },
  wy: { lat: 41.145548, long: -104.802042 },
};

const WeatherApp = () => {
  const [state, setState] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  let weatherDisplay = [];

  if (weatherData !== null) {
    weatherDisplay = [
      {
        label: "Day / Night",
        value: weatherData.current.is_day === 1 ? "Day" : "Night",
        unit: "",
      },
      {
        label: "Last Updated",
        value: new Date(weatherData.current.time * 1000).toLocaleTimeString(
          undefined,
          { timeZone: weatherData.timezone },
        ),
        unit: "",
      },
      {
        label: "Temp",
        value: weatherData.current.temperature_2m,
        unit: "º",
      },
      {
        label: "Humidity",
        value: weatherData.current.relative_humidity_2m,
        unit: "%",
      },
      {
        label: "Snow",
        value: weatherData.current.snowfall,
        unit: "in.",
      },
      {
        label: "Rain",
        value: weatherData.current.rain,
        unit: "in.",
      },
      {
        label: "Wind",
        value: weatherData.current.wind_speed_10m,
        unit: "mph",
      },
    ];
    // console.log(weatherData.current.is_day);
  }

  useEffect(() => {
    // prevent the effect from trying to look up coordinates for an empty selection on first load (safeguard).
    if (state !== "") {
      // this url is a dependancy of the safeguard
      // If this url line sat outside the guard, it would try to run immediately on first render (when state is still ""), and crash trying to read .lat off of stateCoordinates[""] (which doesn't exist).
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${stateCoordinates[state].lat}&longitude=${stateCoordinates[state].long}&current=temperature_2m,relative_humidity_2m,is_day,rain,snowfall,wind_speed_10m&timezone=auto&forecast_days=1&timeformat=unixtime&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;

      // define a separate async function inside the useEffect, then call it immediately
      const getWeather = async () => {
        // pauses until the raw response arrives, stored in apiResponse
        const apiResponse = await fetch(url);
        // pauses again while that response gets unpacked into real usable data, stored in apiData
        const apiData = await apiResponse.json();
        // hands that data to state — which is what actually triggers the re-render and makes it show up on screen.
        setWeatherData(apiData);
        // console.log(weatherData);
      };
      // run getWeather
      getWeather();
    }
  }, [state]);

  return (
    <div className="p-4 rounded-md border border-teal-300 bg-white flex flex-col gap-2 text-black">
      {/* state dropdown */}
      <select
        name="state"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="p-2 rounded-md border border-black"
      >
        <option value="">Choose a state</option>
        <option value="al">Alabama</option>
        <option value="ak">Alaska</option>
        <option value="az">Arizona</option>
        <option value="ar">Arkansa</option>
        <option value="as">American Samoa</option>
        <option value="ca">California</option>
        <option value="co">Colorado</option>
        <option value="ct">Connecticut</option>
        <option value="de">Delaware</option>
        <option value="dc">Disctrict of Columbia</option>
        <option value="fl">Florida</option>
        <option value="ga">Georgia</option>
        <option value="gu">Guam</option>
        <option value="hi">Hawaii</option>
        <option value="id">Idaho</option>
        <option value="il">Illinois</option>
        <option value="in">Indiana</option>
        <option value="ia">Iowa</option>
        <option value="ks">Kansas</option>
        <option value="ky">Kentucky</option>
        <option value="la">Louisiana</option>
        <option value="me">Maine</option>
        <option value="md">Maryland</option>
        <option value="ma">Massachusetts</option>
        <option value="mi">Michigan</option>
        <option value="mn">Minnesota</option>
        <option value="ms">Mississippi</option>
        <option value="mo">Missouri</option>
        <option value="mt">Montana</option>
        <option value="ne">Nebraska</option>
        <option value="nv">Nevada</option>
        <option value="nh">New Hampshire</option>
        <option value="nj">New Jersey</option>
        <option value="nm">New Mexico</option>
        <option value="ny">New York</option>
        <option value="nc">North Carolina</option>
        <option value="nd">North Dakota</option>
        <option value="mp">Northern Marian Islands</option>
        <option value="oh">Ohio</option>
        <option value="ok">Oklahoma</option>
        <option value="or">Oregon</option>
        <option value="pa">Pennsylvania</option>
        <option value="pr">Puerto Rico</option>
        <option value="ri">Rhode Island</option>
        <option value="sc">South Carolina</option>
        <option value="sd">South Dakota</option>
        <option value="tn">Tennessee</option>
        <option value="tx">Texas</option>
        <option value="ut">Utah</option>
        <option value="vt">Vermont</option>
        <option value="va">Virginia</option>
        <option value="vi">Virgin Islands</option>
        <option value="wa">Washington</option>
        <option value="wv">West Virginia</option>
        <option value="wi">Wisconsin</option>
        <option value="wy">Wyoming</option>
      </select>

      {/* api data */}
      {weatherData === null ? (
        <p>Choose a state to view weather</p>
      ) : (
        <div>
          {weatherDisplay.map((displayItem, displayIdx) => {
            return (
              <section
                key={displayIdx}
                className="grid grid-cols-2 gap-6 border rounded-lg text-center my-2 overflow-hidden"
              >
                <h2 className="py-1">{displayItem.label}</h2>
                <p className="bg-black text-white py-1">
                  {displayItem.value}
                  {displayItem.unit}
                </p>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

/** claude recap
 * Built: A fully working current-weather lookup app — select any US state/territory from a dropdown, see live temperature, humidity, day/night status, snowfall, wind speed, and last-updated time, all pulled from Open-Meteo's API based on that state's real coordinates.
 * Concepts demonstrated:
 * Parallel/lookup data structures — object-of-objects for O(1) key-based coordinate lookup (stateCoordinates[state])
 * Bracket notation vs. dot notation — accessing object properties dynamically via a variable vs. a known literal key
 * useEffect with a dependency array — reacting to state changes ([state]) to trigger side effects
 * Async/await — the async-function-inside-useEffect pattern, since useEffect itself can't be async
 * fetch() → .json() — the two-step, two-await process of retrieving and unpacking API data
 * Guard clauses — preventing lookups/fetches on an empty/null state before user interaction
 * Template literals — building a dynamic URL from static text + variables
 * Data transformation for display — Unix timestamp → milliseconds → Date → locale-formatted string with explicit timezone; numeric is_day → readable label via ternary
 * Refactoring repeated JSX into a data-driven .map() — six hardcoded sections collapsed into one reusable array + template
 * null vs. undefined — a real-world case where they're not interchangeable (toLocaleTimeString's locale argument)
 * Watch for later: none — the two things that looked like bugs (timezone-dependent day/night mismatches, ":15-increment" timestamps) both turned out to be correct, real-world API behavior once verified, not code issues. Worth remembering this pattern: always verify against ground truth before assuming your code is wrong.
 */
