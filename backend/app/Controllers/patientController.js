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
    const { email, password, username, age, address, healthInfo, waterIntake, steps } = req.body;
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            res.status(400).send({
                errors: 'invalid email or password'
            })
        } else {
            let result = await User.updateOne({ email: email }, req.body)
            res.send({ status: "OK", result: result })
        }
    } catch (error) {
        res.send({ "status": "failed", "error": error })
    }


}

module.exports = patientController