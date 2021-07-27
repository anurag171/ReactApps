import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import axios from 'axios';
import Checkout from './Checkout';
import Message from '../UI/Message';

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isOrderSuccess, setIsOrderSuccess] = useState(false);
    const [isOrderFailed, setIsOrderFailed] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };


    const cartitems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => <CartItem key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />)}
        </ul>
    );

    const openOrderDetails = () => {
        setIsCheckout(true);
        /* console.log(cartCtx.items);
        console.log("data " + JSON.stringify(cartCtx.items));
        const headers = {
            'Content-type': 'text/plain'
        };
        if (cartCtx.items.length === 0) {
            console.log("card empty");
            return;
        }

        axios.post("http://127.0.0.1:8083/v1/create-order/", JSON.stringify(cartCtx.items), { headers }).then(res => {
            console.log("Order Saved");
            console.log(res);
            if (res.status === 200) {
                cartCtx.items = [];
            }
        }).catch(error => {
            console.error('There was an error!', error);
            setIsCheckout(false);
        }); */
    }

    const saveOrder = (userData) => {

        //console.log(cartCtx.items);
        //console.log(userData);
        console.log("data " + JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items
        }));
        const headers = {
            'Content-type': 'text/plain'
        };
        if (cartCtx.items.length === 0) {
            console.log("card empty");
            return;
        }

        axios.post("http://127.0.0.1:8083/v1/create-order/", JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items
        }), { headers }).then(res => {
            console.log("Order Saved");
            console.log(res);
            if (res.status === 200) {
                cartCtx.items = [];
                setIsOrderSuccess(true);               
            }
        }).catch(error => {
            console.error('There was an error!', error);
            setIsOrderFailed(true);  
            setIsCheckout(false);
        });
    }


    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={openOrderDetails}>Order</button>}
    </div>;

    const closeButtonClasses = classes.actions+" "+ classes['button'];
    console.log(closeButtonClasses);

    return (
        <Modal onClose={props.onClose}>
            {cartitems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={saveOrder} onCancel={props.onClose} />}
            {!isCheckout && modalActions}
            {isOrderSuccess && <Message message='Order successfull !!!' decoration={classes.ordersuccess}/>}
            {isOrderSuccess &&
            <button className={classes.closebutton} onClick={props.onClose}>Close</button>}
            {isOrderFailed && <Message message='Order unsuccessful. Please try after some time!!' decoration={classes.orderfailed}/>}
            {isOrderFailed && <button className={classes.closebutton} onClick={props.onClose}>Close</button>}
        </Modal>
    );
};

export default Cart