import { Router } from 'express';
const router = Router();
import { getSingleThought, getThoughts, createThought, deleteThought, addReaction, deleteReaction, updateThought } from '../../controllers/postController.js';

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);


export default router;
