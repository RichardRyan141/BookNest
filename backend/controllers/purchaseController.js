const { User, Chapter, ChapterPurchaseHistory } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "03f166d26bab9394365d354cdba95cea17936b4df707e41a24d1d51769dfee58";

const purchaseChapter = async (req, res) => {
    const { bookId, chapterId } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        const chapter = await Chapter.findOne({
            where: {
                book_id: bookId,
                chapter_id: chapterId
            }
        });

        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        const chapterPrice = chapter.price;

        if (chapterPrice <= 0) {
            return res.status(400).json({ message: 'This chapter is free and does not require purchase' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.credits < chapterPrice) {
            return res.status(400).json({ message: 'Insufficient credits' });
        }

        user.credits -= chapterPrice;
        await user.save();

        const purchaseEntry = await ChapterPurchaseHistory.create({
            user_id: userId,
            book_id: bookId,
            chapter_id: chapterId,
        });

        res.status(200).json({
            message: 'Purchase successful',
            purchase: purchaseEntry,
            remainingCredits: user.credits,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPurchaseHistory = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        const purchaseHistory = await ChapterPurchaseHistory.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: Book,
                    attributes: ['id', 'title'],  // Include book id and title in the response
                },
                {
                    model: Chapter,
                    attributes: ['chapter_id', 'chapter_title'],  // Include chapter id and title
                }
            ],
            order: [['createdAt', 'DESC']]  // Order by the most recent purchase
        });

        if (purchaseHistory.length === 0) {
            return res.status(404).json({ message: 'No purchase history found' });
        }

        const formattedHistory = purchaseHistory.map(entry => ({
            bookId: entry.book_id,
            bookTitle: entry.Book.title,
            chapterId: entry.chapter_id,
            chapterTitle: entry.Chapter.chapter_title,
            purchasedAt: entry.createdAt
        }));

        res.status(200).json(formattedHistory);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { purchaseChapter, getPurchaseHistory };
