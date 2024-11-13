import React from "react";
import { Link } from "react-router-dom";

const BookList = () => {
  // Dummy data for books
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      synopsis:
        "A story of the young and mysterious millionaire Jay Gatsby and his passion for the beautiful Daisy Buchanan, set in the Jazz Age on Long Island.",
      genres: ["#Classic", "#Romance"],
      rating: 4,
      chapters: 9,
      imageUrl: "https://picsum.photos/150/220?random=1",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      synopsis:
        "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
      genres: ["#Historical", "#Drama"],
      rating: 5,
      chapters: 31,
      imageUrl: "https://picsum.photos/150/220?random=2",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      synopsis:
        "A dystopian novel set in a totalitarian society ruled by Big Brother, exploring themes of oppression, surveillance, and freedom.",
      genres: ["#Dystopian", "#SciFi"],
      rating: 4,
      chapters: 24,
      imageUrl: "https://picsum.photos/150/220?random=3",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      synopsis:
        "A romantic novel that critiques the British landed gentry at the end of the 18th century, following the story of Elizabeth Bennet.",
      genres: ["#Romance", "#Classic"],
      rating: 5,
      chapters: 61,
      imageUrl: "https://picsum.photos/150/220?random=4",
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

  // Helper function to truncate text
  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="w-full flex justify-end">
        <Link to="/book/create">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105">
            Create Your Own Book
          </button>
        </Link>
      </div>
      <h2 className="text-4xl font-bold mb-8 text-center text-black">
        Explore Our Book Collection
      </h2>
      <div className="grid grid-cols-2 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            style={{ height: "300px" }} // Fixed card height
          >
            {/* Book Image */}
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-1/3 h-full object-cover"
            />

            {/* Book Details */}
            <div className="w-2/3 p-6 flex flex-col justify-between">
              {/* Genres */}
              <div className="flex space-x-2 mb-2">
                {book.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 ">
                {book.title}
              </h3>
              <p className=" text-gray-400 mb-1 mt-0 text-sm font-semibold">
                Author: {book.author}
              </p>
              {/* Synopsis */}
              <p className="text-gray-600 mb-4">
                {truncateText(book.synopsis, 80)}
              </p>

              {/* Rating, Chapters, and Button Row */}
              <div className="flex items-center justify-between">
                {/* Rating */}
                <div className="flex items-center  text-lg">
                  <span>⭐ </span>
                  {book.rating}
                </div>

                {/* Total Chapters */}
                <span className="text-gray-600 text-sm">
                  {book.chapters} Chapters
                </span>

                {/* View Details Button */}

                <Link to={`/book/${book.id}`}>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
