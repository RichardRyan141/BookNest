const { Book, Chapter } = require('../models'); // Assuming you have a Chapter model

// Get a specific chapter from a book
const getChapter = async (req, res) => {
    const { bookId, chapter } = req.params;

    try {
        // Fetch the chapter based on book ID and chapter number
        const chapterRecord = await Chapter.findOne({
            where: {
                book_id: bookId,
                chapter_id: chapter
            }
        });

        // If the chapter is found, return it
        if (chapterRecord) {
            res.status(200).json({
                title: chapterRecord.chapter_title,
                content: chapterRecord.content
            });
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

    // Validate input
    if (!bookId || !chapterTitle || !content) {
        return res.status(400).json({ message: 'All fields (bookId, chapterTitle, content) are required' });
    }

    try {
        // Ensure the book exists before creating a chapter
        const bookExists = await Book.findByPk(bookId);

        if (!bookExists) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Get the count of existing chapters for this book
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
