import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText } from 'reactstrap';
import useDispatch from '../../core/redux/useDispatch';
import type { Category } from '../../core/redux/types';
import { getAll, add, update, remove } from '../../core/redux/categorySlice';

type Props = {
  visible: boolean;
};

const CategoryAdmin = ({ visible }: Props) => {
  const dispatch = useDispatch();
  const categories = useSelector(x => x.category.categories);

  const [name, setName] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [choosenCategory, setChoosenCategory] = useState<Category | null>(null);

  const toggleCategoryDropDown = () => setCategoryDropdownOpen(!categoryDropdownOpen);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  const onNewClick = async () => {
    await dispatch(add(name));
    setName('');
  };

  const onChangeClick = async () => {
    if (!choosenCategory) {
      throw new Error('No Chosen Category!');
    }

    await dispatch(update([choosenCategory.id, name]));
    setName('');
    setChoosenCategory(null);
  };

  const onDeleteClick = async () => {
    if (!choosenCategory) {
      throw new Error('No Chosen Category!');
    }

    await dispatch(remove(choosenCategory.id));
    setName('');
    setChoosenCategory(null);
  };

  return !visible ? null : (
    <Container>
      <h1>Category</h1>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Category</InputGroupText>
        </InputGroupAddon>
        <InputGroupButtonDropdown addonType="append" isOpen={categoryDropdownOpen} toggle={toggleCategoryDropDown}>
          <DropdownToggle caret color="primary">
            {choosenCategory?.name || 'Choose Category'}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => {
              setChoosenCategory(null);
              setName('');
            }}>
              New
            </DropdownItem>
            {categories.map(x => (
              <DropdownItem key={x.id} onClick={() => {
                const cat = categories.find(c => c.id === x.id);
                if (!cat) {
                  throw new Error(`No Category fouund... ${x.id}`);
                }
                setChoosenCategory(cat);
                setName(cat.name);
              }}>{x.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </InputGroupButtonDropdown>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Id</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          value={choosenCategory?.id || 'New'}
          disabled
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Name</InputGroupText>
        </InputGroupAddon>
        <Input
          type="text"
          value={name}
          onChange={({ target: { value } }) => { setName(value); }}
        />
      </InputGroup>

      {choosenCategory?.id ? (
        <ButtonGroup vertical>
          <Button color="primary" onClick={onChangeClick}>Change</Button>
          <Button color="danger" onClick={onDeleteClick}>Delete</Button>
        </ButtonGroup>
      ) : (
        <Button onClick={onNewClick} color="primary">Add New Category</Button>
      )}


    </Container>
  );
};

export default CategoryAdmin;
