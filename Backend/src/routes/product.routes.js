import {Router} from 'express';
import {getAllProducts, getProductById, reviewProductById } from '../controllers/product.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/:id/reviews', verifyToken, reviewProductById);

export default router;
