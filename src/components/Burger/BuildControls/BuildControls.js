import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p> Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                     added={() => props.ingredientAdded(ctrl.type)} 
                     removed = {() => props.ingredientRemove(ctrl.type)}
                     key={ctrl.label} 
                     disabled={props.disabled[ctrl.type]}
                     label={ctrl.label}/>
            ))}
            <button 
            disabled={!props.purchaseable} 
            onClick={props.ordered}
            className={classes.OrderButton}>{props.isAuth? 'ORDER NOW' : 'SIGN-IN TO ORDER'}</button>
        </div>
    )
}

export default buildControls
