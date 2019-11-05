import React, { Component } from "react";
import "./Login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
import { ToastsContainer, ToastsStore } from "react-toasts";
import Axios from "axios";

const failureGoogle = response => {
  alert("OAuth did not work.");
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.send = this.send.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.hashCode = this.hashCode.bind(this);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  googleLogin(response) {
    console.log(response);
    this.setState({
      email: response.profileObj.email
    });
  }

  hashCode(s) {
    let h = 0,
      l = s.length,
      i = 0;
    if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
    return h;
  }

  send() {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      Axios.post(
        "https://whispering-fortress-23669.herokuapp.com/specificposting/login",
        {
          email: this.state.email,
          password: this.state.password
        }
      ).then(
        response => {
          console.log(response);
          if (response.data.success) {
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("email", this.state.email);
            window.location.replace("http://rent-mate.herokuapp.com/");
          }
        },
        error => {
          alert("Username or password is incorrect.");
        }
      );
    } else {
      alert("Please use a valid email address when logging in.");
    }
  }

  render() {
    return (
      <div className="login-div">
        <div className="login-form">
          <p id="sign-in">Sign in</p>
          <TextField
            label="Email"
            onChange={this.handleEmail}
            margin="normal"
            fullWidth
            className="signInText"
          />
          <TextField
            type="password"
            label="Password"
            onChange={this.handlePassword}
            margin="normal"
            fullWidth
            className="signInText"
          />
          <div id="login-buttons">
            <Button
              variant="contained"
              color="primary"
              id="login-button"
              onClick={this.send}
            >
              Login
            </Button>
            <GoogleLogin
              clientId="153387415708-if58o9u5ms35717r21tvl543utp87366.apps.googleusercontent.com"
              id="custom-google"
              buttonText="Login with Google"
              onSuccess={this.googleLogin}
              onFailure={failureGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <div id="need-account">
            <label>
              Need an account? <a href="/register">Sign up.</a>
            </label>
          </div>
          <a href="/forgot">Forgot password?</a>
        </div>
      </div>
    );
  }
}

export default Login;
