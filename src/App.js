import './App.css';
import { db } from './firebase'
import { uid } from 'uid';
import { set, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

function App() {

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
    set(ref(db, `/${uuid}`), {
      uuid: uuid
    });
  }

  //read database
  const readDb = () => {
    onValue(ref(db), snapshot => {
      const data = snapshot.val();
      if(data !== null) {
        console.log(Object.values(data))
      }
    })
  }

  useEffect(() => {
    checkUser();
    readDb();
    },[])
  

  return (
    <div className="App">
    </div>
  );
}

export default App;
