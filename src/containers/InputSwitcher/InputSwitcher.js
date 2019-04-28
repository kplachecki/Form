import React from "react";
import classes from "./InputSwitcher.module.css";
import Select from "../../components/UI/Select/Select";
import Input from "../../components/UI/Input/Input";
import MixedInput from "../../components/UI/MixedInput/MixedInput";

const inputSwitcher = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  // if (props.invalid && props.shouldValidate && props.touched) {
  //   inputClasses.push(classes.Invalid);
  // }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <Input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
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
        />
        // <React.Fragment>
        //   <input
        //     className={inputClasses.join(" ")}
        //     {...props.elementConfig.date}
        //     value={props.value.date}
        //     onChange={props.changed}
        //   />
        //   <input
        //     className={inputClasses.join(" ")}
        //     {...props.elementConfig.time}
        //     value={props.value}
        //     onChange={props.changed}
        //   />
        //   <input
        //     className={inputClasses.join(" ")}
        //     {...props.elementConfig.radio}
        //     value={props.value}
        //     onChange={props.changed}
        //   />
        // </React.Fragment>
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

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default inputSwitcher;
