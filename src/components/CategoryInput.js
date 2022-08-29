import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const CategoryInput = ({ categoryValue, onUpdate }) => {
  return (
    <Box sx={{ width: '60%' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryValue}
          label="Choose Category"
          onChange={onUpdate}
        >
          <MenuItem value={'Housing'}>Housing</MenuItem>
          <MenuItem value={'Food'}>Food</MenuItem>
          <MenuItem value={'Transportation'}>Transportation</MenuItem>
          <MenuItem value={'Health Care'}>Health Care</MenuItem>
          <MenuItem value={'Insurance'}>Insurance</MenuItem>
          <MenuItem value={'Phone'}>Phone</MenuItem>
          <MenuItem value={'Personal Care'}>Personal Care</MenuItem>
          <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
          <MenuItem value={'Miscellaneous'}>Miscellaneous</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
  )
}

export default CategoryInput