import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {startRemoveEmployee} from '../../actions/employees'

function EmployeeList(props){
    const handleRemove=(id)=>{
        props.dispatch(startRemoveEmployee(id))
    }
        return(
            <div className="container col-md-8">
                <p className="h3 text-center">Listing Employees - {props.employees.length}</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Email</th>
                            <th scope="col">Depeartment</th>
                            <th scope="col">Show</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           props.employees.map((employee)=>{
                                return<tr key={employee._id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.mobile}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.department.name}</td>
                                        <td><Link to={`employees/${employee._id}`}><button type="submit" className="btn btn-primary">show</button></Link></td>
                                        <td><Link to={`/employees/edit/${employee._id}`}><button type="button" className="btn btn-primary">Edit</button></Link></td>
                                        <td><button type="submit" className="btn btn-danger"
                                        onClick={()=>{                                            
                                        const confirmRemove=window.confirm("Are you sure?")
                                            if(confirmRemove){
                                                handleRemove(employee._id)
                                            }
                                        }} >Remove</button></td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table><hr/>
                <Link to="/employees/new"><button type="button" className="btn btn-secondary">Add Employee</button></Link>
            </div>
        )
}

const mapStateToProps=(state)=>{
    return{
        employees:state.employees
    }
}
export default connect(mapStateToProps)(EmployeeList)