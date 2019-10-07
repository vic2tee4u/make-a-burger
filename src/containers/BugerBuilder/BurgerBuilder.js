import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from '../../axios-orders'


import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler';
import * as actions from '../../store/actions/index'




export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
       
    }

    componentDidMount () {
        this.props.onInitIngredients()
    
    }
   

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el
        },0)
            return sum > 0
        
    }


    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing: true
            })
        } else {
            this.props.onSetAuthRedirectPath('./checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    

    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        let key;
        for (key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
       
            let burger = this.props.error? <p>Ingredients Couldn't be loaded</p> : <Spinner/>

            if (this.props.ings !== null) {
                burger = (
                    <Aux>
                    <div>
                        <Burger ingredients={this.props.ings}/>
                    </div>
                    <div>
                        <BuildControls 
                             ingredientAdded={this.props.onIngredientAdded}
                             ingredientRemove = {this.props.onIngredientRemoved}
                             disabled={disabledInfo}
                             ordered={this.purchaseHandler}
                             purchaseable={this.updatePurchaseState(this.props.ings)}
                             isAuth={this.props.isAuthenticated}
                             price={this.props.price}
                         />
                    </div>
                    </Aux>
                )
                orderSummary = <OrderSummary 
                purchaseCanceled = {this.purchaseCancelHandler}
                purchaseContinue = {this.purchaseContinueHandler}
                price={this.props.price}
                ingredients={this.props.ings} />
            }
    
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)) 
