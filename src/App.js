import React, { Component } from "react";
import Header from "./containers/Header/Header";
import Forms from "./containers/Forms/Forms";
import categories from "./mocks/categories.json";
import employes from "./mocks/employes.json";

class App extends Component {
  state = {
    formElements: {
      title: {
        form: "About",
        label: "title",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Make it short and clear"
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
      description: {
        form: "About",
        label: "description",
        elementType: "textarea",
        elementConfig: {
          placeholder: "Write about your event, be creative",
          maxLength: 140,
          rows: 5
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
      category: {
        form: "About",
        label: "category",
        elementType: "select",
        elementConfig: {
          options: (categories.unshift({
            id: "default",
            name: "Select Category"
          }),
          categories)
        },
        value: "",
        validation: {},
        valid: true
      },
      payment: {
        form: "About",
        label: "payment",
        elementType: "input",
        elementConfig: {
          type: "radio",
          options: [
            {
              type: "radio",
              name: "payment",
              defaultChecked: true,
              value: "Free Event"
            },
            {
              type: "radio",
              name: "payment",
              value: "Paid Event"
            },
            {
              type: "number",
              name: "fee"
            }
          ]
        },
        value: "",
        feeValue: "",
        validation: {},
        valid: true
      },
      reward: {
        form: "About",
        label: "reward",
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Number"
        },
        value: "",
        validation: {},
        valid: true,
        touched: false
      },
      responsible: {
        form: "Coordinator",
        label: "responsible",
        elementType: "select",
        elementConfig: {
          options: employes,
          groups: [{ label: "Me" }, { label: "Others" }]
        },
        value: "",
        validation: { required: true },
        valid: true
      },
      email: {
        form: "Coordinator",
        label: "email",
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: false,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      startsOn: {
        form: "When",
        label: "starts on",
        elementType: "inputDateTime",
        elementConfig: {
          date: {
            type: "date",
            placeholder: "dd/mm/yy",
            name: "date"
          },
          time: {
            type: "time",
            placeholder: "--:--",
            name: "time"
          },
          radio: [
            {
              type: "radio",
              name: "radio",
              value: "AM",
              defaultChecked: true
            },
            { type: "radio", name: "radio", value: "PM" }
          ]
        },
        value: { date: "", time: "", radio: "AM" },
        validation: {
          date: { required: true },
          time: { required: true },
          radio: {}
        },
        valid: { date: false, time: false, radio: true },
        touched: false
      },

      duration: {
        form: "When",
        label: "duration",
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Number"
        },
        value: "",
        validation: {},
        valid: true,
        touched: false
      }
    },
    formParts: {
      about: {
        title: "About"
      },
      coordinator: {
        title: "Coordinator"
      },
      when: {
        title: "When"
      }
    },
    currentUser: "walter.nelson@hussa.rs",
    formIsValid: false
  };

  inputChangeHandler = (event, inputElement) => {
    const updatedForm = { ...this.state.formElements };
    const updatedFormElement = { ...updatedForm[inputElement] };

    if (inputElement === "startsOn") {
      updatedFormElement.value[event.target.name] = event.target.value;
      updatedForm[inputElement] = updatedFormElement;
      this.setState({ formElements: updatedForm });
    } else if (event.target.name === "fee") {
      updatedFormElement.feeValue = event.target.value;
      updatedForm[inputElement] = updatedFormElement;
      this.setState({ formElements: updatedForm });
    } else {
      updatedFormElement.value = event.target.value;
      updatedForm[inputElement] = updatedFormElement;
      this.setState({ formElements: updatedForm });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header /> <Forms {...this.state} changed={this.inputChangeHandler} />
      </React.Fragment>
    );
  }
}

export default App;
