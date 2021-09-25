import { useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import type Account from '../../../electron/db/account/Account';
import Entry from '../../components/Entry';
import EntryList from '../../components/EntryList';

type Props = {
  visible: boolean;
};

const QuickEntry = ({ visible }: Props) => {
  const [choosenAccount, setChoosenAccount] = useState<Account | null>(null);

  return !visible ? null : (
    <Container style={{ display: visible ? 'block' : 'none' }}>
      <Row>
        <Col>
          <Entry visible onChosenAccount={(account) => {
            setChoosenAccount(account);
          }} />
        </Col>
        <Col>
          <EntryList choosenAccount={choosenAccount} />
        </Col>
      </Row>
    </Container>
  );
};

export default QuickEntry;
