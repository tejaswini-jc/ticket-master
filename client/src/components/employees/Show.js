import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {Link} from 'react-router-dom'

function EmployeeShow(props) {
    const id = props.match.params.id
    return (
        <div className="container col-md-6">
            <p className="h2 text-center">Employee Show</p>
            <p className="h3 text-center">{ props.employee.name } - { props.employee.email }</p>
            <hr/>
            {
                _.isEmpty(props.tickets) ? <h3 className="text-center text-secondary">No tickets found</h3> : (
                    <div style={{display: 'flex'}}>
                        {
                            props.tickets.map(ticket => {
                                return (
                                    <div class="card text-white bg-secondary mb-3" style={{width: '18rem'}}>
                                        <div class="card-header">Ticket Code - {ticket.code}</div>
                                        <div class="card-body">
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
            <Link to={`/employees/edit/${id}`}><button type="button" class="btn btn-primary">Edit</button></Link>
            <Link to='/employees'><button type="button" className="btn btn-secondary">Back</button></Link>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id
    return {
        employee: state.employees.find(employee => employee._id === id) || {},
        tickets: state.tickets.filter(ticket => ticket.employee._id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(EmployeeShow)