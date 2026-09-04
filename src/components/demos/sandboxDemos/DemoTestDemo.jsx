import { createContext, useState, use } from "react";

// 1. Create the context (same as useContext demo)
const MessageContext = createContext("Hello from Context!");

// 2. Child component — calls use() CONDITIONALLY, inside an if statement
const ConditionalReader = ({ showMessage }) => {
  if (!showMessage) {
    return <p className="text-sm text-gray-500 italic">Message hidden — use() not called</p>;
  }

  // this line only runs when showMessage is true
  // useContext() could NOT be written this way — hooks can't be called conditionally
  const message = use(MessageContext);

  return <p className="text-sm font-medium">{message}</p>;
};

// 3. Parent component — Provider + toggle button
const DemoTestDemo = () => {
  const [showMessage, setShowMessage] = useState(true);

  return (
    <MessageContext.Provider value="Hello from Context!">
      <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-2">
        <ConditionalReader showMessage={showMessage} />
        <button
          onClick={() => setShowMessage(!showMessage)}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors w-fit"
        >
          Toggle Message
        </button>
      </div>
    </MessageContext.Provider>
  );
};

export default DemoTestDemo;

/*
What's happening, and why this actually proves the point:

- ConditionalReader has an early return at the top — if showMessage is false, it returns before ever reaching the use(MessageContext) line.
- That's the key: use() is only called on some renders, not every render, not in a fixed order. If you swapped use(MessageContext) for useContext(MessageContext) here and moved it above the early return, it'd work — but if you tried to call useContext after an early return (matching this exact structure), React would throw a "Rendered more hooks than during the previous render" error. This is genuinely illegal for every hook you've built so far.
- Clicking "Toggle Message" flips showMessage, which changes whether the component takes the early-return path or the use() path — you're visually watching a hook get skipped entirely on some renders and called on others, which is the one real, tangible thing that separates use() from the rest of your hook cards.
*/