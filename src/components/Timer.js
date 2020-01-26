import React from "react";

const Timer = props => {
  const time = props.time || "00:00";

  return <React.Fragment>{time}</React.Fragment>;
};

export default Timer;
