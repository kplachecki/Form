import React from "react";

const select = props => {
  if (props.groups) {
    props.options.map(option => {
      if (option.email === props.currentUser) {
        return (option.label = "Me");
      } else return (option.label = "Others");
    });

    return (
      <select value={props.value} onChange={props.changed}>
        {props.groups.map(group => {
          return (
            <optgroup label={group.label} key={group.label}>
              {props.options.map(option => {
                if (group.label === option.label) {
                  return (
                    <option value={option.name} key={option.id}>
                      {option.name + " " + option.lastname}
                    </option>
                  );
                } else return false;
              })}
            </optgroup>
          );
        })}
      </select>
    );
  } else {
    return (
      <select value={props.value} onChange={props.changed}>
        {props.options.map(option => {
          if (option.id === "default") {
            return (
              <option key={option.id} hidden value="">
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
    );
  }
};

export default select;
