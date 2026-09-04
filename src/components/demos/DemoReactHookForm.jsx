import { useForm } from "react-hook-form";

const DemoReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.count("DemoReactHookForm render"); // watch the console while typing

  const onSubmit = (data) => {
    alert(`Submitted: ${data.email}`);
  };

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white flex flex-col gap-3">
      <p className="text-xs text-gray-500">
        Open your browser console, type in the field below, and watch — the render count
        should NOT climb on every keystroke, unlike a controlled input would.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
          placeholder="Email"
          className="px-3 py-1.5 rounded-md border border-amber-300 text-sm text-black"
        />
        {errors.email && (
          <p className="text-xs text-red-600">{errors.email.message}</p>
        )}

        <button
          type="submit"
          className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors w-fit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DemoReactHookForm;
/** What proves the concept here:
 * Type into the email field and watch "Render count" — it stays frozen. Compare this mentally to your DemoControlledUncontrolled card, where the controlled input's live-uppercase transform required a re-render on every single keystroke — this form genuinely doesn't re-render as you type.
 * Submit with an empty field — you'll see "Email is required" appear, and the component does re-render at that point (validation failed, error state needs to display) — watch the render count tick up exactly once, not once per keystroke.
 * Submit with an invalid email (like "test") — the pattern validation kicks in, showing "Enter a valid email" instead.
 * Submit with a valid email — onSubmit fires, showing an alert with the captured value — proving the value was tracked correctly the entire time, despite never living in useState.
 */