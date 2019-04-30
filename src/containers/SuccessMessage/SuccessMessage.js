import React from "react";
import classes from "./SuccessMessage.module.css";

const successMessage = props => (
  <div className={classes.Body}>
    <div className={classes.Container}>
      <p className={classes.Text}>Success</p>
      <p className={classes.Message}>Event has been created.</p>
    </div>
  </div>
);

export default successMessage;
