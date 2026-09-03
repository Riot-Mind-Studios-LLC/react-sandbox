import { useState } from "react";

const initialItems = [
  { id: 1, name: "Sticker Pack" },
  { id: 2, name: "Vanity Plate" },
  { id: 3, name: "Snapback Hat" },
];

const ListItem = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <li className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
      {label}
    </li>
  );
};

const DemoListsKeys = () => {
  const [items, setItems] = useState(initialItems);

  const removeFirst = () => {
    setItems(items.slice(1)); // removes the FIRST item — this is what exposes the index-key bug
  };

  const reset = () => setItems(initialItems);

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-3">
      <div className="flex gap-2">
        <button
          onClick={removeFirst}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          Remove First Item
        </button>
        <button
          onClick={reset}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
        >
          Reset
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1">Using index as key (buggy):</p>
        <ul className="space-y-1">
          {items.map((item, index) => (
            <ListItem key={index} label={item.name} />
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1">Using item.id as key (correct):</p>
        <ul className="space-y-1">
          {items.map((item) => (
            <ListItem key={item.id} label={item.name} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DemoListsKeys;

/**
 * How to actually see the bug — this is important, walk through it exactly:
 * 
 * 1. Check the checkbox next to "Sticker Pack" in BOTH lists (top and bottom).
 * 2. Click "Remove First Item." Sticker Pack disappears from the data, leaving Vanity Plate and Snapback Hat.
 * 3. Watch what happens to the checkboxes:
 *      - Top list (index keys): the checkbox that's now checked has moved to sit next to "Vanity Plate" — React
 *        reused the DOM node for key={0} (which used to be Sticker Pack's checkbox, now holds Vanity Plate's label)
 *        and kept its checked state, because it thinks nothing about "item 0" changed enough to reset it.
 *      - Bottom list (id keys): the checked state disappears along with Sticker Pack, since Sticker Pack's actual
 *        key={1} was removed from the list entirely — React correctly recognizes that specific item is gone, not just shifted.
 * 
 * This is the real, visible version of the bug the pattern described — component state (the checkbox) ending up attached to
 * the wrong data after a list changes, purely because of how keys were chosen.
 */