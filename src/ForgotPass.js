import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./ForgotPass.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.securityQuestions = this.securityQuestions.bind(this);
    this.OTP = this.OTP.bind(this);
  }

  securityQuestions() {
    window.location.replace("http://localhost:3000/securityquestions");
  }

  OTP() {
    window.location.replace("http://localhost:3000/onetimepassword");
  }

  render() {
    return (
      <div id="forgotpass-page">
        <div id="forgotpass-form">
          <Typography id="options-label">Reset password through</Typography>
          <Button
            variant="contained"
            color="primary"
            className="recoverButtons"
            onClick={this.securityQuestions}
          >
            Security Questions
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="recoverButtons"
            onClick={this.OTP}
          >
            One Time Password
          </Button>
        </div>
      </div>
    );
  }
}

export default ForgotPass;
