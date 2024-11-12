import React from "react";

const Profile = () => {
  // Dummy data
  const userData = {
    username: "booklover123",
    email: "booklover@example.com",
    favoriteBooks: ["To Kill a Mockingbird", "1984", "Pride and Prejudice"],
    favoriteGenres: ["Fiction", "Fantasy", "Historical"],
    joinedCommunities: [
      { id: 1, name: "Classic Literature", members: 320 },
      { id: 2, name: "Sci-Fi Enthusiasts", members: 214 },
      { id: 3, name: "Fantasy Fans", members: 580 },
    ],
    badges: ["Book Worm", "Literary Critic", "Community Leader"],
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src="/boy.png"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {userData.username}
          </h1>
          <p className="text-gray-600">{userData.email}</p>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Badges</h2>
        <div className="flex gap-2 flex-wrap">
          {userData.badges.map((badge, index) => (
            <span
              key={index}
              className={`px-4 py-2 text-sm font-medium rounded-full
          ${
            index === 0
              ? "bg-yellow-100 text-yellow-700 border border-yellow-300 shadow-sm"
              : ""
          }
          ${
            index === 1
              ? "bg-blue-100 text-blue-700 border border-blue-300 shadow-inner"
              : ""
          }
          ${
            index === 2
              ? "bg-green-100 text-green-700 border-dashed border-2 border-green-300"
              : ""
          }
          ${
            index === 3
              ? "bg-purple-100 text-purple-700 border-l-4 border-purple-300"
              : ""
          }
          ${
            index === 4
              ? "bg-pink-100 text-pink-700 border border-pink-300 shadow-lg"
              : ""
          }
          ${
            index === 5
              ? "bg-gray-100 text-gray-700 border-double border-2 border-gray-300"
              : ""
          }
          ${
            index === 6
              ? "bg-indigo-100 text-indigo-700 border border-indigo-300 shadow-md"
              : ""
          }
        `}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Favorite Books */}
      <div className="mb-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Favorite Books
        </h2>
        <ul className="list-disc pl-5 text-gray-700">
          {userData.favoriteBooks.map((book, index) => (
            <li key={index}>{book}</li>
          ))}
        </ul>
      </div>

      {/* Favorite Genres */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Favorite Genres
        </h2>
        <div className="flex gap-2 flex-wrap">
          {userData.favoriteGenres.map((genre, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Joined Communities */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Joined Communities
        </h2>
        <ul className="space-y-2">
          {userData.joinedCommunities.map((community) => (
            <li
              key={community.id}
              className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-md"
            >
              <span className="font-medium text-gray-700">
                {community.name}
              </span>
              <span className="text-sm text-gray-500">
                {community.members} members
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
