import React from "react";
import classes from "./ErrorMessage.module.css";

const errorMessage = props => {
  let elements = props.children.filter(element => {
    if (typeof element === "object") {
      return element;
    } else return false;
  });
  let message = <span>Field can't be empty</span>;
  elements.map(element => {
    if (element.key === "email") {
      return (message = <span>Provide proper email format</span>);
    } else if (element.key === "time") {
      return (message = (
        <span>Time should be 12h format and date should be future date</span>
      ));
    } else return false;
  });

  return (
    <div className={classes.Error}>
      <div className={classes.Prompt}>
        <div className={classes.Arrow} />
        <div className={classes.Rectangle}>{message}</div>
      </div>
    </div>
  );
};
export default errorMessage;
