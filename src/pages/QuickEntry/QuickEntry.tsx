import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Col, Row } from 'reactstrap';
import Entry from '../../components/Entry';
import EntryList from '../../components/EntryList';
import { removeEntry, getAll, Account } from '../../core/redux/accountSlice';
import useDispatch from '../../core/redux/useDispatch';

type Props = {
  visible: boolean;
};

const QuickEntry = ({ visible }: Props) => {
  const dispatch = useDispatch();
  const accounts = useSelector(x => x.accounts.accounts);
  const [choosenAccount, setChoosenAccount] = useState<Account | null>(null);
  console.log('choosenAccount', choosenAccount);

  const entries = accounts.find(x => x.id === choosenAccount?.id)?.entries || [];

  const onRemoveEntry = (entryId: number) => {
    dispatch(removeEntry(entryId));
  };

  useEffect(() => {
    if (!visible) {
      return;
    }
    dispatch(getAll());
  }, [visible]);

  return !visible ? null : (
    <Container style={{ display: visible ? 'block' : 'none' }}>
      <Row>
        <Col>
          <Entry visible accounts={accounts} onChosenAccount={(account) => {
            setChoosenAccount(account);
          }} />
        </Col>
        <Col>
          <EntryList accountName={choosenAccount?.name || ''} entries={entries} onRemoveEntry={onRemoveEntry} />
        </Col>
      </Row>
    </Container>
  );
};

export default QuickEntry;
