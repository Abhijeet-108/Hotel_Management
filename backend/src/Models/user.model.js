import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: function() {
            return !this.googleId; 
        },
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; 
        },
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true 
    },
    profilePicture: {
        type: String
    },
    phone: {
        countryCode: { type: String },
        phoneNumber: { type: String }
    },
    DOB: {
        day: String,
        month: String,
        year: String,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
}, {
    timestamps: true,
})



userSchema.pre("save", async function(next){
    if (!this.isModified("password") || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


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