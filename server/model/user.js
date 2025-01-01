import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: String, sparse: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    password : { type: String, required: true},

    
}, {timestamps: true})



const userModel = mongoose.model("User", userSchema);
export default userModel;



