import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'

import configureStore from './store/configureStore'

import {startSetCustomers} from './actions/customers'
import {startSetDepartments} from './actions/departments'
import {startSetEmployees} from './actions/employees'
import {startSetTickets} from './actions/tickets'
import {startGetUser} from './actions/user'

const store=configureStore()
console.log(store.getState())

store.subscribe(()=>{
    console.log(store.getState())
})

if(localStorage.getItem('authToken')){
    store.dispatch(startSetCustomers())
    store.dispatch(startGetUser())
}

store.dispatch(startSetDepartments())
store.dispatch(startSetEmployees())
store.dispatch(startSetTickets())

const jsx=(
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));