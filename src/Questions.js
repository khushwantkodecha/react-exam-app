import React, { Component } from "react";
//for giving styles to the component
import "./App.css";
//link is used for page navigation
import { Link } from "react-router-dom";

//creating class component
class Question extends Component {
  state = {
    //state of questions that is storing all the questions these ques can be more than 10
    //here we are storing 15 questions and will pick one at a time randomly
    //we will select questions randomly to the user
    //ques key of state contains the question value
    //ans key of state contains all the options of perticular question
    //cans defines the correct answer of perticular question
    //here I defined id of perticular question but am not using it anywhere so try to ignore it
    questions: [
      {
        ques: "Which of the following can't be done with client-side JavaScript?",
        ans: [
          "Validating a form",
          "Sending a form's contents by email",
          "Storing the form's contents to a database file on the server",
          "Storing the form's contents to a database file on the server"
        ],
        cans: 1
      },
      {
        ques: "Is it possible to link within the current page?",
        ans: ["Only in framesets", "Yes", "No", "null"],
        id: 1,
        cans: 2
      },
      {
        ques: "Which section is used for text and tags that are shown directly on your web page?",
        ans: ["Head", "Metatags", "Metatags", "None"],
        id: 2,
        cans: 1
      },
      {
        ques: "Why should you add alternative text to your images?",
        ans: [
          "In case the user wishes to load a different picture",
          "So the users can get an idea of what the image is before it loads",
          "So the user can save the image using the text as a name",
          "None of these"
        ],
        id: 3,
        cans: 3
      },
      {
        ques: "What is the output of the following code snippet?eval(20*4)=?",
        ans: ["[1,2,3]", "204", "24", "80"],
        id: 4,
        cans: 1
      },
      {
        ques: " What is the output of the following code snippet?var a = [1,2,3,4,5]; a.slice(0,3);",
        ans: ["NaN", "[4,5]", "[1,2,3,4]", "[1,2,3,4,5]"],
        id: 5,
        cans: 0
      },
      {
        ques: 'What is the correct syntax for referring to an external script called "abc.js"?',
        ans: ['<script href=" abc.js">', '<script name=" abc.js">', '<script src=" abc.js">', "None of the above"],
        id: 6,
        cans: 3
      },
      {
        ques: "How to create a Date object in JavaScript?",
        ans: [
          "dateObjectName = new Date([parameters])",
          "dateObjectName.new Date([parameters])",
          "dateObjectName := new Date([parameters])",
          "dateObjectName Date([parameters])"
        ],
        id: 7,
        cans: 1
      },
      {
        ques: "Which of the following is correct about features of JavaScript?",
        ans: [
          "JavaScript is a lightweight, interpreted programming language.",
          "JavaScript is designed for creating network-centric applications.",
          "JavaScript is complementary to and integrated with Java.",
          "All of the above."
        ],
        id: 8,
        cans: 3
      },
      {
        ques: "Which built-in method returns the character at the specified index?",
        ans: ["characterAt()", "getCharAt()", "charAt()", "None of the above."],
        id: 9,
        cans: 2
      },
      {
        ques:
          "Which of the following function of Boolean object returns a string of either 'true' or 'false' depending upon the value of the object?",
        ans: ["toSource()", "toString()", "valueOf()", "None of the above."],
        id: 10,
        cans: 0
      },
      {
        ques: 'var city = new Array("delhi", "agra", "akot", "aligarh","palampur");console.log(city.shift());',

        ans: ["agra", "akot", "delhi", "aligarh"],
        id: 11,
        cans: 1
      },
      {
        ques:
          "Which of the following function of String object extracts a section of a string and returns a new string?",
        ans: ["slice()", "split()", "replace()", "search()"],
        id: 12,
        cans: 1
      },
      {
        ques:
          "Which of the following function of String object returns the calling string value converted to upper case?",
        ans: [" toLocaleUpperCase()", "toUpperCase()", "toString()", "substring()"],
        id: 13,
        cans: 2
      },
      {
        ques:
          "Which of the following function of String object creates an HTML hypertext link that requests another URL?",
        ans: ["link()", "sub()", "sup()", "small()"],
        id: 14,
        cans: 3
      }
    ],
    //randomNumber state will have radom number that will be generated on the click of next button
    randomNumber: 0,
    //quesCount state will be incread on the every next button click
    //this state will be start from 0 and will be ended with 9
    quesCount: 0,
    //this state will help us in prevention of repeating of same question
    //this is having all the elements that can be generated from 1 to 14
    //here i m using 14 because length of the ques array will be 14
    numberCheck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    //this state will store remaining for perticular question
    timeRem: 15,
    //this state will have count of all attemped questions
    allResponseCount: 0,
    //will have count of all the correct answer
    correctAnsCount: 0,
    //boolean state for checking that 50/50 lifeline button is clicked on not
    lifeOneChecked: false,
    //boolean state same as 50/50 but this will be used for seconf lifelife that is +10 sec
    lifeTwoChecked: false,
    //this will have the time value of quicket ans in second unit
    quickestAns: 15,
    //this state for storing slowest and
    slowestAns: 0,
    //this state is of array whick will contain all the time on clicking on the options of all the questions
    avgTimeArr: []
  };

  //this fucntoin will be executed before mounting of the component
  componentWillMount() {
    //this will add event listener to the global object 'window'
    //this event will be executed before getting page refresh
    //before coming back to refresh state to unload state 'onUnload' function will be executed
    window.addEventListener("beforeunload", this.onUnload);
  }

  //this function will be executed after mouting of the component
  componentDidMount() {
    //when question displays to the use this timeHandler funciton will start the timet which will be started from 15 secs
    this.timeHandler();
  }
  //this fuction will be excuted before coming back to normal state from refreshing of the page
  onUnload = event => {
    event.returnValue = "Changes that you made may not be saved.";
  };

  //this arrow fuction will handle functionality of next button click
  nextHandler = e => {
    //this will update the state of array which is having all the time values of response time for each question
    //it will also update count of all responded questions
    this.setState({
      avgTimeArr: this.state.avgTimeArr,
      allResponseCount: this.state.avgTimeArr.length
    });
    //uncheckHandler handler function will be called on every next button click
    this.uncheckHandler();
    //clearInterval method will clear all the time that seted before
    clearInterval(this.myInterval);
    //timeHandler is needed for counter in next question
    this.timeHandler();
    //assining state of aray to temporary variable
    let arr = this.state.numberCheck;
    //this will generate a random number from 1 to length of the numberCheck state
    let x = this.state.numberCheck[Math.floor(Math.random() * this.state.numberCheck.length)];
    //this will find the index of the generated random number in temp array...this index will be stored in index variable
    let index = arr.indexOf(x);
    //splice method is used to remove the perticular index element from temp arr
    arr.splice(index, 1);
    //after removing element we are updateing states
    this.setState({
      //randomNumbder is useful for getting index of the questions state
      //we are updating it with generated random number x
      randomNumber: x,
      //increasing the question count by one
      quesCount: this.state.quesCount + 1,
      //updating numberCheck array with temp arr array
      numberCheck: arr
    });
  };

  //this function is used  for input radion box to get radio boxes without selected
  //this is removing selected option of last question
  uncheckHandler = () => {
    //this will be applied if quesCount is less than 9
    if (this.state.quesCount <= 9) {
      //iterating 4 time beacause we have four four options
      for (let i = 0; i < 4; i++) {
        //it will removed auto checked state of options
        document.getElementById(i).checked = false;
        //it will enable all the options again if there is any disabled radio box
        document.getElementById(i).disabled = false;
      }
    }
  };

  //this function is useful for handling the time counter for every question
  timeHandler = () => {
    //this codition prevent to execute this function data
    //if questionCount is more than 9 then it will retrun nothing other it will do whatever is written in the code
    if (this.state.quesCount >= 9) return;
    //initially it will set the state of time reamaining to 15 secs
    this.setState(
      {
        timeRem: 15
      },
      () => {
        {
          //setInterval method will be exected after every second
          //beacuse we are defining 1000ms as seond argument of the funcation
          this.myInterval = setInterval(() => {
            //after every second we will decrease the remaining time by 1 sec
            this.setState(
              {
                timeRem: this.state.timeRem - 1
              },
              () => {
                //if remaining time is equal to 0 then next button will automatically clicked
                if (this.state.timeRem == 0) {
                  this.nextHandler();
                }
              }
            );
          }, 1000);
        }
      }
    );
  };

  //this is trigged on every option selection
  ansHandler = event => {
    //this condition is useful to get the quickest time of giving response
    if (15 - this.state.timeRem < this.state.quickestAns) {
      this.setState({
        quickestAns: 15 - this.state.timeRem
      });
    }
    //this condition is useful to get the slowest time of response
    if (this.state.slowestAns < 15 - this.state.timeRem) {
      this.setState({
        slowestAns: 15 - this.state.timeRem
      });
    }
    //pushing time of respoonse in the avg time state
    this.state.avgTimeArr.splice(this.state.quesCount, 1, 15 - this.state.timeRem);
    //this variable will get value from 0-3 that deifins the selected option by user
    let userAns = event.target.value;
    //this is getting correct ans of displaying question from questions state aray
    let correctAns = this.state.questions[this.state.randomNumber].cans;
    //checking that selected option by user correct or not
    if (userAns == correctAns) {
      //if
      this.setState({
        correctAnsCount: this.state.correctAnsCount + 1
      });
    }
  };

  //this is usful for handling the lifelines
  lifeHandler = (event, type) => {
    //if 50/50 lifline button is clicked then this will be executed
    if (type === "50/50") {
      //getting the correct ans of displaying question
      let ansIndex = this.state.questions[this.state.randomNumber].cans;
      //creating temp array
      let arr = [0, 1, 2, 3];
      //it will get index of correct and from temporary array
      let index = arr.indexOf(ansIndex);
      //that index will be removed by using this method
      arr.splice(index, 1);
      //this loop will disable two options other than correct option
      for (let i = 0; i < 2; i++) {
        document.getElementById(arr[i]).disabled = true;
      }
      //it will help us to checke that first lifeline is used
      this.setState({
        lifeOneChecked: true
      });
    }
    //if second lifelined is clicked then this condition will be executed
    else {
      this.setState({
        //will help us to identify that second lifeline is selected
        lifeTwoChecked: true,
        //this will add 10 more seconds to the remaining time
        timeRem: this.state.timeRem + 10
      });
    }
  };

  //this function will be called when user clicks on 'Get Your Result' button
  resultHandler = () => {
    //avgTimeAdd varible will have summation of all the response time of all questions
    let avgTimeAdd = 0;
    //this will iterate loop on the length of avgTimeArray state to get sum of all responses
    for (let i = 0; i < this.state.avgTimeArr.length; i++) {
      avgTimeAdd = avgTimeAdd + this.state.avgTimeArr[i];
    }
    //setting localstorage for result...localstorage is same as cookies
    localStorage.setItem("attemptedQues", this.state.allResponseCount);
    localStorage.setItem("correctAns", this.state.correctAnsCount);
    localStorage.setItem("wrongAns", this.state.allResponseCount - this.state.correctAnsCount);
    localStorage.setItem("unAttemptedQues", 10 - this.state.allResponseCount);
    localStorage.setItem("quickestAns", this.state.quickestAns);
    localStorage.setItem("slowestAns", this.state.slowestAns);
    localStorage.setItem("avgTime", (avgTimeAdd / this.state.avgTimeArr.length).toFixed(2));
  };

  render() {
    //on rendering we are disbling the lifeline button after checking that which lifeline is selected
    if (this.state.quesCount <= 9 && this.state.lifeOneChecked) {
      document.getElementById("lifeone").disabled = true;
    }
    if (this.state.quesCount <= 9 && this.state.lifeTwoChecked) {
      document.getElementById("lifetwo").disabled = true;
    }
    const { timeRem } = this.state;
    return (
      <React.Fragment>
        {this.state.quesCount <= 9 ? (
          <React.Fragment>
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8 ">
                <h4 className="Time1">Time Left : {timeRem} Secs</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="Questions">
                  <p>
                    <b>
                      Ques
                      {this.state.quesCount + 1}.
                    </b>{" "}
                    {this.state.questions[this.state.randomNumber].ques}
                  </p>
                  <input type="radio" id="0" name="ans" value="0" onClick={e => this.ansHandler(e)} unchecked /> (A){" "}
                  {this.state.questions[this.state.randomNumber].ans[0]}
                  <br />
                  <input
                    type="radio"
                    id="1"
                    name="ans"
                    value="1"
                    onClick={e => this.ansHandler(e)}
                    unchecked
                  /> (B) {this.state.questions[this.state.randomNumber].ans[1]} <br />
                  <input
                    type="radio"
                    id="2"
                    name="ans"
                    value="2"
                    onClick={e => this.ansHandler(e)}
                    unchecked
                  /> (C) {this.state.questions[this.state.randomNumber].ans[2]}
                  <br />
                  <input
                    type="radio"
                    id="3"
                    name="ans"
                    value="3"
                    onClick={e => this.ansHandler(e)}
                    unchecked
                  /> (D) {this.state.questions[this.state.randomNumber].ans[3]}
                  <br />
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-12">
                <button className="btn btn-primary ButtonTwo" onClick={e => this.nextHandler(e)}>
                  Next
                </button>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="lifeline">
                <h3 className="lifelabel">Lifelines</h3>
                <button className="btn btn-primary" id="lifeone" onClick={e => this.lifeHandler(e, "50/50")}>
                  50/50
                </button>
                &nbsp;&nbsp;
                <button className="btn btn-primary" id="lifetwo" onClick={e => this.lifeHandler(e, "10sec")}>
                  +10 Secs
                </button>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="row">
              <div className="col-12">
                <div className="Result">
                  <h1>Thanks For Giving Test</h1>
                  <br />
                  <Link
                    to={{
                      pathname: "/result"
                    }}
                  >
                    <button className="btn btn-primary" onClick={this.resultHandler}>
                      Get Your Result
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Question;
