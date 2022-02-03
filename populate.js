import { readFile } from 'fs/promises';
import 'colors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/connect.js';
import Foody from './models/Foody.js';

// Connect to DB
connectDB();

// Read JSON files
const jsonFoodys = JSON.parse(
  await readFile(new URL('./mock-data.json', import.meta.url))
);

const start = async () => {
  try {
    await Foody.deleteMany();
    await Foody.create(jsonFoodys);
    console.log('Success!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
