const departmentsInitialState=[]

const departmentsReducer = (state = departmentsInitialState, action)=>{
    switch(action.type){
        case 'SET_DEPARTMENTS':{
            return [...action.payload]
        }
        case 'ADD_DEPARTMENT':{
            return[...state, action.payload]
        }
        case 'REMOVE_DEPARTMENT':{
            return state.filter(department=>department._id !== action.payload)
        }
        default: {
            return [...state]
        }
    }
}
export default departmentsReducer