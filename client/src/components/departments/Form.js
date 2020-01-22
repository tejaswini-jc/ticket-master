import React from 'react'
 
export default class DepartmentForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            nameError:""
        }
    }
    validate = () => {
        let nameError=""
        if(!this.state.name){
            nameError='Field must be filled out'
        }
        if(nameError){
            this.setState({nameError})
            return false
        }
        return true
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const isValid = this.validate()

        if(isValid){
            const formData = {
                name: this.state.name
        
            }
            this.props.handleSubmit(formData)
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name"></label>
                        <input className="form-control" type="text" id="name" placeholder="type here..." name="name" value={this.state.title} onChange={this.handleChange}/>
                        <div style = {{color:'red'}}>{this.state.nameError} </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}