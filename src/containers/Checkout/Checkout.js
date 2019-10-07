import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/Checkout Summary/CheckoutSummary'
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

  

    // state= {
    //     ingredients: {
    //         salad: 1,
    //         meat: 1,
    //         cheese: 1,
    //         bacon: 1
    //     },
    //     totalPrice: 0
    // }

    // componentDidMount () {
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     let price = 0
    //     console.log(query.entries());
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1]
    //         } else {
    //             ingredients[param[0]] = +param[1]

    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: price
    //     })
    // }



    onCheckoutCancelled = () => {
        this.props.history.goBack()
    }

    CheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    
    render() {
        let summary = <Redirect to='/'/>
        
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                    onCheckoutCancelled = {this.onCheckoutCancelled}
                    CheckoutContinue ={this.CheckoutContinue}
                    ingredients={this.props.ings}/>
                    <Route path={`${this.props.match.path}/contact-data`} component={ContactData}/>
                </div>
            )
        }
        return summary
           
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    }
}



export default connect(mapStateToProps)(Checkout)
