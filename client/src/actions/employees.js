import axios from 'axios'

export const setEmployees = (employees) => {
    return{
        type:'SET_EMPLOYEES',
        payload:employees
    }
}

export const startSetEmployees = () => {
    return(dispatch) => {
        axios.get('http://localhost:3045/employees',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const employees=response.data
            dispatch(setEmployees(employees))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const addEmployee = (employee) => {
    return{
        type:'ADD_EMPLOYEE',
        payload:employee
    }
}

export const startAddEmployee = (formData, props) => {
    return(dispatch) => {
        axios.post('http://localhost:3045/employees/',formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.errors.message)
            }else{
                const employee=response.data
                dispatch(addEmployee(employee))
                props.history.push(`/employees/${employee._id}`)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const editEmployee = (employee) => {
    return{
        type:'EDIT_EMPLOYEE',
        payload:employee
    }
}

export const startEditEmployee = (formData, props) => {
    return(dispatch) => {
        axios.put(`http://localhost:3045/employees/${props.match.params.id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.errors.message)
            }else{
                const employee=response.data
                dispatch(editEmployee(employee))
                props.history.push(`/employees/${employee._id}`)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}


export const removeEmployee =(id)=>{
    return{
        type:'REMOVE_EMPLOYEE',
        payload:id
    }
}

export const startRemoveEmployee=(id)=>{
    return(dispatch)=>{
        axios.delete(`http://localhost:3045/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            dispatch(removeEmployee(response.data._id))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}