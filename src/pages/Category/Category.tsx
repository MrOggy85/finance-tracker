import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText } from 'reactstrap';
import { getAll as getAllCategories, add, remove, update } from '../../core/db/category';
import type CategoryEntity from '../../../electron/db/category/Category';

type Props = {
  visible: boolean;
};

const Category = ({ visible }: Props) => {
  const [name, setName] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [choosenCategory, setChoosenCategory] = useState<CategoryEntity | null>(null);

  const toggleCategoryDropDown = () => setCategoryDropdownOpen(!categoryDropdownOpen);

  useEffect(() => {
    const init = async () => {
      const c = await getAllCategories();
      setCategories(c);
    };
    init();
  }, []);

  const onNewClick = async () => {
    await add(name);
    setName('');

    const c = await getAllCategories();
    setCategories(c);
  };

  const onChangeClick = async () => {
    if (!choosenCategory) {
      throw new Error('No Chosen Category!');
    }

    await update(choosenCategory.id, name);
    setName('');
    setChoosenCategory(null);

    const c = await getAllCategories();
    setCategories(c);
  };

  const onDeleteClick = async () => {
    if (!choosenCategory) {
      throw new Error('No Chosen Category!');
    }

    await remove(choosenCategory.id);
    setName('');
    setChoosenCategory(null);

    const c = await getAllCategories();
    setCategories(c);
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

export default Category;
