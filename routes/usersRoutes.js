const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/retrieve/:id', userController.getUserById)
router.post('/login', userController.loginUser)
router.put('/signin', userController.signInUser)


module.exports = router;