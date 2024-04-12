import { Request, Response } from 'express';
import Todo from '../models/Todo';

export const getAllTodos = async (req: Request, res: Response) => {
	try {
		const todos = await Todo.find();
		res.json(todos);
	} catch (error: any) { // Specify 'any' type here
		res.status(500).json({ message: error.message });
	}
};
export const createTodo = async (req: Request, res: Response) => {
	try {
		const { name, dueDate } = req.body;
		const todo = await Todo.create({ name, dueDate });
		res.status(201).json(todo);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const updateTodo = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false });
		if (!updatedTodo) {
			return res.status(404).json({ message: 'Todo not found' });
		}
		res.json(updatedTodo);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteTodo = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const deletedTodo = await Todo.findByIdAndDelete(id);
		if (!deletedTodo) {
			return res.status(404).json({ message: 'Todo not found' });
		}
		res.json(deletedTodo);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
}
// Implement other CRUD operations (create, update, delete) here...
