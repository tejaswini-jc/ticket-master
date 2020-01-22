import React from 'react'
import {Link} from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

function DepartmentShow(props){
    return (
        <div className="container col-md-6">
            {
                !_.isEmpty(props.department) && (
                    <div className="container">
                        <p className="h3 text-center">Department Show  {props.department.name}</p>
                        <div className="container">
                        </div>
                        <hr/>
                        {
                            _.isEmpty(props.tickets) ? <h3 className="text-center text-secondary">No tickets found</h3> : (
                                <div style={{display: 'flex'}}>
                        {
                            props.tickets.map(ticket => {
                                return (
                                    <div className="card border-info mb-3" style={{width: '18rem'}}>
                                        <div className="card-header">Ticket Code - {ticket.code}</div>
                                        <div className="card-body text-info">
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
              <Link to={`departments/edit/${props.match.params.id}`}><button type="button" class="btn btn-primary">Edit</button></Link>
              <Link to='/departments'><button type="button" className="btn btn-secondary">Back</button></Link>

                    </div>
                )
            }
        </div>
    )
}

const mapStateToProps=(state,props)=> {
    const id=props.match.params.id
    return{
        department:state.departments.find(department => department._id === id) || {},
        tickets: state.tickets.filter(ticket => ticket.department._id === id)
    }
}

export default connect(mapStateToProps)(DepartmentShow)