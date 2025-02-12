const User = require('../Models/User')

const patientController = {}

patientController.dashboard = async (req, res) => {
    let user = await User.findOne({ email: req.user.email })
    if (!user) {
        res.status(400).send({
            errors: 'invalid email or password'
        })
    }
    res.send(user)
}

patientController.profile = async (req, res) => {
    const { email } = req.body;
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            res.status(400).send({
                errors: 'invalid email or password'
            })
        } else {
            await User.updateOne({ email: email }, req.body)
            res.send(user)
        }
    } catch (error) {
        res.send({ "status": "failed", "error": error })
    }


}

module.exports = patientController