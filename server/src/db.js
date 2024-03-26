import mysql from 'mysql2/promise';
import { DB_CONFIG } from './env-vars.js';

const pool = mysql.createPool(DB_CONFIG);
console.log('Connected to the database!');
export default pool;
