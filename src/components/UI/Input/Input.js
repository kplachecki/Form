import React from "react";

const input = props => {
  if (props.type === "radio") {
    return props.options.map(option => {
      return (
        <label key={option.value}>
          <input
            name={option.name}
            value={option.value}
            type={option.type}
            onChange={props.changed}
          />
          {option.value}
        </label>
      );
    });
  } else {
    return <input {...props} />;
  }
};

export default input;
