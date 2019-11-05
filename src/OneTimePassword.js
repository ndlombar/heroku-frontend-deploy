import React, { Component } from "react";
import ReactDOM from "react-dom";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";

class OneTimePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    this.send = this.send.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  send() {
    

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.state.email
      )
    ) {
      alert("Please enter a valid email address.");
    } else {
      Axios.get("http://localhost:8080/sendOTP", {
        params: { email: this.state.email }
      }).then(
        response => {
          console.log(response);
          if (response.data.success) {
            ReactDOM.render(<EnterOTP userEmail={this.state.email} />, document.getElementById("recover-page"));
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

export default OneTimePassword;

class EnterOTP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.userEmail,
      otp: ""
    };

    this.handleOTP = this.handleOTP.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleOTP(event) {
    this.setState({ otp: event.target.value });
  }

  submit() {
    Axios.post("http://localhost:8080/validateOTP", {
        email: this.state.email, 
        otp: this.state.otp
      }).then(
        response => {
          console.log(response);
          if (response.data.success) {
            window.location.replace(
              `http://localhost:3000/resetpassword?email=${this.state.email}`
            );
          } else {
            alert("That is not a registered email.");
          }
        },
        error => {
          console.log(error);
        }
      );
    
  }

  render() {
    return (
      <div id="recover-page">
        <div className="recoverForm">
          <Typography className="emailLabel">
            Please enter the One Time Password below.
          </Typography>
          <TextField
            variant="outlined"
            placeholder="One Time Password"
            onChange={this.handleOTP}
            className="email-input"
          />
          <Button variant="contained" color="primary" onClick={this.submit}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}
