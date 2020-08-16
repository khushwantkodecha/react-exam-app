import React, { Component } from "react";
import "./App.css";

class Result extends Component {
  state = {
    correctAns: 0,
    wrongAns: 0,
    attemptedQues: 0,
    unAttemptedQues: 0,
    quickestAns: "N/A",
    slowestAns: "N/A",
    avgTime: 15
  };
  componentDidMount() {
    //updating states on mounting of the component by getting values from localstorage
    this.setState({
      attemptedQues: localStorage.getItem("attemptedQues"),
      correctAns: localStorage.getItem("correctAns"),
      wrongAns: localStorage.getItem("wrongAns"),
      unAttemptedQues: localStorage.getItem("unAttemptedQues"),
      quickestAns: localStorage.getItem("quickestAns"),
      slowestAns: localStorage.getItem("slowestAns"),
      avgTime: localStorage.getItem("avgTime")
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="App">
            <h4>Your Result</h4>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Attempted Question</td>
                  <td>{this.state.attemptedQues}</td>
                </tr>
                <tr>
                  <td>Un-Attempted Question</td>
                  <td>{this.state.unAttemptedQues}</td>
                </tr>
                <tr>
                  <td>Total Correct Answer</td>
                  <td>{this.state.correctAns}</td>
                </tr>
                <tr>
                  <td>Total Wrong Answer</td>
                  <td>{this.state.wrongAns}</td>
                </tr>
                <tr>
                  <td>Quickest Answer</td>
                  <td>{this.state.attemptedQues > 0 ? this.state.quickestAns + " Sec" : <span>N/A</span>}</td>
                </tr>
                <tr>
                  <td>Slowest Answer</td>
                  <td>{this.state.attemptedQues > 0 ? this.state.slowestAns + " Sec" : <span>N/A</span>}</td>
                </tr>
                <tr>
                  <td>Average Time Per Question</td>
                  <td>{this.state.attemptedQues > 0 ? this.state.avgTime + " Sec" : <span>N/A</span>}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}

export default Result;
