import { useState } from "react";
import { Container, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import Alert from 'react-bootstrap/Alert';
import displayInYen from "../../core/displayInYen";

type InputFieldProps = {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  displayAfter: string;
  disabled?: boolean;
  step?: number;
};

const InputField = ({ label, value, onChange, displayAfter, disabled, step }: InputFieldProps) => (
  <InputGroup>
    <InputGroupAddon addonType="prepend">
      <InputGroupText>{label}</InputGroupText>
    </InputGroupAddon>
    <Input step={step} disabled={disabled} type="number" value={value} onChange={({ target: { value } }) => { onChange(Number(value)); }} />
    <InputGroupAddon addonType="append">{displayAfter}</InputGroupAddon>
  </InputGroup>
);

type Props = {
  visible: boolean;
};

const Future = ({ visible }: Props) => {
  const [initAmount, setInitAmount] = useState(2000000);
  const [monthlySavingAmount, setMonthlySavingAmount] = useState(300000);
  const [birthYear, setBirthYear] = useState(1985);
  const [deathAge, setDeathAge] = useState(100);
  const [retirementYear, setRetirementYear] = useState(50);
  const [interestYear, setInterestYear] = useState(7);
  const [monthlySalaryAfterTax, setMonthlySalaryAfterTax] = useState(789721);

  const yearlySalary = monthlySalaryAfterTax * 12;
  const interest = interestYear / 100;

  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - birthYear;
  const years = retirementYear - currentAge;

  let amount = initAmount;
  for (let index = 0; index < years; index++) {
    const yearlyInterest = amount * interest;
    amount = amount + yearlyInterest + (monthlySavingAmount * 12);
  }

  let retirementFund = amount;
  for (let index = 0; index < deathAge - retirementYear; index++) {
    const yearlyInterest = retirementFund > 0 ? retirementFund * interest : 0;
    retirementFund = retirementFund - yearlySalary + yearlyInterest;
  }

  const displayMonthlySaving = `${displayInYen(monthlySavingAmount)} Percentage of salary: ${(((monthlySavingAmount * 12) / yearlySalary) * 100).toFixed(0)}%`;
  const displayRetirementYear = `Years: ${years} (Retirement Year: ${retirementYear + currentYear})`;

  if (!visible) {
    return null;
  }

  return (
    <Container className="themed-container">
      <h1>Future</h1>
      <InputField
        label="Initial Amount"
        value={initAmount}
        onChange={setInitAmount}
        displayAfter={displayInYen(initAmount)}
      />
      <InputField
        label="Monthly Salary After Tax"
        value={monthlySalaryAfterTax}
        onChange={setMonthlySalaryAfterTax}
        displayAfter={displayInYen(monthlySalaryAfterTax)}
        step={10000}
      />
      <InputField
        label="Monthly Saving"
        value={monthlySavingAmount}
        onChange={setMonthlySavingAmount}
        displayAfter={displayMonthlySaving}
        step={10000}
      />
      <InputField
        label="Birth Year"
        value={birthYear}
        onChange={setBirthYear}
        displayAfter={`Age: ${currentAge.toString()}`}
      />
      <InputField
        label="Death Age"
        value={deathAge}
        onChange={setDeathAge}
        displayAfter={deathAge.toString()}
      />
      <InputField
        label="Retirement Year"
        value={retirementYear}
        onChange={setRetirementYear}
        displayAfter={displayRetirementYear}
      />
      <InputField
        label="Yearly Interest"
        value={interestYear}
        onChange={setInterestYear}
        displayAfter={`${interestYear.toString()}%`}
      />
      <Alert color="primary">
        Total at time of Retirement: {displayInYen(amount)}
      </Alert>
      <Alert color={retirementFund < 0 ? 'danger' : 'success'}>
        Retirement Fund at Death (age: {deathAge}): {displayInYen(retirementFund)}
      </Alert>
    </Container>
  );
};

export default Future;
