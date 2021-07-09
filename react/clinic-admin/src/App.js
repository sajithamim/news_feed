import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Overview from './pages/Overview/Overview';
import Login from './pages/Login/Login';
import Specialization from "./pages/specialization/Specialization";
import SubSpecialization from "./pages/specialization/SubSpecializationContent";
import Topics from './pages/Topics/Topics';
import Categories from './pages/Category/Categories';
import Feedback from './pages/Feedback/Feedback';
import AdminLayout from "./Layouts/AdminLayout/AdminLayout";
import { PrivateRoute } from './PrivateRoute';
import {  useSelector } from "react-redux";

function App() {
  
  const { user } = useSelector(state => {
    return state.auth;
  });

  return (
    <Router>
      <AdminLayout>
        <Switch>
          <PrivateRoute path="/data" exact component={Overview} />
          <PrivateRoute path="/data/Categories" exact component={Categories} />
          <PrivateRoute path="/data/topics" exact component={Topics} />
          <PrivateRoute path="/data/Specializations" exact component={Specialization} />
          <PrivateRoute path="/data/SubSpecialization/:id" exact component={SubSpecialization} />
          <PrivateRoute path="/data/Feedback" exact component={Feedback} />
          <Route path="/login" component={Login} />
          <Redirect from="/" to="/login" />
        </Switch>
      </AdminLayout>
    </Router>
  );
}

export default App;
