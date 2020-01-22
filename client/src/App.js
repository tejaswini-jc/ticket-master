import React from 'react';
import {BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import _ from 'lodash'
import {connect} from 'react-redux'
import {startLogoutUser} from './actions/user'

import Home from './components/common/Home'
import Register from './components/users/Register'
import Login from './components/users/Login'

import CustomerList from './components/customers/List' 
import CustomerShow from './components/customers/Show'
import CustomerNew from './components/customers/New'
import CustomerEdit from './components/customers/Edit'

import DepartmentList from './components/departments/List'
import DepartmentForm from './components/departments/Form'
import DepartmentShow from './components/departments/Show'
import DepartmentEdit from './components/departments/Edit'


import EmployeeList from './components/employees/List'
import EmployeeShow from './components/employees/Show'
import EmployeeNew from './components/employees/New'
import EmployeeEdit from './components/employees/Edit'

import TicketList from './components/tickets/List'
import TicketNew from './components/tickets/New'
import TicketShow from './components/tickets/Show'
import TicketEdit from './components/tickets/Edit'


function App(props) {

  const handleLogout = () => {
    props.dispatch(startLogoutUser())
  }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="http://localhost:3000/"><p className="h2">Ticket-Master</p><strong></strong></a>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {
              _.isEmpty(props.user) ? (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users/register">Register</Link>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/customers">Customers</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/departments">Departments</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/employees">Employees</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/tickets">Tickets</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout} to="/">Logout</Link>
                  </li>
                </React.Fragment>
              )
            }
          </ul>
        </div>
      </nav>

      <Switch>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/users/Register" component={Register} />
        <Route path="/users/Login" component={Login}/>

        <Route path="/customers" component={CustomerList} exact={true}/>
        <Route path="/customers/new" component={CustomerNew}/>
        <Route path="/customers/edit/:id" component={CustomerEdit}/>
        <Route path="/customers/:id" component={CustomerShow}/>

        <Route path="/departments" component={DepartmentList} exact={true}/>
        <Route path="/departments/new" component={DepartmentForm}/>
        <Route path="/departments/edit/:id" component={DepartmentEdit}/>
        <Route path="/departments/:id" component={DepartmentShow}/>

        <Route path="/employees" component={EmployeeList} exact={true}/>
        <Route path="/employees/new" component={EmployeeNew}/>
        <Route path="/employees/edit/:id" component={EmployeeEdit}/>
        <Route path="/employees/:id" component={EmployeeShow}/>
        
        <Route path="/tickets" component={TicketList} exact={true}/>
        <Route path="/tickets/new" component={TicketNew}/>
        <Route path="/tickets/edit/:id" component={TicketEdit}/>
        <Route path="/tickets/:id" component={TicketShow}/>  
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)