import React from 'react'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

function CustomerShow(props){
    const id=props.match.params.id
    return(
        <div>
            {
                !_.isEmpty(props.customer) && (
                    <div className="container col-md-7">
                    <p className="h3 text-center">Customer Show :</p>
                    <p className="h4 text-center">{props.customer.name}-{props.customer.email}-{props.customer.mobile}</p>
                    <hr/>
                    {
                            _.isEmpty(props.tickets) ? <h3 className="text-center text-secondary">No tickets found</h3> : (
                                <div style={{display: 'flex'}}>
                        {
                            props.tickets.map(ticket => {
                                return (
                                    <div class="card border-info mb-3" style={{width: '18rem'}}>
                                        <div class="card-header">Ticket Code - {ticket.code}</div>
                                        <div class="card-body text-info">
                                            <p className="card-text"> Customer - { ticket.customer.name }</p>
                                            <p className="card-text"> Department - { ticket.department.name }</p>
                                            <p className="card-text"> Priority - {ticket.priority }</p>
                                            <p className="card-text"> Message - { ticket.message }</p>
                                            <p className="card-text"> status - { ticket.isResolved.toString() }</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                )   
            }
            <Link to={`/customers/edit/${id}`}><button type="button" class="btn btn-primary">Edit</button></Link>
            <Link to='/customers'><button type="button" className="btn btn-secondary">Back</button></Link>
                    </div>
                )                
            }
        </div>
    )
}

const mapStateToProps=(state,props)=> {
    return{
        customer:state.customers.find(customer => customer._id === props.match.params.id) || {},
        tickets: state.tickets.filter(ticket => ticket.customer._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(CustomerShow)