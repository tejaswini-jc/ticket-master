import React from 'react'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

function TicketShow(props){
    const id=props.match.params.id
    console.log(props)
    return(
        <div className="container">
            {
                !_.isEmpty(props.ticket) && (
                    <div>
                    <p className="h2 text-center">Ticket Show</p>
                    <p className="h4 text-center">{props.ticket.code}-{props.ticket.customer.name}-{props.ticket.department.name}-{props.ticket.employee.name}</p>
                    <div className="container col-md-5 offset-md-5">
                    <Link to={`/tickets/edit/${id}`}><button type="button" className="btn btn-primary">Edit</button></Link>
                    <Link to="/tickets"><button type="button" className="btn btn-secondary">Back</button></Link>
                    </div>
                    </div>
                )
            }
        </div>
    )
}
const mapStateToProps=(state,props)=> {
    const id=props.match.params.id
    return{
        ticket:state.tickets.find(ticket => ticket._id === id)
    }
}

export default connect(mapStateToProps)(TicketShow)