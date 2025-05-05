import { Router } from 'express';
import { ensureAuth } from '../middlewares/ensureAuth';
import {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
} from '../controllers/instructorController';

const router = Router();

router.use(ensureAuth);

router.get('/', getAllInstructors);
router.get('/:id', getInstructorById);
router.post('/', createInstructor);
router.put('/:id', updateInstructor);
router.delete('/:id', deleteInstructor);

export default router;
