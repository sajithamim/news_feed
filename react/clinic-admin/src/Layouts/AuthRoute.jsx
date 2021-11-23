import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AdminLayout from "../Layouts/AdminLayout/AdminLayout";

const AuthRoute = ({ component: Component, ...rest }) => (
    <AdminLayout> 
    <Route {...rest} render={props => (<Component {...props} />)} />
    </AdminLayout> 
)

export default AuthRoute;