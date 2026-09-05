/** Project description: List builder
 * 
 * the problem:
 * a user needs an easy way to create a list based off their inputs.
 *
 * the recipe:
 * useState(): the component needs to remember and re-render when it changes based on the users inputs
 * array: to hold the list items
 * map(): to loop through the items and display them as a list for each entry
 * input field: so the user can type the list item
 * button: so the user can add the list item to the list - button updates the list
 *
 * notes:
 * not every if statement needs an else. Only reach for else when there's a genuinely different action that needs to happen in the opposite case.
 * on update, react reruns the entire component, not just the part that changed
 */

// import dependancies
import { useState } from "react";

const ListBuilder = () => {
  // an empty array to hold the list items
  // the array of items that will be rendered
  // list needs an empty array [] to hold all the items in the list
  const [list, setList] = useState([]);

  // hold what the user is currently typing in an empty array
  // the current input text
  // typing updates userItem live
  // userItem needs an empty string as a placeholder for the users input
  const [userItem, setUserItem] = useState("");

  // console.log(list); // 1 render for each keystroke

  return (
    <div className="p-4 rounded-md border border-teal-300 bg-white flex flex-col gap-2 text-black">
      <input
        placeholder="item"
        value={userItem}
        onChange={(e) => setUserItem(e.target.value)} // Every single keystroke calls setUserItem(...) — one call per letter typed.
        className="p-2 rounded-md border border-black"
      ></input>

      {/*
       * Clicking the button takes everything already in list,
       * adds userItem onto the end,
       * and replaces list with that new array.
       */}
      <button
        onClick={() => {
          // do nothing on an empty click - the natural fallback when there's no else
          if (userItem !== "") {
            setList([...list, userItem]);
            setUserItem("");
          }
        }}
        className="p-2 rounded-md border border-black hover:bg-teal-600"
      >
        Add Item
      </button>

      <ul>
        {/* .map() walks through list and turns each item into its own <li>. */}
        {list.map((listItems, listIdx) => {// listIdx = the index/position in the list
          return <li key={listIdx}>{listItems}</li>;
        })}
      </ul>
    </div>
  );
};

export default ListBuilder;

/** claude recap
 * Controlled inputs (value + onChange) — text typed live-updates state.
 * State shape matching data type — string for one value, array for a list.
 * Immutable array updates — [...list, userItem] instead of mutating.
 * Conditional guards — if without a forced else.
 * The core render model — any setter call re-renders the whole component, not just the changed piece.
 */