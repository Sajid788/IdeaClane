const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'regular'], default: 'regular' },
});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 7);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(email, password){
    const user = await UserModel.findOne({ email });
    if(!user){
        return false;
    }
    return await bcrypt.compare(password, user.password);
};

userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id: this._id,
        email: this.email
    },process.env.JWT_SECRET,{expiresIn : process.env.JWT_SECRET});
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
