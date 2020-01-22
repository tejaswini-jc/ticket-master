import React from 'react'
import Axios from 'axios'

export default class EmployeeForm extends React.Component{
    constructor(props){
        super(props)
            this.state ={
                code:props.code ? props.code : '',
                message:props.message ? props.message : '',
                priority: props.priority ? props.priority : '',
                customer:props.customer ? props.customer: '',
                customers:props.customers ? props.customers : [],
                department:props.department ? props.department: '',
                departments:props.departments ? props.departments : [],
                employee:props.employee ? props.employee: '',
                employees:props.employees ? props.employees : [],
                isResolved:props.isResolved ? props.isResolved: ''
            }
        }
        validate = () => {
            let codeError=""
            let messageError=""
            let priorityError=""
            let customerError=""
            let departmentError=""
            let employeeError=""
            let isResolvedError=""
            if(!this.state.code){
                codeError='Code must be filled out'
            }
            if(!this.state.message){
                messageError='Message must be filled out'
            }
            if(!this.state.priority){
                priorityError='Priority must be filled out'
            }
            if(!this.state.customer){
                customerError='Customer must be filled out'
            }
            if(!this.state.department){
                departmentError='Department must be filled out'
            }
            if(!this.state.employee){
                employeeError='Employee must be filled out'
            }
            if(!this.state.isResolved){
                isResolvedError='Field must be filled out'
            }
            if(codeError|| messageError || priorityError ||customerError || departmentError ||employeeError ||priorityError ||isResolvedError){
                this.setState({ codeError, messageError, priorityError, customerError, departmentError, employeeError,isResolvedError })
                return false
            }
            return true
        }
        handleSubmit = (e) => {
            e.preventDefault()
            const isValid = this.validate()
            if(isValid){
                const formData = {
                    code: this.state.code,
                    message: this.state.message,
                    priority:this.state.priority,
                    customer: this.state.customer,
                    department: this.state.department,
                    employee: this.state.employee,
                    isResolved: this.state.isResolved
                }
                this.props.handleSubmit(formData)
            }
        }
        handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        componentDidMount(){
            Axios.get('http://localhost:3045/customers',{
                headers : {
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response =>{
                const customers = response.data
                this.setState({customers})
                console.log(customers)
            })
            Axios.get('http://localhost:3045/departments',{
                headers : {
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response =>{
                const departments = response.data
                this.setState({departments})
                console.log(departments)
            })
            Axios.get('http://localhost:3045/employees',{
                headers : {
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response =>{
                const employees = response.data
                this.setState({employees})
                console.log(employees)
            })
        }
        render(){
            return(
                <div className="container col-md-5">
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="code"><strong>Code</strong></label>
                        <input type="text" className="form-control form-control-sm" id=""code placeholder="type code..." name="code" value={this.state.code} onChange={this.handleChange} />
                        <div style = {{color:'red'}}>{this.state.codeError} </div>
                    </div>
                    <div className="form-group">
                            <label htmlfor="customer"></label>
                            <select className="form-control form-control-sm" id="customer" name="customer" value={this.state.customer} onChange={this.handleChange } >
                                <option>{this.state.customer.name}</option>
                                {
                                this.state.customers.map(customer=> {
                                    return (<option key={customer._id} value={customer._id} > {customer.name}</option>)
                                })
                                }
                            </select>
                            <div style = {{color:'red'}}>{this.state.customerError} </div>
                    </div>
                    <div className="form-group">
                            <label htmlfor="department"></label>
                            <select className="form-control form-control-sm" id="department" name="department" value={this.state.department} onChange={this.handleChange } >
                                <option>{this.state.department.name}</option>
                                {
                                this.state.departments.map(department=> {
                                    return (<option key={department._id} value={department._id} > {department.name}</option>)
                                })
                                }
                            </select>
                            <div style = {{color:'red'}}>{this.state.departmentError} </div>
                    </div>
                    <div className="form-group">
                            <label htmlfor="employee"></label>
                            <select className="form-control form-control-sm" id="employee" name="employee" value={this.state.employee} onChange={this.handleChange } >
                                <option>{this.state.employee.name}</option>
                                {
                                this.state.employees.map(employee=> {
                                    return (<option key={employee._id} value={employee._id} > {employee.name}</option>)
                                })
                                }
                            </select>
                            <div style = {{color:'red'}}>{this.state.employeeError} </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="priority"><strong>Priority:</strong></label>
                        <input type="text" className="form-control form-control-sm" id="" placeholder="type priority...(high/low/medium)" name="priority" value={this.state.priority} onChange={this.handleChange} />
                        <div style = {{color:'red'}}>{this.state.priorityError} </div>
                        </div>
                    <div className="form-group">
                        <label htmlFor="message"><strong>Message:</strong></label>
                        <textarea className="form-control form-control-sm" id="message" placeholder="type message..." name="message" value={this.state.message} onChange={this.handleChange} />
                        <div style = {{color:'red'}}>{this.state.messageError} </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="isResolved"><strong>isResolved</strong></label>
                        <input type="text" className="form-control form-control-sm" id=""isResolved placeholder={this.state.isResolved.toString()} name="isResolved" value={this.state.isResolved} onChange={this.handleChange} />
                        <div style = {{color:'red'}}>{this.state.isResolvedError} </div>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            )
        }
    }
