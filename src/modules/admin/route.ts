import * as express from 'express';
import * as user from '../../controller/user/view';
import { hasRole } from '../../middleware/auth';
import { roleType } from '../../utils/enums';
import * as role from '../../controller/role/view';

const router = express.Router();

router.route('/admin/users').get(hasRole(roleType.ADMIN), user.all);
router.route('/admin/roles').get(hasRole(roleType.ADMIN), role.all);
module.exports = router;
