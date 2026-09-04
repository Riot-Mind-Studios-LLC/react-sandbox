import { useState, useRef, useEffect } from "react";

// BAD — a div pretending to be a button
const FakeButton = ({ onClick }) => (
  <div
    onClick={onClick}
    className="inline-block px-3 py-1.5 rounded-md bg-red-200 text-xs font-medium border border-red-300 cursor-pointer text-black"
  >
    Fake Button (try Tabbing to me)
  </div>
);

// GOOD — a real button
const RealButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 rounded-md bg-green-200 text-xs font-medium border border-green-300 text-black"
  >
    Real Button (try Tabbing to me)
  </button>
);

const DemoAccessibility = () => {
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      closeButtonRef.current.focus();
    }
  }, [showModal]);

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-4">
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2">
          Click Tab on your keyboard to move between elements — watch which ones can receive focus
        </p>
        <div className="flex gap-2">
          <FakeButton onClick={() => setCount(count + 1)} />
          <RealButton onClick={() => setCount(count + 1)} />
        </div>
        <p className="text-sm mt-2">Clicked: {count} times</p>
      </div>

      <div>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors w-fit text-black"
        >
          Open Modal (watch focus move automatically)
        </button>

        {showModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="mt-2 p-3 rounded-md border-2 border-amber-500 bg-amber-50"
          >
            <p className="text-sm mb-2">Focus moved here automatically when this opened.</p>
            <button
              ref={closeButtonRef}
              onClick={() => setShowModal(false)}
              className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoAccessibility;

/** How to actually see the proof — this matters, walk through it exactly:
 * Click somewhere else on the page first (to make sure nothing's focused), then press Tab repeatedly to move through the page using only your keyboard.
 * Watch what happens at "Fake Button" vs. "Real Button": Tab will skip right over the red fake button entirely — it's genuinely impossible to reach it with a keyboard, no matter how many times you press Tab. The green real button, on the other hand, will show a visible focus outline when Tab lands on it, and pressing Enter or Space while it's focused will trigger the click — try clicking each one with your mouse, then try triggering each one with only your keyboard, and notice only the real button actually works both ways.
 * Click "Open Modal" and notice your keyboard focus (the visible outline) jumps straight to the "Close" button inside the modal, automatically — no Tabbing required to reach it.
 * This is accessibility made genuinely observable: not a visual difference, a keyboard-behavior difference, which is exactly the kind of thing that's invisible if you only ever interact with a mouse.
 */