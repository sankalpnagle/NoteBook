const userModel = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_KEY = "naruto"

//create User
exports.signUp = (req, res) => {
    const { name, email, password, date } = req.body
    if (!email || !password || !email) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    userModel.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new userModel({ name, email, password: hashedpassword, date })
                    user.save()
                        .then(user => {
                            res.json({ message: "saved successfully" })
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })

        })
        .catch(error => {
            console.log(error);
        })
}

// Login 
exports.signIn = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    userModel.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "invalid email" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.status(422).json({ message: "successfully signed in" })
                        const token = jwt.sign({ id: savedUser._id }, JWT_KEY)
                        const { id, name, email } = savedUser
                        return res.json({ message: "successfully signed in", token, user: { id, name, email } })
                    } else {
                        return res.status(422).json({ error: "invalid email and password" })
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        })
}