import React, { useState } from "react";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [genres, setGenres] = useState("");
  const [cover, setCover] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCover(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert("Book created successfully!");
  };

  return (
    <div className="container mx-auto p-8 max-w-3xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Create a New Book 📖
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the book title"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label
            htmlFor="author"
            className="block text-gray-700 font-semibold mb-2"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the author name"
            required
          />
        </div>

        {/* Synopsis */}
        <div>
          <label
            htmlFor="synopsis"
            className="block text-gray-700 font-semibold mb-2"
          >
            Synopsis
          </label>
          <textarea
            id="synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the synopsis"
            rows="4"
            required
          />
        </div>

        {/* Genres */}
        <div>
          <label
            htmlFor="genres"
            className="block text-gray-700 font-semibold mb-2"
          >
            Genres
          </label>
          <input
            type="text"
            id="genres"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., #Classic, #Romance"
          />
        </div>

        {/* Cover Upload */}
        <div>
          <label
            htmlFor="cover"
            className="block text-gray-700 font-semibold mb-2"
          >
            Cover Image
          </label>
          <input
            type="file"
            id="cover"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          {cover && (
            <div className="mt-4">
              <img
                src={cover}
                alt="Cover Preview"
                className="w-40 h-60 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Create Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
