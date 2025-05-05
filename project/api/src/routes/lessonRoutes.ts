import { Router } from 'express';
import { ensureAuth } from '../middlewares/ensureAuth';
import {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../controllers/lessonController';

const router = Router();

router.use(ensureAuth);

router.get('/', getAllLessons);
router.get('/:id', getLessonById);
router.post('/', createLesson);
router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);

export default router;
