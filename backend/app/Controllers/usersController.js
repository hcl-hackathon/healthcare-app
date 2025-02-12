const User = require('../Models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Provider = require('../Models/Provider')


const usersController = {}

usersController.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    const provider = new Provider(body)

    const userRole = req.body.role

    if (userRole === 'patient') {
        bcryptjs.genSalt()
            .then((salt) => {
                bcryptjs.hash(user.password, salt)
                    .then((encrpted) => {
                        user.password = encrpted
                        user.save()
                            .then((user) => {
                                res.json({ id: user._id })
                            })
                            .catch((err) => {
                                res.json(err)
                            })
                    })
            })
    } else if (userRole === "provider") {

        bcryptjs.genSalt()
            .then((salt) => {
                bcryptjs.hash(provider.password, salt)
                    .then((encrpted) => {
                        provider.password = encrpted
                        provider.save()
                            .then((provider) => {
                                res.json({ id: provider._id })
                            })
                            .catch((err) => {
                                res.json(err)
                            })
                    })
            })

    }
}

usersController.login = (req, res) => {
    const body = req.body
    const userRole = req.body.role

    if (userRole === "patient") {
        User.findOne({ email: body.email })
            .then((user) => {
                if (!user) {
                    res.json({
                        errors: 'invalid email or password'
                    })
                }

                bcryptjs.compare(body.password, user.password)
                    .then((match) => {
                        if (match) {
                            const tokenData = {
                                _id: user._id,
                                email: user.email,
                                username: user.username,
                                role: user.role
                            }
                            const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
                            res.json({ token })
                        } else {
                            res.json({ errors: 'invalid email or password' })
                        }

                    })
            })
    } else if (userRole === "provider") {
        Provider.findOne({ email: body.email })
            .then((provider) => {
                if (!provider) {
                    res.json({
                        errors: 'invalid email or password'
                    })
                }

                bcryptjs.compare(body.password, provider.password)
                    .then((match) => {
                        if (match) {
                            const tokenData = {
                                _id: provider._id,
                                email: provider.email,
                                username: provider.username,
                                role: provider.role
                            }
                            const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
                            res.json({ token })
                        } else {
                            res.json({ errors: 'invalid email or password' })
                        }

                    })
            })
    }
}



module.exports = usersController