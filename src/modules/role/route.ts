import * as express from 'express';
import { create } from '../../controller/role/create';
import { deleteRole } from '../../controller/role/delete';
import { update } from '../../controller/role/update';
import { get } from '../../controller/role/view';
import { hasRole } from '../../middleware/auth';
import { roleType } from '../../utils/enums';
const router = express.Router();

router.route('/role/:slug').get(hasRole(roleType.ADMIN), get);
router.route('/role/create').post(hasRole(roleType.ADMIN), create);
router.route('/role/:slug/update').put(hasRole(roleType.ADMIN), update);
router.route('/role/:slug/delete').delete(hasRole(roleType.ADMIN), deleteRole);

module.exports = router;
