import React from "react";

const input = props => {
  if (props.type === "radio") {
    return props.options.map(option => {
      if (option.type === "radio") {
        return (
          <label key={option.value}>
            <input {...option} onChange={props.onChange} />
            {option.value}
          </label>
        );
      } else {
        if (props.payment === "Paid Event") {
          return (
            <input key={option.name} {...option} onChange={props.onChange} />
          );
        } else return null;
      }
    });
  } else {
    return <input {...props} />;
  }
};

export default input;
