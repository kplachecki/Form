import React, { Component } from "react";
import Header from "./containers/Header/Header";
import Forms from "./containers/Forms/Forms";

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
        elementType: "input",
        elementConfig: {
          type: "textarea",
          placeholder: "Write about your event, be creative",
          maxLength: 140
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
          options: [],
          placeholder: "Select category"
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
          type: "radio"
        },
        value: "",
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
          options: []
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
            placeholder: "dd/mm/yy"
          },
          time: {
            type: "time",
            placeholder: "--:--"
          },
          radio: {
            type: "radio"
          }
        },
        value: { date: "", time: "", radio: "" },
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
    formIsValid: false
  };
  render() {
    return (
      <React.Fragment>
        <Header /> <Forms {...this.state} />
      </React.Fragment>
    );
  }
}

export default App;
