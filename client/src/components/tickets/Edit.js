import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import TicketForm from './Form'
import {startEditTicket} from '../../actions/tickets'

function TicketEdit(props){

    const handleSubmit = (formData) => {
        props.dispatch(startEditTicket(formData, props))
    }
    return(
            <div className="container">
                {
                    !_.isEmpty(props.ticket) && (
                        <div>
                            <p className="h2 text-center">Edit Ticket -{props.ticket.code}</p>
                            <TicketForm {...props.ticket} handleSubmit={handleSubmit} />
                        </div>
                    )
                }
            </div>   
        )
    }

const mapStateToProps=(state, props) => {
    return{
        ticket:state.tickets.find(ticket => ticket._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(TicketEdit)