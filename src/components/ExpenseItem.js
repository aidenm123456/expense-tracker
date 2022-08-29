import React from 'react'
import { Typography, Button } from '@mui/material';

const ExpenseItem = ({ expenseDate, expenseAmount, expenseCategory, expenseDesc, onRemove }) => {
  return (
    <div style={{display: 'flex'}}>
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
        <Button variant="contained" onClick={onRemove}>Remove</Button>
      </div>
    </div>
  )
}

export default ExpenseItem