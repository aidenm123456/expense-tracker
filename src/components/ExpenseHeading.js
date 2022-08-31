import { Typography } from '@mui/material';

const ExpenseHeading = () => {
  return (
    <div style={HeadingContainer}>
      <div style={{width:'15%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography style={{ fontWeight: 600 }} variant='body1'>Date</Typography>
      </div>
      <div style={{width:'15%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography style={{ fontWeight: 600 }} variant='body1'>Price</Typography>
      </div>
      <div style={{width:'15%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography style={{ fontWeight: 600 }} variant='body1'>Category</Typography>
      </div>
      <div style={{width:'35%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography style={{ fontWeight: 600 }} variant='body1'>Description</Typography>
      </div>
      <div style={{width:'20%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography style={{ fontWeight: 600 }} variant='body1'>Delete</Typography>
      </div>
    </div>
  )
}

const HeadingContainer = {
  display: 'flex',
  marginTop: '2.5vh', 
  marginBottom: '1vh'
}

export default ExpenseHeading