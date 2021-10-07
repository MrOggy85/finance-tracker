import {
  Switch,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import styles from './App.module.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Future from './pages/Future';
import DailyCheckIn from './pages/DailyCheckIn';
import Category from './pages/Category';
import QuickEntry from './pages/QuickEntry';
import WithRedux from './core/redux/WithRedux';
import BankTab from './components/BankTab';
import { ComponentProps } from 'react';
import autoLoginPrestia from './core/autoLoginPrestia';
import autoLoginRakutenBank from './core/autoLoginRakutenBank';

const QuickEntryWithRedux = WithRedux(QuickEntry);
const BankTabWithRedux = WithRedux<ComponentProps<typeof BankTab>>(BankTab);
const CategoryWithRedux = WithRedux<ComponentProps<typeof Category>>(Category);

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
        <NavItem>
          <LinkItem url="/rakuten-bank" text="楽天銀行" />
        </NavItem>
        <NavItem>
          <LinkItem url="/global-pass" text="Global Pass" />
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
      <BankTabWithRedux
        visible={location.pathname === '/prestia'}
        url="https://login.smbctb.co.jp/ib/portal/POSNIN1prestiatop.prst?LOCALE=en_JP"
        accountName="Prestia"
        bottomBarBackgroundColor="#1C4733"
        bottomBarButtonColor="success"
        autoLogin={autoLoginPrestia}
      />
      <BankTabWithRedux
        visible={location.pathname === '/rakuten-bank'}
        url="https://fes.rakuten-bank.co.jp/MS/main/RbS?CurrentPageID=START&&COMMAND=LOGIN"
        accountName="Rakuten"
        bottomBarBackgroundColor="#CA2C27"
        bottomBarButtonColor="danger"
        autoLogin={autoLoginRakutenBank}
      />
      <BankTabWithRedux
        visible={location.pathname === '/global-pass'}
        url="https://www.debit.vpass.ne.jp/p/login/RW1312010001?cc=01006"
        accountName="Prestia"
        bottomBarBackgroundColor="#CA2C27"
        bottomBarButtonColor="danger"
        autoLogin={autoLoginRakutenBank}
      />
      <QuickEntryWithRedux visible={location.pathname === '/entry'} />
      <CategoryWithRedux visible={location.pathname === '/category'} />
    </>
  );
}

export default App;
