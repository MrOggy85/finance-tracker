import { Container, Table } from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
import displayInYen from '../../core/displayInYen';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import { useEffect, useState } from 'react';

const TODAY = new Date();

type MonthlyBalance = Record<string, number>;
type AccountPerMonth = Record<string, MonthlyBalance>;

const Home = () => {
  const accounts = useSelector(x => x.accounts.accounts);
  const [totalBalance, setTotalBalance] = useState(0);
  const [accountPerMonth, setAccountPerMonth] = useState<AccountPerMonth>({});

  // let totalBalance = 0;

  useEffect(() => {
    let tb = 0;
    const apm: AccountPerMonth = {};

    accounts.forEach(x => {
      tb += x.balance;

      const entriesPerMonth: MonthlyBalance = {};

      x.entries.forEach(y => {
        const month = format(new Date(y.date), 'yyyyMM');
        let balance = entriesPerMonth[month] || 0;
        balance += y.amount;
        entriesPerMonth[month] = balance;
      });

      apm[x.name] = entriesPerMonth;
    });

    setTotalBalance(tb);
    setAccountPerMonth(apm);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);


  return (
    <Container>
      <Alert color={totalBalance > 0 ? 'success' : 'danger'}>
        Total: {displayInYen(totalBalance)}
      </Alert>

      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Account</th>
            {Array.from(Array(6)).map((_, i) => {
              const date = new Date();
              date.setMonth(TODAY.getMonth() - i);
              return (
                <th key={i}>
                  {date.getFullYear()}-{date.getMonth() + 1}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Object.keys(accountPerMonth).map(x => {
            const account = accountPerMonth[x];

            return (
              <tr key={x}>
                <td>?</td>
                <td>{x}</td>
                {Array.from(Array(6)).map((_, i) => {
                  const date = new Date();
                  date.setMonth(TODAY.getMonth() - i);
                  const month = format(date, 'yyyyMM');
                  const b = account[month];
                  return (
                    <td key={i}>
                      {b > 0 || b < 0 ? displayInYen(b) : ''}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
