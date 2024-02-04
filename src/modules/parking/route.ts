import * as express from 'express';
import { create } from '../../controller/parking/create';
import { all, get } from '../../controller/parking/view';
import { deleteParking } from '../../controller/parking/delete';
import { update } from '../../controller/parking/update';
import { hasRole } from '../../middleware/auth';
import { roleType } from '../../utils/enums';
const router = express.Router();

router.route('/parking/create').post(hasRole(roleType.ADMIN), create);
router.route('/parking/:id').get(hasRole(roleType.ADMIN), get).delete(hasRole(roleType.ADMIN), deleteParking);
router.route('/parking/update').put(hasRole(roleType.ADMIN), update);
router.route('/parking/list/all').get(hasRole(roleType.ADMIN), all);

module.exports = router;
