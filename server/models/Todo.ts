import { Schema, model } from 'mongoose';

interface Todo {
	name: string;
	dueDate: Date;
}

const todoSchema = new Schema<Todo>({
	name: { type: String, required: true },
	dueDate: { type: Date, required: true }
});

const TodoModel = model<Todo>('Todo', todoSchema);

export default TodoModel;
