import React, { useEffect, useState } from "react";
import { FaBars, FaBook } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const dummyBooks = Array.from({ length: 80 }, (_, index) => {
  const chapterCount = 8; // Random number of chapters between 1 and 10
  const chapters = Array.from({ length: chapterCount }, (_, chapterIndex) => {
    return {
      chapterNumber: chapterIndex + 1,
      title: `Chapter ${chapterIndex + 1} Title`,
    };
  });

  return {
    id: index + 2,
    title: `Book Title ${index + 1}`,
    author: `Author ${index + 1}`,
    chapters: chapters,
    imageUrl: "/book-cover/atomic.jpg",
  };
});

// Dummy data
const chapterDetails = {
  title: "The Value of life",
  subtitle: "Tiny Changes, Remarkable Results",
  author: "James Clear",
  coverImage: "/book-cover/atomic.jpg",
  content:
    "Learn how to build better habits and break bad ones with this comprehensive guide by James Clear. Atomic Habits focuses on the power of small changes and their cumulative impact on your life. This book provides practical strategies that can help you make significant improvements in your personal and professional life. The author explains how habits work, why they matter, and how to change them effectively.",
};

// BookChapter component
const BookChapter = () => {
  const [showList, setShowList] = useState(false);

  const { bid, cid } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setloading] = useState(true);
  const [chapter, setChapter] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBooks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${bid}`);
        if (response.ok) {
          const data = await response.json();
          const formattedBook = {
            id: parseInt(bid),
            title: data.title || "Untitled",
            author: data.author || "Unknown Author",
            synopsis: data.synopsis || "No synopsis available.",
            chapters: data.chapters || 0,
            imageUrl: data.imageUrl || "/book-cover/egoistheemey.jpg",
          };
          setBook(formattedBook);
          const response2 = await fetch(
            `http://localhost:5000/books/${bid}/${cid}`
          );
          if (response2.ok) {
            const data2 = await response2.json();
            setChapter(data2);
          }
        } else {
          setBook(dummyBooks[bid]);
          setChapter(chapterDetails);
        }
        setloading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [bid, cid]);

  const toggleList = () => {
    setShowList((prev) => !prev);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-lg ">
      <div className="flex self-end p-5 relative">
        {showList && (
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-4 w-48 absolute right-20">
            <ul className="space-y-2">
              {book.chapters.map((chapter, index) => (
                <Link to={`/book/${bid}/chapter/${index + 1}`}>
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-slate-200 p-2 rounded-lg"
                  >
                    Chapter {index + 1}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
        <div>
          <button
            onClick={toggleList}
            className="flex items-center justify-center p-2 border-2 border-gray-200  shadow-md hover:bg-gray-300 transition"
          >
            <FaBars className="text-lg" />
          </button>

          <button
            onClick={toggleList}
            className="flex items-center justify-center  p-2 border-2 border-gray-200  shadow-md hover:bg-gray-300 transition"
          >
            <FaBook className="text-lg" />
          </button>
        </div>
      </div>

      {/* Book Cover */}
      <div className="text-center mb-5">
        <img
          src={book.imageUrl}
          alt="Book Cover"
          className="w-full max-w-sm mx-auto"
        />
      </div>

      {/* Content Section */}
      <div className="px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Chapter {cid}
        </h2>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {chapter.title}
        </h3>
        <p className="text-gray-700">{chapter.content}</p>
      </div>
    </div>
  );
};

export default BookChapter;
