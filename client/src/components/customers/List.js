import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startRemoveCustomer} from '../../actions/customers'

function CustomerList(props){
    const handleRemove=(id)=>{
        props.dispatch(startRemoveCustomer(id))
    }
        return(
            <div className="container col-md-8">
                <p className="h3 text-center">Listing Customers-{props.customers.length}</p>
                <table className="table table-sm ">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Show</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.customers.map((customer)=>{
                                return(
                                    <tr key={customer._id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.mobile}</td>
                                        <td><Link to={`/customers/${customer._id}`}><button type="button" className="btn btn-primary">Show</button></Link></td>
                                        <td><Link to={`/customers/edit/${customer._id}`}><button type="button" className="btn btn-primary">Edit</button></Link></td>
                                        <td><button type="submit" classNameName="btn btn-danger"
                                        onClick={()=>{                                            
                                        const confirmRemove=window.confirm("Are you sure?")
                                            if(confirmRemove){
                                                handleRemove(customer._id)
                                            }
                                        }} >Remove</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/customers/new"><button type="button" className="btn btn-secondary">Add Customer</button></Link>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        customers:state.customers
    }
}
export default connect(mapStateToProps)(CustomerList)