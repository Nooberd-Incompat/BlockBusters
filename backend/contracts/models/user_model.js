const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  personal_email: {
    type: String,
    default: '',
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
  doctor_organization: {
    type: String,
    default: '',
  },
  profile_image_id: {
    type: String,
    default: 'default.png'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserDetails = mongoose.model('user_details', UserSchema);
