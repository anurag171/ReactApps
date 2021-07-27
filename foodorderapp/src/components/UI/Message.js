import classes from './Message.module.css';
const Message = (props) => {

    return(
        <div className={classes. messagebutton}>
            <p className={props.decoration}>{props.message}</p>
        </div>

    );
}

export default Message;