import * as express from 'express';
import { create } from '../../controller/floors/create';
import { get } from '../../controller/floors/view';
import { deleteFloor } from '../../controller/floors/delete';
import { update } from '../../controller/floors/update';
import { hasRole } from '../../middleware/auth';
import { roleType } from '../../utils/enums';
const router = express.Router();

router.route('/floor/create').post(hasRole(roleType.ADMIN), create);
router.route('/floor/:id').get(hasRole(roleType.ADMIN), get).delete(hasRole(roleType.ADMIN), deleteFloor);
router.route('/floor/update').put(hasRole(roleType.ADMIN), update);

module.exports = router;
