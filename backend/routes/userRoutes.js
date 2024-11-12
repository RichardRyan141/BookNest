const express = require('express');
const router = express.Router();
const { getUsers, registerUser, loginUser, logoutUser, buyCredits } = require('../controllers/userController');

router.get('/', getUsers);

router.post('/register', registerUser);

router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.post('/buy-credits/:amount', buyCredits);

module.exports = router;
