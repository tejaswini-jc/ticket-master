const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ticketSchema = new Schema({ 
    code: {
        type: String,
        required:true
    },
    customer: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:'Customer'
    },
    employee: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:'Employee'
    },
    department:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Department'
    },
    priority:{
        type:String,
        required:true,
        enum: ["high", "medium","low"]
    },
    message:{
        type:String,
        required:true,
        minlength:10
    },
    isResolved:{
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket