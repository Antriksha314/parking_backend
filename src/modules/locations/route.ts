import * as express from 'express';
import { create } from '../../controller/locations/create';
import { update } from '../../controller/locations/update';
import { get } from '../../controller/locations/view';
import { deleteLocation } from '../../controller/locations/delete';
import { hasRole } from '../../middleware/auth';
import { roleType } from '../../utils/enums';
const router = express.Router();

router.route('/location/create').post(hasRole(roleType.ADMIN), create);
router.route('/location/:id').get(hasRole(roleType.ADMIN), get).delete(hasRole(roleType.ADMIN), deleteLocation);
router.route('/location/update').put(hasRole(roleType.ADMIN), update);

module.exports = router;
