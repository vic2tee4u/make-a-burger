import React, { Component } from 'react'
import axios from '../../axios-orders';
import { connect } from 'react-redux'

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorhandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render() {
        let orderList = this.props.loading? <Spinner/> : this.props.orders.map (order => {
            return <Order 
            key ={order.id} 
            ingredients = {order.ingredients}
            price={order.price}/>
        })
        
        return (
            <div>
              {orderList}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.order,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)) 
