import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import authReducer from './store/reducer/auth';
import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchBurgerBuilder,watchOrder } from './store/sagas/'


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerBuilderReducer from './store/reducer/burgerBuilder';
import orderReducer from './store/reducer/order';



const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || null : compose

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    orders: orderReducer,
    auth: authReducer
})

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleWare)))
sagaMiddleWare.run(watchAuth)
sagaMiddleWare.run(watchBurgerBuilder)
sagaMiddleWare.run(watchOrder)




const app = (
    <Provider store={store}> 
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
)
   

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
