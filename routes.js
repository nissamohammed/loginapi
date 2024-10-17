
const express = require('express')
const router = new express.Router()
const userController =require('./controller/userController')
router.post('/api/register',userController.registerController)
router.post('/api/login',userController.loginController)
module.exports = router

