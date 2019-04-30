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
        valueID: null,
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
              name: "fee",
              placeholder: "Fee"
            }
          ]
        },
        value: { radio: "Free Event", fee: "" },
        validation: { radio: {}, fee: { required: false } },
        valid: { radio: true, fee: false },
        touched: { radio: true, fee: false }
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
        valid: true,
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
            min: "00:00",
            max: "12:00",
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
          date: { required: true, isDate: true },
          time: { required: true, isTime: true },
          radio: {}
        },
        valid: { date: false, time: false, radio: true },
        touched: { date: false, time: false, radio: true }
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
    formIsValid: false,
    posted: false
  };

  dateTimeHandler = (formElements, dateTime) => {
    let time = formElements.startsOn.value.time;
    const date = formElements.startsOn.value.date;
    let [hours, minutes] = time.split(":");
    const modifier = formElements.startsOn.value.radio;

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

    if (formElements.payment.value !== "Free Event") {
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
      event_fee: formElements.payment.value.fee,
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
      isValid = today <= value && isValid;
    }

    if (rules.isTime) {
      isValid = value <= "12:59" && value > "00:59" && isValid;
    }

    return isValid;
  };

  inputChangeHandler = (event, inputElement) => {
    const updatedForm = { ...this.state.formElements };
    const updatedFormElement = { ...updatedForm[inputElement] };

    if (inputElement === "startsOn") {
      updatedFormElement.value[event.target.name] = event.target.value;
      updatedFormElement.valid[event.target.name] = this.checkValidity(
        updatedFormElement.value[event.target.name],
        updatedFormElement.validation[event.target.name]
      );
      updatedFormElement.touched[event.target.name] = true;
      updatedForm[inputElement] = updatedFormElement;
      this.setState({ formElements: updatedForm });
      this.formValidationCheckout(updatedForm);
    } else if (inputElement === "payment") {
      if (event.target.value === "Paid Event") {
        updatedFormElement.value.radio = event.target.value;
        updatedFormElement.validation.fee.required = true;
        updatedForm[inputElement] = updatedFormElement;
        this.setState({ formElements: updatedForm });
        this.formValidationCheckout(updatedForm);
      } else if (event.target.value === "Free Event") {
        updatedFormElement.value.radio = event.target.value;
        updatedFormElement.validation.fee.required = false;
        updatedFormElement.touched.fee = false;
        updatedFormElement.value.fee = "";
        updatedForm[inputElement] = updatedFormElement;
        this.setState({ formElements: updatedForm });
        this.formValidationCheckout(updatedForm);
      } else if (event.target.name === "fee") {
        updatedFormElement.value.fee = event.target.value;
        updatedFormElement.valid.fee = this.checkValidity(
          updatedFormElement.value.fee,
          updatedFormElement.validation.fee
        );
        updatedFormElement.touched.fee = true;

        updatedForm[inputElement] = updatedFormElement;
        this.setState({ formElements: updatedForm });
        this.formValidationCheckout(updatedForm);
      }
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
      form.payment.value.radio === "Paid Event" &&
      form.payment.valid.fee === false
    ) {
      payment = false;
    }
    isValid = {
      title: form.title.valid,
      description: form.description.valid,
      payment: payment,
      email: form.email.valid,
      date: form.startsOn.valid.date,
      timie: form.startsOn.valid.time
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
