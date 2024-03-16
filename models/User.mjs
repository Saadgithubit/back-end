import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import jwtSecret from "../config/jwt.mjs";
const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    tokens: {
        default: [],
        type: []
    }
})
userSchema.pre("save", function (next) {
    const user = this
    //encryption
    if (user.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
    }

    next()
})

userSchema.methods.comparePassword = function (password) {
    const user = this

    console.log('db password', user.password)
    console.log('frontend password', password)

    return bcrypt.compareSync(password, user.password)
}

userSchema.methods.generateToken = function () {
    const { _id } = this

    const token = jwt.sign({ _id }, jwtSecret);
    return token
}

const User = mongoose.model('users', userSchema)

export default User