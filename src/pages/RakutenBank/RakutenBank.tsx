import type { WebviewTag } from "electron";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import type Account from "../../../electron/db/account/Account";
import { getAll } from "../../core/db/account";
import BrowserTab from "../../components/BrowserTab";
import Entry from "../../components/Entry";
import EntryList from "../../components/EntryList";

const URL = 'https://fes.rakuten-bank.co.jp/MS/main/RbS?CurrentPageID=START&&COMMAND=LOGIN';

type Props = {
  visible: boolean;
};

const RakutenBank = ({ visible }: Props) => {
  const webViewRef = useRef<WebviewTag>(null);

  const [account, setAccount] = useState<Account | null>(null);

  const onLoginClick = async () => {
    const username = process.env.REACT_APP_RAKUTEN_BANK_USERNAME;
    if (!username) {
      throw new Error('REACT_APP_RAKUTEN_BANK_USERNAME not set!');
    }
    const password = process.env.REACT_APP_RAKUTEN_BANK_PASSWORD;
    if (!password) {
      throw new Error('REACT_APP_RAKUTEN_BANK_PASSWORD not set!');
    }

    alert('Not implemented');
  };

  useEffect(() => {
    const init = async () => {
      const allAccounts = await getAll();
      const a = allAccounts.find(x => x.name.toLowerCase().indexOf('rakuten') !== -1);
      if (!a) {
        alert('No Rakuten Bank account found...');
        return;
      }
      setAccount(a);
    };
    init();
  }, []);

  return (
    <Container style={{ display: visible ? 'block' : 'none' }}>
      <Row>
        <Col xs={4}>
          <Row>
            <Entry visible suggestedAccount={account || undefined} />
          </Row>
          {account && (
            <Row><EntryList choosenAccount={account} /></Row>
          )}
        </Col>
        <Col>
          <BrowserTab
            src={URL}
            bottomMargin={88}
            webViewRef={webViewRef}
          />
          <div style={{
            height: 40,
            backgroundColor: '#CA2C27',
            paddingLeft: 20,
          }}>
            <Button onClick={onLoginClick} disabled color="danger">Login</Button>{' '}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RakutenBank;
