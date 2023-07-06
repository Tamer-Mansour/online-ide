import React from "react";

const ConsolePanel = ({ result, error }) => {
  return (
    <div>
      <h1>Console Panel</h1>
      <p>Result: {result}</p>
      <input type="text" />
      <button onClick={() => error("This is an error message")}>Error</button>
    </div>
  );
};

export default ConsolePanel;
