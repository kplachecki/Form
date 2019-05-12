import React, { Component } from "react";
import InputSwitcher from "../../containers/InputSwitcher/InputSwitcher";
import Form from "./Form/Form";
import Labels from "./Labels/Labels";
import SuccessMessage from "./../SuccessMessage/SuccessMessage";
import classes from "./Form/Form.module.css";

class Forms extends Component {
  render() {
    const formElementsArray = [];
    const formPartsArray = [];
    const formLabelsArray = [];

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

    for (let key in this.props.labels) {
      formLabelsArray.push({
        id: key,
        config: this.props.labels[key]
      });
    }

    let form = (
      <form onSubmit={event => this.props.submit(event)}>
        {formPartsArray.map(formPart => {
          return (
            <Form title={formPart.config.title} key={formPart.id}>
              {formLabelsArray.map(label => {
                if (label.config.belongsTo === formPart.config.title) {
                  return (
                    <Labels title={label.config.labelTitle} key={label.id}>
                      {formElementsArray.map(formElement => {
                        if (
                          formElement.config.label === label.config.labelTitle
                        ) {
                          return (
                            <InputSwitcher
                              key={formElement.id}
                              id={formElement.id}
                              elementType={formElement.config.elementType}
                              elementConfig={formElement.config.elementConfig}
                              fieldDescription={
                                formElement.config.fieldDescription
                              }
                              fieldComment={formElement.config.fieldComment}
                              value={formElement.config.value}
                              valid={formElement.config.valid}
                              shouldValidate={formElement.config.validation}
                              touched={formElement.config.touched}
                              changed={event =>
                                this.props.changed(event, formElement.id)
                              }
                              currentUser={this.props.currentUser}
                              payment={this.props.formElements.payment}
                            />
                          );
                        } else return null;
                      })}
                    </Labels>
                  );
                } else return null;
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
