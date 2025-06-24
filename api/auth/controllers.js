const crypto = require('crypto');
const OTP = require('../schemas/otpSchema.js'); // Adjust the path as necessary
const User = require('../schemas/userSchema.js');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sevinmuhammed06@gmail.com',
        pass: 'hzei sqdh azxh wnkq',
    },
});

const SentOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send({ message: 'Email is required' });

    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await OTP.deleteMany({ email }); // remove old ones
    await OTP.create({ email, code, expiresAt });

    await transporter.sendMail({
        from: 'sevinmuhammed06@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your code is ${code}`,
    });

    res.send({ message: 'OTP sent to email' });
};
const VerifyOtp = async (req, res) => {
    const { email, code } = req.body;
    if (!email || !code)
        return res.status(400).send({ message: 'Email and code are required' });

    const otpRecord = await OTP.findOne({ email, code });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
        return res.status(400).send({ message: 'Invalid or expired code' });
    }

    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({ email });
    }

    await OTP.deleteMany({ email }); // Remove used OTPs

    res.send({ message: 'Logged in successfully', userId: user._id });
};
module.exports = { SentOtp, VerifyOtp };
