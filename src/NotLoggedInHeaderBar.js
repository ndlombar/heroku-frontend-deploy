import React, { Component } from "react";
import "./HeaderBar.css";

class NotLoggedInHeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashString: ""
    };

    this.returnHome = this.returnHome.bind(this);
    this.loginClick = this.loginClick.bind(this);
    this.registerClick = this.registerClick.bind(this);
  }

  returnHome() {
    window.location.replace("https://rent-mate.herokuapp.com");
  }

  loginClick() {
    window.location.replace("https://rent-mate.herokuapp.com/login");
  }

  registerClick() {
    window.location.replace("https://rent-mate.herokuapp.com/register");
  }

  render() {
    return (
      <div class="header">
        <div id="home-logo" onClick={this.returnHome}>
          <img
            class="logo"
            src={require("./images/logo_white.png")}
            alt="logo"
          />
          <h1 className="headerLabels">Rentmate</h1>
        </div>
        <div id="links">
          <h2 onClick={this.loginClick} id="login" className="headerLabels">
            Login
          </h2>
          <h2 onClick={this.registerClick} className="headerLabels">
            Register
          </h2>
        </div>
      </div>
    );
  }
}

export default NotLoggedInHeaderBar;
