import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import EmployeeForm from './Form'
import {startEditEmployee} from '../../actions/employees'

function EmployeeEdit(props){

    const handleSubmit = (formData) => {
        props.dispatch(startEditEmployee(formData, props))
    }
    return(
            <div className="container"> 
                {
                    !_.isEmpty(props.employee) && (
                        <div>
                            <p className="h3 text-center">Edit employee - {props.employee.name}</p>
                            <EmployeeForm {...props.employee} handleSubmit={handleSubmit} />
                        </div>
                    )
                }
            </div>   
        )
    }

const mapStateToProps=(state, props) => {
    return{
        employee:state.employees.find(employee => employee._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(EmployeeEdit)