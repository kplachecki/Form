import React from "react";

const radio = props => {
  return (
    <label>
      <input {...props.elementConfig} onChange={props.onChange} />
      {props.elementConfig.value}
    </label>
  );
};
export default radio;
