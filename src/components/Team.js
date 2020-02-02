import React from "react";
import Counter from "./Counter";

const Team = props => {
  const { name, result, faults, onResultUpdate, onFaultsUpdate } = props;
  return (
    <div>
      <h1>{name}</h1>
      <Counter value={result} onValueUpdate={onResultUpdate} />
      <Counter small value={faults} onValueUpdate={onFaultsUpdate} />
    </div>
  );
};

export default Team;
