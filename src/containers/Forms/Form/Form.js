import React from "react";
import classes from "./Form.module.css";

const form = props => {
  return (
    <div className={classes.Body}>
      <div className={classes.Container}>
        <p className={classes.Text}>{props.title}</p>
        <div className={classes.Form}>{props.children}</div>
      </div>
    </div>
  );
};
export default form;
