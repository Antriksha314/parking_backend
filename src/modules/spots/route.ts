import * as express from 'express';
import { get } from '../../controller/spots/view';
import { update } from '../../controller/spots/update';
import { deleteSpot } from '../../controller/spots/delete';
import { hasRole } from '../../middleware/auth';
import { roleType } from '../../utils/enums';
const router = express.Router();

router.route('/spot/:id').get(hasRole(roleType.ADMIN), get).delete(hasRole(roleType.ADMIN), deleteSpot);
router.route('/spot/update').put(hasRole(roleType.ADMIN), update);

module.exports = router;
