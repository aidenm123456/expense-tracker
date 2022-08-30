import { InputLabel, FormControl, OutlinedInput, InputAdornment } from '@mui/material';

const AmountInput = ({ priceValue, onUpdate }) => {
  return (
    <FormControl fullWidth sx={{ width: '60%', marginBottom:'1vh' }}>
      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        value={priceValue}
        onChange={onUpdate}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="Amount"
      />
    </FormControl>
  )
}

export default AmountInput