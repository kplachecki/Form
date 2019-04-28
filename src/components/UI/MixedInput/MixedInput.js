import React from "react";

const mixedInput = props => {
  return (
    <React.Fragment>
      <input
        {...props.date}
        value={props.value.date}
        onChange={props.onChange}
      />
      <input {...props.time} value={props.value} onChange={props.onChange} />
      {props.radio.map(time => {
        return (
          <label key={time.value}>
            <input {...time} onChange={props.changed} />
            {time.value}
          </label>
        );
      })}
    </React.Fragment>
  );
};

export default mixedInput;
