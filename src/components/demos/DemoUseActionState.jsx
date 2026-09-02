import { useActionState } from "react";

const takenUsernames = ["admin", "adrian", "test"];

async function checkUsername(previousState, formData) {
  const username = formData.get("username");

  // simulate a network delay, so isPending is actually visible
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const isTaken = takenUsernames.includes(username.toLowerCase());

  return {
    message: isTaken
      ? `"${username}" is already taken.`
      : `"${username}" is available!`,
    attempts: previousState.attempts + 1,   // builds on the PREVIOUS state, every submission
  };
}

const DemoUseActionState = () => {
  const [state, formAction, isPending] = useActionState(checkUsername, {
    message: "",
    attempts: 0,
  });

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-3">
      <form action={formAction} className="flex gap-2">
        <input
          name="username"
          placeholder="Try: admin"
          className="px-3 py-1.5 rounded-md border border-amber-300 text-sm"
        />
        <button
          disabled={isPending}
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {isPending ? "Checking..." : "Check"}
        </button>
      </form>

      {state.message && <p className="text-sm font-medium">{state.message}</p>}
      <p className="text-xs text-gray-500">Attempts: {state.attempts}</p>
    </div>
  );
};

export default DemoUseActionState;

/*
What proves the concept here:

- No onChange, no controlled input state — the input just has a name attribute; formData.get("username") is how the value gets read, only at submit time.
- The artificial 1-second delay makes isPending genuinely visible — the button text switches to "Checking..." and disables itself automatically, with zero manual setIsPending calls anywhere in this file.
- attempts: previousState.attempts + 1 is the part that proves this isn't just useState in disguise — each submission's action function receives whatever the last submission returned, and builds on it. Try submitting a few different usernames in a row and watch the attempt counter climb, carried forward automatically between separate submissions.
*/