import React, { useState } from "react";

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
  },
  {
    id: 2,
    name: "Sci-Fi Explorers",
    description: "Discover the wonders of science fiction.",
    image:
      "https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    members: 980,
    tags: ["Science Fiction", "Technology", "Future"],
  },
  {
    id: 3,
    name: "Mystery Club",
    description: "Dive into thrilling mysteries together.",
    image:
      "https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    members: 1125,
    tags: ["Mystery", "Crime", "Suspense"],
  },
  {
    id: 4,
    name: "Historical Reads",
    description: "Exploring history through literature.",
    image:
      "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    members: 870,
    tags: ["History", "Non-fiction", "Culture"],
  },
  {
    id: 5,
    name: "Romance Readers",
    description: "For those who love a good love story.",
    image: "https://picsum.photos/200?random=5",
    members: 1420,
    tags: ["Romance", "Drama", "Relationships"],
  },
  {
    id: 6,
    name: "Horror Fans",
    description: "Discuss spine-chilling horror books.",
    image: "https://picsum.photos/200?random=6",
    members: 650,
    tags: ["Horror", "Thriller", "Supernatural"],
  },
  {
    id: 7,
    name: "Young Adult Book Club",
    description: "Join us for discussions on YA novels.",
    image: "https://picsum.photos/200?random=7",
    members: 1025,
    tags: ["Young Adult", "Coming of Age", "Drama"],
  },
  {
    id: 8,
    name: "Non-fiction Enthusiasts",
    description: "For readers of non-fiction across genres.",
    image: "https://picsum.photos/200?random=8",
    members: 760,
    tags: ["Non-fiction", "Biography", "Self-help"],
  },
];

const Community = () => {
  const [selectedPage, setSelectedPage] = useState("find");
  const [yourCommunities, setYourCommunities] = useState([]);

  // Handle joining a community
  const joinCommunity = (community) => {
    setYourCommunities((prev) => [...prev, community]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-center mb-8">Community Page</h1>
        <div className="flex gap-8 justify-center mb-6">
          <button
            onClick={() => setSelectedPage("find")}
            className={`px-4 py-2 font-semibold rounded-lg focus:ring-2 ${
              selectedPage === "find"
                ? "bg-blue-600 text-white ring-blue-400"
                : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            Find
          </button>
          <button
            onClick={() => setSelectedPage("yours")}
            className={`px-4 py-2 font-semibold rounded-lg focus:ring-2 ${
              selectedPage === "yours"
                ? "bg-blue-600 text-white ring-blue-400"
                : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            Yours
          </button>
        </div>
      </div>

      {/* Content Based on Selection */}
      {selectedPage === "find" ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Find Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCommunities.map((community) => (
              <div
                key={community.id}
                className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
              >
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
                <p className="text-gray-700 mb-4">{community.description}</p>
                <p className="font-medium text-sm">
                  Members: {community.members}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {community.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => joinCommunity(community)}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {yourCommunities.length > 0 ? (
              yourCommunities.map((community) => (
                <div
                  key={community.id}
                  className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition duration-300"
                >
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    {community.name}
                  </h3>
                  <p className="text-gray-700 mb-4">{community.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <p className="font-medium">Members: {community.members}</p>
                    <div className="flex flex-wrap gap-2">
                      {community.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center gap-3 mt-4">
                    <button
                      onClick={() => alert(`Viewing ${community.name}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => alert(`Deleting ${community.name}`)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                You haven't joined any communities yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
