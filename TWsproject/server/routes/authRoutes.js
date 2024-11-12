const express = require('express');
const { signup, login ,loginHandler,signupHandler} = require('../controllers/authController.js');
const { getTodos, createTodo, deleteTodo, updateTodo} = require('../controllers/todoController.js');




const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.get('/', getTodos);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
router.put('/:id', updateTodo);


router.get('/login', loginHandler);
router.post('/signup', signupHandler);

module.exports = router;
