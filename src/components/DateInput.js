import { Box, TextField} from '@mui/material';

const DateInput = ({ dateValue, onUpdate }) => {
  return (
    <div style={MainDiv}>
      <Box component="form" sx={{'& > :not(style)': { width: '100%' }}} noValidate autoComplete="off" >
        <TextField required id="outlined-basic" label="YYYY-MM-DD" variant="outlined" value={dateValue} onChange={onUpdate}/>
      </Box>
    </div>
  )
}

const MainDiv = { 
  width:'60%', 
  marginBottom:'1vh'
}

export default DateInput