require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const bookRoutes = require('./routes/bookRoutes');
app.use('/books', bookRoutes);

const historyRoutes = require('./routes/historyRoutes');
app.use('/history', historyRoutes);
