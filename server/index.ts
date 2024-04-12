import express from 'express';
import db from './database';
import todoRoutes from './routes/todoRoutes';
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/todos', todoRoutes);

// Start the server
db.once('open', () => {
	console.log('Connected to MongoDB database');
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
