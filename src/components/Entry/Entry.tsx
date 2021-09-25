import { ComponentProps, useEffect, useState } from 'react';
import { Button, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText } from 'reactstrap';
import format from 'date-fns/format';
import type Account from '../../../electron/db/account/Account';
import type Category from '../../../electron/db/category/Category';
import { getAll as getAllAccount, addEntry } from '../../core/db/account';
import { getAll as getAllCategories } from '../../core/db/category';

type InputFieldProps = {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  displayAfter?: string;
  disabled?: boolean;
  step?: number;
  type?: ComponentProps<typeof Input>['type'];
};

const InputField = ({ label, value, onChange, displayAfter, disabled, step, type }: InputFieldProps) => (
  <InputGroup>
    <InputGroupAddon addonType="prepend">
      <InputGroupText>{label}</InputGroupText>
    </InputGroupAddon>
    <Input
      step={step}
      disabled={disabled}
      type={type || 'number'}
      value={value === 0 ? '' : value}
      onChange={({ target: { value } }) => { onChange(Number(value)); }}
    />
    <InputGroupAddon addonType="append">{displayAfter}</InputGroupAddon>
  </InputGroup>
);

type Props = {
  visible: boolean;
  suggestedAccount?: Account;
  onChosenAccount?: (account: Account | null) => void;
};

const Entry = ({ visible, suggestedAccount, onChosenAccount }: Props) => {
  const [amount, setAmount] = useState<number>(0);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [choosenAccount, setChoosenAccount] = useState<Account | null>(null);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [choosenCategory, setChoosenCategory] = useState<Category | null>(null);

  const toggleAccountDropDown = () => setAccountDropdownOpen(!accountDropdownOpen);
  const toggleCategoryDropDown = () => setCategoryDropdownOpen(!categoryDropdownOpen);

  useEffect(() => {
    const init = async () => {
      const a = await getAllAccount();
      setAccounts(a);

      const c = await getAllCategories();
      setCategories(c);
    };
    init();
  }, []);

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

    try {
      await addEntry({
        amount,
        date,
        description,
      }, choosenAccount.id, choosenCategory.id);
    } catch (err) {
      console.error(err);
      alert(`DB error: ${err}`);
    }

    setAmount(0);
    setDate(new Date());
    setDescription('');
    setChoosenCategory(null);
    setChoosenAccount(null);
    if (onChosenAccount) {
      onChosenAccount(null);
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

      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Account</InputGroupText>
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

      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Date</InputGroupText>
        </InputGroupAddon>
        <Input
          type="date"
          value={format(date, "yyyy-MM-dd")}
          onChange={({ target: { value } }) => { setDate(new Date(value)); }}
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Description</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          value={description}
          onChange={({ target: { value } }) => { setDescription(value); }}
        />
        <InputGroupAddon addonType="append">{`${description.length} characters`}</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Category</InputGroupText>
        </InputGroupAddon>
        <div>
          <InputGroupButtonDropdown addonType="append" isOpen={categoryDropdownOpen} toggle={toggleCategoryDropDown}>
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
