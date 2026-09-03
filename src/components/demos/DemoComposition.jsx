// a reusable wrapper — has NO idea what will be rendered inside it
const Card = ({ title, children }) => (
  <div className="p-3 rounded-md border border-amber-300 bg-white">
    <h4 className="text-xs font-semibold text-gray-500 mb-2">{title}</h4>
    {children}
  </div>
);

// a config-prop version — Card would need a NEW prop for every new kind of content
const RigidCard = ({ title, bodyText }) => (
  <div className="p-3 rounded-md border border-amber-300 bg-white">
    <h4 className="text-xs font-semibold text-gray-500 mb-2">{title}</h4>
    <p className="text-sm">{bodyText}</p>
  </div>
);

const DemoComposition = () => {
  return (
    <div className="flex flex-col gap-3">
      <Card title="Composition — plain text as children">
        <p className="text-sm">Just a paragraph, passed in directly.</p>
      </Card>

      <Card title="Composition — a button as children">
        <button className="px-3 py-1.5 rounded-md bg-amber-300 text-xs font-medium border border-amber-400 hover:bg-amber-400 transition-colors">
          I'm a button, not text
        </button>
      </Card>

      <Card title="Composition — multiple elements as children">
        <p className="text-sm mb-2">A paragraph, followed by a list:</p>
        <ul className="text-sm list-disc list-inside">
          <li>Item one</li>
          <li>Item two</li>
        </ul>
      </Card>

      <RigidCard title="Config-prop version" bodyText="This one ONLY knows how to render plain text — a button or list would need Card's own code to change." />
    </div>
  );
};

export default DemoComposition;

/** What proves the concept here:
 * The same Card component renders three completely different kinds of content — a plain paragraph, a button, and a paragraph-plus-list — without a single line of Card's own code changing between them. It never had if content is a button logic anywhere; it just rendered whatever children turned out to be.
 * RigidCard is deliberately limited by comparison — it only knows how to display a bodyText string. If you wanted it to show a button instead, you'd have to go back and add a new prop (bodyButton? renderBody?) and new logic inside RigidCard itself — the composition version never needs that kind of change, no matter what gets put inside it.
 */