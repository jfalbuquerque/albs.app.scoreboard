import React from "react";
import { AddCircle, RemoveCircle } from "@material-ui/icons";

const Counter = props => {
  const { value, onValueUpdate, small } = props;
  return (
    <div className={`counter flex ${small && "small"}`}>
      <div>
        <h1>{value < 10 ? `0${value}` : value}</h1>
      </div>
      {onValueUpdate && (
        <div className='flex column buttons'>
          <AddCircle onClick={() => onValueUpdate(true)} />
          <RemoveCircle onClick={() => onValueUpdate(false)} />
        </div>
      )}
    </div>
  );
};

export default Counter;
