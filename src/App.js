import './App.css';
import { db } from './firebase'
import { uid } from 'uid';
import { set, ref, onValue, update, push, child, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Typography, Box, InputLabel, MenuItem, FormControl, TextField, OutlinedInput, InputAdornment, Button } from '@mui/material';
import Select from '@mui/material/Select';
import ExpenseItem from './components/ExpenseItem';
import ExpenseHeading from './components/ExpenseHeading';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AmountInput from './components/AmountInput';




function App() {

  
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');

  // handler events for the 4 inputs
  const handleChangeCategory = ((e) => {
    setCategory(e.target.value);
  });
  
  const handleChangeDescription = ((e) => {
    setDescription(e.target.value);
  });

  const handleChangeDate = ((e) => {
    setDate(e.target.value);
  });

  const handleChangePrice = ((e) => {
    setPrice(e.target.value);
  });
    
  
  // database and local storage
  const [expenseData, setExpenseData] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('uuid'));

  // check for user, and create
  const checkUser = () => {
    
    //userid does not exist in ls -> set ls, state, and databse to userId
    if (!localStorage.getItem('uuid')) {
      const uuid = uid();
      localStorage.setItem('uuid', uuid);
      setUserId(uuid);
      set(ref(db, `/${uuid}`), {
        uuid: uuid
      });
      // console.log('userid was just created')
    }
    else {
      // console.log('userid already exists')
    }
  }

  //write database
  const writeDb = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), 
    {
      amount: price,
      category: category,
      description: description,
      date: date 
    });
    // clear inputs
    setPrice('');
    setCategory('');
    setDescription('');
    setDate('');
  }

  //read database
  const readDb = () => {

    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      if(data !== null) {
        // console.log(Object.values(data))
        console.log(Object.values(data)[0])
        console.log(Object.values(Object.values(data)[0]).slice(0,Object.values(Object.values(data)[0]).length -1))
        if(Object.values(Object.values(data)[0]).length > 1) {
          setExpenseData(Object.values(Object.values(data)[0]).slice(0,Object.values(Object.values(data)[0]).length -1))
        }
        else {
          console.log(Object.values(Object.values(data)[0]))
          setExpenseData(false)
        }
        // setExpenseData(Object.values(Object.values(data)[0]).slice(0,Object.values(Object.values(data)[0]).length))
        // console.log(Object.values(Object.values(data)[0])) // drill down version of data
        
        
        
        
      }
    })
  }

  const updateDb = () => {

    const newPostKey = push(child(ref(db), userId)).key;
    const newEntry = { amount: price, category: category, description: description, date: date, delKey: newPostKey }
    

    let updates = {};
    updates['/' + userId + '/' + newPostKey] = newEntry;
    update(ref(db), updates);

    setPrice('');
    setCategory('');
    setDescription('');
    setDate('');
  }

  const removeDb = (expenseId) => {
    remove(ref(db,'/' + userId + '/' + expenseId));
    readDb();
  }

  useEffect(() => {
    checkUser();
    readDb();
    },[])
  
  if (expenseData === null) {
    return(<p>Loading ...</p>)
  }

  return (
    <div className="App" style={{height:'100vh', backgroundColor: 'lightblue', display:'flex', alignItems:'center', flexDirection:'column'}}>
      <div>
        <Typography variant="h4">Expense Tracking Application</Typography>
      </div>

      <div style={{display:'flex', flexDirection:'column', alignItems:'center', borderRadius:'0.4rem', width: '70vw', backgroundColor:'whitesmoke'}}>
        
        <Typography variant='body1'>Add Expenses</Typography>
        <AmountInput priceValue={price} onUpdate={handleChangePrice} />
        {/* <FormControl fullWidth sx={{ width: '60%' }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={price}
            onChange={handleChangePrice}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl> */}
        
        
        
        <Box sx={{ width: '60%' }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Choose Category"
              onChange={handleChangeCategory}
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

        <div style={{ width:'60%'}}>
          <Box component="form" sx={{'& > :not(style)': { width: '100%' }}} noValidate autoComplete="off" >
            <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={handleChangeDescription}/>
          </Box>
        </div>

        <div style={{ width:'60%'}}>
          <Box component="form" sx={{'& > :not(style)': { width: '100%' }}} noValidate autoComplete="off" >
            <TextField id="outlined-basic" label="YYYY-MM-DD" variant="outlined" value={date} onChange={handleChangeDate}/>
          </Box>
        </div>

        <Button variant="contained" onClick={() => {updateDb()}}>Add Expense</Button>

      </div>

      <div style={{display:'flex', width: '80%', alignItems: 'center', justifyContent:'center'}}>
        <div style={{ width: '100%'}}>

          <ExpenseHeading />

          {expenseData !== false ? expenseData.map((expense) => {
            return(
              <ExpenseItem 
                key={expense.delKey} 
                expenseDate={expense.date} 
                expenseAmount={expense.amount} 
                expenseCategory={expense.category} 
                expenseDesc={expense.description} 
                onRemove={() => {removeDb(expense.delKey)}}
              />
            )
          }) : null} 
        </div>
      </div>
    </div>
  );
}

export default App;
