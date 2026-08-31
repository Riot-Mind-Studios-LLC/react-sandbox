import { useState, useEffect } from "react";

const DemoUseEffect = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="p-4 rounded-md border border-amber-300 bg-white">
      <p className="text-sm font-medium">
        Current Time: <span className="font-mono">{time.toLocaleTimeString()}</span>
      </p>
    </div>
  );
};

export default DemoUseEffect;