import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['customer','admin'],
        default:'customer'
    },
    emailVerificationOtp: {
        type: String,
    },
    emailVerificationExpires: {
        type: Date,
    },
    resetPasswordOtp: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }
    }, { 
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" } 
    });



export default mongoose.model("User", userSchema);