import React from "react";
import classes from "./ErrorMessage.module.css";

const errorMessage = props => (
  <div className={classes.Error}>
    <div className={classes.Prompt}>
      <div className={classes.Arrow} />
      <div className={classes.Rectangle} style={{ height: props.height }}>
        {props.children}
      </div>
    </div>
  </div>
);
export default errorMessage;
