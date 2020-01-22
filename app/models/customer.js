const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    name:{
        type: String,
        unique:true,
        required:true
    },
    mobile:{
        type: String,
        required:true,
        minlength: 10,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(email){
                return validator.isEmail(email)
            },
            message: function(){
                return 'Provide a valid email'
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
const Customer = mongoose.model('Customer',customerSchema)

module.exports = Customer