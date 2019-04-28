import React from "react";

const mixedInput = props => {
  return (
    <React.Fragment>
      <input
        {...props.date}
        value={props.value.date}
        onChange={props.onChange}
      />
      <span>at</span>
      <input
        {...props.time}
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
