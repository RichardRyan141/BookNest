import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommMember from "./CommunityMember";
import CommChannel from "./CommunityChannel";
import { FaHome } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";

// Sample data for communities with more details

const mockCommunities = [
  {
    id: 1,
    name: "Fantasy Lovers",
    description: "A community for fantasy book enthusiasts.",
    image:
      "https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    members: 1250,
    tags: ["Fantasy", "Magic", "Adventure"],
    leader: "John Doe",
    topReaders: [
      { name: "Alice", booksRead: 45, level: "Expert" },
      { name: "Bob", booksRead: 38, level: "Advanced" },
      { name: "Charlie", booksRead: 32, level: "Intermediate" },
    ],
    mostReadBook: "The Lord of the Rings",
    badges: ["Bookworm", "Fast Reader", "Fantasy Master"],
    level: 3,
  },
  {
    id: 2,
    name: "Sci-Fi Explorers",
    description: "Discover the wonders of science fiction.",
    image:
      "https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    members: 980,
    tags: ["Science Fiction", "Technology", "Future"],
    leader: "Sarah Lee",
    topReaders: [
      { name: "Alice", booksRead: 45, level: "Expert" },
      { name: "Bob", booksRead: 38, level: "Advanced" },
      { name: "Charlie", booksRead: 32, level: "Intermediate" },
    ],
    mostReadBook: "Dune",
    badges: ["Tech Enthusiast", "Sci-Fi Expert", "Visionary"],
    level: 4,
  },
  {
    id: 3,
    name: "Mystery Club",
    description: "Dive into thrilling mysteries together.",
    image:
      "https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    members: 1125,
    tags: ["Mystery", "Crime", "Suspense"],
    leader: "Michael Harris",
    topReaders: [
      { name: "Alice", booksRead: 45, level: "Expert" },
      { name: "Bob", booksRead: 38, level: "Advanced" },
      { name: "Charlie", booksRead: 32, level: "Intermediate" },
    ],
    mostReadBook: "The Girl with the Dragon Tattoo",
    badges: ["Detective", "Mystery Master", "Crime Solver"],
    level: 5,
  },
  {
    id: 4,
    name: "Historical Reads",
    description: "Exploring history through literature.",
    image:
      "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    members: 870,
    tags: ["History", "Non-fiction", "Culture"],
    leader: "James King",
    topReaders: [
      { name: "Alice", booksRead: 45, level: "Expert" },
      { name: "Bob", booksRead: 38, level: "Advanced" },
      { name: "Charlie", booksRead: 32, level: "Intermediate" },
    ],
    mostReadBook: "Sapiens: A Brief History of Humankind",
    badges: ["History Buff", "Cultural Explorer", "Timeless Wisdom"],
    level: 2,
  },
];

const CommunityDetail = () => {
  const { id } = useParams(); // Get community ID from the URL params
  const community = mockCommunities.find((c) => c.id === parseInt(id));
  const [selectedPage, setSelectedPage] = useState("detail");

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  if (!community) return <p>Community not found!</p>;

  return (
    <>
      {/* Toggle buttons */}
      <div className="flex max-w-4xl mx-auto gap-2 px-2">
        <button
          onClick={() => setSelectedPage("detail")}
          className={`px-4 py-2  font-semibold rounded-t
            ${
              selectedPage === "detail"
                ? "bg-[#111828] text-white"
                : "bg-white hover:bg-gray-500 text-black"
            }`}
        >
          <FaHome className="size-6" />
        </button>
        <button
          onClick={() => setSelectedPage("member")}
          className={`px-4 py-2  font-semibold rounded-t
            ${
              selectedPage === "member"
                ? "bg-[#111828] text-white"
                : "bg-white hover:bg-gray-500 text-black"
            }`}
        >
          <MdPeopleAlt className="size-6" />
        </button>
        <button
          onClick={() => setSelectedPage("channel")}
          className={`px-4 py-2  font-semibold rounded-t
            ${
              selectedPage === "channel"
                ? "bg-[#111828] text-white"
                : "bg-white hover:bg-gray-500 text-black"
            }`}
        >
          <IoMdChatbubbles className="size-6" />
        </button>
      </div>
      {selectedPage === "detail" && (
        <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg">
          {/* Community Header */}
          <div className="flex gap-4 mb-4 ">
            <img
              src={community.image}
              alt={community.name}
              className="w-48 h-48 object-cover rounded-lg shadow-lg"
            />
            <div>
              <div className="flex justify-between w-full mt-2">
                <h1 className="text-3xl font-bold text-[#111828]">
                  {community.name}
                </h1>
              </div>

              <p className="text-lg text-gray-600 m-0">
                {community.description}
              </p>
              <div className="">
                <p className="text-md text-sm font-semibold m-0 mt-2">
                  Leader: {community.leader}
                </p>
                <p className="text-md text-gray-400 text-sm m-0">
                  Members: {community.members}
                </p>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <p className="font-sm text-sm">Tags:</p>
                <div className="flex gap-2">
                  {community.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#f4ebb1] text-blue-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="ml-auto p-1">
              <button
                type="button"
                class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Leave
              </button>
            </div>
          </div>

          {/* Leaderboard and Book Stats */}
          <div className="flex gap-12 mb-6">
            {/* Top Readers */}
            <div className="w-1/2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Top Readers
              </h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        #
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Books Read
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                        Level
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {community.topReaders.map((reader, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                      >
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {reader.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {reader.booksRead}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {reader.level}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Most Read Book */}
            <div className="w-full md:w-1/2 bg-white border border-gray-200 rounded-lg shadow p-3">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Most Read Book
              </h2>

              <div className="flex items-center gap-4">
                {/* Book Image */}
                <img
                  src={"/image.png"}
                  alt={community.mostReadBook}
                  className="w-24 h-32 object-cover rounded-lg shadow"
                />

                <div className="flex flex-col">
                  {/* Book Title */}
                  <p className="text-lg font-semibold text-[#111828] mb-4">
                    {community.mostReadBook}
                  </p>

                  {/* Reader Count */}
                  <p className="text-md text-gray-500 m-0">
                    312 people reading this
                  </p>

                  {/* Read Button */}
                  <button className="px-4 py-2 bg-[#40798C] hover:bg-[#2c5360] text-white rounded-md transition duration-200">
                    Read Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Levels and Badges */}
          <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow p-3">
            <h2 className="text-2xl font-semibold text-gray-800">
              Community Level
            </h2>

            <div className="flex items-center gap-2 ">
              <p className="text-lg text-gray-700">Level {community.level}</p>
            </div>

            {/* Progress bar */}
            <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#111828] h-2.5 rounded-full"
                style={{ width: `${(community.level / 10) * 100}%` }} // Dummy level calculation (max level 10)
              ></div>
            </div>

            {/* Level description */}
            <p className="text-md  text-sm text-gray-400">
              {community.level < 5
                ? "New Community"
                : "Well-established Community"}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Badges</h2>
            <div className="flex gap-2">
              {community.badges.map((badge, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 text-sm rounded-full bg-[#f4ebb1] text-gray-500`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Join Button */}
          <div className="mt-6">
            <button
              onClick={() => alert(`Joining ${community.name}`)}
              className="bg-[#40798C] hover:bg-[#2c5360] text-white px-4 py-2 rounded-md transition duration-200"
            >
              Community Terms & Condition
            </button>
          </div>
        </div>
      )}
      {selectedPage === "member" && (
        <>
          <CommMember />
        </>
      )}
      {selectedPage === "channel" && (
        <>
          <CommChannel />
        </>
      )}
    </>
  );
};

export default CommunityDetail;
