import { ComponentProps, useEffect, useState } from 'react';
import { Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText } from 'reactstrap';
import format from 'date-fns/format';
import type Account from '../../electron/db/account/Account';
import { getAll } from '../core/account';

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
};

const Entry = ({ visible }: Props) => {
  const [amount, setAmount] = useState<number>(0);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [choosenAccount, setChoosenAccount] = useState<Account | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const init = async () => {
      const a = await getAll();
      setAccounts(a);
    };
    init();
  }, []);

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
        <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
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

    </Container>
  );
};

export default Entry;
