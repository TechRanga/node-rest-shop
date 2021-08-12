const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');

router.post('/signup',UserController.user_register);

router.post('/login',UserController.user_login);

router.delete('/delete/:userID',UserController.user_delete);

module.exports = router;

