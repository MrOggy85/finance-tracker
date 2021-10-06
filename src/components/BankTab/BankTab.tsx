import type { WebviewTag } from "electron";
import { useRef } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import BrowserTab from "../../components/BrowserTab";
import Entry from "../../components/Entry";
import EntryList from "../../components/EntryList";
import { useSelector } from "react-redux";
import useDispatch from "../../core/redux/useDispatch";
import { removeEntry } from "../../core/redux/accountSlice";

type Props = {
  visible: boolean;
  url: string;
  accountName: string;
  bottomBarBackgroundColor: string;
  bottomBarButtonColor: string;
  autoLogin: (webViewRef: WebviewTag) => void;
};

const BankTab = ({ visible, url, accountName, bottomBarBackgroundColor, bottomBarButtonColor, autoLogin }: Props) => {
  const dispatch = useDispatch();
  const webViewRef = useRef<WebviewTag>(null);

  const accounts = useSelector(x => x.accounts.accounts);
  const account = accounts.find(x => x.name.toLowerCase().indexOf(accountName.toLowerCase()) !== -1);

  const onLoginClick = () => {
    const webView = webViewRef.current;
    if (!webView) {
      return;
    }
    autoLogin(webView);
  };

  const onRemoveEntry = (entryId: number) => {
    dispatch(removeEntry(entryId));
  };

  return (
    <Container style={{ display: visible ? 'block' : 'none' }}>
      <Row>
        <Col xs={4}>
          <Row>
            <Entry visible accounts={accounts} suggestedAccount={account} />
          </Row>
          {account && (
            <Row><EntryList entries={account.entries} accountName={accountName} onRemoveEntry={onRemoveEntry} /></Row>
          )}

        </Col>
        <Col>
          <BrowserTab
            src={url}
            bottomMargin={88}
            webViewRef={webViewRef}
          />
          <div style={{
            height: 40,
            backgroundColor: bottomBarBackgroundColor,
            paddingLeft: 20,
          }}>
            <Button onClick={onLoginClick} color={bottomBarButtonColor}>Login</Button>{' '}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BankTab;
