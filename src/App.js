import React, { Component } from "react";
import Header from "./containers/Header/Header";
import Forms from "./containers/Forms/Forms";
import categories from "./mocks/categories.json";
import employes from "./mocks/employes.json";

class App extends Component {
  state = {
    formElements: {
      title: {
        label: "title",
        elementType: "input",
        fieldDescription: null,
        fieldComment: null,
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
        label: "description",
        elementType: "textarea",
        fieldDescription: null,
        fieldComment: null,
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
        label: "category",
        elementType: "select",
        fieldDescription: null,
        fieldComment: null,
        elementConfig: {
          options: (categories.unshift({
            id: "default",
            name: "Select Category"
          }),
          categories)
        },
        value: "",
        valueID: null,
        validation: {},
        valid: true
      },
      paymentRadio1: {
        label: "payment",
        elementType: "radio",
        fieldDescription: "Free Event",
        fieldComment: null,
        elementConfig: {
          type: "radio",
          name: "payment",
          defaultChecked: true,
          value: "Free Event"
        },
        value: null,
        validation: {},
        valid: true,
        touched: true
      },
      paymentRadio2: {
        label: "payment",
        elementType: "radio",
        fieldDescription: "Paid Event",
        fieldComment: null,
        elementConfig: {
          type: "radio",
          name: "payment",
          value: "Paid Event"
        },
        value: null,
        validation: {},
        valid: true,
        touched: true
      },
      paymentInput: {
        label: "payment",
        elementType: "input",
        fieldDescription: null,
        fieldComment: null,
        elementConfig: {
          type: "number",
          name: "fee",
          placeholder: "Fee"
        },
        value: "",
        validation: { required: false },
        valid: false,
        touched: false
      },
      reward: {
        label: "reward",
        elementType: "input",
        fieldDescription: "reward points for attendance",
        fieldComment: null,
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
        label: "responsible",
        elementType: "select",
        fieldDescription: null,
        fieldComment:
          "Describes topic and people who should be intrested in this event",
        elementConfig: {
          options: employes,
          groups: [{ label: "Me" }, { label: "Others" }]
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false
      },
      email: {
        label: "email",
        elementType: "input",
        fieldDescription: null,
        fieldComment: null,
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: false,
          isEmail: true
        },
        valid: true,
        touched: false
      },
      date: {
        label: "starts on",
        elementType: "input",
        fieldDescription: "at",
        fieldComment: null,
        elementConfig: {
          type: "date",
          placeholder: "dd/mm/yy",
          name: "date"
        },
        value: "",
        validation: { required: true, isDate: true },

        valid: false,
        touched: false
      },
      time: {
        label: "starts on",
        elementType: "input",
        fieldDescription: null,
        fieldComment: null,
        elementConfig: {
          type: "time",
          min: "00:00",
          max: "12:00",
          placeholder: "--:--",
          name: "time"
        },
        value: "",
        validation: {
          required: true,
          isTime: true
        },
        valid: false,
        touched: false
      },
      timeRadio1: {
        label: "starts on",
        elementType: "radio",
        fieldDescription: "AM",
        fieldComment: null,
        elementConfig: {
          type: "radio",
          name: "radio",
          value: "AM",
          defaultChecked: true
        },
        value: null,
        validation: {},
        valid: true,
        touched: true
      },
      timeRadio2: {
        label: "starts on",
        elementType: "radio",
        fieldDescription: "PM",
        fieldComment: null,
        elementConfig: {
          type: "radio",
          name: "radio",
          value: "PM"
        },
        value: null,
        validation: {},
        valid: true,
        touched: true
      },

      duration: {
        label: "duration",
        elementType: "input",
        fieldDescription: "hour",
        fieldComment: null,
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
    labels: {
      title: {
        labelTitle: "title",
        belongsTo: "About"
      },
      description: {
        labelTitle: "description",
        belongsTo: "About"
      },
      category: {
        labelTitle: "category",
        belongsTo: "About"
      },
      payment: {
        labelTitle: "payment",
        belongsTo: "About"
      },
      reward: {
        labelTitle: "reward",
        belongsTo: "About"
      },
      responsible: {
        labelTitle: "responsible",
        belongsTo: "Coordinator"
      },
      email: {
        labelTitle: "email",
        belongsTo: "Coordinator"
      },
      startsOn: {
        labelTitle: "starts on",
        belongsTo: "When"
      },
      duration: {
        labelTitle: "duration",
        belongsTo: "When"
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
    payment: "Free Event",
    timeOfDay: "AM",
    formIsValid: false,
    posted: false
  };

  dateTimeHandler = (formElements, dateTime) => {
    let time = formElements.time.value;
    const date = formElements.date.value;
    let [hours, minutes] = time.split(":");
    const modifier = this.state.timeOfDay;

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    time = `${hours}:${minutes}`;
    dateTime = `${date}${"T"}${time}`;

    return dateTime;
  };

  formSubmitHandler = event => {
    event.preventDefault();
    const formElements = { ...this.state.formElements };
    let paidEvent = false;
    let categoryID = null;
    let coordinatorEmail = "";
    let coordinatorID = "";
    let dateTime = "";

    if (this.state.payment !== "Free Event") {
      paidEvent = true;
    }

    formElements.category.elementConfig.options.map(category => {
      if (category.name === formElements.category.value) {
        return (categoryID = category.id);
      } else return false;
    });

    formElements.responsible.elementConfig.options.map(coordinator => {
      if (
        coordinator.name + " " + coordinator.lastname ===
        formElements.responsible.value
      ) {
        return (
          (coordinatorEmail = coordinator.email),
          (coordinatorID = coordinator.id)
        );
      } else return false;
    });

    dateTime = this.dateTimeHandler(formElements, dateTime);

    const form = {
      title: formElements.title.value,
      description: formElements.description.value,
      category_id: categoryID,
      paid_event: paidEvent,
      event_fee: formElements.paymentInput.value,
      reward: formElements.reward.value,
      date: dateTime,
      duration: formElements.duration.value * 3600,
      coordinator: {
        email: coordinatorEmail,
        id: coordinatorID
      }
    };

    this.setState({ posted: true });
    console.log(form);
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.isEmail) {
      let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = regex.test(value) && isValid;
      if (value === "") {
        isValid = true;
      }
    }

    if (rules.isDate) {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      isValid = today < value && isValid;
    }

    if (rules.isTime) {
      isValid = value <= "12:59" && value > "00:59" && isValid;
    }

    return isValid;
  };

  inputChangeHandler = (event, inputElement) => {
    const updatedForm = { ...this.state.formElements };
    const updatedFormElement = { ...updatedForm[inputElement] };

    if (
      event.target.value === "Paid Event" ||
      event.target.value === "Free Event"
    ) {
      if (event.target.value === "Paid Event") {
        updatedForm.paymentInput.validation.required = true;
      } else {
        updatedForm.paymentInput.validation.required = false;
      }

      this.setState({ payment: event.target.value, formElements: updatedForm });
      this.formValidationCheckout(updatedForm);
    } else if (event.target.value === "AM" || event.target.value === "PM") {
      this.setState({ timeOfDay: event.target.value });
    } else {
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
      updatedFormElement.touched = true;
      updatedForm[inputElement] = updatedFormElement;

      this.setState({ formElements: updatedForm });
      this.formValidationCheckout(updatedForm);
    }
  };

  formValidationCheckout = form => {
    let isValid = false;
    let payment = true;
    if (
      this.state.payment === "Paid Event" &&
      form.paymentInput.valid === false
    ) {
      payment = false;
    }
    isValid = {
      title: form.title.valid,
      description: form.description.valid,
      responsible: form.responsible.valid,
      payment: payment,
      email: form.email.valid,
      date: form.date.valid,
      timie: form.time.valid
    };

    let formIsValid = true;
    Object.values(isValid).map(element => {
      if (element && formIsValid) {
        return (formIsValid = true);
      } else return (formIsValid = false);
    });

    this.setState({ formIsValid: formIsValid });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Forms
          {...this.state}
          changed={this.inputChangeHandler}
          submit={this.formSubmitHandler}
          btnState={this.state.formIsValid}
        />
      </React.Fragment>
    );
  }
}

export default App;
