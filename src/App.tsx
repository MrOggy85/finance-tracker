import styles from './App.module.css';
import Home from './Home';
import Dashboard from './Dashboard';

import {
  Switch,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

function App() {
  let location = useLocation();
  console.log('location', location);
  return (
    <>
      <Nav tabs>
        <NavItem>
          <NavLink className={styles.linkWrapper} active={window.location.pathname === '/'}><Link className={styles.link} to="/">Home</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={styles.linkWrapper} active={window.location.pathname === '/dashboard'}> <Link className={styles.link} to="/dashboard">Dashboard</Link></NavLink>
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
    </>
  );
}

export default App;