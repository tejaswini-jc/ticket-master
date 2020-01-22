import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import DepartmentForm from './Form'
import {startEditDepartment} from '../../actions/departments'

function DepartmentEdit(props){

    const handleSubmit = (formData) => {
        const redirect = () => props.history.push(`/departments`)
        props.dispatch(startEditDepartment(formData, props, redirect))
    }
    return(
            <div className="container col-md-5">
                {
                    !_.isEmpty(props.department) && (
                        <div>
                            <p className="h2 text-center">Edit Department - {props.department.name}</p>
                            <DepartmentForm {...props.department} handleSubmit={handleSubmit} />
                        </div>
                    )
                }
            </div>   
        )
    }
const mapStateToProps=(state, props) => {
    return{
        department:state.departments.find(department => department._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(DepartmentEdit)