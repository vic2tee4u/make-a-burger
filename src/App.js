import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';


import BurgerBuilder from './containers/BugerBuilder/BurgerBuilder'
import Layout from './components/Layout/Layout'
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout')
})
const Order = React.lazy(() => {
  return import('./containers/Orders/Orders')
})
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})

const App = props => {

  useEffect(() => {
    props.onTryAutoSignup()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
    let routes = (
      <Switch>
      <Route path="/auth" render={() => <Auth/>}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/"/>
      </Switch>
    )

    if (props.isAuthenticated) {
        routes = (
          <Switch>
          <Route path="/checkout" render={()=> <Checkout/>}/>
          <Route path="/orders" render={() => <Order/>}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={() => <Auth/>}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
          </Switch>
        )
    }

    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading</p>}>
          {routes}
          </Suspense>
        </Layout>
      </div>
    )
  }


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
