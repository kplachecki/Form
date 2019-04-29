import React from "react";
import classes from "./MixedInput.module.css";

const mixedInput = props => {
  const dateClasses = [];
  const timeClasses = [];

  if (!props.valid.date && props.shouldValidate.date && props.touched.date) {
    dateClasses.push(classes.Invalid);
  }
  if (!props.valid.time && props.shouldValidate.time && props.touched.time) {
    timeClasses.push(classes.Invalid);
  }
  return (
    <React.Fragment>
      <input
        {...props.date}
        className={dateClasses.join(" ")}
        value={props.value.date}
        onChange={props.onChange}
      />
      <span>at</span>
      <input
        {...props.time}
        className={timeClasses.join(" ")}
        value={props.value.time}
        onChange={props.onChange}
      />
      {props.radio.map(time => {
        return (
          <label key={time.value}>
            <input {...time} onChange={props.onChange} />
            {time.value}
          </label>
        );
      })}
    </React.Fragment>
  );
};

export default mixedInput;
