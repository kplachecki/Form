import React from "react";
import classes from "./../MixedInput/MixedInput.module.css";

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
          console.log(
            !props.payment.feeValid,
            props.payment.feeValidation.required,
            props.payment.feeTouched
          );
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
    return <input {...props} />;
  }
};

export default input;
