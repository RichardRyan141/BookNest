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

const Reward = () => {
  return (
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
        <h3 className="text-2xl font-semibold mb-4 text-blue-600">
          🎯 Mission to Complete
        </h3>
        <div className="mt-4 overflow-y-auto max-h-72 bg-white border border-gray-200 rounded-lg shadow p-3">
          <ul className="space-y-3">
            {rewardData.missions.map((mission) => (
              <li key={mission.id} className="flex items-center text-gray-700">
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
  );
};

export default Reward;
