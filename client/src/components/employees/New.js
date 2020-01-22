import React from 'react'
import EmployeeForm from './Form'
import {connect} from 'react-redux'
import {startAddEmployee} from '../../actions/employees'

function EmployeeNew(props){
    const handleSubmit=(formData)=>{
        props.dispatch(startAddEmployee(formData, props))
    }
        return(
            <div className="container">
                <p className="h3 text-center">Add Employee</p>
                <EmployeeForm handleSubmit={handleSubmit} />
            </div>
        )
}
export default connect()(EmployeeNew)