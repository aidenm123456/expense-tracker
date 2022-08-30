import './App.css';
import { db } from './firebase'
import { uid } from 'uid';
import { set, ref, onValue, update, push, child, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import ExpenseItem from './components/ExpenseItem';
import ExpenseHeading from './components/ExpenseHeading';
import { BsGithub } from 'react-icons/bs'; 

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AmountInput from './components/AmountInput';
import CategoryInput from './components/CategoryInput';
import DescriptionInput from './components/DescriptionInput';
import DateInput from './components/DateInput';




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
    
  
  // database and local storage area
  const [expenseData, setExpenseData] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('uuid'));

  // check for user, and create
  const checkUser = () => {
    
    //userid does not exist in ls -> set ls, state, and databse to userId/uuid
    if (!localStorage.getItem('uuid')) {
      const uuid = uid();
      localStorage.setItem('uuid', uuid);
      setUserId(uuid);
      set(ref(db, `/${uuid}`), {
        uuid: uuid
      });
    }
    else {
      
    }
  }

  //read database
  const readDb = () => {

    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      if(data !== null) {
        
        if(Object.values(Object.values(data)[0]).length > 1) {
          setExpenseData(Object.values(Object.values(data)[0]).slice(0,Object.values(Object.values(data)[0]).length -1))
        }
        else {
          console.log(Object.values(Object.values(data)[0]))
          setExpenseData(false)
        }        
      }
    })
  }

  // add expenses to database
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

  // remove expenses from database 
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
    <div className="App" style={{height:'100vh', backgroundColor: '#e6e6e6', display:'flex', alignItems:'center', flexDirection:'column'}}>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'2.5vh', marginBottom:'2.5vh'}}>
        <Typography variant="h4">Expense Tracker</Typography>
        
        
          <a style={{color:'black'}} href="https://github.com/aidenm123456/stocks-dashboard" target='_blank' rel="noreferrer">
            <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
              <BsGithub />
              <Typography style={{marginLeft:'0.25vw'}}>aidenm123456</Typography>
            </div>
          </a>
        
        
      </div>

      {/* Expense Inputs */}
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', borderRadius:'0.4rem', width: '70vw', backgroundColor:'whitesmoke', boxShadow: '2px 3px 10px grey'}}>
        <Typography variant='body1'>Add Expenses</Typography>
        <AmountInput priceValue={price} onUpdate={handleChangePrice} />
        <CategoryInput categoryValue={category} onUpdate={handleChangeCategory} />
        <DescriptionInput descriptionValue={description} onUpdate={handleChangeDescription}/> 
        <DateInput dateValue={date} onUpdate={handleChangeDate} />
        <Button variant="contained" onClick={() => {updateDb()}}>Add Expense</Button>
      </div>

      {/* Expense list */}
      <div style={{display:'flex', width: '80vw', alignItems: 'center', borderRadius:'0.4rem', justifyContent:'center', backgroundColor:'whitesmoke', boxShadow: '2px 3px 10px grey'}}>
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
