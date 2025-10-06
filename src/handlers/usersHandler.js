// get all users
import { pool } from "../config/db.js";

export const getAllUsersHandler = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM users");

    // Hilangkan password, tetap sertakan field lain meskipun null
    const sanitizedUsers = users.map((user) => ({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      address: user.address ?? null,
      phone_number: user.phone_number ?? null,
      age: user.age ?? null,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));

    res.status(200).json({
      status: "success",
      data: sanitizedUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

export const getUsersByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [users] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    if (users.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    const user = users[0];
    const sanitizedUser = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      address: user.address ?? null,
      phone_number: user.phone_number ?? null,
      age: user.age ?? null,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    res.status(200).json({
      status: "success",
      data: sanitizedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

export const addUserHandler = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  if (!fullname || !username || !email || !password || !role) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide all required fields",
    });
  } else if (role !== "admin" && role !== "user") {
    return res.status(400).json({
      status: "failed",
      message: "Role must be either 'admin' or 'user'",
    });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [fullname, username, email, password, role]
    );

    const newUser = {
      id: result.insertId,
      fullname,
      username,
      email,
      role,
      address: null,
      phone_number: null,
      age: null,
    };

    res.status(201).json({
      status: "success",
      message: "User added successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

export const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = req.body;
  try {
    const [users] = await pool.query(
      "UPDATE users SET fullname=?, username=?, email=?, password=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
      [
        fullname,
        username,
        email,
        password,
        role,
        address,
        phone_number,
        age,
        id,
      ]
    );

    const [userUpdate] = await pool.query(
      "SELECT id, fullname, username, email, role, phone_number, age FROM users WHERE id=?",
      [id]
    );

    res.status(200).json({
      status: "success",
      message: "User update succses",
      data: userUpdate[0],
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const { deleteUser } = await pool.query("DELETE FROM users WHERE id=?", [
      id,
    ]);

    if (deleteUser.affectedRows === 0) {
      res.status(404).json({
        status: "Fail 404!",
        message: "Note not found",
      });

      res.status(200).json({
        status: "success",
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
