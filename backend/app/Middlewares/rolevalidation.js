
const roleValidation = async (req, res, next) => {
    if(req.body.role){
         next()
    }else{
        return res.status(403).json({message: "Role is required"})
    }
 }
 
 module.exports = {
    roleValidation
 }