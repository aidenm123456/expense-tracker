import { Typography, Button } from '@mui/material';

const ExpenseItem = ({ expenseDate, expenseAmount, expenseCategory, expenseDesc, onRemove }) => {
  return (
    <div style={{display: 'flex', marginBottom: '1vh'}}>
      <div style={{width:'15%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography variant='body1'>{expenseDate}</Typography>
      </div>
      <div style={{width:'15%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography variant='body1'>{'$' + expenseAmount}</Typography>
      </div>
      <div style={{width:'15%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography variant='body1'>{expenseCategory}</Typography>
      </div>
      <div style={{width:'35%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography variant='body1'>{expenseDesc}</Typography>
      </div>
      <div style={{width:'20%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Button color='error' variant="outlined" onClick={onRemove}>Remove</Button>
      </div>
    </div>
  )
}

export default ExpenseItem