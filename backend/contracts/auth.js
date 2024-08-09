const express = require('express');
const router = express.Router();

const multer = require('multer');

const UserAuth = require('./models/user_auth_model');
const TempUser = require('./models/temp_user_auth_model');
const UserDetails = require('./models/user_model');

const upload = multer();


const path = require('path');
router.get('/ping', (req, res) => {
    res.status(200).send('pong');
    console.log('Request at /ping');
});

// Generate a random alphanumeric token
const generateToken = () => {
    const length = 20; // Specify the length of the token
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
};

router.post('/register', upload.none(), async (req, res) => {
    console.log('Request at /register');
    const personal_email = req.body.personal_email;
    const is_doctor = req.body.is_doctor;
    const doctor_id = req.body.doctor_id;
    if (is_doctor === 'true') {
        console.log("doctor_id: " + doctor_id)
        const doctor_organization = req.body.doctor_organization;
    } else {
        const gender = req.body.gender;
    }


    const token = generateToken();
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("OTP: " + otp);

    console.log("personal_email: " + personal_email)
    console.log("is_doctor: " + is_doctor)

    // res.status(200).json({ message: 'Registration successful' });

    try {
        let user_auth = await UserAuth.findOne({ personal_email });

        if (user_auth) {
            console.log("user exists")
            res.status(400).send('User already exists');
        }
        else {
            let tempUser = new TempUser({
                personal_email: personal_email,
                current_otp: otp,
                otp_token: token
            });

            await tempUser.save();

            // Set otp_token and user_exist into local cookie

            return res.status(200).json({
                otp_token: token,
                user_exist: false,
                status: 'ok',
                msg: 'OTP sent successfully'
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})


router.post('/login', upload.none(), async (req, res) => {
    console.log('Request at /login');

    const personal_email = req.body.personal_email;
    const is_doctor = req.body.is_doctor;

    const token = generateToken();
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("OTP: " + otp);

    console.log("personal_email: " + personal_email)
    console.log("is_doctor: " + is_doctor)

    // res.status(200).json({ message: 'Registration successful' });

    try {
        let user_auth = await UserAuth.findOne({ personal_email });

        if (user_auth) {
            user_auth.otp_token = token;
            user_auth.current_otp = otp;
            await user_auth.save();
            return res.status(200).json({
                otp_token: token,
                user_exist: true,
                status: 'ok',
                msg: 'OTP sent successfully'
            });
        }
        else {
            console.log("user does not exists")
            res.status(400).send('User does exists');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/verify-otp', upload.none(), async (req, res) => {
    console.log('Request at /verify-otp');
    const otp_token = req.body.otp_token;
    const user_exist = req.body.user_exist;
    const otp = req.body.otp;

    console.log("verify otp token: " + otp_token)

    const user_auth_token = generateToken();
    console.log('User Auth Token: ' + user_auth_token);

    if (user_exist === 'false') {
        try {
            let tempUser = await TempUser.findOne({ otp_token });
            const personal_email = tempUser.personal_email;
            if (tempUser) {
                if (tempUser.current_otp == otp) {
                    let user = new UserDetails({
                        personal_email: personal_email,
                        user_auth_token: user_auth_token
                    });
                    await user.save();

                    let user_auth = new UserAuth({
                        personal_email: personal_email,
                        user_auth_token: user_auth_token,
                        current_otp: otp,
                        otp_token: otp_token
                    });
                    await user_auth.save();

                    await TempUser.deleteOne({ personal_email: personal_email });

                    // res.cookie('user_auth_token', user_auth_token);
                    return res.status(200).json({ user_auth_token: user_auth_token, status: 'ok' });
                } else {
                    return res.status(400).json({ msg: 'Incorrect OTP', status: 'error' });
                }
            } else {
                return res.status(400).json({ msg: 'OTP verification failed', status: 'error' });
            }

        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
    else {

        try {
            let user_auth = await UserAuth.findOne({ otp_token });

            if (user_auth) {
                if (user_auth.current_otp == otp) {
                    user_auth.user_auth_token = user_auth_token;
                    await user_auth.save();
                    // res.cookie('user_auth_token', user_auth_token);
                    return res.status(200).json({ user_auth_token: user_auth_token, status: 'ok' });
                } else {
                    return res.status(400).json({ msg: 'Incorrect OTP', status: 'error' });
                }
            } else {
                return res.status(400).json({ msg: 'OTP verification failed', status: 'error' });
            }

        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }

});

router.post('/verify-user', upload.none(), async (req, res) => {
    console.log('Request at /verify-user');
    const user_auth_token = req.body.user_auth_token;
    let user = await UserAuth.findOne({ user_auth_token });
    console.log(user_auth_token)
    if (user) {
        return res.status(200).json({ status: 'ok' });
    } else {
        return res.status(400).json({ status: 'failed' });
    }
});


module.exports = router;