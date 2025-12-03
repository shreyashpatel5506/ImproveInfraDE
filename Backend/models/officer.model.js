import mongoose from 'mongoose';

const officerSchema = new mongoose.Schema({
    email:
    {
        type: String,
        required: true,
        unique: true,
    },

    password:
    {
        type: String,
        required: true
    },

},
    { timestamps: true });

const Officer = mongoose.model('User', officerSchema);

export default Officer;