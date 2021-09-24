import type { WebviewTag } from "electron";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import type Account from "../../electron/db/account/Account";
import BrowserTab from "../components/BrowserTab";
import { getAll } from "../core/db/account";
import Entry from "../Entry";
import EntryList from "../EntryList";

const PRESTIA_URL = 'https://login.smbctb.co.jp/ib/portal/POSNIN1prestiatop.prst?LOCALE=en_JP';

type Props = {
  visible: boolean;
};

const Prestia = ({ visible }: Props) => {
  const webViewRef = useRef<WebviewTag>(null);

  const [prestiaAccount, setPrestiaAccount] = useState<Account | null>(null);

  const onLoginClick = async () => {
    const username = process.env.REACT_APP_PRESTIA_USERNAME;
    if (!username) {
      throw new Error('REACT_APP_PRESTIA_USERNAME not set!');
    }
    const password = process.env.REACT_APP_PRESTIA_PASSWORD;
    if (!password) {
      throw new Error('REACT_APP_PRESTIA_PASSWORD not set!');
    }

    await webViewRef.current?.insertText(username);
    await webViewRef.current?.sendInputEvent({
      keyCode: 'Tab',
      type: 'keyDown'
    });
    await webViewRef.current?.sendInputEvent({
      keyCode: 'Tab',
      type: 'keyUp'
    });
    await webViewRef.current?.sendInputEvent({
      keyCode: 'Tab',
      type: 'keyDown'
    });
    await webViewRef.current?.sendInputEvent({
      keyCode: 'Tab',
      type: 'keyUp'
    });
    await webViewRef.current?.insertText(password);
    await webViewRef.current?.sendInputEvent({
      keyCode: 'Tab',
      type: 'keyDown'
    });
    await webViewRef.current?.sendInputEvent({
      keyCode: 'Tab',
      type: 'keyUp'
    });
    await webViewRef.current?.sendInputEvent({
      keyCode: 'Tab',
      type: 'keyDown'
    });
    await webViewRef.current?.sendInputEvent({
      keyCode: 'Tab',
      type: 'keyUp'
    });
    await webViewRef.current?.sendInputEvent({
      keyCode: 'Enter',
      type: 'keyDown'
    });
    await webViewRef.current?.sendInputEvent({
      keyCode: 'Enter',
      type: 'keyUp'
    });
  };

  useEffect(() => {
    const init = async () => {
      const a = await getAll();
      const pAccount = a.find(x => x.name.toLowerCase().indexOf('prestia') !== -1);
      if (!pAccount) {
        alert('No Prestia account found...');
        return;
      }
      setPrestiaAccount(pAccount);
    };
    init();
  }, []);

  return (
    <Container style={{ display: visible ? 'block' : 'none' }}>
      <Row>
        <Col xs={4}>

          <Row><Entry visible /></Row>
          {prestiaAccount && (
            <Row><EntryList choosenAccount={prestiaAccount} /></Row>
          )}
        </Col>
        <Col>
          <BrowserTab
            src={PRESTIA_URL}
            bottomMargin={88}
            webViewRef={webViewRef}
          />
          <div style={{
            height: 40,
            backgroundColor: '#1C4733',
            paddingLeft: 20,
          }}>
            <Button onClick={onLoginClick} color="success">Login</Button>{' '}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Prestia;
