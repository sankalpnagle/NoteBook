const express = require("express");
const router = express.Router();
const { signUp, signIn } = require('../controller/userController')
const requireLogin = require('../middleware/requireLogin')

router.post('/signup', signUp)

router.post('/login', signIn)

router.get('/', requireLogin, (req, res) => {
    res.send('hellow')
})

module.exports = router