import React, { Fragment } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Dashboard } from "./pages/Dashboard";
// import Error404 from "./pages/landing/errors/Error404";
import Login from "./pages/auth/login/Login";
import Staff from "./pages/Staff/Staff";
import Students from "./pages/Students/Students";
import TokenHelpers from "./utils/helpers/tokenHelper";
import { Tables } from "./pages/Tables";
import { Hero404 } from "./pages/Hero404";
// import { Profile } from "./pages/Profile";
import Profile from "./pages/Profile/Profile";

const Routes = () => {

  const IsLoggedInRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      TokenHelpers.checkIfLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
    )} />
  );

  return (
    <Fragment>
      <BrowserRouter>
        <Toaster />
        <Route path="/login" component={Login} />

        {/* <Route exact path={["/dashboard", "/home", "/"]} render={() => <Dashboard />} /> */}
        <IsLoggedInRoute exact path="/students" component={Students} />
        <IsLoggedInRoute exact path="/staff" component={Staff} />
        <Route path="/tables" component={Tables} />
        <Route path="/hero404" component={Hero404} />
        <Route path={["/profile", "/home", "/"]}component={Profile} />

        {/* <Route component={Error404} /> */}
      </BrowserRouter>
    </Fragment>
  );
};

export default Routes;
