import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    num: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model('allemployees', employeeSchema);