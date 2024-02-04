import * as express from 'express';
import { create } from '../../controller/sections/create';
import { get } from '../../controller/sections/view';
import { deleteSection } from '../../controller/sections/delete';
import { update } from '../../controller/sections/update';
import { hasRole } from '../../middleware/auth';
import { roleType } from '../../utils/enums';
const router = express.Router();

router.route('/section/create').post(hasRole(roleType.ADMIN), create);
router.route('/section/:id').get(hasRole(roleType.ADMIN), get).delete(hasRole(roleType.ADMIN), deleteSection);
router.route('/section/update').put(hasRole(roleType.ADMIN), update);

module.exports = router;
