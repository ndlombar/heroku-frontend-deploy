import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      newPassword: "",
      confirmPassword: ""
    };

    console.log(this.state);

    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.reset = this.reset.bind(this);
    this.hashCode = this.hashCode.bind(this);
  }

  componentDidMount() {
    let params = {};
    let parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function(m, key, value) {
        params[key] = value;
      }
    );
    this.setState({ email: params.email });
  }

  handleNewPassword(event) {
    this.setState({ newPassword: event.target.value });
  }

  handleConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  hashCode(s) {
    let h = 0,
      l = s.length,
      i = 0;
    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
    return h;
  }

  reset() {
    if (this.state.newPassword.length < 10) {
      alert("Password must be longer than 10 characters");
    } else if (this.state.newPassword != this.state.confirmPassword) {
      alert("Passwords do not match.");
    } else {
      //alert("success!");
      console.log(this.state);

      Axios.post(
        "https://whispering-fortress-23669.herokuapp.com/resetPassword",
        {
          email: this.state.email,
          password: this.state.newPassword
        }
      ).then(
        response => {
          console.log(response);
          if (response.data.success) {
            window.location.replace(`https://rent-mate.herokuapp.com/login`);
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
          <Typography className="emailLabel">New Password</Typography>
          <TextField
            variant="outlined"
            onChange={this.handleNewPassword}
            className="email-input"
            type="password"
          />
          <Typography className="emailLabel">Confirm Password</Typography>
          <TextField
            variant="outlined"
            placeholder=""
            onChange={this.handleConfirmPassword}
            className="email-input"
            type="password"
          />
          <Button variant="contained" color="primary" onClick={this.reset}>
            Reset
          </Button>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
