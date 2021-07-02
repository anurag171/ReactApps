import React,{useState,Fragment} from 'react';
import AddUsers from './components/Users/AddUsers';
import UserList from './components/Users/UserList';


function App() {
 const[userList,setUserList] = useState([]);
 
  const addUserHandler=(usrNm,usrAge,usrPassword)=>{
    console.log(`App.js Entered User Name ${usrNm} Entered Age ${usrAge}`);
    console.log(`App.js b4 ${userList} `);
    setUserList((prevUserList)=>{      
      return [...prevUserList,{name:usrNm,age:usrAge,id: Math.random().toString(),password: usrPassword}]
    });
    console.log(`App.js  ${userList} `);
  }
 
  return (
    <Fragment>
      <AddUsers onAddUser={addUserHandler}/>
      <UserList users={userList}/>
    </Fragment>// empty tags work
  );
}

export default App;
