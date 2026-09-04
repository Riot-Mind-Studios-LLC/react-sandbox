const LazyPanel = () => {
  return (
    <div className="p-3 rounded-md border border-amber-400 bg-amber-100 text-black">
      <p className="text-sm font-medium">I loaded! This code was in a separate chunk.</p>
    </div>
  );
};

export default LazyPanel;