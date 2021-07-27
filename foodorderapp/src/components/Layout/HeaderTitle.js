import React from 'react';
import classes from './HeaderTitle.module.css'



const HeaderTitle = (props) =>{
    return(
        <div className={classes.h1}>
            <h1>Fresh Meals</h1>
        </div>
    );
}

export default HeaderTitle