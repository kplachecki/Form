import React from "react";
import classes from "./InputSwitcher.module.css";
import Select from "../../components/UI/Select/Select";
import Input from "../../components/UI/Input/Input";
import MixedInput from "../../components/UI/MixedInput/MixedInput";

const inputSwitcher = props => {
  let inputElement = null;
  let errorMessage = null;
  const inputClasses = [classes.InputElement];

  switch (props.elementType) {
    case "input":
      if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        errorMessage = <span>ERROR</span>;
      }

      inputElement = (
        <Input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          payment={props.payment}
        />
      );
      break;
    case "textarea":
      if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
      }
      inputClasses.push(classes.FullWidth);
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
      if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
      }
      inputElement = (
        <Select
          {...props.elementConfig}
          value={props.value}
          changed={props.changed}
          currentUser={props.currentUser}
          inputLabel={props.label}
        />
      );
      break;
    case "inputDateTime":
      inputElement = (
        <MixedInput
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          valid={props.valid}
          shouldValidate={props.shouldValidate}
          touched={props.touched}
        />
      );
      break;
    default:
      inputElement = (
        <Input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  let comment = null;

  if (props.id === "reward") {
    comment = <span>reward points for attendance</span>;
  }

  if (props.id === "duration") {
    comment = <span>hour</span>;
  }

  if (props.id === "description") {
    comment = (
      <div className={classes.Comment}>
        <span>Max length {props.elementConfig.maxLength} characters</span>
        <span>
          {props.value.length}/{props.elementConfig.maxLength}
        </span>
      </div>
    );
  }
  if (props.id === "category") {
    comment = (
      <div className={classes.Comment}>
        <span>
          Describes topic and people who should be intrested in this event
        </span>
      </div>
    );
  }

  return (
    <div className={classes.Input}>
      <div className={classes.Columns}>
        <label className={classes.Label}>{props.label}</label>
        <div className={classes.MainInputs}>
          {inputElement}
          {comment}
        </div>
        {errorMessage}
      </div>
    </div>
  );
};

export default inputSwitcher;
