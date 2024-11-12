const { Book, Chapter, User } = require('../models');
const multer = require('multer');
const path = require('path');

// Set up multer to store images in a "uploads" directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Store the images in the "uploads" folder
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); // Extract file extension
        const filename = `${Date.now()}${fileExtension}`; // Create a unique temporary file name
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type, only JPEG, JPG, PNG, and GIF are allowed'), false);
        }
    }
}).single('coverImage'); // Expect a field named 'coverImage' in the form

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

// Add a new book with a cover image
const addBook = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { title, description, author, publisher } = req.body;
        let coverImage = null;

        // Validate input
        if (!title || !description || !author || !publisher) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            // Create the new book record without the cover image first
            const newBook = await Book.create({
                title,
                description,
                author,
                publisher,
            });

            // After creating the book, rename the uploaded cover image with the book's ID
            if (req.file) {
                coverImage = `uploads/${newBook.id}${path.extname(req.file.originalname)}`; // Use book ID as the image name
                const fs = require('fs');
                const oldPath = req.file.path;
                const newPath = `./uploads/${newBook.id}${path.extname(req.file.originalname)}`;
                
                // Rename the file to match the book's ID
                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('File renamed successfully');
                    }
                });
            }

            // Update the book's record with the cover image
            if (coverImage) {
                await newBook.update({ coverImage });
            }

            res.status(201).json({
                message: 'Book added successfully',
                book: newBook,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to add book' });
        }
    });
};

const editBook = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { id } = req.params; // Get the book ID from the URL parameters
        const { title, description, status } = req.body;
        let coverImage = null;

        // Validate input
        if (!title || !description || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            // Find the existing book by ID
            const existingBook = await Book.findByPk(id);

            if (!existingBook) {
                return res.status(404).json({ message: 'Book not found' });
            }

            // Update book details
            existingBook.title = title;
            existingBook.description = description;
            existingBook.status = status;
            
            // Handle updating the cover image
            if (req.file) {
                coverImage = `uploads/${existingBook.id}${path.extname(req.file.originalname)}`;
                const fs = require('fs');
                const oldPath = req.file.path;
                const newPath = `./uploads/${existingBook.id}${path.extname(req.file.originalname)}`;

                // Rename the file to match the book's ID
                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('File renamed successfully');
                    }
                });

                existingBook.coverImage = coverImage;
            }

            // Save the updated book
            await existingBook.save();

            res.status(200).json({
                message: 'Book updated successfully',
                book: existingBook,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update book' });
        }
    });
};

const getBookDetails = async (req, res) => {
    const { id } = req.params; // Book ID from URL parameters

    try {
        // Find the book by ID, including its author and chapters
        const book = await Book.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    as: 'author', // Alias for the author relation
                    attributes: ['id', 'name'], // Get only the necessary fields
                },
                {
                    model: Chapter,
                    attributes: ['chapter_id', 'chapter_title', 'updatedAt'], // Get chapter details
                    order: [['chapter_id', 'ASC']], // Order chapters by chapter ID
                }
            ]
        });

        // If the book is not found, return a 404 error
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const lastChapterUpdate = book.Chapters.reduce((latest, chapter) => {
            return chapter.updatedAt > latest ? chapter.updatedAt : latest;
        }, book.updatedAt);

        // Format the book details with chapters
        const bookDetails = {
            title: book.title,
            synopsis: book.description,
            author: book.author ? book.author.name : 'Unknown', // Show author's username or "Unknown"
            lastUpdated: lastChapterUpdate,
            chapters: book.Chapters.map(chapter => ({
                chapterNumber: chapter.chapter_id,
                title: chapter.chapter_title
            }))
        };

        // Send the formatted book details as a response
        res.status(200).json(bookDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch book details' });
    }
};

module.exports = { getBooks, addBook, editBook, getBookDetails };