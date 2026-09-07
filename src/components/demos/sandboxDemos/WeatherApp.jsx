/** Project description:
 *
 * the problem:
 * a user needs to check current weather for everystate in on application
 *
 * the recipe:
 * weather api
 * drop down menu selector
 * use state
 * button
 *
 *
 * notes:
 */

// import dependancies

const WeatherApp = () => {
  return (
    <div className="p-4 rounded-md border border-teal-300 bg-white flex flex-col gap-2 text-black">
      <select name="state">
        <option value="" selected>
          Choose a state
        </option>
        <option value="al">New York</option>
        <option value="ak">California</option>
        <option value="az">California</option>
        <option value="ar">California</option>
        <option value="as">California</option>
        <option value="ca">California</option>
        <option value="co">California</option>
        <option value="ct">California</option>
        <option value="de">California</option>
        <option value="dc">California</option>
        <option value="fl">California</option>
        <option value="ga">California</option>
        <option value="gu">California</option>
        <option value="hi">California</option>
        <option value="id">California</option>
        <option value="il">California</option>
        <option value="in">California</option>
        <option value="ia">California</option>
        <option value="ks">California</option>
        <option value="ky">California</option>
        <option value="la">California</option>
        <option value="me">California</option>
        <option value="md">California</option>
        <option value="ma">California</option>
        <option value="mi">California</option>
        <option value="mn">California</option>
        <option value="ms">California</option>
        <option value="mo">California</option>
        <option value="mt">California</option>
        <option value="ne">California</option>
        <option value="nv">California</option>
        <option value="nh">California</option>
        <option value="nj">California</option>
        <option value="nm">California</option>
        <option value="ny">California</option>
        <option value="nc">California</option>
        <option value="nd">California</option>
        <option value="mp">California</option>
        <option value="oh">California</option>
        <option value="ok">California</option>
        <option value="or">California</option>
        <option value="pa">California</option>
        <option value="pr">California</option>
        <option value="ri">California</option>
        <option value="sc">California</option>
        <option value="sd">California</option>
        <option value="tn">California</option>
        <option value="tx">California</option>
        <option value="ut">California</option>
        <option value="vt">California</option>
        <option value="va">California</option>
        <option value="vi">California</option>
        <option value="wa">California</option>
        <option value="wv">California</option>
        <option value="wi">California</option>
        <option value="wy">California</option>
      </select>
    </div>
  );
};

export default WeatherApp;

/** claude recap
 *
 */
