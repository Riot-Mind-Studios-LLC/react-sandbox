import { useState, lazy, Suspense } from "react";

// artificial delay wrapped around the real import, so the fallback is actually visible
const LazyPanel = lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("./LazyPanel.jsx"));
    }, 1500);
  })
);

const DemoSuspense = () => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-3">
      <button
        onClick={() => setShowPanel(true)}
        className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors w-fit"
      >
        Load Panel
      </button>

      {showPanel && (
        <Suspense fallback={<p className="text-sm text-gray-500">Loading panel...</p>}>
          <LazyPanel />
        </Suspense>
      )}
    </div>
  );
};

export default DemoSuspense;

/** What proves the concept here:
 * lazy(() => ...) wraps LazyPanel's import in an artificial 1.5-second delay — without this, the component would load so fast in dev that you'd likely never actually see the fallback render at all.
 * Clicking "Load Panel" mounts the <Suspense> boundary for the first time — for that 1.5 seconds, "Loading panel..." is genuinely what's on screen, not a placeholder you're imagining — then it's replaced automatically by the real LazyPanel content, with zero manual "hide loading, show content" logic written anywhere.
 * Combined with conditional rendering (showPanel &&) from that earlier card — worth noting this demo naturally reuses that pattern to control when the Suspense boundary even exists in the tree, tying two Core Foundation cards together. 
 * One thing worth checking in your dev tools, if you're curious: in a real production build (npm run build), LazyPanel.jsx would genuinely appear as its own separate .js chunk file, only downloaded when this demo actually renders it — in dev mode with Vite, this is less visually obvious since Vite serves modules individually anyway, but the behavior (fallback while waiting, content once ready) is identical either way.
 */