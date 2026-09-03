const Level3 = ({ user }) => (
  <div className="p-3 rounded-md border border-amber-400 bg-amber-100">
    <p className="text-xs font-semibold mb-1">Level 3 — UserProfile</p>
    <p className="text-sm font-medium">Actually uses it: {user.name} ({user.role})</p>
  </div>
);

const Level2 = ({ user }) => (
  <div className="p-3 rounded-md border border-amber-300 bg-amber-50">
    <p className="text-xs font-semibold mb-2">Level 2 — Sidebar (doesn't use "user", just passes it)</p>
    <Level3 user={user} />
  </div>
);

const Level1 = ({ user }) => (
  <div className="p-3 rounded-md border border-amber-200 bg-white">
    <p className="text-xs font-semibold mb-2">Level 1 — PageLayout (doesn't use "user", just passes it)</p>
    <Level2 user={user} />
  </div>
);

const DemoPropDrilling = () => {
  const user = { name: "Adrian", role: "Developer" };

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white">
      <p className="text-xs font-semibold mb-2">App (owns "user")</p>
      <Level1 user={user} />
    </div>
  );
};

export default DemoPropDrilling;
/*
What this demo shows: four nested boxes, each visually representing one 
omponent layer — the labels make it explicit which layers are just relaying
user versus the one layer that actually reads it. Nothing to click, no
interactivity needed — the visual nesting itself is the demonstration,
letting you see the drilling structure at a glance rather than reading it as code.
*/