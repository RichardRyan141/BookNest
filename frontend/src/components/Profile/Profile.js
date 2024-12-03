import React, { useEffect, useState } from "react";
import Reward from "./Reward";
import Credit from "./Credit";

const Profile = () => {
  const [selectedPage, setSelectedPage] = useState("profile");

  const getIdFromToken = (jwt) => {
    const base64Url = jwt.split(".")[1]; // Get payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = JSON.parse(atob(base64)); // Decode and parse JSON
    return jsonPayload.id; // Return the 'id' field
  };

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const id = getIdFromToken(token);
      console.log("ini token:", id);
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        const user = data.find((e) => e.id === id);
        console.log("ini user", user);
        setUser(user);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* Toggle buttons */}
      <div className="flex max-w-3xl mx-auto gap-2 px-2">
        <button
          onClick={() => setSelectedPage("profile")}
          className={`px-4 py-2  font-semibold rounded-t
            ${
              selectedPage === "profile"
                ? "bg-[#111828] text-white"
                : "bg-white hover:bg-gray-500 text-black"
            }`}
        >
          Profile
        </button>
        <button
          onClick={() => setSelectedPage("rewards")}
          className={`px-4 py-2  font-semibold rounded-t
            ${
              selectedPage === "rewards"
                ? "bg-[#111828] text-white"
                : "bg-white hover:bg-gray-500 text-black"
            }`}
        >
          Rewards
        </button>
        <button
          onClick={() => setSelectedPage("credit")}
          className={`px-4 py-2  font-semibold rounded-t
            ${
              selectedPage === "credit"
                ? "bg-[#111828] text-white"
                : "bg-white hover:bg-gray-500 text-black"
            }`}
        >
          Credit
        </button>
      </div>
      {selectedPage === "profile" && (
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
                  {user.name}
                </h1>
                <p className="text-gray-600 mt-0">{user.email}</p>
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
                    className="px-3 py-1 bg-[#f4ebb1] text-blue-600 text-sm rounded-full"
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
      )}
      {selectedPage === "rewards" && <Reward />}
      {selectedPage === "credit" && <Credit credit={user.credits} />}
    </>
  );
};

export default Profile;
