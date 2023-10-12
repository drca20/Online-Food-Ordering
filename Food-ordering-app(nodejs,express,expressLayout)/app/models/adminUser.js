const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' }
}, { timestamps: true })



userSchema.methods.createJWT= function(){
    return jwt.sign({userId:this._id},'8y/B?E(H+MbQeThWmZq3t6w9z$C&F)J@',{expiresIn:'1d'})
}

module.exports = mongoose.model('users', userSchema)