import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import Modal from "../Modal/Modal";

const books = {
  1: {
    id: 1,
    title: "Atomic Habits",
    author: "F. Scott Fitzgerald",
    synopsis:
      "A story of the young and mysterious millionaire Jay Gatsby and his passion for the beautiful Daisy Buchanan, set in the Jazz Age on Long Island.",
    genres: ["#Classic", "#Romance"],
    rating: 4,
    chapters: 9,
    imageUrl: "/book-cover/atomic.jpg",
  },
};

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showPurchase, setShowPurchase] = useState(false);

  const openPurchase = () => {
    setShowPurchase(true);
  };

  const closePurchase = () => {
    setShowPurchase(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBooks = async () => {
      try {
        console.log(id);
        const response = await fetch(`http://localhost:5000/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          const formattedBook = {
            id: parseInt(id),
            title: data.title || "Untitled",
            author: data.author || "Unknown Author",
            synopsis: data.synopsis || "No synopsis available.",
            genres: data.tags || ["#General"],
            rating: data.rating || 0,
            chapters: data.chapters?.length || 0,
            imageUrl: data.imageUrl || "/book-cover/egoistheemey.jpg",
          };
          setBook(formattedBook);
        } else {
          const fallbackBook = books[id] || books[1];
          setBook(fallbackBook);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        const fallbackBook = books[id] || books[1];
        setBook(fallbackBook);
      }
    };

    fetchBooks();
  }, [id]);

  const addBookCollection = () => {
    Swal.fire({
      icon: "success",
      title: "Successful",
      text: "Book added to Collection",
      timer: 1300,
      showConfirmButton: false,
    });
  };

  if (!book) return <p>Book not found!</p>;

  const truncateSynopsis = (synopsis, maxWords = 20) => {
    const words = synopsis.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return synopsis;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closePurchase();

    Swal.fire({
      title: "Success!",
      text: "Purchase Successfull.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

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
              <span className="font-semibold">Synopsis:</span>{" "}
              {truncateSynopsis(book.synopsis, 25)}
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
            <button
              className="px-4 py-2 bg-[#40798C] hover:bg-[#2c5360] text-white rounded-md  transition duration-200"
              onClick={addBookCollection}
            >
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

              {index < 4 ? (
                <>
                  <Link to={`/book/${id}/chapter/${index + 1}`}>
                    <button className="text-[#274387] transition">View</button>
                  </Link>
                </>
              ) : (
                <>
                  <button
                    className="text-[#274387] transition"
                    onClick={openPurchase}
                  >
                    <FaLock />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={showPurchase} onClose={closePurchase}>
        <div className="">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Choose Your Payment Method
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Balance Card */}
            <label className="block bg-white p-4 rounded border shadow-sm hover:shadow-lg cursor-pointer">
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="purchaseOption"
                  value="balance"
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                <div>
                  <h4 className="text-lg font-semibold">Balance</h4>
                  <p className="text-sm text-gray-500">(e.g., $50)</p>
                </div>
              </div>
            </label>
            {/* Points Card */}
            <label className="block bg-white p-4 rounded border shadow-sm hover:shadow-lg cursor-pointer">
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="purchaseOption"
                  value="points"
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <h4 className="text-lg font-semibold">Points</h4>
                  <p className="text-sm text-gray-500">(e.g., 500 points)</p>
                </div>
              </div>
            </label>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition font-semibold"
            >
              Confirm Purchase
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default BookDetail;
