import React from "react";
import { AppBar, Toolbar, Switch } from "@material-ui/core";

const Navbar = props => {
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        Presentation
        <Switch onChange={props.onChangeScreen} />
        Game screen
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
