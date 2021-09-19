import styles from './App.module.css';
import Home from './Home';
import Dashboard from './Dashboard';
import Future from './Future';
import DailyCheckIn from './DailyCheckIn';
import {
  Switch,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Prestia from './Prestia';
import Entry from './Entry';

function App() {
  let location = useLocation();
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink className={styles.linkWrapper} active={window.location.pathname === '/'}><Link className={styles.link} to="/">Home</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={styles.linkWrapper} active={window.location.pathname === '/dashboard'}> <Link className={styles.link} to="/dashboard">Dashboard</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={styles.linkWrapper} active={window.location.pathname === '/future'}> <Link className={styles.link} to="/future">Future</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={styles.linkWrapper} active={window.location.pathname === '/daily-check-in'}> <Link className={styles.link} to="/daily-check-in">Daily Check-In</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={styles.linkWrapper} active={window.location.pathname === '/entry'}> <Link className={styles.link} to="/entry">Entry</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={styles.linkWrapper} active={window.location.pathname === '/prestia'}> <Link className={styles.link} to="/prestia">Prestia</Link></NavLink>
        </NavItem>
      </Nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
      <Future visible={location.pathname === '/future'} />
      <DailyCheckIn visible={location.pathname === '/daily-check-in'} />
      <Prestia visible={location.pathname === '/prestia'} />
      <Entry visible={location.pathname === '/entry'} />
    </>
  );
}

export default App;
