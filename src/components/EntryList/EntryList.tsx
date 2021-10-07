import { Container, ListGroup, ListGroupItem, Button, Alert } from 'reactstrap';
import { FiTrash2 } from "react-icons/fi";
import format from 'date-fns/format';
import type { Entry } from '../../core/redux/types';
import displayInYen from '../../core/displayInYen';

type Props = {
  entries: Entry[];
  accountName: string;
  balance: number;
  onRemoveEntry: (entryId: number) => void;
};

const EntryList = ({ entries, accountName, balance, onRemoveEntry }: Props) => {
  const onRemoveEntryClick = (entryId: number) => {
    return () => {
      onRemoveEntry(entryId);
    };
  };

  const entriesCopy = [...entries];

  return (
    <Container>
      <h2>Entries for {accountName}</h2>
      <Alert color={balance < 0 ? 'danger' : 'primary'}>
        Balance: {displayInYen(balance)}
      </Alert>
      <ListGroup>
        {entriesCopy.sort((a, b) => {
          return a.date < b.date ? 1 : -1;
        }).map(x => (
          <ListGroupItem key={x.id}>
            <span>{`${format(x.date, "yyyy-MM-dd")}`}<b>{` ${displayInYen(x.amount)} - `}</b></span><em>{`${x.category?.name}`}</em><span style={{ marginRight: 10 }}>{` - ${x.description}`}</span>
            <Button color="danger" type="button" onClick={onRemoveEntryClick(x.id)} ><FiTrash2 size={20} /></Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default EntryList;
