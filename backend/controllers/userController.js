const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { Pool } = require('pg');
const Redis = require('ioredis');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const redis = new Redis({
    host: 'localhost', // your Redis host
    port: 6379,        // your Redis port
    password: process.env.REDIS_PASSWORD || '',
});

const isUserLoggedIn = async (userId) => {
    const sessionToken = await redis.get(`session:${userId}`);
    return sessionToken !== null;
};


const JWT_SECRET = process.env.JWT_SECRET || "03f166d26bab9394365d354cdba95cea17936b4df707e41a24d1d51769dfee58";

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the email already exists in the database
        const checkUserQuery = 'SELECT * FROM public."Users" WHERE email = $1';
        const { rows } = await pool.query(checkUserQuery, [email]);

        if (rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const insertUserQuery = 'INSERT INTO public."Users" (name, role, email, password, credits, "createdAt") VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *';
        const newUser = await pool.query(insertUserQuery, [username, 'user', email, hashedPassword, 0]);

        // Generate a JWT token
        const token = jwt.sign({ id: newUser.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });

        // Store token in Redis (cache)
        await redis.set(`session:${newUser.rows[0].id}`, token, 'EX', 3600); // expires in 1 hour

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: newUser.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user exists
        const checkUserQuery = 'SELECT * FROM public."Users" WHERE email = $1';
        const { rows } = await pool.query(checkUserQuery, [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = rows[0];

        // Check if user is already logged in (check Redis cache)
        const isLoggedIn = await isUserLoggedIn(user.id);
        if (isLoggedIn) {
            return res.status(400).json({ message: 'User already logged in' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Store token in Redis (cache)
        await redis.set(`session:${user.id}`, token, 'EX', 3600); // expires in 1 hour

        res.status(200).json({
            message: 'Login successful',
            token,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout user
const logoutUser = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Delete the user's session token from Redis (invalidate the token)
        await redis.del(`session:${userId}`);

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const buyCredits = async (req, res) => {
    const { amount } = req.body;
    const authHeader = req.headers.authorization;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    try {
        let userId = null;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        }

        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in to buy credits' });
        }

        // Simulate a payment gateway here (this is just for demonstration)
        // In a real-world scenario, you'd integrate with a payment provider like Stripe or PayPal

        const paymentSuccessful = true;

        if (!paymentSuccessful) {
            return res.status(500).json({ message: 'Payment failed. Please try again later.' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.credits += amount;
        await user.save();

        res.status(200).json({
            message: `Successfully added ${amount} credits to your account`,
            credits: user.credits,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUsers, registerUser, loginUser, logoutUser, buyCredits };
