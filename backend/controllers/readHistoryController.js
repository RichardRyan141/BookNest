const { ReadingHistory, Book, Chapter } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "03f166d26bab9394365d354cdba95cea17936b4df707e41a24d1d51769dfee58";

const getReadingHistory = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        const readingHistory = await ReadingHistory.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Book,
                    attributes: ['title'],
                },
                {
                    model: Chapter,
                    attributes: ['chapter_id', 'chapter_title'],
                },
            ],
            order: [['timestamp', 'DESC']],
        });

        res.status(200).json({ readingHistory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getReadingHistory };
