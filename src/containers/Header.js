import React from "react";
import classes from "./Header.module.css";

const Header = props => (
  <header className={classes.header}>
    <div className={classes.strap} />
    <div className={classes.content}>New event</div>
  </header>
);
export default Header;
