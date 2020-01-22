import React from 'react'
import TicketForm from './Form'
import {connect} from 'react-redux'
import {startAddTicket} from '../../actions/tickets'

function TicketNew(props){
    const handleSubmit=(formData)=>{
        props.dispatch(startAddTicket(formData, props))
    }
        return(
            <div className="container">
                <p className="h4 text-center">Add Ticket</p>
                <TicketForm handleSubmit={handleSubmit} />
            </div>
        )
}
export default connect()(TicketNew)