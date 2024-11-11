const { Book } = require('../models');
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

module.exports = { getBooks, addBook };