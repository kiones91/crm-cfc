import { Router } from 'express';
import { ensureAuth } from '../middlewares/ensureAuth';
import {
  getAllExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
} from '../controllers/examController';

const router = Router();

router.use(ensureAuth);

router.get('/', getAllExams);
router.get('/:id', getExamById);
router.post('/', createExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;
