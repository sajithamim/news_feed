import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Overview from './pages/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import Team from './pages/Team';
import Specialization from './components/specialization/Specialization';
function App() {
  return (
    <Router>
      <div className="wrapper">
      <Sidebar />
      <Switch >
        <div className="main-panel">
        <Route path='/data' exact component={Overview} />
        <Route path='/reports' exact component={Reports} />
        <Route path='/data/Specializations' exact component={Specialization} />
        <Route path='/reports/reports2' exact component={ReportsTwo} />
        <Route path='/reports/reports3' exact component={ReportsThree} />
        <Route path='/team' exact component={Team} />
        </div>
        
      </Switch>
      </div>
    </Router>
  );
}

export default App;
