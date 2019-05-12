import React from "react";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import classes from "./Labels.module.css";

const labels = props => {
  let elements = props.children.filter(element => {
    if (typeof element === "object") {
      return element;
    } else return false;
  });

  let elementRequired = elements.map(element => {
    if (element.props.shouldValidate.required === true) {
      return true;
    } else return false;
  });

  let elementValid = elements.map(element => {
    if (
      !element.props.valid &&
      element.props.touched &&
      (element.props.shouldValidate.required ||
        element.props.shouldValidate.isEmail)
    ) {
      return true;
    } else return false;
  });

  let requiredMark = null;
  if (elementRequired.includes(true)) {
    requiredMark = <span>*</span>;
  }

  let errorMessage = null;
  if (elementValid.includes(true)) {
    errorMessage = <ErrorMessage>{props.children}</ErrorMessage>;
  }

  return (
    <div className={classes.Columns}>
      <label className={classes.Label}>
        {props.title}
        {requiredMark}
      </label>
      <div className={classes.MainInputs}>{props.children}</div>
      {errorMessage}
    </div>
  );
};
export default labels;
