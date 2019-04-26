import React from "react";
import classes from "./Input.module.css";

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea" && "input":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case "inputDateTime":
      console.log({ ...props.elementConfig });
      inputElement = (
        <React.Fragment>
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig.date}
            value={props.value.date}
            onChange={props.changed}
          />
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig.time}
            value={props.value}
            onChange={props.changed}
          />
          <input
            className={inputClasses.join(" ")}
            {...props.elementConfig.radio}
            value={props.value}
            onChange={props.changed}
          />
        </React.Fragment>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
