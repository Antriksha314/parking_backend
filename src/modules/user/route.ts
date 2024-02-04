import * as express from 'express';

const router = express.Router();

router.route('/user/update').post();
router.route('/user/signin').post();

module.exports = router;
