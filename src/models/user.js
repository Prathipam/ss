const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
    name:{
        type: String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        validate(value){
            if(value <0 ){
                throw new Error('Age must be positive')
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter valid email address')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        
        validate(value){
            if(value.indexOf('password') != '-1'){
                throw new Error('String should not contain \"Password\"')
            }
            if(value.length <= 6){
                throw new Error('Password must be greater than 6 digits in length')
            }
        }
    }
})

module.exports = User
