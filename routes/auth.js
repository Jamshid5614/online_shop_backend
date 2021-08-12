const express = require('express');
const router = express.Router();
const {Login,SignUp} = require('../controllers/auth');

router.post('/login',Login);
router.post('/sign-up',SignUp);

module.exports = router;
