import { Box, TextField} from '@mui/material';

const DescriptionInput = ({ descriptionValue, onUpdate }) => {
  return (
    <div style={{ width:'60%'}}>
      <Box component="form" sx={{'& > :not(style)': { width: '100%' }}} noValidate autoComplete="off" >
        <TextField id="outlined-basic" label="Description" variant="outlined" value={descriptionValue} onChange={onUpdate}/>
      </Box>
    </div>
  )
}

export default DescriptionInput