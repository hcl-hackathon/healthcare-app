const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const Schema = mongoose.Schema

const ProviderSchema = new Schema(({          
       username:{
           type: String,
           required: true,
           minlength: 6,
           maxlength: 64,
           unique: true // check user name to be unique
       },
       email: {
           type: String,
           required: true,
           unique: true,
           validate:{
               validator: function(value){
                     return isEmail(value)
               },
               message: function(){
                        return 'invalid email format'
               }  
           }
       },
       password:{
           type:String,
           required: true,
           minlength: 8,
           maxlength: 128
       },

       mobile: {
        type: String,
        minlength: [10,'mobile number must be 10 characters long'],
        maxlength: [10, 'mobile number must be 10 characters long'],
        validate: {
            validator: function(value){
                return isNumeric(value)
            },
            message: 'mobile should be only numbers'
        }
    },

    address: {
        type: String,
        required: false
    },

   medications: [{
        medicine : {
            type: String,
        },
        compliance_status : {
            type: String,
            enum: ["goal met", "missed check up"]
        },
   }],

   role: {
    type: String,
    required : [true, "role is required"],
    enum: ["provider", "patient"]

   },
   patientList:[{
    name : {
        type: String,
    },
    email : {
                 type: String,
                  required: true,
                  unique: true,
                  validate:{
                      validator: function(value){
                            return isEmail(value)
                      },
                      message: function(){
                               return 'invalid email format'
                      }  
                  }
       
    },
}]

}))

const Provider = mongoose.model('Provider', ProviderSchema)
module.exports = Provider