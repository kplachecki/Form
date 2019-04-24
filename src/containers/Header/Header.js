import React from "react";
import classes from "./Header.module.css";

const header = props => (
  <header className={classes.Header}>
    <div className={classes.Strap} />
    <div className={classes.Content}>New event</div>
  </header>
);
export default header;
