import React from "react";

import { Grid, Button } from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  timer: {
    fontSize: "4rem"
  }
});

const Timer = props => {
  const { classes, onStart, started, onPause } = props;
  const { minutes, seconds } = props.time;
  const display = `${minutes < 10 ? "0" + minutes.toString() : minutes.toString()}:${
    seconds < 10 ? "0" + seconds.toString() : seconds.toString()
  }`;

  const click = () => {
    if (started) {
      onPause();
    } else {
      onStart();
    }
  };

  return (
    <div>
      <Grid container alignItems='center'>
        <Grid>
          <Grid container direction='column'>
            <AddCircle />
            <RemoveCircle />
          </Grid>
        </Grid>
        <Grid className={classes.timer}>{display}</Grid>
        <Grid>
          <Grid container direction='column'>
            <AddCircle />
            <RemoveCircle />
          </Grid>
        </Grid>
      </Grid>

      <Button variant='contained' fullWidth={true} onClick={click}>
        {!started ? "START" : "PAUSE"}
      </Button>
    </div>
  );
};

export default withStyles(styles)(Timer);
