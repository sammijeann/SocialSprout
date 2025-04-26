import { Router } from 'express';
const router = Router();
import { getSingleThought, getThoughts, createThought } from '../../controllers/postController.js';

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put().delete();

router.route('/:thoughtId/reactions').post(getSingleThought).delete();


export default router;
