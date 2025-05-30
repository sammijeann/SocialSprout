import { Router } from 'express';
const router = Router();
import postRoutes from './postRoutes.js';
import userRoutes from './userRoutes.js';
router.use('/thoughts', postRoutes);
router.use('/users', userRoutes);
export default router;
