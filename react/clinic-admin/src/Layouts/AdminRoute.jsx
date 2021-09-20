import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AdminLayout from "../Layouts/AdminLayout/AdminLayout";

const AdminRoute = ({ component: Component, ...rest }) => (
    <AdminLayout> 
    <Route {...rest} render={props => (
        localStorage.getItem('accessToken')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
    </AdminLayout>
)

export default AdminRoute;