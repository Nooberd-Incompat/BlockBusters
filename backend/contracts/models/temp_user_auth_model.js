const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TempUserAuthSchema = new Schema({
    personal_email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        default: ''
    },
    personal_address: {
        type: String,
        default: '',
    },
    is_doctor: {
        type: Boolean,
        default: false,
    },
    doctor_id: {
        type: String,
        default: '',
    },
    current_otp: {
        type: Number,
    },
    otp_token: {
        type: String,
        required: true
    },
    otp_issued_at: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = TempUserAuth = mongoose.model('temp_user_auth', TempUserAuthSchema);
