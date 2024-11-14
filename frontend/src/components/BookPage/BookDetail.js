import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Dummy data for books
const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "F. Scott Fitzgerald",
    synopsis:
      "A story of the young and mysterious millionaire Jay Gatsby and his passion for the beautiful Daisy Buchanan, set in the Jazz Age on Long Island.",
    genres: ["#Classic", "#Romance"],
    rating: 4,
    chapters: 9,
    imageUrl: "/book-cover/aotmichabits.jpg",
  },
  {
    id: 2,
    title: "The Sorcerer's Stone",
    author: "Harper Lee",
    synopsis:
      "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
    genres: ["#Historical", "#Drama"],
    rating: 5,
    chapters: 31,
    imageUrl: "/book-cover/harrypotter.jpg",
  },
  {
    id: 3,
    title: "Ego is The Enemy",
    author: "Ryan Renold",
    synopsis:
      "A dystopian novel set in a totalitarian society ruled by Big Brother, exploring themes of oppression, surveillance, and freedom.",
    genres: ["#Dystopian", "#SciFi"],
    rating: 4,
    chapters: 24,
    imageUrl: "/book-cover/egoistheemey.jpg",
  },
  {
    id: 4,
    title: "Subtle Art",
    author: "Jane Austen",
    synopsis:
      "A romantic novel that critiques the British landed gentry at the end of the 18th century, following the story of Elizabeth Bennet.",
    genres: ["#Romance", "#Classic"],
    rating: 5,
    chapters: 61,
    imageUrl: "/book-cover/subtleart.jpg",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    synopsis:
      "The story of teenage Holden Caulfield's experiences in New York City, exploring themes of identity, belonging, and alienation.",
    genres: ["#Fiction", "#ComingOfAge"],
    rating: 4,
    chapters: 26,
    imageUrl: "https://picsum.photos/150/220?random=5",
  },
  {
    id: 6,
    title: "Moby Dick",
    author: "Herman Melville",
    synopsis:
      "A seafaring tale of Captain Ahab's obsessive quest to kill the great white whale, Moby Dick.",
    genres: ["#Adventure", "#Classic"],
    rating: 3,
    chapters: 135,
    imageUrl: "https://picsum.photos/150/220?random=6",
  },
  {
    id: 7,
    title: "War and Peace",
    author: "Leo Tolstoy",
    synopsis:
      "An epic novel that intertwines the lives of five families with the historical events of the Napoleonic Wars.",
    genres: ["#Historical", "#Classic"],
    rating: 5,
    chapters: 365,
    imageUrl: "https://picsum.photos/150/220?random=7",
  },
  {
    id: 8,
    title: "Brave New World",
    author: "Aldous Huxley",
    synopsis:
      "A dystopian novel set in a technologically advanced future society that explores issues of control, freedom, and happiness.",
    genres: ["#Dystopian", "#SciFi"],
    rating: 4,
    chapters: 18,
    imageUrl: "https://picsum.photos/150/220?random=8",
  },
  {
    id: 9,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    synopsis:
      "An epic fantasy story of the quest to destroy the One Ring and defeat the Dark Lord Sauron.",
    genres: ["#Fantasy", "#Adventure"],
    rating: 5,
    chapters: 62,
    imageUrl: "https://picsum.photos/150/220?random=9",
  },
  {
    id: 10,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    synopsis:
      "A journey of Bilbo Baggins, a hobbit, who is swept into an epic quest to reclaim the lost Kingdom of Erebor.",
    genres: ["#Fantasy", "#Adventure"],
    rating: 4,
    chapters: 19,
    imageUrl: "https://picsum.photos/150/220?random=10",
  },
  {
    id: 11,
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    synopsis:
      "A story of vanity and moral corruption centered on Dorian Gray, a man who remains young while his portrait ages.",
    genres: ["#Classic", "#Gothic"],
    rating: 4,
    chapters: 20,
    imageUrl: "https://picsum.photos/150/220?random=11",
  },
  {
    id: 12,
    title: "Frankenstein",
    author: "Mary Shelley",
    synopsis:
      "A gothic novel about Victor Frankenstein's creation of a creature and the tragic events that follow.",
    genres: ["#Gothic", "#Horror"],
    rating: 4,
    chapters: 24,
    imageUrl: "https://picsum.photos/150/220?random=12",
  },
  {
    id: 13,
    title: "Dracula",
    author: "Bram Stoker",
    synopsis:
      "A horror novel telling the story of Count Dracula's attempt to move from Transylvania to England.",
    genres: ["#Horror", "#Gothic"],
    rating: 5,
    chapters: 27,
    imageUrl: "https://picsum.photos/150/220?random=13",
  },
  {
    id: 14,
    title: "The Alchemist",
    author: "Paulo Coelho",
    synopsis:
      "The story of Santiago, a shepherd who travels to Egypt to discover a treasure and fulfills his personal legend.",
    genres: ["#Adventure", "#Philosophical"],
    rating: 4,
    chapters: 35,
    imageUrl: "https://picsum.photos/150/220?random=14",
  },
  {
    id: 15,
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    synopsis:
      "A novel following the experiences of Jane Eyre, including her growth to adulthood and her love for Mr. Rochester.",
    genres: ["#Classic", "#Romance"],
    rating: 5,
    chapters: 38,
    imageUrl: "https://picsum.photos/150/220?random=15",
  },
];

const BookDetail = () => {
  const { id } = useParams(); // Get community ID from the URL params
  const book = books.find((c) => c.id === parseInt(id));

  if (!book) return <p>Book not found!</p>;
  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-lg">
      <div className="flex">
        {/* Book Cover Image */}
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-48 h-72 object-cover rounded-md shadow-md"
        />

        {/* Book Details */}
        <div className="ml-6 flex flex-col justify-between">
          <div>
            {/* Genres */}
            <div className="text-gray-500 text-sm mb-2">
              {book.genres.map((genre) => (
                <span key={genre} className="mr-2">
                  {genre}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {book.title}
            </h1>

            {/* Author */}
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

            {/* Synopsis */}
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Synopsis:</span> {book.synopsis}
            </p>
          </div>

          {/* Additional Details */}
          <div className="flex items-center mt-4">
            {/* Rating */}
            <div className="flex items-center mr-6">
              <span className="mr-2 font-semibold">Rating:</span>
              {Array.from({ length: book.rating }).map((_, index) => (
                <span key={index} className="text-yellow-500 text-lg">
                  ⭐
                </span>
              ))}
            </div>

            {/* Chapters */}
            <div className="flex items-center mr-6">
              <span className="mr-2 font-semibold">Chapters:</span>
              <span>{book.chapters}</span>
            </div>

            {/* View button */}
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
              Add to collection
            </button>
          </div>
        </div>
      </div>
      {/* Chapters Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chapters</h2>
        <ul className="grid grid-cols-2 gap-4">
          {Array.from({ length: book.chapters }).map((_, index) => (
            <li
              key={index}
              className="p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 flex items-center justify-between cursor-pointer hover:scale-105 duration-500"
            >
              <span>Chapter {index + 1}</span>
              <button className="text-blue-600 hover:text-blue-800 transition">
                View
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetail;
