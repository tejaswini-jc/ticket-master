import React from 'react'
import Axios from 'axios'

export default class NoteForm extends React.Component{
    constructor(props){
        super(props)
            this.state ={
                name:props.name ? props.name : '',
                email:props.email ? props.email : '',
                mobile:props.mobile ? props.mobile : '',
                department:props.department ? props.department: '',
                departments:props.departments ? props.departments : [],
                nameError:"",
                emailError:"",
                mobileError:"",
                departmentError:""
            }
        }
        validate = () => {
            let nameError=""
            let emailError=""
            let mobileError=""
            let departmentError=""
            if(!this.state.name){
                nameError='Name must be filled out'
            }
            if(!this.state.email){
                emailError='Email must be filled out'
            }
            if(!this.state.mobile){
                mobileError='Mobile must be filled out'
            }
            if(!this.state.department){
                departmentError='Department must be filled out'
            }
            if(nameError|| emailError || mobileError || departmentError){
                this.setState({nameError, emailError, mobileError, departmentError})
                return false
            }
            return true
        }
        handleSubmit = (e) => {
            e.preventDefault()
            const isValid = this.validate()
    
            if(isValid){
                const formData = {
                    name: this.state.name,
                    email: this.state.email,
                    mobile: this.state.mobile,
                    department: this.state.department
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
            Axios.get('http://localhost:3045/departments',{
                headers : {
                    'x-auth':localStorage.getItem('authToken')
                }
            })
            .then(response =>{
                const departments = response.data
                this.setState({departments})
            })
        }

        render(){
            return(
                <div className="container col-md-5">
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name"></label>
                        <input type="text" className="form-control" id="" placeholder="type name..." name="name" value={this.state.name} onChange={this.handleChange} />
                        <div style = {{color:'red'}}>{this.state.nameError} </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"></label>
                            <input type="text" className="form-control" id="email" placeholder="type email..." name="email" value={this.state.email} onChange={this.handleChange} />
                            <div style = {{color:'red'}}>{this.state.emailError} </div>
                            </div>
                        <div className="form-group">
                            <label htmlFor="mobile"></label>
                            <input type="text" className="form-control" id="mobile" placeholder="type mobile..." name="mobile" value={this.state.mobile} onChange={this.handleChange} />
                            <div style = {{color:'red'}}>{this.state.mobileError} </div>
                            </div>
                        <div className="form-group">
                            <label htmlfor="department"></label>
                            <select className="form-control" id="department" name="department" value={this.state.department} onChange={this.handleChange } >
                                <option>{this.state.department.name}</option>
                                {
                                this.state.departments.map(department=> {
                                    return (<option key={department._id} value={department._id} > {department.name}</option>)
                                })
                                }
                            </select>
                            <div style = {{color:'red'}}>{this.state.departmentError} </div>
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>  
                </div>
            )
        }
    }
