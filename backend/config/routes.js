const express = require('express')
const router = express.Router();
const usersController = require('../app/Controllers/usersController')
const { authenticateUser } = require("../app/Middlewares/authentication")
const  patientController  = require("../app/Controllers/patientController")

router.post('/register', usersController.register)
router.post('/login', usersController.login);
router.get('/patient/dashboard', authenticateUser, patientController.dashboard)
router.put('/patient/profile', authenticateUser, patientController.profile)


module.exports = router