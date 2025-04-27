
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Please enter a usename!'],
        unique: true,

    },
    
    email:{
        type: String,
        required: [true,'Please enter a email!'],
        unique: true,
    },

    password:{
        type: String,
        required: [true,'Please enter a password!'],
    },
    
    isVerified: {
        type: Boolean,
    }

});

const User = mongoose.models.users || mongoose.model('users',userSchema);

export default User;
