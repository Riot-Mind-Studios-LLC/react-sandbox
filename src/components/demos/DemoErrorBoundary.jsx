import { useState } from "react";
import ErrorBoundary from "../ErrorBoundary.jsx";

// a component that deliberately throws when triggered
const BuggyComponent = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error("Intentional crash for demo purposes");
  }
  return (
    <p className="text-sm">Everything is fine. Click the button to break me.</p>
  );
};

const DemoErrorBoundary = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-3">
      <button
        onClick={() => setShouldThrow(true)}
        className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors w-fit"
      >
        Trigger Error
      </button>

      <ErrorBoundary>
        <BuggyComponent shouldThrow={shouldThrow} />
      </ErrorBoundary>
    </div>
  );
};

export default DemoErrorBoundary;

/** What proves the concept here:
 * BuggyComponent genuinely throws a real JavaScript error during rendering when shouldThrow becomes true — this isn't a simulated/faked error message, it's an actual throw new Error(...).
 * ErrorBoundary wraps only BuggyComponent — notice the "Trigger Error" button and the rest of the demo's UI sit outside the boundary, so you can directly observe that they keep working fine even after the crash.
 * Click "Trigger Error" and watch BuggyComponent's content get replaced by the red fallback message — while the button above it remains fully clickable and the rest of the page is completely unaffected.
 */
