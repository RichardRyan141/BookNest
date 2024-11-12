import React, { useState } from "react";

const Profile = () => {
  const [selectedPage, setSelectedPage] = useState("profile");

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

  // Dummy data for Rewards
  const rewardData = {
    dailyReward: "50 Points",
    level: 5,
    levelProgress: 60, // Level progress in percentage
    missions: [
      {
        id: 1,
        description: "Read 30 minutes",
        status: "Completed",
        icon: "📖",
      },
      {
        id: 2,
        description: "Write a review",
        status: "In Progress",
        icon: "✍️",
      },
      {
        id: 3,
        description: "Share a book with a friend",
        status: "Not Started",
        icon: "👫",
      },
      {
        id: 4,
        description: "Complete a quiz",
        status: "Completed",
        icon: "❓",
      },
      {
        id: 5,
        description: "Invite a friend",
        status: "Not Started",
        icon: "👥",
      },
      {
        id: 6,
        description: "Attend a live event",
        status: "In Progress",
        icon: "🎥",
      },
      {
        id: 7,
        description: "Create a reading list",
        status: "Completed",
        icon: "📋",
      },
      { id: 8, description: "Rate a book", status: "Not Started", icon: "⭐" },
    ],
    badges: [
      {
        name: "Bookworm",
        description: "Complete 10 reading missions",
        icon: "🐛",
      },
      { name: "Reviewer", description: "Write 5 reviews", icon: "📝" },
      {
        name: "Social Butterfly",
        description: "Share with friends 3 times",
        icon: "🦋",
      },
    ],
  };

  return (
    <>
      {/* Toggle buttons */}
      <div className="flex max-w-3xl mx-auto gap-2 px-2">
        <button
          onClick={() => setSelectedPage("profile")}
          className={`px-4 py-2  font-semibold text-white  rounded-t
            ${
              selectedPage === "profile"
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-500 text-black"
            }`}
        >
          Profile
        </button>
        <button
          onClick={() => setSelectedPage("rewards")}
          className={`px-4 py-2  font-semibold   rounded-t
            ${
              selectedPage === "rewards"
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-500 text-black"
            }`}
        >
          Rewards
        </button>
      </div>
      {selectedPage === "profile" ? (
        <>
          <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg ">
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
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Badges
              </h2>
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
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-5 h-5"
                        style={{
                          backgroundImage: `url(${
                            index === 0
                              ? "/badge/book-cover.png"
                              : index === 1
                              ? "/badge/verify.png"
                              : index === 2
                              ? "/badge/tick-mark.png"
                              : ""
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      {badge}
                    </div>
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
        </>
      ) : (
        <>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            {/* Rewards Header */}
            <h2 className="text-xl font-bold mb-6 ">🎉 Rewards Dashboard</h2>

            {/* Daily Reward */}
            <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-6 text-center">
              <p className="text-xl font-semibold">
                Daily Reward:{" "}
                <span className="font-bold">{rewardData.dailyReward}</span>
              </p>
            </div>

            {/* Draggable or Scrollable Missions Section */}
            <div className="mt-4 overflow-y-auto max-h-72 bg-white border border-gray-200 rounded-lg shadow p-3">
              <ul className="space-y-3">
                {rewardData.missions.map((mission) => (
                  <li
                    key={mission.id}
                    className="flex items-center text-gray-700"
                  >
                    <span className="text-2xl mr-3">{mission.icon}</span>
                    <p>
                      {mission.description} -{" "}
                      <span
                        className={`font-semibold ${
                          mission.status === "Completed"
                            ? "text-green-500"
                            : mission.status === "In Progress"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {mission.status}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Level Progress */}
            <div className="mt-8 mb-6">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                Level {rewardData.level}
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${rewardData.levelProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm">
                Progress: {rewardData.levelProgress}%
              </p>
            </div>

            {/* Badge Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                How to Earn Badges
              </h3>
              <div className="flex flex-col gap-4">
                {rewardData.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    {/* Badge Icon and Name */}
                    <span
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full ${
                        badge.name === "Bookworm"
                          ? "bg-green-100 text-green-700 border-dashed border-2 border-green-300"
                          : badge.name === "Reviewer"
                          ? "bg-yellow-100 text-yellow-700 border border-yellow-300 shadow-sm"
                          : badge.name === "Social Butterfly"
                          ? "bg-blue-100 text-blue-700 border border-blue-300 shadow-inner"
                          : ""
                      }`}
                    >
                      <span className="text-lg">{badge.icon}</span>
                      <span>{badge.name}</span>
                    </span>

                    {/* Badge Description */}
                    <p className="text-gray-600 italic flex-1 text-sm ml-4">
                      {badge.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
