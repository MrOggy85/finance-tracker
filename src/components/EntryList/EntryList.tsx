import { useEffect, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { FiTrash2 } from "react-icons/fi";
import format from 'date-fns/format';
import type Account from '../../../electron/db/account/Account';
import { get as getAccount } from '../../core/db/account';
import { remove as removeEntry } from '../../core/db/entry';
import displayInYen from '../../core/displayInYen';

type Props = {
  choosenAccount: Account | null;
};

const EntryList = ({ choosenAccount }: Props) => {
  const [entries, setEntries] = useState<Account['entries']>([]);

  async function getEntries(acc: Account | null) {
    if (!acc) {
      setEntries([]);
      return;
    }

    const account = await getAccount(acc.id);
    const e = account.entries as unknown as Account['entries'];;
    setEntries(e);
  }

  useEffect(() => {
    getEntries(choosenAccount);
  }, [choosenAccount]);

  const onRemoveEntry = (entryId: number) => {
    return async () => {
      try {
        await removeEntry(entryId);
        getEntries(choosenAccount);
      } catch (error) {
        alert((error as Error).message);
      }
    };
  };

  return (
    <Container>
      <h2>Entries for {choosenAccount?.name}</h2>
      <ListGroup>
        {entries.sort((a, b) => {
          return a.date.getTime() < b.date.getTime() ? 1 : -1;
        }).map(x => (
          <ListGroupItem key={x.id}>
            <span>{`${format(x.date, "yyyy-MM-dd")}`}<b>{` ${displayInYen(x.amount)} - `}</b></span><em>{`${x.category?.name}`}</em><span style={{ marginRight: 10 }}>{` - ${x.description}`}</span>
            <Button color="danger" type="button" onClick={onRemoveEntry(x.id)} ><FiTrash2 size={20} /></Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default EntryList;
