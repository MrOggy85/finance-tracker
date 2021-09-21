import { useEffect, useState } from 'react';
import { Container, Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import format from 'date-fns/format';
import type Account from '../../electron/db/account/Account';
import { get as getAccount } from '../core/db/account';
import Entry from '../Entry';
import displayInYen from '../core/displayInYen';


type Props = {
  visible: boolean;
};

const QuickEntry = ({ visible }: Props) => {
  const [choosenAccount, setChoosenAccount] = useState<Account | null>(null);
  const [entries, setEntries] = useState<Account['entries']>([]);

  useEffect(() => {
    async function getEntries() {
      if (!choosenAccount) {
        setEntries([]);
        return;
      }

      const account = await getAccount(choosenAccount.id);
      const e = account.entries as unknown as Account['entries'];;
      setEntries(e);
    }
    getEntries();
  }, [choosenAccount]);

  return !visible ? null : (
    <Container style={{ display: visible ? 'block' : 'none' }}>
      <Row>
        <Col xs={8}>
          <Entry visible onChosenAccount={(account) => {
            setChoosenAccount(account);
          }} />
        </Col>
        <Col>
          <h2>Entries for {choosenAccount?.name}</h2>
          <ListGroup>


            {entries.sort((a, b) => {
              return a.date.getTime() < b.date.getTime() ? 1 : -1;
            }).map(x => (
              <ListGroupItem key={x.id}>
                {`${format(x.date, "yyyy-MM-dd")} - ${displayInYen(x.amount)} - ${x.category?.name}`}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default QuickEntry;
