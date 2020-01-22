import axios from 'axios'
import {setCustomers} from './customers'
import {setDepartments} from './departments'
import {setEmployees} from './employees'
import {setTickets} from './tickets'

export const setUser=(user={})=>{
    return{
        type:'SET_USER',
        payload:user
    }
}

export const startRegisterUser=(formData,props)=>{
    return(dispatch)=>{
        axios.post('http://localhost:3045/users/register',formData)
       .then((response)=>{
           if(response.data.hasOwnProperty('errors')){
               alert(response.data.message)
           }else{
               alert('successfully registered')
               dispatch(setUser())
               props.history.push('/users/login')
           }
       })
       .catch((err)=>{
           console.log(err)
       })
    }
}
export const startLoginUser=(formData,props)=>{
    return(dispatch)=>{
        axios.post('http://localhost:3045/users/login',formData)
       .then((response)=>{
           if(response.data.error){
               alert(response.data.error)
           }else{
               const token=response.data.token
               localStorage.setItem('authToken',token)

               Promise.all([axios.get('http://localhost:3045/users/account',{
                   headers:{
                       'x-auth':token
                   }
               }),axios.get('http://localhost:3045/customers',{
                    headers:{
                        'x-auth':token
                    }
               }),axios.get('http://localhost:3045/departments',{
                headers:{
                    'x-auth':token
                }
           }),axios.get('http://localhost:3045/employees',{
            headers:{
                'x-auth':token
            }
       }),axios.get('http://localhost:3045/tickets',{
        headers:{
            'x-auth':token
        }
   })])
               .then(values=>{
                   const [userResponse, customersResponse, departmentsResponse, employeesResponse, ticketsResponse]=values
                   dispatch(setUser(userResponse.data))
                   dispatch(setCustomers(customersResponse.data))
                   dispatch(setDepartments(departmentsResponse.data))
                   dispatch(setEmployees(employeesResponse.data))
                   dispatch(setTickets(ticketsResponse.data))
                   props.history.push('/')
               })
           }
       })
       .catch((err)=>{
           console.log(err)
       })
    }
}

export const startGetUser=()=>{
    return(dispatch)=>{
        axios.get('http://localhost:3045/users/account',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const user=response.data
            dispatch(setUser(user))
        })
    }
}

export const startLogoutUser=()=>{
    return (dispatch)=>{
        axios.delete('http://localhost:3045/users/logout',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty('notice')){
                localStorage.removeItem('authToken')
                dispatch(setUser({}))
                window.location.href='/users/login'
            }
        })
    }
}