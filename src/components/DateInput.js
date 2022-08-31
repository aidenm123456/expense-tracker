import { Box, TextField} from '@mui/material';
import InputMask from 'react-input-mask';

const DateInput = ({ dateValue, onUpdate }) => {
  return (
    <div style={MainDiv}>
      <Box component="form" sx={{'& > :not(style)': { width: '100%' }}} noValidate autoComplete="off" >
        <InputMask mask="9999-99-99" value={dateValue} onChange={onUpdate} maskChar=" ">
          {()=> <TextField required id="outlined-basic" label="YYYY-MM-DD" variant="outlined" value={dateValue} onChange={onUpdate}/>}
        </InputMask>
      </Box>
    </div>
  )
}

const MainDiv = { 
  width:'60%', 
  marginBottom:'1vh'
}

export default DateInput