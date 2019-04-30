import React from "react";
import classes from "./InputSwitcher.module.css";
import Select from "../../components/UI/Select/Select";
import Input from "../../components/UI/Input/Input";
import MixedInput from "../../components/UI/MixedInput/MixedInput";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const inputSwitcher = props => {
  let inputElement = null;
  let errorMessage = null;
  const inputClasses = [classes.InputElement];

  switch (props.elementType) {
    case "input":
      if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        errorMessage = (
          <ErrorMessage>
            <span>{props.label} can't be empty</span>
          </ErrorMessage>
        );
      }
      if (props.elementConfig.type === "email") {
        if (!props.valid && props.shouldValidate && props.touched) {
          inputClasses.push(classes.Invalid);
          errorMessage = (
            <ErrorMessage>
              <span>Check email format</span>
            </ErrorMessage>
          );
        }
      }
      if (props.label === "payment") {
        if (
          !props.payment.valid.fee &&
          props.payment.validation.fee &&
          props.payment.touched.fee
        ) {
          errorMessage = (
            <ErrorMessage>
              <span>Fee can't be empty</span>
            </ErrorMessage>
          );
        }
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
        errorMessage = (
          <ErrorMessage height="37px">
            <span>{props.label} can't be empty</span>
          </ErrorMessage>
        );
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
        errorMessage = (
          <ErrorMessage>
            <span>{props.label} can't be empty</span>
          </ErrorMessage>
        );
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
      if (
        !props.valid.date &&
        props.shouldValidate.date &&
        props.touched.date
      ) {
        errorMessage = (
          <ErrorMessage height="37px">
            <span>{props.elementConfig.date.type} should be future date</span>
          </ErrorMessage>
        );
      }
      if (
        !props.valid.time &&
        props.shouldValidate.time &&
        props.touched.time
      ) {
        errorMessage = (
          <ErrorMessage height="37px">
            <span>{props.elementConfig.time.type} should be 12h format</span>
          </ErrorMessage>
        );
      }
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
  let newLabel = null;
  if (
    props.label === "title" ||
    props.label === "description" ||
    props.label === "responsible" ||
    props.label === "starts on"
  ) {
    newLabel = (
      <label className={classes.Label}>
        {props.label}
        <span>*</span>
      </label>
    );
  } else {
    newLabel = <label className={classes.Label}>{props.label}</label>;
  }

  if (props.label)
    return (
      <div className={classes.Input}>
        <div className={classes.Columns}>
          {newLabel}
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
