import mongoose from "mongoose";
import Joi from 'joi';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 60,
        min:5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min:6
    },
    password: {
        type: String,
        required: true,
        max: 200,
        min:5
    },
    validated: {
        type: Boolean,
        default: false
    },
    validate_code: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps:true
})


const User = mongoose.model('user', userSchema);
function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(5).max(60).required(),
        email: Joi.string().min(5).max(60).required().email(),
        password: Joi.string().min(5).max(200).required(),
    })
    return schema.validate(user)
}
function validateLogin(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(60).required().email(),
        password: Joi.string().min(5).max(200).required(),
    })
    return schema.validate(user)
}
export {validateUser, validateLogin}
export default User;