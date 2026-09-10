import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';

const JWT_SECRET = process.env.JWT_SECRET;

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function getUserFromToken(token) {
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  const result = await sql`SELECT id, name, email, phone, role, rating FROM users WHERE id = ${decoded.id}`;
  return result.rows[0] || null;
}
