import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaStepForward } from "react-icons/fa";
import { FaStepBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import Swal from "sweetalert2";
import { CiSearch } from "react-icons/ci";

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

const dummyBooks = Array.from({ length: 80 }, (_, index) => {
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
    id: index + 1,
    title: `Book Title ${index + 1}`,
    author: `Author ${index + 1}`,
    rating: (Math.random() * 5).toFixed(1), // Random rating between 0 and 5
    releaseUpdate: `2024-11-${Math.ceil(Math.random() * 27)}`, // Random release date
    genres: selectedGenres, // Add the random genres
  };
});

const Bookshelf = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Popular");
  const [filteredBooks, setFilteredBooks] = useState(dummyBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const booksPerPage = 20;

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "Popular") {
      return b.popularity - a.popularity; // Sorting by popularity
    } else if (sortOption === "Rating") {
      return b.rating - a.rating; // Sorting by rating
    } else if (sortOption === "Update") {
      return new Date(b.releaseUpdate) - new Date(a.releaseUpdate); // Sorting by release date
    }
    return 0;
  });

  const filteredBooks2 = sortedBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks2.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(dummyBooks.length / booksPerPage);

  const handlePageChange = (type) => {
    if (type === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (type === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (type === "first") {
      setCurrentPage(1);
    } else if (type === "last") {
      setCurrentPage(totalPages);
    }
  };

  // Sorting function based on selected sort option

  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handleGenreChange = (selectedGenre) => {
    setCurrentPage(1); // Reset to first page when genre changes
    if (selectedGenre) {
      setFilteredBooks(
        dummyBooks.filter((book) => book.genres.includes(selectedGenre))
      );
    } else {
      setFilteredBooks(dummyBooks); // Show all books if no genre is selected
    }
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Add logic to filter books based on searchQuery
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="w-full flex justify-center">
        <div className="flex items-center border justify-center w-2/3 bg-white rounded-lg shadow-md p-2">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={handleSearch}
            className="flex-grow p-2 outline-none"
          />
          <CiSearch className="text-gray-500 size-7 font-semibold cursor-pointer" />
        </div>
      </div>

      <div className="mt-4 flex flex-col justify-start mb-4">
        <label className="mr-2 text-lg">Genre</label>
        <select
          id="genre-select"
          className="p-2 border rounded w-fit"
          onChange={(e) => handleGenreChange(e.target.value)}
        >
          <option value="">All Genres</option>
          {genresList.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <label className="text-lg">Urutkan</label>
      <div className="flex justify-between items-center mb-2">
        <div className="">
          <button
            className={`mr-4 py-2 px-4 rounded ${
              sortOption === "Popular"
                ? "bg-[#40798C] text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleSortChange("Popular")}
          >
            Popular
          </button>
          <button
            className={`mr-4 py-2 px-4 rounded ${
              sortOption === "Rating"
                ? "bg-[#40798C] text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleSortChange("Rating")}
          >
            Rating
          </button>
          <button
            className={`py-2 px-4 rounded ${
              sortOption === "Update"
                ? "bg-[#40798C] text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleSortChange("Update")}
          >
            Update
          </button>
        </div>
        <div className="flex justify-between items-center">
          <FaStepBackward
            className={`text-black cursor-pointer size-5 ${
              currentPage === 1 && "text-gray-400 cursor-default"
            }`}
            onClick={() => handlePageChange("first")}
          />

          <MdKeyboardArrowLeft
            className={`text-black cursor-pointer size-8 ${
              currentPage === 1 && "text-gray-400 cursor-default"
            }`}
            onClick={() => handlePageChange("prev")}
          />

          <p>
            Page {currentPage} of {totalPages}
          </p>

          <MdKeyboardArrowRight
            className={`text-black cursor-pointer size-8 ${
              currentPage === totalPages && "text-gray-400 cursor-default"
            }`}
            onClick={() => handlePageChange("next")}
          />

          <FaStepForward
            className={`text-black cursor-pointer size-5 ${
              currentPage === totalPages && "text-gray-400 cursor-default"
            }`}
            onClick={() => handlePageChange("last")}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {currentBooks.map((book) => (
          <Link to={`/book/${book.id}`}>
            <div
              key={book.id}
              className="p-2 border rounded shadow-md hover:shadow-lg cursor-pointer bg-white"
            >
              <div
                className="h-52 bg-gray-200 flex items-center justify-center text-gray-500 bg-cover bg-center"
                style={{ backgroundImage: `url(/book-cover/atomic.jpg)` }}
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
  );
};

export default Bookshelf;
