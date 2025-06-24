const { default: mongoose } = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: String,
    code: String,
    expiresAt: Date,
});
const OTP = mongoose.model('OTP', otpSchema);
module.exports = OTP;
