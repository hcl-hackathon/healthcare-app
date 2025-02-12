const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../app/Middlewares/authentication')
const usersController = require('../app/Controllers/usersController')
const providerController = require('../app/Controllers/providerController')

router.post('/register', usersController.register)
router.post('/login', usersController.login)

router.get('/provider/dashboard/:id', authenticateUser, providerController.dashboardDetails)
router.patch('/provider/details', authenticateUser, providerController.details)


module.exports = router