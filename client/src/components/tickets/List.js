import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startRemoveTicket} from '../../actions/tickets'

function TicketList(props){
    const handleRemove=(id)=>{
        props.dispatch(startRemoveTicket(id))
    }
    console.log(props)
        return(
            <div className="container">
                <p className="h2 text-center">Listing Tickets-{props.tickets.length}</p>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Code No</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Department</th>
                            <th scope="col">Employee</th>
                            <th scope="col">Message</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Show</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Remove</th>
                            <th scope="col">Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.tickets.map(ticket => {
                                return (
                                    <tr key={ticket._id}>
                                        <td>{ticket.code}</td>
                                        <td>{ticket.customer.name}</td>
                                        <td>{ticket.department.name}</td>
                                        <td>{ticket.employee.name}</td>
                                        <td>{ticket.message}</td>
                                        <td>{ticket.priority}</td>
                                        <td><Link to={`/tickets/${ticket._id}`}><button type="button" className="btn btn-primary">Show</button></Link></td>
                                        <td><Link to={`/tickets/edit/${ticket._id}`}><button type="button" className="btn btn-primary">Edit</button></Link></td>
                                        <td><button type="submit" className="btn btn-danger"
                                        onClick={()=>{                                            
                                        const confirmRemove=window.confirm("Are you sure?")
                                            if(confirmRemove){
                                                handleRemove(ticket._id)
                                            }
                                        }} >Remove</button></td>
                                        <td>{ticket.isResolved.toString()}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table><hr/>
            <Link to="/tickets/new"><button type="button" className="btn btn-secondary">Add Ticket</button></Link>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        tickets:state.tickets
    }
}
export default connect(mapStateToProps)(TicketList)