import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Login.js";
import "./Register.css";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { InputLabel, FormControl } from "@material-ui/core";
import Axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      securityQuestion1: "",
      securityQuestion2: "",
      securityQuestion3: "",
      answer1: "",
      answer2: "",
      answer3: ""
    };

    this.captureFirstname = this.captureFirstname.bind(this);
    this.captureLastname = this.captureLastname.bind(this);
    this.capturePassword = this.capturePassword.bind(this);
    this.captureConfirm = this.captureConfirm.bind(this);
    this.captureEmail = this.captureEmail.bind(this);
    this.capturePhone = this.capturePhone.bind(this);
    this.next = this.next.bind(this);
    this.hashCode = this.hashCode.bind(this);
    register = register.bind(this);
  }

  captureFirstname(event) {
    this.setState({ firstname: event.target.value });
  }

  captureLastname(event) {
    this.setState({ lastname: event.target.value });
  }

  capturePassword(event) {
    this.setState({ password: event.target.value });
  }

  captureConfirm(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  captureEmail(event) {
    this.setState({ email: event.target.value });
  }

  capturePhone(event) {
    this.setState({ phone: event.target.value });
  }

  hashCode(s) {
    let h = 0,
      l = s.length,
      i = 0;
    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
    return h;
  }

  componentDidUpdate() {
    if (this.state.answer3 != "") {
      Axios.post("http://localhost:8080/register", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        password: this.hashCode(this.state.password),
        email: this.state.email,
        phone: this.state.phone,
        securityQuestion1: this.state.securityQuestion1,
        securityQuestion2: this.state.securityQuestion2,
        securityQuestion3: this.state.securityQuestion3,
        answer1: this.state.answer1,
        answer2: this.state.answer2,
        answer3: this.state.answer3
      }).then(
        response => {
          console.log(response);
          if (response.data.success) {
            window.location.replace("http://localhost:3000/login");
          } else {
            alert("That email is already registered.");
            window.location.replace("http://localhost:3000/register");
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  next() {
    if (this.state.firstname === "" || this.state.lastname === "") {
      alert("Please fill in all fields before moving on.");
    } else if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords do not match. Please try again.");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      alert("Please enter a valid email address.");
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        this.state.phone
      )
    ) {
      alert("Please enter a valid phone number.");
    } else {
      ReactDOM.render(
        <SecurityQuestions />,
        document.getElementById("register-form")
      );
    }
  }

  render() {
    return (
      <div id="register-page">
        <div id="register-form">
          <Typography className="form-headers">Create an Account</Typography>
          <TextField
            variant="outlined"
            placeholder="First Name"
            label="First Name"
            className="registerInputs"
            onChange={this.captureFirstname}
          />
          <TextField
            variant="outlined"
            placeholder="Last Name"
            label="Last Name"
            className="registerInputs"
            onChange={this.captureLastname}
          />
          <TextField
            variant="outlined"
            placeholder="Email"
            label="Email"
            className="registerInputs"
            onChange={this.captureEmail}
          />
          <TextField
            variant="outlined"
            placeholder="Phone"
            label="Phone Number xxx-xxx-xxxx"
            className="registerInputs"
            onChange={this.capturePhone}
          />
          <TextField
            variant="outlined"
            placeholder="Password"
            label="Password"
            className="registerInputs"
            id="password"
            type="password"
            onChange={this.capturePassword}
          />
          <TextField
            variant="outlined"
            placeholder="Confirm Password"
            label="Confirm Password"
            className="registerInputs"
            id="confirm-password"
            type="password"
            onChange={this.captureConfirm}
          />
          <Button
            variant="contained"
            color="primary"
            id="next-button"
            onClick={this.next}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

function register(data) {
  console.log("testing");
  console.log("inside register");
  this.setState({ securityQuestion1: data.selected1 });
  this.setState({ securityQuestion2: data.selected2 });
  this.setState({ securityQuestion3: data.selected3 });
  this.setState({ answer1: data.answer1 });
  this.setState({ answer2: data.answer2 });
  this.setState({ answer3: data.answer3 });
}

class SecurityQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: "Security Question 1",
      selected2: "Secruity Question 2",
      selected3: "Secrutiy Question 3",
      answer1: "",
      answer2: "",
      answer3: ""
    };

    this.handleFirst = this.handleFirst.bind(this);
    this.handleSecond = this.handleSecond.bind(this);
    this.handleThird = this.handleThird.bind(this);
    this.firstAnswer = this.firstAnswer.bind(this);
    this.secondAnswer = this.secondAnswer.bind(this);
    this.thirdAnswer = this.thirdAnswer.bind(this);
    this.ready = this.ready.bind(this);
  }

  handleFirst(event) {
    this.setState({ selected1: event.target.value });
  }

  handleSecond(event) {
    this.setState({ selected2: event.target.value });
  }

  handleThird(event) {
    this.setState({ selected3: event.target.value });
  }

  firstAnswer(event) {
    this.setState({ answer1: event.target.value });
  }

  secondAnswer(event) {
    this.setState({ answer2: event.target.value });
  }

  thirdAnswer(event) {
    this.setState({ answer3: event.target.value });
  }

  ready() {
    register(this.state);
  }

  render() {
    return (
      <div id="security-questions">
        <Typography className="form-headers">
          Please select your security questions
        </Typography>
        <FormControl className="dropdowns">
          <InputLabel>Security Question 1</InputLabel>
          <Select value={this.state.selected1} onChange={this.handleFirst}>
            <MenuItem value={"What's your mother's maiden name?"}>
              What's your mother's maiden name?
            </MenuItem>
            <MenuItem value={"What city were you born in?"}>
              What city were you born in?
            </MenuItem>
            <MenuItem value={"What primary school did you attend?"}>
              What primary school did you attend?
            </MenuItem>
          </Select>
          <TextField
            variant="outlined"
            label="Answer to question 1."
            className="answer-box"
            onChange={this.firstAnswer}
          />
        </FormControl>
        <FormControl className="dropdowns">
          <InputLabel>Security Question 2</InputLabel>
          <Select value={this.state.selected2} onChange={this.handleSecond}>
            <MenuItem value={"What is the name of your oldest cousin?"}>
              What is the name of your oldest cousin?
            </MenuItem>
            <MenuItem value={"What was the name of your first pet?"}>
              What was the name of your first pet?
            </MenuItem>
            <MenuItem value={"What is your oldest sibling's middle name?"}>
              What is your oldest sibling's middle name?
            </MenuItem>
          </Select>
          <TextField
            variant="outlined"
            label="Answer to question 2."
            className="answer-box"
            onChange={this.secondAnswer}
          />
        </FormControl>
        <FormControl className="dropdowns">
          <InputLabel>Security Question 3</InputLabel>
          <Select value={this.state.selected3} onChange={this.handleThird}>
            <MenuItem value={"What was your first car?"}>
              What was your first car?
            </MenuItem>
            <MenuItem value={"What town was your first job located?"}>
              What town was your first job located?
            </MenuItem>
            <MenuItem value={"What was your favorite food as a child?"}>
              What was your favorite food as a child?
            </MenuItem>
          </Select>
          <TextField
            variant="outlined"
            label="Answer to question 3."
            className="answer-box"
            onChange={this.thirdAnswer}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          id="register-button"
          onClick={this.ready}
        >
          Register
        </Button>
      </div>
    );
  }
}

export default Register;
