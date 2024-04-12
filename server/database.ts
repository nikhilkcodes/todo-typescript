import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
} as mongoose.ConnectOptions);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB Connection error'));

export default db;
