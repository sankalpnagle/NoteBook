const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY
const mongoose = require('mongoose')
const User = mongoose.model("user")

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ error: "you must be logged in" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, key, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in" })
        }
        const { id } = payload
        User.findById(id).then(userdata => {
            req.user = userdata
            next()
        })
    })
}