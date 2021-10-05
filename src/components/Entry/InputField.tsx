import { ComponentProps } from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

type Props = {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  displayAfter?: string;
  disabled?: boolean;
  step?: number;
  type?: ComponentProps<typeof Input>['type'];
};

const InputField = ({ label, value, onChange, displayAfter, disabled, step, type }: Props) => (
  <InputGroup style={{ marginBottom: 5 }}>
    <InputGroupAddon addonType="prepend" >
      <InputGroupText>{label} </InputGroupText>
    </InputGroupAddon>
    <Input
      step={step}
      disabled={disabled}
      type={type || 'number'}
      value={value === 0 ? '' : value}
      onChange={({ target: { value } }) => { onChange(Number(value)); }}
    />
    <InputGroupAddon addonType="append" > {displayAfter} </InputGroupAddon>
  </InputGroup>
);

export default InputField;
