import type { WebviewTag } from "electron";
import { useRef } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import BrowserTab from "../components/BrowserTab";
import Entry from "../Entry";

const PRESTIA_URL = 'https://login.smbctb.co.jp/ib/portal/POSNIN1prestiatop.prst?LOCALE=en_JP';

type Props = {
  visible: boolean;
};

const Prestia = ({ visible }: Props) => {
  const webViewRef = useRef<WebviewTag>(null);

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

  return (
    <Container style={{ display: visible ? 'block' : 'none' }}>
      <Row>
        <Col xs={4}>
          <Entry visible />
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
