// src/data/ — a folder for static, app-internal content that doesn't change at runtime and isn't tied to a specific UI component.

/*
 Typical contents:
 - Dropdown/select option lists e.g. maintenanceTypes.js, reminderTypes.js, partCategories.js
 - Fixed reference/lookup tables e.g. pantherLineup.js (Model + Trim -> Engine)
 - Seed or mock data used before a real backend/API exists
 - Static config-like content that isn't really "logic" e.g. navLinks.js, categoryList.js, siteMetadata.js

 Usually plain .js files exporting arrays or objects, e.g.:
   export const maintenanceTypes = [
     { value: "oil-change", label: "Oil Change" },
     { value: "other", label: "Other" },
   ];

 Not an official React/Vite convention — it's not in the default
 scaffold — but it's a very common pattern once an app has enough
 static content to warrant pulling it out of components.

 Rule of thumb (how you've been using it):
 - src/data/  = static values (content, "what")
 - src/lib/   = functions/logic (behavior, "how")
 - src/components/ = UI (presentation, "look")
 */

// ============================================
// src/data/  — example: maintenanceTypes.js
// ============================================
export const maintenanceTypes = [
  { value: "oil-change", label: "Oil Change" },
  { value: "tire-rotation", label: "Tire Rotation" },
  { value: "brake-service", label: "Brake Service" },
  { value: "other", label: "Other" },
];
// Just static content. No functions, no logic — just values a component can import and render (e.g. into a <Select>).

// import inside a component:
import { maintenanceTypes } from "@/data/maintenanceTypes";