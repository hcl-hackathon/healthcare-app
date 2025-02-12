const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const Provider = require('../Models/Provider.js')

const authenticateUser = async (req, res, next) => {
   const token = req.header('Authorization')
    let tokenData
    try{
        tokenData = jwt.verify(token, process.env.SECRET_KEY)
        const selectedModel = tokenData.role === 'provider' ? Provider: User 
        const user = await selectedModel.findById(tokenData._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    }catch(e){
        res.json(e.message)
    }
}

module.exports = {
    authenticateUser
}