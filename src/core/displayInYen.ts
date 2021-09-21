function displayInYen(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0
  }).format(amount);
}

export default displayInYen;
