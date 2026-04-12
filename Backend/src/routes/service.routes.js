import {Router} from 'express';
import {getAllServices, getServiceById} from '../controllers/service.controller.js';

const router = Router();

// Get all services
router.get('/', getAllServices);
router.get('/:id', getServiceById);

export default router;