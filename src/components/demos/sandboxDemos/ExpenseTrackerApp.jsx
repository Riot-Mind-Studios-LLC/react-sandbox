/** Project description: Daily expense tracker
 *
 * the problem:
 * a service worker wants a way to track daily tip or commission income and expenses
 *
 * the recipe:
 * useState()
 * inputs
 * button
 * CRUD - Create, Read, Update, and Delete
 * array[] - 1 array
 * filter()
 * map()
 * reduce()
 * Number()
 *
 * notes:
 * IDs need to be generated at the moment an item is created, not once at file load.
 * if a value can be calculated from state you already have, don't store it in state — calculate it.
 * only store things that can't be derived from something else.
 * an input with value but no onChange becomes read-only.
 * things that need to render at specific times should be placed inside of the return
 * things that need to be rebuilt on every render go in the component, outside of the return
 * .filter() walks through an array and returns a new array containing only the items that pass a test you define.
 * The key belongs on the outermost element returned from .map()
 * .map() only gives you the index if you ask for it by declaring that second parameter. No need to declare what you won't use.
 * .reduce() walks through an array and boils it down to a single value — accumulating as it goes
 * Why Number(...) is needed: your amounts come from an <input>, which always gives you strings, even for numeric input. "3" + "34" in JavaScript is "334" (string concatenation), not 37. Number() converts the string to an actual number so the math works.
 * Create (add entries with validation and unique IDs)
 * Read (two filtered lists rendering with .map()), and the derived balance (two .reduce() calls, formatted with .toFixed(2))
 * Delete (create a deleteEntry function that takes an ID, filters out the matching entry, and sets the result as the new list) call the function on the delete button
 */

// import dependancies
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const ExpenseTrackerApp = () => {
  // hold users expense type entry
  const [expenseType, setExpenseType] = useState("");
  // hold users expense item entry
  const [expenseItem, setExpenseItem] = useState("");
  // hold users expense amount entry
  const [expenseAmount, setExpenseAmount] = useState("");
  // hold both income and expense entries mixed together
  const [userItems, setUserItems] = useState([]);
  // track which entry is being edited
  const [editingId, setEditingId] = useState(null);

  // go through userItems, keep only the ones where type equals "income", and put those in a new array called incomeItems
  const incomeItems = userItems.filter((item) => item.type === "income");
  // go through userItems, keep only the ones where type equals "expense", and put those in a new array called expenseItems
  const expenseItems = userItems.filter((item) => item.type === "expense");

  // get sum of total income items
  const totalIncome = incomeItems.reduce(
    (sum, entry) => sum + Number(entry.amount),
    0,
  );

  // get sum of total expense items
  const totalExpenses = expenseItems.reduce(
    (sum, entry) => sum + Number(entry.amount),
    0,
  );

  // get balance of total income - total expenses
  const currentBalance = totalIncome.toFixed(2) - totalExpenses.toFixed(2);

  // takes an ID, filters out the matching entry, and sets the result as the new list
  const deleteEntry = (idToDelete) => {
    setUserItems(userItems.filter((entry) => entry.id !== idToDelete));
  };

  // push the entries back into the form
  const startEdit = (entry) => {
    setExpenseType(entry.type);
    setExpenseItem(entry.item);
    setExpenseAmount(entry.amount);
    setEditingId(entry.id);
  };

  return (
    <div className="p-4 rounded-md border border-teal-300 bg-white flex flex-col gap-2 text-black">
      {/* options */}
      <select
        value={expenseType} // tells the select what to display
        onChange={(e) => setExpenseType(e.target.value)} // captures the user's option into state
        className="p-2 rounded-md border border-black"
      >
        <option value="">Choose Type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* type */}
      <input
        value={expenseItem}
        onChange={(e) => setExpenseItem(e.target.value)} // captures the user's input into state
        placeholder="item"
        className="p-2 rounded-md border border-black"
      ></input>

      {/* amount */}
      <input
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(e.target.value)} // captures the user's input into state
        placeholder="$0.00"
        className="p-2 rounded-md border border-black"
      ></input>

      {/* add item button - CREATE */}
      <button
        onClick={() => {
          // guard — all three fields must be filled
          if (
            expenseType !== "" &&
            expenseItem !== "" &&
            expenseAmount !== ""
          ) {
            if (editingId === null) {
              // ADD MODE — create a new entry
              const newEntry = {
                id: Date.now(),
                type: expenseType,
                item: expenseItem,
                amount: expenseAmount,
              };
              setUserItems([...userItems, newEntry]);
            } else {
              // EDIT MODE — replace the matching entry
              setUserItems(
                userItems.map((entry) =>
                  entry.id === editingId
                    ? {
                        ...entry,
                        type: expenseType,
                        item: expenseItem,
                        amount: expenseAmount,
                      }
                    : entry,
                ),
              );
              setEditingId(null); // back to add mode
            }

            // both paths clear the form
            setExpenseType("");
            setExpenseItem("");
            setExpenseAmount("");
          }
        }}
        className="p-2 rounded-md border border-black hover:bg-teal-600 hover:text-white"
      >
        {editingId === null ? "Add Item" : "Save Changes"}
      </button>

      {/* income items */}
      <section>
        <h3 className="font-bold">Income</h3>
        {incomeItems.map((incomeObj) => {
          return (
            <div key={incomeObj.id} className="flex justify-between">
              <p className="flex-1">{incomeObj.item}</p>
              <p className="w-20 text-left">$ {incomeObj.amount}</p>

              {/* UPDATE & DELETE */}
              <aside className="flex gap-2">
                {/* delete button */}
                <button
                  onClick={() => deleteEntry(incomeObj.id)}
                  className="hover:text-teal-600"
                >
                  <MdDelete />
                </button>

                {/* update button */}
                <button
                  onClick={() => startEdit(incomeObj)}
                  className="hover:text-teal-600"
                >
                  <MdEdit />
                </button>
              </aside>
            </div>
          );
        })}
      </section>
      <hr />

      {/* expense items */}
      <section>
        <h3 className="font-bold">Expense</h3>
        {expenseItems.map((expenseObj) => {
          return (
            <div key={expenseObj.id} className="flex justify-between">
              <p className="flex-1">{expenseObj.item}</p>
              <p className="w-20 text-left">$ {expenseObj.amount}</p>

              {/* Update & Delete */}
              <aside className="flex gap-2">
                {/* delete button */}
                <button
                  onClick={() => deleteEntry(expenseObj.id)}
                  className="hover:text-teal-600"
                >
                  <MdDelete />
                </button>

                {/* update button */}
                <button
                  onClick={() => startEdit(expenseObj)}
                  className="hover:text-teal-600"
                >
                  <MdEdit />
                </button>
              </aside>
            </div>
          );
        })}
      </section>
      <hr />

      {/* running balance */}
      <section>
        <h3 className="font-bold">Todays Earnings</h3>
        <p>$ {currentBalance.toFixed(2)}</p>
      </section>
    </div>
  );
};

export default ExpenseTrackerApp;

/** claude recap
 * Built: A daily income/expense tracker for a tips-based worker — add entries by type, view them in two separate lists, edit or delete any entry, with a live running balance.
 *
 * Concepts demonstrated:
 * ** Full CRUD — Create (spread to append), Read (.filter() into two lists), Update (.map() with a ternary to swap one entry), Delete (.filter() to exclude by ID)
 * ** Unique IDs over array indexes — generated at creation time, stable across deletes
 * ** Derived data over stored state — balance calculated fresh each render rather than tracked separately
 * ** .reduce() — summing an array down to a single value, with Number() to convert input strings to real numbers
 * ** Immutability throughout — every operation builds a new array/object rather than modifying the existing one
 * ** Mode-switching state (editingId) — one value driving button label, button behavior, and edit flow
 * ** Multi-field controlled forms — three inputs wired simultaneously
 * ** onClick={() => fn(arg)} vs onClick={fn} — and why passing arguments requires the wrapper
 *
 * Watch for later: persistence — everything resets on refresh, since it all lives in React state. localStorage or a backend would be the natural next step if you ever want this to be genuinely usable.
 */
