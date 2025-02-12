const express = require('express')
const router = express.Router();
const usersController = require('../app/Controllers/usersController')
const providerController = require('../app/Controllers/providerController')
const { authenticateUser } = require("../app/Middlewares/authentication")
const { roleValidation } = require("../app/Middlewares/rolevalidation")
const  patientController  = require("../app/Controllers/patientController")

router.post('/register', usersController.register)
router.post('/login',roleValidation, usersController.login)

router.get('/provider/dashboard/:id', authenticateUser, providerController.dashboardDetails)
router.patch('/provider/details', authenticateUser, providerController.details)

router.get('/patient/profile', authenticateUser, patientController.dashboard)
router.put('/patient/profile', authenticateUser, patientController.profile)


module.exports = router