const mongoose = require('mongoose')
const t = require('../../utils/setTime')
const loginSchema = new mongoose.Schema({
    user: { type: String, required: true },
    pass: { type: String, required: true },
    time: { type: String, default: t.time() },
})

var Login = mongoose.model('login', loginSchema);

module.exports = Login