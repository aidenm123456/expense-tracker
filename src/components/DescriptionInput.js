import { Box, TextField} from '@mui/material';

const DescriptionInput = ({ descriptionValue, onUpdate }) => {
  return (
    <div style={MainDiv}>
      <Box component="form" sx={{'& > :not(style)': { width: '100%' }}} noValidate autoComplete="off" >
        <TextField required id="outlined-basic" label="Description" variant="outlined" value={descriptionValue} onChange={onUpdate}/>
      </Box>
    </div>
  )
}

const MainDiv = { 
  width:'60%',
  marginBottom:'1vh'
}

export default DescriptionInput