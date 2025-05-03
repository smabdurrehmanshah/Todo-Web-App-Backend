const express = require('express');
const { createUser, loginUser, addTodo, getTodos, deleteTodo, editTodo } = require('../controllers/todoAppController');

// router object 
const router = express.Router();

// routes

// CREATE USER || POST 
router.post("/register", createUser);

// LOGIN USER || POST 
router.post("/login", loginUser);

// ADD TODO || POST 
router.post("/addTodo", addTodo);

// GET TODOS || GET 
router.get("/getTodos", getTodos);

// DELETE TODO || DELETE 
router.delete('/deleteTodo', deleteTodo);

// EDIT TODO 
router.put('/editTodo', editTodo);


module.exports = router;