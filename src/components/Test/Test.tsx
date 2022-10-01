import React, { useState } from "react";

const Test = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count</button>
      <p>You've pressed the button times {count}</p>
    </div>
  );
};

export default Test;
