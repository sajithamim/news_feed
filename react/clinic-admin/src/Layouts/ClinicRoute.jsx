import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ClinicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (<Component {...props} />)} />
)

export default ClinicRoute;