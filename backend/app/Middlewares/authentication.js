const jwt = require('jsonwebtoken')
const User = require('../Models/User')

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')
     let tokenData
     try{
         tokenData = jwt.verify(token, process.env.SECRET_KEY)
         User.findById(tokenData._id)
            .then((user)=>{
               req.user = user
               next()
            })
            .catch((err)=>{
                console.log(err)
                res.json(err)
            })
     }catch(e){
         res.json(e.message)
     }
 }

module.exports = {
    authenticateUser
}