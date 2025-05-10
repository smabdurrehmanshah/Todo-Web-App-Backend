const db = require("../config/db");

// CREATE USER

const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const [existingUser] = await db.query(
      `SELECT * FROM users WHERE Email = ?`,
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).send({
        success: false,
        message: "Email already registered",
      });
    }

    const data = db.query(
      `INSERT INTO users (Full_Name, Email, Password) VALUES (?, ?, ?)`,
      [fullName, email, password]
    );

    if (!data) {
      return res.status(500).send({
        success: false,
        message: "Error In Insert Query",
      });
    }

    res.status(201).send({
      success: true,
      message: "User registeres successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create User API",
      error,
    });
  }
}

// LOGIN USER 

const loginUser = async (req, res) => {
  try {
    const { email, password} = req.body;

    if(!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields"
      });
    }

    const [existingUser] = await db.query(`SELECT * FROM users WHERE Email = ?`, [email]);

    if(existingUser.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Email not registered"
      });
    }

    if (existingUser[0].Password !== password) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password"
      });
    }

    res.status(200).send({
      success: true,
      message: "Login successful",
      currentUser: existingUser[0]
    });
  }
  catch (error) {
    console.log(error);
    res.statur(500).send({
      success: false,
      message: "Error In Login User API",
      error
    });
  }
}

// ADD TODO 

const addTodo = async (req, res) => {
  try {
    const {todoText, reference} = req.body;

    if (!todoText || !reference) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields"
      });
    }

    const [result] = await db.query(`INSERT INTO todos (User_ID, Todo) VALUES (?, ?)`, [reference, todoText]);

    const todoId = result.insertId;

    const [newTodo] = await db.query('SELECT * FROM todos WHERE Todo_ID = ?', [todoId]);

    if (!result) {
      return res.status(500).send({
        success: false,
        message: "Error in the insert query"
      });
    }

    res.status(201).send({
      success: true,
      message: "Todo added successfully",
      todo: {
        Todo_ID: newTodo[0].Todo_ID,
        Todo: todoText,
        User_ID: reference,
        IsCompleted: newTodo[0].IsCompleted
      }
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In the Add Todo API",
      error
    });
  }
}

// GET ALL TODOS 

const getTodos = async (req, res) => {
  try {
    const userId = req.query.userId;

    if(!userId) {
      return res.status(400).send({
        success: false,
        message: "Please provide userId"
      });
    }

    const [todos] = await db.query(`SELECT * FROM todos WHERE User_ID = ?`, [userId]);

    res.status(200).send({
      success: true,
      message: "All todos fetched",
      todos
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching todos",
      error
    });
  }
}

// DELETE TODO 

const deleteTodo = async (req, res) => {
  try {
    const { todoId} = req.body;

    if (!todoId) {
      return res.status(400).send({
        success: false,
        message: 'Todo Id is required'
      });
    }

    const result = db.query('DELETE FROM todos WHERE Todo_ID = ?', [todoId]);

    if (result.affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: 'Todo not found'
      });
    }

    res.status(200).send({
      success: true,
      message: 'Todo deleted successfully'
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in the delete todo api",
      error
    });
  }
}

// EDIT TODO 

const editTodo = async (req, res) => {
  try {
    const {todoId, newTodoText, IsCompleted} = req.body;

    if(!todoId || !newTodoText) {
      return res.status(400).send({
        success: false,
        message: "Please provide todoId and newTodoText"
      });
    }

    const result = db.query('UPDATE todos SET Todo = ?, IsCompleted = ? WHERE Todo_ID = ?', [newTodoText,IsCompleted, todoId ]);

    if (result.affectedRows === 0) {
      return res.status(400).send({
        success: false,
        message: "Todo not found"
      });
    }

    res.status(200).send({
      success: true,
      message: "Todo updated successfully",
      updatedTodo: {
        newTodoText,
        IsCompleted
      }
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in the edit todo api',
      error
    });
  }
}

module.exports = { createUser, loginUser, addTodo, getTodos, deleteTodo, editTodo };
