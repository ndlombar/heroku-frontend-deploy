import React, { Component } from "react";
import { Route, BrowserRouter, withRouter } from "react-router-dom";
import SpecificPosting from "./SpecificPosting";
import PublicView from "./PublicView.js";
import Login from "./Login";
import Register from "./Register";
import NotLoggedInHeaderBar from "./NotLoggedInHeaderBar";
import LoggedInHeaderBar from "./LoggedInHeaderBar";
import SecurityQuestions from "./SecurityQuestions";
import ForgotPass from "./ForgotPass";
import OneTimePassword from "./OneTimePassword";
import ResetPassword from "./ResetPassword";
import ResidentPortal from "./ResidentPortal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  componentDidMount() {
    this.setState({ email: localStorage.getItem("email") });
  }

  render() {
    return <SpecificPosting />; //<ResidentPortal />;
    //   if (localStorage.getItem("loggedIn")) {
    //     return (
    //       <BrowserRouter>
    //         <LoggedInHeaderBar />
    //         <Route exact={true} path="/" component={PublicView} />
    //         <Route path="/SpecificPosting" component={SpecificPosting} />
    //         <Route path="/mydashboard" component={ResidentPortal} />
    //       </BrowserRouter>
    //     );
    //   } else {
    //     console.log("is false");
    //     return (
    //       <BrowserRouter>
    //         <NotLoggedInHeaderBar />
    //         <Route exact={true} path="/" component={PublicView} />
    //         <Route path="/SpecificPosting" component={SpecificPosting} />
    //         <Route path="/login" component={Login} />
    //         <Route path="/register" component={Register} />
    //         <Route path="/forgot" component={ForgotPass} />
    //         <Route path="/securityquestions" component={SecurityQuestions} />
    //         <Route path="/onetimepassword" component={OneTimePassword} />
    //         <Route path="/resetpassword" component={ResetPassword} />
    //       </BrowserRouter>
    //     );
    //   }
    // }
  }
}
export default App;
