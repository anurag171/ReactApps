import classes from './Counter.module.css';
import {connect, useSelector,useDispatch} from 'react-redux';
import {useState,useRef} from 'react';
import { counterAction } from '../store';

const isEmpty = value => value != null && value.trim().length ===0;
const isNotValid = value => {
  return isNaN(value)
};

const Counter = () => {
const[factor,setFactor] = useState(1);
 const factorRef = useRef();
 const counter = useSelector(state=>state.counter);
 const show = useSelector(state=>state.showCounter);
 console.log("show "  + show);
 const dispatch = useDispatch();
 const toggleCounterHandler = () => {
  //dispatch({type:'toggle'}); 
  dispatch(counterAction.toggle());
 };
 const incrementHandler = () => {
  let val = isEmpty(factorRef.current.value) || isNotValid(factorRef.current.value)?1:factorRef.current.value;
   //dispatch({type:'increment',factor:val}); 
   console.log("On incrementHandler " );
   dispatch(counterAction.increment(val));
 };
 const multiplyHandler= () => {
   let val = isEmpty(factorRef.current.value) || isNotValid(factorRef.current.value)?1:factorRef.current.value;
 // dispatch({type:'multiply',factor:val }); 
  dispatch(counterAction.multiply(val));
};
 const decrementHandler = () => {
  let val = isEmpty(factorRef.current.value) || isNotValid(factorRef.current.value)?1:factorRef.current.value;
  //dispatch({type:'decrement',factor:val}); 
  dispatch(counterAction.decrement(val));
 };
 const resetCounterHandler = () => { 
   factorRef.current.value=''; 
  //dispatch({type:'reset',factor:undefined}); 
  dispatch(counterAction.reset());
 };

 const inputFactorHandler = (event) =>{
   event.preventDefault();
   console.log("On blur event");
   setFactor(factorRef.current.value);
 }


  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <label htmlFor="factorInput">Multiplication Factor</label>
        <input  ref={factorRef} type="text" id="factorInput" onBlur={inputFactorHandler}/>        
        <button onClick={multiplyHandler}>Multiply</button>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
      <button onClick={resetCounterHandler}>Reset Counter</button>
    </main>
  );
};

export default Counter;
