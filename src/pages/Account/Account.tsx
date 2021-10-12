import { Button, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import { useState } from 'react';
import { FiTrash2, FiEdit, FiCheck, FiX } from "react-icons/fi";
import type { Account, Category } from '../../core/redux/types';
import { removeEntry, updateEntry } from '../../core/redux/accountSlice';
import useDispatch from '../../core/redux/useDispatch';
import displayInYen from '../../core/displayInYen';

const AccountComp = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(x => x.accounts.accounts);
  const categories = useSelector(x => x.category.categories);
  const [choosenAccountId, setChoosenAccountId] = useState<Account['id'] | null>(null);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [isEditingId, setIsEditingId] = useState(-1);

  const toggleAccountDropDown = () => setAccountDropdownOpen(!accountDropdownOpen);

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [choosenCategory, setChoosenCategory] = useState<Category | null>(null);

  const onRemoveEntryClick = (entryId: number) => {
    return () => {
      dispatch(removeEntry(entryId));
    };
  };
  const onEditEntryClick = (entryId: number) => {
    return () => {
      const account = accounts.find(x => x.id === choosenAccountId);
      const entries = account?.entries || [];
      const entry = entries.find(x => x.id === entryId);
      if (!entry) {
        alert(`entry id ${entryId} not found!`);
        return;
      }

      setAmount(entry.amount);
      setDate(new Date(entry.date));
      setChoosenCategory(entry.category);
      setDescription(entry.description);

      setIsEditingId(entryId);
    };
  };

  const onUpdateEntryClick = async () => {
    if (!choosenCategory) {
      alert('No Category chosen!');
      return;
    }
    if (!choosenAccountId) {
      alert('No Account chosen!');
      return;
    }

    await dispatch(updateEntry({
      id: isEditingId,
      amount,
      date,
      categoryId: choosenCategory.id,
      accountId: choosenAccountId,
      description,
    }));

    setIsEditingId(-1);
    setAmount(0);
    setDate(new Date());
    setDescription('');
    setChoosenCategory(null);
  };

  const onCancelClick = () => {
    setIsEditingId(-1);
    setAmount(0);
    setDate(new Date());
    setDescription('');
    setChoosenCategory(null);
  };

  const toggleCategoryDropDown = () => setCategoryDropdownOpen(!categoryDropdownOpen);

  const account = accounts.find(x => x.id === choosenAccountId);
  const entriesCopy = [...account?.entries || []];

  return (
    <Container>
      <InputGroup style={{ marginBottom: 5 }}>
        <InputGroupAddon addonType="prepend" style={{ marginRight: 5 }}>
          <InputGroupText>Account</InputGroupText>
        </InputGroupAddon>
        <InputGroupButtonDropdown addonType="append" isOpen={accountDropdownOpen} toggle={toggleAccountDropDown}>
          <DropdownToggle caret color="primary">
            {account?.name || 'Choose Account'}
          </DropdownToggle>
          <DropdownMenu>
            {accounts.map(x => (
              <DropdownItem key={x.id} onClick={() => {
                const acc = accounts.find(a => a.id === x.id);
                if (!acc) {
                  throw new Error(`No Account fouund... ${x.id}`);
                }
                setChoosenAccountId(acc.id);
              }}>{x.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </InputGroupButtonDropdown>
      </InputGroup>

      <Table bordered>
        <thead>
          <tr>
            <th style={{ width: '115px' }}></th>
            <th style={{ width: '50px' }}>ID</th>
            <th style={{ width: '115px' }}>Date</th>
            <th style={{ width: '115px' }}>Amount</th>
            <th style={{ width: '130px' }}>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {entriesCopy.sort((a, b) => {
            return a.date < b.date ? 1 : -1;
          }).map(x => isEditingId === x.id ? (
            <tr key={x.id}>
              <td>
                <Button color="success" type="button" onClick={onUpdateEntryClick} style={{ marginRight: 5 }}><FiCheck size={20} /></Button>
                <Button color="danger" type="button" onClick={onCancelClick}><FiX size={20} /></Button>
              </td>
              <td>{x.id}</td>
              <td>
                <Input
                  type="date"
                  value={format(date, "yyyy-MM-dd")}
                  onChange={({ target: { value } }) => {
                    if (!value) {
                      return;
                    }
                    setDate(new Date(value));
                  }}
                />
              </td>
              <td>
                <Input
                  type="number"
                  value={amount === 0 ? '' : amount}
                  onChange={({ target: { value } }) => { setAmount(Number(value)); }}
                />
              </td>
              <td>
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
                  </DropdownMenu> </InputGroupButtonDropdown></td>
              <td><Input
                type="text"
                value={description}
                onChange={({ target: { value } }) => { setDescription(value); }}
              /></td>
            </tr>
          ) : (
            <tr key={x.id}>
              <td>
                <Button color="primary" type="button" onClick={onEditEntryClick(x.id)} style={{ marginRight: 5 }} ><FiEdit size={20} /></Button>
                <Button color="danger" type="button" onClick={onRemoveEntryClick(x.id)} ><FiTrash2 size={20} /></Button>
              </td>
              <td>{x.id}</td>
              <td>{format(new Date(x.date), 'yyyy-MM-dd')}</td>
              <td>{displayInYen(x.amount)}</td>
              <td>{x.category.name}</td>
              <td>{x.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AccountComp;
