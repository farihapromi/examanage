import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from './Homepage'
import InvigilationSchedule from "./InvigilationSchedule";
// import ExamCommitteeForm from "./ExamCommiteeForm";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>This is my App</h1>
        {/* <HomePage /> */}
        <InvigilationSchedule/>
        
        {/* <ExamCommitteeForm/> */}
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);