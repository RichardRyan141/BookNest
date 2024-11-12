import React from "react";

const MarketPage = () => {
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      hardCopyPrice: 20,
      softCopyPrice: 10,
      image: "https://picsum.photos/200/300?random=1",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      hardCopyPrice: 18,
      softCopyPrice: 9,
      image: "https://picsum.photos/200/300?random=2",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      hardCopyPrice: 22,
      softCopyPrice: 11,
      image: "https://picsum.photos/200/300?random=3",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      hardCopyPrice: 15,
      softCopyPrice: 7,
      image: "https://picsum.photos/200/300?random=4",
    },
    {
      id: 5,
      title: "Moby Dick",
      author: "Herman Melville",
      hardCopyPrice: 25,
      softCopyPrice: 12,
      image: "https://picsum.photos/200/300?random=5",
    },
    {
      id: 6,
      title: "War and Peace",
      author: "Leo Tolstoy",
      hardCopyPrice: 30,
      softCopyPrice: 15,
      image: "https://picsum.photos/200/300?random=6",
    },
    {
      id: 7,
      title: "The Odyssey",
      author: "Homer",
      hardCopyPrice: 20,
      softCopyPrice: 10,
      image: "https://picsum.photos/200/300?random=7",
    },
    {
      id: 8,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      hardCopyPrice: 19,
      softCopyPrice: 9,
      image: "https://picsum.photos/200/300?random=8",
    },
    {
      id: 9,
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      hardCopyPrice: 21,
      softCopyPrice: 10,
      image: "https://picsum.photos/200/300?random=9",
    },
    {
      id: 10,
      title: "Brave New World",
      author: "Aldous Huxley",
      hardCopyPrice: 23,
      softCopyPrice: 11,
      image: "https://picsum.photos/200/300?random=10",
    },
  ];

  const handlePurchase = (bookTitle, format) => {
    alert(`You have chosen to buy a ${format} of "${bookTitle}"`);
  };

  const getRandomStars = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">Market</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold p-0 m-0">{book.title}</h3>
            <p className="text-gray-700 p-0 m-0">by {book.author}</p>
            <div className="flex items-center">
              <p className="text-yellow-500 text-sm mr-2">
                {"★".repeat(getRandomStars())}
              </p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-bold text-lg text-gray-800 mt-0">
                  Hard Copy: ${book.hardCopyPrice}
                </p>
                <button
                  onClick={() => handlePurchase(book.title, "Hard Copy")}
                  className=" bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 text-sm"
                >
                  Buy Hard Copy
                </button>
              </div>
              <div>
                <p className="font-bold text-lg text-gray-800 mt-0">
                  Soft Copy: ${book.softCopyPrice}
                </p>
                <button
                  onClick={() => handlePurchase(book.title, "Soft Copy")}
                  className=" bg-white text-blue-500 py-1 px-4 rounded-lg border border-blue-500 hover:bg-blue-100 text-sm"
                >
                  Buy Soft Copy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPage;
