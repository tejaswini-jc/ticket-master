import React from 'react'
import CustomerForm from './Form'
import {connect} from 'react-redux'
import {startAddCustomer} from '../../actions/customers'

function CustomerNew(props){
    const handleSubmit=(formData)=>{
        props.dispatch(startAddCustomer(formData, props))
    }
        return(
            <div className="container">
                <p className="h3 text-center">Add Customer</p>
                <CustomerForm handleSubmit={handleSubmit} />
            </div>
        )
}
export default connect()(CustomerNew)