import React, { Component } from "react";
import InputSwitcher from "../../containers/InputSwitcher/InputSwitcher";
import Form from "./Form/Form";
import SuccessMessage from "./../SuccessMessage/SuccessMessage";
import classes from "./Form/Form.module.css";

class Forms extends Component {
  render() {
    const formElementsArray = [];
    const formPartsArray = [];

    for (let key in this.props.formElements) {
      formElementsArray.push({
        id: key,
        config: this.props.formElements[key]
      });
    }

    for (let key in this.props.formParts) {
      formPartsArray.push({
        id: key,
        config: this.props.formParts[key]
      });
    }

    let form = (
      <form onSubmit={event => this.props.submit(event)}>
        {formPartsArray.map(formPart => {
          return (
            <Form title={formPart.config.title} key={formPart.id}>
              {formElementsArray.map(formElement => {
                if (formElement.config.form === formPart.config.title) {
                  return (
                    <InputSwitcher
                      key={formElement.id}
                      id={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      valid={formElement.config.valid}
                      shouldValidate={formElement.config.validation}
                      touched={formElement.config.touched}
                      changed={event =>
                        this.props.changed(event, formElement.id)
                      }
                      label={formElement.config.label}
                      currentUser={this.props.currentUser}
                      payment={this.props.formElements.payment}
                    />
                  );
                } else return false;
              })}
            </Form>
          );
        })}
        <div className={classes.Button}>
          <button disabled={!this.props.btnState}>PUBLISH EVENT</button>
        </div>
      </form>
    );
    if (this.props.posted) {
      form = <SuccessMessage />;
    }
    return form;
  }
}

export default Forms;
