import React from "react";
import classes from "./InputSwitcher.module.css";
import Select from "../../components/UI/Select/Select";
import Input from "../../components/UI/Input/Input";
import TextArea from "../../components/UI/TextArea/TextArea";
import Radio from "../../components/UI/Radio/Radio";

const inputSwitcher = props => {
  let inputElement = null;
  const inputClasses = [];

  switch (props.elementType) {
    case "input":
      if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
      }

      if (
        props.elementConfig.type === "text" ||
        props.elementConfig.type === "email"
      ) {
        inputClasses.push(classes.Input);
      } else if (props.elementConfig.type === "number") {
        inputClasses.push(classes.InputNumber);
      }

      inputElement = (
        <React.Fragment>
          <Input
            className={inputClasses.join(" ")}
            elementConfig={{ ...props.elementConfig }}
            onChange={props.changed}
            payment={props.payment}
            fieldDescription={props.fieldDescription}
            fieldComment={props.fieldComment}
            required={props.shouldValidate.required}
          />
        </React.Fragment>
      );
      break;
    case "radio":
      inputClasses.push(classes.Input);
      inputElement = (
        <Radio
          className={inputClasses.join(" ")}
          elementConfig={{ ...props.elementConfig }}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
      }
      inputClasses.push(classes.Input);
      inputElement = (
        <TextArea
          className={inputClasses.join(" ")}
          elementConfig={{ ...props.elementConfig }}
          onChange={props.changed}
          value={props.value}
        />
      );
      break;

    case "select":
      if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
      }
      inputClasses.push(classes.Input);
      inputElement = (
        <Select
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
          currentUser={props.currentUser}
          fieldComment={props.fieldComment}
        />
      );
      break;
    default:
      inputElement = (
        <Input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
  }

  return inputElement;
};

export default inputSwitcher;
