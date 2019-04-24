import React, { Component } from "react";
import Header from "./containers/Header/Header";
import Form from "./containers/Form/Form";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header /> <Form />
      </React.Fragment>
    );
  }
}

export default App;
