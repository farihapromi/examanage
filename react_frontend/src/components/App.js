import React, { Component } from "react";
import { render } from "react-dom";
// import HomePage from "./HomePage";
import ExamCommitteeForm from "./ExamCommiteeForm";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* <HomePage /> */}
        <h1>This is my App</h1>
        <ExamCommitteeForm/>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);