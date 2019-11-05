import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./SecurityQuestions.css";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";

class SecurityQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPhone: "2606156620",
      securityQuestions: [],
      securityAnswers: [],
      currentQuestion: "",
      currentAnswer: "",
      answer: "",
      index: 0
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
    this.send = this.send.bind(this);
  }

  handleEmail(event) {
    this.setState({ userEmail: event.target.value });
  }

  handleAnswer() {
    if (this.state.currentAnswer === this.state.answer) {
      this.setState({
        currentQuestion: this.state.securityQuestions[this.state.index]
      });
      this.setState({
        currentAnswer: this.state.securityAnswers[this.state.index]
      });
      this.setState({ index: this.state.index + 1 });
      this.setState({ answer: "" });
    } else {
      alert("Incorrect");
    }
  }

  saveAnswer(event) {
    this.setState({ answer: event.target.value });
  }

  componentDidUpdate() {
    if (this.state.index === 4) {
      window.location.replace("https://rent-mate.herokuapp.com/resetpassword");
    } else {
      if (this.state.securityQuestions.length > 0) {
        let node = (
          <div className="recoverForm">
            <Typography className="emailLabel">
              {this.state.currentQuestion}
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Answer here"
              onChange={this.saveAnswer}
              className="email-input"
              type="password"
              value={this.state.answer}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleAnswer}
            >
              Recover
            </Button>
          </div>
        );
        ReactDOM.render(node, document.getElementById("recover-page"));
      }
    }
  }

  send() {
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.state.userEmail
      )
    ) {
      alert("Please enter a valid email address.");
    } else {
      Axios.get(
        "https://whispering-fortress-23669.herokuapp.com/forgotPassword",
        {
          params: { email: this.state.userEmail }
        }
      ).then(
        response => {
          console.log(response);
          if (response.data.success) {
            this.setState({
              securityQuestions: [
                response.data.securityQuestionList[0].securityQuestion,
                response.data.securityQuestionList[1].securityQuestion,
                response.data.securityQuestionList[2].securityQuestion
              ]
            });
            this.setState({
              securityAnswers: [
                response.data.securityQuestionList[0].answer,
                response.data.securityQuestionList[1].answer,
                response.data.securityQuestionList[2].answer
              ]
            });
            this.setState({
              currentQuestion:
                response.data.securityQuestionList[0].securityQuestion
            });
            this.setState({
              currentAnswer: response.data.securityQuestionList[0].answer
            });

            this.setState({ index: 1 });
          } else {
            alert("That is not a registered email.");
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  render() {
    return (
      <div id="recover-page">
        <div className="recoverForm">
          <Typography className="emailLabel">
            What is your email address?
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your email address"
            onChange={this.handleEmail}
            className="email-input"
          />
          <Button variant="contained" color="primary" onClick={this.send}>
            Recover
          </Button>
        </div>
      </div>
    );
  }
}

export default SecurityQuestions;
