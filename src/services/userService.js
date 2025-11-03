import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import validate from "../validations/userValidation.js";

export const createUser = async (user) => {
  const validated = validate(createUserSchema, user);
  const { fullname, username, email, password, role } = validated;

  const [res] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
    [fullname, username, email, password, role]
  );

  return { id: res.insertId, ...validated.data };
};

export const getAllUser = async () => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number FROM users"
  );
  return users;
};

export const getUserById = async (id) => {
  const [users] = await pool.query(
    "SELECT fullname, username, email, role, address, phone_number FROM users WHERE id = ?",
    [id]
  );

  if (users.length === 0) {
    throw new ResponseError("User not found", 404);
  }

  return users[0];
};
