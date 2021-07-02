import React,{useState,useRef} from 'react';
import classes from  './AddUsers.module.css';
import Card from '../UI/Card'
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

const AddUsers = (props) => {
  //Refs are quickly reading the value but should not be used for dom manipulations
    const nameInputRef = useRef();
    const passwordInputRef = useRef();
    const ageInputRef = useRef();

    /* const [enteredUserName,setEnteredUserName] = useState('');
    const [enteredAge,setEnteredAge] = useState('');
    const [enteredPassword,setEnteredPassword] = useState(''); */
    const [error, setError] = useState();
    


    const addUserHandler = (event) =>{
        event.preventDefault();
        const inputUserName = nameInputRef.current.value;
        const inputPasswordName = passwordInputRef.current.value;
        const inputAgeName = ageInputRef.current.value;

        if(inputUserName.trim().length === 0 || inputAgeName.trim().length=== 0 || inputPasswordName.trim().length === 0){
            console.log(`Invalid Input`);
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name, password and age (non-empty values).',
              });
            return;
        }
        if(+inputAgeName<1){
            console.log(`Invalid Input`);
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).',
              });
            return;
        } 
        console.log(`Entered User Name ${inputUserName} Entered Age ${inputAgeName}`);
        props.onAddUser(inputUserName,inputAgeName,inputPasswordName);
         
        nameInputRef.current.value = '';
        passwordInputRef.current.value = '';
        ageInputRef.current.value= '';
        

       /*  setEnteredUserName('');
        setEnteredAge('');
        setEnteredPassword('');  */    
    }

   /*  const userNameChangeHandler= (event) =>{
        setEnteredUserName(event.target.value);
    }

    const passwordChangeHadler = (event) =>{
      setEnteredPassword(event.target.value);
  }

    const ageChangeHandler= (event) =>{
        setEnteredAge(event.target.value);
    } */

    const errorHandler = () => {
        setError(null);
      };

    return (
        <Wrapper>
        {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
        <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input id="userName"  ref={nameInputRef} type="text"></input>
            <label htmlFor="password">Password</label>
            <input id="password"  ref={passwordInputRef} type="password" ></input>
            <label htmlFor="age">Age</label>
            <input id="age"  type="number" ref={ageInputRef} ></input>
            <Button type="submit">Add User</Button>
        </form>
        </Card>
      </Wrapper>
    );   

}
export default AddUsers;