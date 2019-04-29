import React from "react";
import classes from "./InputSwitcher.module.css";
import Select from "../../components/UI/Select/Select";
import Input from "../../components/UI/Input/Input";
import MixedInput from "../../components/UI/MixedInput/MixedInput";

const inputSwitcher = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  switch (props.elementType) {
    case "input":
      if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
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
  let bigComment = null;

  if (props.id === "reward") {
    bigComment = <span>reward points for attendance</span>;
  }

  if (props.id === "duration") {
    bigComment = <span>hour</span>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {bigComment}
    </div>
  );
};

export default inputSwitcher;
