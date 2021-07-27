import classes from './Checkout.module.css';
import { useRef,useState } from 'react';

const isEmpty = value => value != null && value.trim().length !== 0;
const isFiveChars = value => value.trim().length===5;
const isTenChars = value => value.trim().length>=10;
const isEmail =  value => value.includes("@") && value.trim().includes(".") && value.trim().indexOf("@")<value.trim().indexOf(".");

const Checkout = (props) => {
    const inputNameRef = useRef();
    const inputStreetRef = useRef();
    const inputPostalRef = useRef();
    const inputCityRef = useRef();
    const inputEmailRef = useRef();
    const inputPhoneRef = useRef();
    const [isFormValid,setIsFormValidity] = useState({
        name: true,
        city: true,
        postal: true,
        street: true,
        email: true,
        phone: true
    });
  const confirmHandler = (event) => {
    event.preventDefault();
    const inputName =inputNameRef.current.value;
    const inputStreet=inputStreetRef.current.value;
    const inputPostal=inputPostalRef.current.value;
    const inputCity =inputCityRef.current.value;
    const inputEmail =inputEmailRef.current.value;
    const inputPhone =inputPhoneRef.current.value;

    const isInputNameValid =  isEmpty(inputName);
    const isInputStreetValid =  isEmpty(inputStreet);
    const isInputCityValid =  isEmpty(inputCity);
    const isInputPostalValid =  isFiveChars(inputPostal);
    const isInputPhoneValid =  isTenChars(inputPhone);
    const isInputEmailValid =  isEmail(inputEmail);

    setIsFormValidity({
        name:isInputNameValid,
        city:isInputCityValid,
        street: isInputStreetValid,
        postal: isInputPostalValid,
        email: isInputEmailValid,
        phone: isInputPhoneValid
    })

    const formIsValid = isInputNameValid && isInputCityValid && isInputStreetValid && isInputPostalValid && isInputEmailValid && isInputPhoneValid ;
    
    if(!formIsValid){
        return;
    }
    props.onConfirm({
        name: inputName,
        city: inputCity,
        postal: inputPostal,
        street: inputCity,
        phone: inputPhone,
        email: inputEmail
    });
  };

  const nameControlClasses = `${classes.control} ${isFormValid.name?'': classes.invalid}`;
  const streetControlClasses = `${classes.control} ${isFormValid.street?'': classes.invalid}`;
  const postalControlClasses = `${classes.control} ${isFormValid.postal?'': classes.invalid}`;
  const cityControlClasses = `${classes.control} ${isFormValid.city?'': classes.invalid}`;
  const emailControlClasses = `${classes.control} ${isFormValid.email?'': classes.invalid}`;
  const phoneControlClasses = `${classes.control} ${isFormValid.phone?'': classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={inputNameRef}/>
        {!isFormValid.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={inputStreetRef}/>
        {!isFormValid.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={inputPostalRef}/>
        {!isFormValid.postal && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={inputCityRef}/>
        {!isFormValid.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={emailControlClasses}>
        <label htmlFor='email'>Email</label>
        <input type='text' id='email' ref={inputEmailRef}/>
        {!isFormValid.email && <p>Please enter a valid email!</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor='phone'>Phone</label>
        <input type='text' id='phone' ref={inputPhoneRef}/>
        {!isFormValid.phone && <p>Please enter a valid phone!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;