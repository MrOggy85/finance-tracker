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
import Prestia from './Prestia';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Category from './Category';
import QuickEntry from './QuickEntry';

type LinkItemProps = {
  url: string;
  text: string;
};

const LinkItem = ({ url, text }: LinkItemProps) => {
  return (
    <Link className={`${styles.link} ${window.location.pathname === url ? 'active' : ''}`} to={url}>{text}</Link>
  );
};

function App() {
  let location = useLocation();
  return (
    <>
      <Nav variant="tabs">
        <NavItem>
          <LinkItem url="/" text="Home" />
        </NavItem>
        <NavItem>
          <LinkItem url="/dashboard" text="Dashboard" />
        </NavItem>
        <NavItem>
          <LinkItem url="/future" text="Future" />
        </NavItem>
        <NavItem>
          <LinkItem url="/daily-check-in" text="Check-In" />
        </NavItem>
        <NavItem>
          <LinkItem url="/entry" text="Entry" />
        </NavItem>
        <NavItem>
          <LinkItem url="/category" text="Category" />
        </NavItem>
        <NavItem>
          <LinkItem url="/prestia" text="Prestia" />
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
      <QuickEntry visible={location.pathname === '/entry'} />
      <Category visible={location.pathname === '/category'} />
    </>
  );
}

export default App;
