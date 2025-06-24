const express = require('express');
const { SentOtp, VerifyOtp } = require('./controllers');

const router = express.Router(); // Adjust the path as necessary

router.post('/send-otp', SentOtp);
router.post('/verify-otp', VerifyOtp);

module.exports = router;
