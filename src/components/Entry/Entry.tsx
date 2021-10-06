import { useEffect, useState } from 'react';
import { Button, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText } from 'reactstrap';
import format from 'date-fns/format';
import type { TransferCategoryName } from '../../../electron/db/category/repo';
import { getAll as getAllCategories } from '../../core/db/category';
import InputField from './InputField';
import { Account, addEntry, addTransfer, Category } from '../../core/redux/accountSlice';
import useDispatch from '../../core/redux/useDispatch';

const transferCategoryName: TransferCategoryName = 'Transfer';

type Props = {
  visible: boolean;
  accounts: Account[];
  suggestedAccount?: Account;
  onChosenAccount?: (account: Account | null) => void;
  onSubmit?: (account: Account) => void;
};

const Entry = ({ visible, accounts, suggestedAccount, onChosenAccount, onSubmit }: Props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(0);

  const [choosenAccount, setChoosenAccount] = useState<Account | null>(null);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [choosenDestinationAccount, setChoosenDestinationAccount] = useState<Account | null>(null);
  const [destinationAccountDropdownOpen, setDestinationAccountDropdownOpen] = useState(false);

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [choosenCategory, setChoosenCategory] = useState<Category | null>(null);

  const toggleAccountDropDown = () => setAccountDropdownOpen(!accountDropdownOpen);
  const toggleDestinationAccountDropDown = () => setDestinationAccountDropdownOpen(!destinationAccountDropdownOpen);
  const toggleCategoryDropDown = () => setCategoryDropdownOpen(!categoryDropdownOpen);

  useEffect(() => {
    if (suggestedAccount) {
      setChoosenAccount(suggestedAccount);
    }
  }, [suggestedAccount]);

  const onRefreshClick = async () => {
    const c = await getAllCategories();
    setCategories(c);
  };

  const onAddClick = async () => {
    if (!choosenAccount) {
      alert('No Chosen Account!');
      return;
    }
    if (!choosenCategory) {
      alert('No Chosen Category!');
      return;
    }
    if (choosenCategory.name === transferCategoryName && !choosenDestinationAccount) {
      alert('No Chosen Destination Account!');
      return;
    }

    try {
      if (choosenCategory.name === transferCategoryName) {
        await dispatch(addTransfer({
          amount,
          date,
          description,
          sourceAccountId: choosenAccount.id,
          destinationAccountId: choosenDestinationAccount?.id || -1
        }));
      } else {
        await dispatch(addEntry({
          amount,
          date,
          description,
          accountId: choosenAccount.id,
          categoryId: choosenCategory.id
        }));
      }
    } catch (err) {
      console.error(err);
      alert(`DB error: ${err}`);
    }

    setAmount(0);
    setDate(new Date());
    setDescription('');
    setChoosenCategory(null);
    setChoosenDestinationAccount(null);
    if (onSubmit) {
      onSubmit(choosenAccount);
    }
  };

  return !visible ? null : (
    <Container>
      <h1>Entry</h1>
      <InputField
        label="Amount"
        value={amount}
        onChange={setAmount}
        displayAfter="JPY"
      />

      <InputGroup style={{ marginBottom: 5 }}>
        <InputGroupAddon addonType="prepend" style={{ marginRight: 5 }}>
          <InputGroupText>{choosenCategory?.name === transferCategoryName ? 'Source ' : ''} Account</InputGroupText>
        </InputGroupAddon>
        <InputGroupButtonDropdown addonType="append" isOpen={accountDropdownOpen} toggle={toggleAccountDropDown}>
          <DropdownToggle caret color="primary">
            {choosenAccount?.name || 'Choose Account'}
          </DropdownToggle>
          <DropdownMenu>
            {accounts.map(x => (
              <DropdownItem key={x.id} onClick={() => {
                const acc = accounts.find(a => a.id === x.id);
                if (!acc) {
                  throw new Error(`No Account fouund... ${x.id}`);
                }
                setChoosenAccount(acc);
                if (onChosenAccount) {
                  onChosenAccount(acc);
                }

              }}>{x.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </InputGroupButtonDropdown>
      </InputGroup>

      {choosenCategory?.name === transferCategoryName && (
        <InputGroup style={{ marginBottom: 5 }}>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Destination Account</InputGroupText>
          </InputGroupAddon>
          <InputGroupButtonDropdown addonType="append" isOpen={destinationAccountDropdownOpen} toggle={toggleDestinationAccountDropDown}>
            <DropdownToggle caret color="primary">
              {choosenDestinationAccount?.name || 'Choose Destination Account'}
            </DropdownToggle>
            <DropdownMenu>
              {accounts
                .filter(x => x.id !== choosenAccount?.id)
                .map(x => (
                  <DropdownItem key={x.id} onClick={() => {
                    const acc = accounts.find(a => a.id === x.id);
                    if (!acc) {
                      throw new Error(`No Account fouund... ${x.id}`);
                    }
                    setChoosenDestinationAccount(acc);

                  }}>{x.name}</DropdownItem>
                ))}
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>
      )}

      <InputGroup style={{ marginBottom: 5 }}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Date</InputGroupText>
        </InputGroupAddon>
        <Input
          type="date"
          value={format(date, "yyyy-MM-dd")}
          onChange={({ target: { value } }) => { setDate(new Date(value)); }}
        />
      </InputGroup>

      <InputGroup style={{ marginBottom: 5 }}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Description</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          value={description}
          onChange={({ target: { value } }) => { setDescription(value); }}
        />
        <InputGroupAddon addonType="append">{`${description.length} chars`}</InputGroupAddon>
      </InputGroup>

      <InputGroup style={{ marginBottom: 5 }}>
        <InputGroupAddon addonType="prepend" style={{ marginRight: 5 }}>
          <InputGroupText>Category</InputGroupText>
        </InputGroupAddon>
        <div>
          <InputGroupButtonDropdown addonType="append" isOpen={categoryDropdownOpen} toggle={toggleCategoryDropDown} style={{ marginRight: 5 }}>
            <DropdownToggle caret color="primary">
              {choosenCategory?.name || 'Choose Category'}
            </DropdownToggle>
            <DropdownMenu>
              {categories.map(x => (
                <DropdownItem key={x.id} onClick={() => {
                  const cat = categories.find(c => c.id === x.id);
                  if (!cat) {
                    throw new Error(`No Category fouund... ${x.id}`);
                  }
                  setChoosenCategory(cat);
                }}>{x.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </div>

        <InputGroupAddon addonType="append"><Button color="success" onClick={onRefreshClick}>Refresh</Button></InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <Button color="primary" onClick={onAddClick}>Add</Button>
      </InputGroup>

    </Container>
  );
};

export default Entry;
