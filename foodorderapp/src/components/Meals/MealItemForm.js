import { useRef,useState } from 'react';
import React from 'react';
import Input from '../UI/Input';
import classes from './MealItemForm.module.css';


const MealItemForm = (props) => {
    const[amountIsValid,setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event => {
        console.log('into submit Handler');
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;//this is always be string irrespective of type
        console.log(enteredAmount);
        const enteredAmountNmbr = +enteredAmount;//by adding + sign we can convert string to number
        if (enteredAmount.trim().length === 0 || enteredAmountNmbr < 1 || enteredAmountNmbr > 5) {
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNmbr);
    };


    return <form className={classes.form} onSubmit={submitHandler}>
        <Input  ref={amountInputRef} label="Amount" input={{           
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }} />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter valid amount (1-5).</p>}
    </form>
}

export default MealItemForm;