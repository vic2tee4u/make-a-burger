import React from 'react';

import BurgerLogo from '../../assets/Images/burger-logo.png';
import classes from './Logo.module.css'



const Logo =(props)=> {
    return (
        <div className={classes.Logo}>
            <img src={BurgerLogo} alt="Burger"/>
        </div>
    )
}

export default Logo
