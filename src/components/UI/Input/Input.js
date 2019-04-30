import React from "react";
import classes from "./../../../containers/InputSwitcher/InputSwitcher.module.css";

const input = props => {
  if (props.type === "radio") {
    return props.options.map(option => {
      if (option.type === "radio") {
        return (
          <label key={option.value}>
            <input {...option} onChange={props.onChange} />
            {option.value}
          </label>
        );
      } else {
        if (props.payment.value === "Paid Event") {
          const feeClasses = [];
          feeClasses.push(classes.NumberWidth);
          if (
            !props.payment.feeValid &&
            props.payment.feeValidation &&
            props.payment.feeTouched
          ) {
            feeClasses.push(classes.Invalid);
          }
          return (
            <React.Fragment key={option.name}>
              <input
                {...option}
                className={feeClasses.join(" ")}
                onChange={props.onChange}
              />
              <span>$</span>
            </React.Fragment>
          );
        } else return null;
      }
    });
  } else {
    let newClassname = props.className;
    if (props.type !== "number") {
      newClassname = props.className + " " + classes.FullWidth;
    } else if (props.type === "number") {
      newClassname = props.className + " " + classes.NumberWidth;
    }
    return <input {...props} className={newClassname} />;
  }
};

export default input;
