import React from 'react'
import CustomerForm from './Form'
import _ from 'lodash'
import {connect} from 'react-redux'
import {startEditCustomer} from '../../actions/customers'

function CustomerEdit(props){
    const handleSubmit=(formData)=>{
        props.dispatch(startEditCustomer(formData, props))
    }
        return(
            <div className="container">
                {
                    !_.isEmpty(props.customer) && (
                        <div>
                        <p className="h3 text-center">Edit Customer -{props.customer.name}</p>
                        <CustomerForm {...props.customer} handleSubmit={handleSubmit}/>
                        </div>
                    )
                }
        </div>
    )   
}

const mapStateToProps=(state, props) => {
    return{
        customer:state.customers.find(customer => customer._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(CustomerEdit)