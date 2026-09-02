import { useState, useOptimistic, useTransition } from "react";

const DemoUseOptimistic = () => {
  const [likes, setLikes] = useState(12);
  const [isPending, startTransition] = useTransition();

  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (currentLikes, change) => currentLikes + change
  );

  const handleLike = () => {
    startTransition(async () => {
      setOptimisticLikes(1);            // show +1 immediately, before the "server" responds

      await new Promise((resolve) => setTimeout(resolve, 1200)); // simulate network delay

      const didSucceed = Math.random() > 0.3;  // ~70% success, ~30% failure — to show the revert

      if (didSucceed) {
        setLikes((prev) => prev + 1);       // real update succeeds — optimistic value stays consistent
      }
      // if it fails, we do nothing — setLikes never runs, so optimisticLikes automatically
      // reverts back to matching the real "likes" value once the transition finishes
    });
  };

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-3">
      <p className="text-sm font-medium">Likes: {optimisticLikes}</p>
      <button
        onClick={handleLike}
        disabled={isPending}
        className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors disabled:opacity-50 w-fit"
      >
        {isPending ? "Liking..." : "Like"}
      </button>
      <p className="text-xs text-gray-500">~30% chance the "server" rejects — watch it revert</p>
    </div>
  );
};

export default DemoUseOptimistic;
/*
What proves the concept here:

- useTransition wraps the whole action — this is the correct, docs-recommended pairing with useOptimistic, since the optimistic update needs to happen inside an async transition for React to know when to revert.
- The moment you click "Like," the count jumps up instantly — before the simulated 1.2-second delay even starts, let alone finishes.
- ~70% of the time, the real setLikes call happens after the delay, and the optimistic count simply matches what's now real — no visible change, it just "settles."
- ~30% of the time, setLikes never runs — and you'll watch the count snap back down on its own the moment the transition completes, with zero manual "undo" code written anywhere in this file. That's useOptimistic's automatic revert, happening for real, right in front of you.
- Click it several times in a row and you should eventually see both outcomes — a clean settle, and a visible revert.
 */