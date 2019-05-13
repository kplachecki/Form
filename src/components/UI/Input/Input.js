import React from "react";

const input = props => {
  let fieldDescription = null;
  if (props.fieldDescription) {
    fieldDescription = <span>{props.fieldDescription}</span>;
  }
  let input = (
    <React.Fragment>
      <input
        {...props.elementConfig}
        className={props.className}
        onChange={props.onChange}
        value={props.value}
      />
      {fieldDescription}
    </React.Fragment>
  );

  if (props.elementConfig.placeholder === "Fee" && !props.required) {
    input = null;
  }
  return input;
};

export default input;
