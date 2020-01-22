import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import customersReducer from '../reducers/customers'
import departmentsReducer from '../reducers/departments'
import employeesReducer from '../reducers/employees'
import ticketsReducer from '../reducers/tickets'
import userReducer from '../reducers/user'

const configureStore=()=>{
    const store=createStore(combineReducers({
        customers: customersReducer,
        departments: departmentsReducer,
        employees: employeesReducer,
        tickets: ticketsReducer,
        user:userReducer
    }), applyMiddleware(thunk))
    return store
}
export default configureStore