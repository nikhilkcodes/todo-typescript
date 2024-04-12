import { Router } from 'express';
import { createTodo, deleteTodo, getAllTodos, updateTodo } from '../controllers/todoContoller';

const router = Router();

router.get('/', getAllTodos)
router.post('/', createTodo)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

export default router;
