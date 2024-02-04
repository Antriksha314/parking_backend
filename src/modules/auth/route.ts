import * as express from 'express';
import { signIn } from '../../controller/auth/signIn';
import { signUp } from '../../controller/auth/signUp';
import { protect } from '../../middleware/auth';
import { changePassword } from '../../controller/auth/changePassword';
import { forgotPassword } from '../../controller/auth/forgotPassword';
import { resetPassword } from '../../controller/auth/resetPassword';
import { verifyOtp } from '../../controller/auth/verifyOTP';
import { userInfo } from '../../controller/auth/profile';

const router = express.Router();

router.route('/auth/register').post(signUp);
router.route('/auth/login').post(signIn);
router.route('/auth/change-password').put(protect, changePassword);
router.route('/auth/forgot-password').post(forgotPassword);
router.route('/auth/reset-password').post(protect, resetPassword);
router.route('/auth/verify-otp').post(verifyOtp);
router.route('/auth/me').get(protect, userInfo);

module.exports = router;
