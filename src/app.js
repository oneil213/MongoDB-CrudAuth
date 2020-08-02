import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UnPrivateRoute from "../src/hocs/unPrivateRoute";
import PrivateRoute from "../src/hocs/privateRoute";
import Home from "../src/views/Index";
import LoginPage from "../src/views/loginPage";
import RegisterPage from "../src/views/registerPage.js";
import ProfilePage from "../src/views/profilePage";
import AdminPage from "../src/views/adminPage";
import ManagerPage from "../src/views/managerPage";
import ForgotPasswordPage from "../src/views/forgotPasswordPage";
import ResetPasswordPage from "../src/views/resetPasswordPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <UnPrivateRoute
            path="/forgotPassword"
            component={ForgotPasswordPage}
          />

          <UnPrivateRoute
            path="/resetpassword/:token"
            component={ResetPasswordPage}
          />

          <UnPrivateRoute path="/login" component={LoginPage} />
          <UnPrivateRoute path="/register" component={RegisterPage} />
          <PrivateRoute roles="user" path="/profile" component={ProfilePage} />

          <PrivateRoute roles="admin" path="/admin" component={AdminPage} />

          <PrivateRoute
            roles="manager"
            path="/manager"
            component={ManagerPage}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
