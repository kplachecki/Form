import React from "react";
import classes from "./../../../containers/InputSwitcher/InputSwitcher.module.css";

const textArea = props => {
  let fieldComment = null;

  fieldComment = (
    <div className={classes.Comment}>
      <span>Max length {props.elementConfig.maxLength} characters</span>
      <span>
        {props.value.length}/{props.elementConfig.maxLength}
      </span>
    </div>
  );

  return (
    <React.Fragment>
      <textarea
        className={props.className}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange}
      />
      {fieldComment}
    </React.Fragment>
  );
};

export default textArea;
