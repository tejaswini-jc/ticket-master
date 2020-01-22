import React from 'react'
import {Link} from 'react-router-dom'
import DepartmentForm from './Form'
import { connect } from 'react-redux'
import {startRemoveDepartment} from '../../actions/departments' 
import {startAddDepartment} from '../../actions/departments'
 
function DepartmentList(props){
    
    const handleRemove=(id)=>{
        props.dispatch(startRemoveDepartment(id))
    }
    const handleSubmit=(formData)=>{
        props.dispatch(startAddDepartment(formData, props))
    }
    return(
        <div class="container " >
            <div className="container col-md-6">
                <p className="h3 text-center">Departments-{props.departments.length}</p>
                <table className="table table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Department</th>
                            <th scope="col">Show</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           props.departments.map((department)=>{
                                return<tr key={department._id}>
                                        <td>{department.name}</td>
                                        <td><Link to={`departments/${department._id}`}><button type="submit" className="btn btn-primary">Show</button></Link></td>
                                        <td><Link to={`departments/edit/${department._id}`}><button type="button" className="btn btn-primary">Edit</button></Link></td>
                                        <td><button type="submit" className="btn btn-danger"
                                        onClick={()=>{                                            
                                        const confirmRemove=window.confirm("Are you sure?")
                                            if(confirmRemove){
                                                handleRemove(department._id)
                                            }
                                        }} >Remove</button></td></tr>
                            })
                        }
                    </tbody>
                </table><hr/>
                <DepartmentForm handleSubmit={handleSubmit}/>
            </div>
        </div>

        )
}

const mapStateToProps=(state)=>{
    return{
        departments:state.departments
    }
}
export default connect(mapStateToProps)(DepartmentList)