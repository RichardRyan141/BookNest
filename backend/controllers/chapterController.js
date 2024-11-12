const { Book, Chapter, ReadingHistory, ChapterPurchaseHistory } = require('../models'); // Assuming you have a Chapter model
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "03f166d26bab9394365d354cdba95cea17936b4df707e41a24d1d51769dfee58";

const getChapter = async (req, res) => {
    const { bookId, chapter } = req.params;
    const authHeader = req.headers.authorization;

    try {
        let userId = null;
        let userLoggedIn = false;

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
            userLoggedIn = true;
        }

        const chapterRecord = await Chapter.findOne({
            where: {
                book_id: bookId,
                chapter_id: chapter
            }
        });

        if (chapterRecord) {
            if (chapterRecord.price === 0 || 
                (userLoggedIn && await ChapterPurchaseHistory.findOne({
                    where: {
                        user_id: userId,
                        book_id: bookId,
                        chapter_id: chapterRecord.id
                    }
                }))) {
                
                if (userLoggedIn) {
                    await ReadingHistory.destroy({
                        where: {
                            user_id: userId,
                            book_id: bookId
                        }
                    });

                    await ReadingHistory.create({
                        user_id: userId,
                        book_id: bookId,
                        chapter_id: chapterRecord.id,
                        timestamp: new Date()
                    });
                }

                res.status(200).json({
                    title: chapterRecord.chapter_title,
                    content: chapterRecord.content
                });

            } else {
                if (userLoggedIn) {
                    return res.status(403).json({ message: 'You must purchase this chapter to read it.' });
                } else {
                    return res.status(401).json({ message: 'You must be logged in to purchase this chapter.' });
                }
            }
        } else {
            res.status(404).json({ message: 'Chapter not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new chapter for a book
const createChapter = async (req, res) => {
    const { bookId, chapterTitle, content } = req.body;
    const authHeader = req.headers.authorization;

    // Validate input
    if (!bookId || !chapterTitle || !content) {
        return res.status(400).json({ message: 'All fields (bookId, chapterTitle, content) are required' });
    }

    try {
        let userId = null;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        }

        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in to create a chapter' });
        }

        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.user_id !== userId) {
            return res.status(403).json({ message: 'You are not the author of this book' });
        }

        const chapterCount = await Chapter.count({
            where: {
                bookId: bookId  // Count the chapters that belong to this book
            }
        });

        // Set the new chapterId to be one more than the current number of chapters
        const newChapterId = chapterCount + 1;

        // Create the new chapter
        const newChapter = await Chapter.create({
            bookId,          // The ID of the book the chapter belongs to
            chapterId: newChapterId,  // Set the new chapterId
            chapterTitle,    // The title of the chapter
            content          // The content of the chapter
        });

        res.status(201).json({
            message: 'Chapter created successfully',
            chapter: newChapter
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getChapter, createChapter };
