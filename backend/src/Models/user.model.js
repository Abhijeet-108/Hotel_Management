import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 character long'],

        },
        lastname:{
            type: String,
            minlength: [3, 'last name must be at least 3 character long'],
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    phone: {
        countryCode: { type: String, required: true },
        phoneNumber: { type: String, required: true }
    },
    DOB: {
        day: String,
        month: String,
        year: String,
    }
}, {
    timestamps: true,
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            password: this.password,
            full: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKRN_EXPIRY
        }
    )
},

userSchema.methods.generateRefreshToken = function(password){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    ) 
}


export const User = mongoose.model("User", userSchema)