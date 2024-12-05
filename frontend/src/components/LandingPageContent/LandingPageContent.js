import React, { useState } from "react";
import "./LandingPageContent.css";
import { CiStar } from "react-icons/ci";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { MdOutlineBookmarkAdd } from "react-icons/md";

const genresList = [
  "Fantasy",
  "Romance",
  "Action",
  "Sci-Fi",
  "Thriller",
  "Drama",
  "Mystery",
  "Horror",
];

const imageURL = [
  "/book-cover/atomic.jpg",
  "/book-cover/egoistheemey.jpg",
  "/book-cover/harrypotter.jpg",
  "/book-cover/subtleart.jpg",
  "/book-cover/king.jpg",
];

const dummyBooks = Array.from({ length: 5 }, (_, index) => {
  // Randomly select between 1 and 3 genres for each book
  const numGenres = Math.ceil(Math.random() * 3);
  const selectedGenres = [];

  for (let i = 0; i < numGenres; i++) {
    const randomGenre =
      genresList[Math.floor(Math.random() * genresList.length)];
    if (!selectedGenres.includes(randomGenre)) {
      selectedGenres.push(randomGenre);
    }
  }

  return {
    id: index + 2,
    title: `Book Title ${index + 1}`,
    author: `Author ${index + 1}`,
    rating: (Math.random() * 5).toFixed(1), // Random rating between 0 and 5
    releaseUpdate: `2024-11-${Math.ceil(Math.random() * 27)}`, // Random release date
    genres: selectedGenres, // Add the random genres
    imageUrl: imageURL[index],
  };
});

const LandingPageContent = () => {
  const [activeTab, setActiveTab] = useState("week");
  const [filteredBooks, setFilteredBooks] = useState(dummyBooks);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleBookmarkClick = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Successfuly add book to list!",
      timer: 1000,
      showConfirmButton: false,
    });
  };

  return (
    <main className="landing-page-content space-y-10 p-6">
      <div className="recommended-books space-y-6 rounded-lg bg-red-200">
        <div className="tag-title">
          <h2 className="text-2xl font-bold">Recommended Books</h2>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {filteredBooks.map((book) => (
            <Link to={`/book/${book.id}`}>
              <div
                key={book.id}
                className="p-2 border rounded shadow-md hover:shadow-lg cursor-pointer bg-white"
              >
                <div
                  className="h-64 bg-gray-200 flex items-center justify-center text-gray-500 bg-cover bg-center"
                  style={{ backgroundImage: `url(${book.imageUrl})` }}
                >
                  <p>Cover {book.id}</p>
                </div>
                <p className="text-sm text-gray-600 m-0">{book.author}</p>
                <p className="text-base font-semibold m-0 truncate">
                  {book.title}
                </p>
                <p className="whitespace-nowrap truncate">
                  Genres: {book.genres.join(", ")}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CiStar className="text-black mr-1" />
                    <span>{book.rating}</span>
                  </div>

                  <MdOutlineBookmarkAdd
                    className="size-7 hover:bg-gray-300 p-1 rounded-full cursor-pointer"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation(); // Prevent the click from propagating to the <Link>
                      handleBookmarkClick(book.id); // Your specific function
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="popular-books h-fit space-y-6">
        <div className="">
          <h2 className="text-2xl font-bold">Popular Books</h2>
        </div>
        <div className="tags flex gap-4">
          {["week", "month", "year"].map((period) => (
            <span
              key={period}
              onClick={() => handleTabClick(period)}
              className={`cursor-pointer px-4 py-2 rounded-full transition ${
                activeTab === period
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </span>
          ))}
        </div>
      </div>

      <div className="popular-books-list space-y-4">
        {["week", "month", "year"].map((period) => (
          <ul
            key={period}
            id={period}
            style={{ display: activeTab === period ? "block" : "none" }}
            className="space-y-2"
          >
            {[...Array(10)].map((_, i) => (
              <li key={i}>
                <a href="" className="text-blue-600 hover:text-blue-800">
                  Book {period.charAt(0).toUpperCase() + period.slice(1)}{" "}
                  {i + 1}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="latest-novels space-y-6">
        <div className="tag-title flex justify-between items-center">
          <h5 className="text-xl font-semibold">Latest Update</h5>
          <a href="" className="text-blue-500 hover:underline">
            More {">>"}
          </a>
        </div>
        <div className="latest-update-list grid gap-6 md:grid-cols-2">
          <div className="latest-update-novel p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <a href="" className="flex gap-4">
              <div className="pic w-1/3">
                <img
                  src="https://trxs.cc/d/file/tongren/20241111/629dbed1f804f2d0a95801074188cc78.jpg"
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="infos w-2/3 space-y-2">
                <h3 className="text-lg font-bold">
                  The game of all heavens, the cheater who started from Demon
                  Slayer (full version)
                </h3>
                <div className="booknews text-gray-600 text-sm">
                  Author: Liu Shui Jian Xin{" "}
                  <span className="date ml-2">2024-11-11</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Introduction: One day two hundred years ago, countless huge
                  portals appeared all over the earth...
                </p>
              </div>
            </a>
          </div>
          <div className="latest-update-novel p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <a href="" className="flex gap-4">
              <div className="pic w-1/3">
                <img
                  src="https://trxs.cc/d/file/tongren/20241111/ce8cad16b96044e2fdefb5f7031fee84.jpg"
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="infos w-2/3 space-y-2">
                <h3 className="text-lg font-bold">
                  Dragon, choose cultural victory to make money (1-227)
                </h3>
                <div className="booknews text-gray-600 text-sm">
                  Author: An interesting potato{" "}
                  <span className="date ml-2">2024-11-11</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Introduction: At the beginning, the red dragon Drogo just
                  wanted to make some money...
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPageContent;
