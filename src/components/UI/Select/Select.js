import React from "react";
import classes from "./../../../containers/InputSwitcher/InputSwitcher.module.css";

const select = props => {
  let fieldComment = null;
  if (props.fieldComment) {
    fieldComment = (
      <div className={classes.Comment}>
        <span>{props.fieldComment}</span>
      </div>
    );
  }
  if (props.groups) {
    props.options.map(option => {
      if (option.email === props.currentUser) {
        return (option.label = "Me");
      } else return (option.label = "Others");
    });

    return (
      <React.Fragment>
        <select
          value={props.value}
          onBlur={props.onChange}
          className={props.className}
        >
          {props.groups.map(group => {
            return (
              <optgroup label={group.label} key={group.label}>
                {props.options.map(option => {
                  if (group.label === option.label) {
                    return (
                      <option
                        value={option.name + " " + option.lastname}
                        key={option.id}
                      >
                        {option.name + " " + option.lastname}
                      </option>
                    );
                  } else return false;
                })}
              </optgroup>
            );
          })}
        </select>
        {fieldComment}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <select
          value={props.value}
          onChange={props.onChange}
          className={props.className}
        >
          {props.options.map(option => {
            if (option.id === "default") {
              return (
                <option key={option.id} value="">
                  {option.name}
                </option>
              );
            } else {
              return (
                <option value={option.value} key={option.id}>
                  {option.name}
                </option>
              );
            }
          })}
        </select>
        {fieldComment}
      </React.Fragment>
    );
  }
};

export default select;
