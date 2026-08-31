// src/lib/ — a folder for shared, reusable logic that isn't a UI component.

/*
 Typical contents:
 - Utility/helper functions (formatters, validators, calculations) e.g. formatCurrency(), formatDate(), truncateText()
 - Small standalone modules that multiple components need to import
 - API client setup or fetch wrapper functions
 - Constants or config values shared across the app
 - Third-party library setup/config (e.g. a configured axios instance, a shadcn/ui "cn()" classnames helper, a Supabase/Firebase client init)

 Rule of thumb (matches how you've been building your own apps):
 - if a piece of logic isn't JSX and starts showing up in 2+ places, pull it out of the component and into src/lib/ instead of duplicating it.

 Example from your Panther Tracker:
 - src/lib/formatters.js   -> formatFileSize()
 - src/lib/reminderStatus.js -> getReminderDetail()
 - both got extracted here because more than one component needed them.

 Difference from src/data/:
 - src/lib/  = functions/logic (behavior)
 - src/data/ = static values (content) — e.g. dropdown option lists, a fixed catalog of maintenance types, etc.
*/

// ============================================
// src/lib/  — example: formatters.js
// ============================================
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
// A reusable function. Takes an input, returns an output. No JSX, no UI — pure logic any component can call.

// import inside a component:
import { formatFileSize } from "@/lib/formatters";
