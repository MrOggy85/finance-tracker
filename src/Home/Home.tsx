import { useEffect, useState } from 'react';
import { Alert, Button, FormGroup, Input, Label } from 'reactstrap';
import { getAll, add, addBalance, remove } from '../core/account';
import type { Awaited } from '../types';

type Account = Awaited<ReturnType<typeof getAll>>[0];

type Selector = Parameters<typeof document['querySelector']>[0];

function getInputValue(selector: Selector) {
  const element = document.querySelector(selector) as HTMLInputElement | null;
  return element?.value || '';
}

const Home = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const init = async () => {
      const a = await getAll();
      setAccounts(a);
    };
    init();
  }, []);

  const onClick = async () => {
    await add(name);
    const a = await getAll();
    setAccounts(a);
  };

  const onDelete = (id: number) => {
    return async () => {
      await remove(id);
      const a = await getAll();
      setAccounts(a);
    };
  };

  const onAddBalance = async (id: number, amount: number, date: Date) => {
    await addBalance(amount, id, date);
    const a = await getAll();
    setAccounts(a);
  };

  return (
    <div>
      <h1>Home</h1>
      <Alert color="primary">
        This is a primary alert — check it out!
      </Alert>
      <FormGroup>
        <Label for="exampleEmail">Account Name</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" value={name} onChange={({ target: { value } }) => {
          setName(value);
        }} />
      </FormGroup>
      <Button onClick={onClick} color="primary">Send</Button>
      {accounts.map((x) => (
        <Alert key={x.id} color="success">
          {x.name}
          {x.balances?.sort((a, b) => {
            return a.date.getTime() < b.date.getTime() ? 1 : -1;
          }).map(x => (
            <p>{x.amount} - {x.date.toDateString()}</p>
          ))}
          <FormGroup>
            <Input type="number" id={`balance-${x.id}`} placeholder="enter new balance" />
            <Input type="date" id={`balance-date-${x.id}`} placeholder="date" />

            <Button onClick={() => {
              const val = getInputValue(`#balance-${x.id}`);
              const date = getInputValue(`#balance-date-${x.id}`);
              onAddBalance(x.id, Number(val), new Date(date));
            }} color="success">Add Balance</Button>
          </FormGroup>
          <Button onClick={onDelete(x.id)} color="danger">Delete</Button>
        </Alert>
      ))}
    </div>
  );
};

export default Home;
