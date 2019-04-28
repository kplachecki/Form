import React, { Component } from "react";
import classes from "./Forms.module.css";
import InputSwitcher from "../../containers/InputSwitcher/InputSwitcher";
import Form from "./Form/Form";

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
      <React.Fragment>
        {formPartsArray.map(formPart => {
          return (
            <Form title={formPart.config.title} key={formPart.id}>
              {formElementsArray.map(formElement => {
                if (formElement.config.form === formPart.config.title) {
                  return (
                    <InputSwitcher
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      invalid={!formElement.config.valid}
                      shouldValidate={formElement.config.validation}
                      touched={formElement.config.touched}
                      changed={event =>
                        this.inputChangedHandler(event, formElement.id)
                      }
                      label={formElement.config.label}
                      currentUser={this.props.currentUser}
                    />
                  );
                } else return false;
              })}
            </Form>
          );
        })}
      </React.Fragment>
    );
    return form;
  }
}

export default Forms;
