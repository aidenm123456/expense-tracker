import { Box, TextField} from '@mui/material';

const DateInput = ({ dateValue, onUpdate }) => {
  return (
    <div style={{ width:'60%', marginBottom:'1vh'}}>
      <Box component="form" sx={{'& > :not(style)': { width: '100%' }}} noValidate autoComplete="off" >
        <TextField id="outlined-basic" label="YYYY-MM-DD" variant="outlined" value={dateValue} onChange={onUpdate}/>
      </Box>
    </div>
  )
}

export default DateInput