import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Col, Row } from 'reactstrap';
import Entry from '../../components/Entry';
import EntryList from '../../components/EntryList';
import { removeEntry, getAll } from '../../core/redux/accountSlice';
import type { Account } from '../../core/redux/types';
import useDispatch from '../../core/redux/useDispatch';

type Props = {
  visible: boolean;
};

const QuickEntry = ({ visible }: Props) => {
  const dispatch = useDispatch();
  const accounts = useSelector(x => x.accounts.accounts);
  const categories = useSelector(x => x.category.categories);
  const [choosenAccount, setChoosenAccount] = useState<Account | null>(null);

  const a = accounts.find(x => x.id === choosenAccount?.id);
  const entries = a?.entries || [];

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
    <Container>
      <Row>
        <Col>
          <Entry visible accounts={accounts} categories={categories} onChosenAccount={(account) => {
            setChoosenAccount(account);
          }} />
        </Col>
        <Col>
          <EntryList accountName={choosenAccount?.name || ''} entries={entries} onRemoveEntry={onRemoveEntry} balance={a?.balance || 0} />
        </Col>
      </Row>
    </Container>
  );
};

export default QuickEntry;
