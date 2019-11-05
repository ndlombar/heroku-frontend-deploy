import React, { Component } from "react";
import "./HeaderBar.css";

class LoggedInHeaderBar extends Component {
  constructor(props) {
    super(props);

    this.returnHome = this.returnHome.bind(this);
    this.dashboardClick = this.dashboardClick.bind(this);
  }

  returnHome() {
    window.location.replace("http://localhost:3000");
  }

  dashboardClick() {
    window.location.replace("http://localhost:3000/mydashboard");
  }

  logoutClick() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");
    window.location.replace("http://localhost:3000");
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
          <h2 onClick={this.dashboardClick} id="login" className="headerLabels">
            My Dashboard
          </h2>
          <h2 onClick={this.logoutClick} id="login" className="headerLabels">
            Logout
          </h2>
        </div>
      </div>
    );
  }
}

export default LoggedInHeaderBar;
