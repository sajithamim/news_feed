import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AdminLayout from "./Layouts/AdminLayout/AdminLayout";

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <AdminLayout> 
    <Route {...rest} render={props => (
        localStorage.getItem('accessToken')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
    </AdminLayout>
)