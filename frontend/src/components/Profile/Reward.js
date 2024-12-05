import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { BiSolidCommentEdit } from "react-icons/bi";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { IoIosBookmarks } from "react-icons/io";
import Swal from "sweetalert2";

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
  const [showGoal, setShowGoal] = useState(false);

  const openModal = () => {
    setShowGoal(true);
  };

  const closeModal = () => {
    setShowGoal(false);
  };

  const [goalsdata, setGoalsdata] = useState([
    {
      count: 3,
      complete: 1,
      type: "Book",
      title: "Self Upgrade",
      start: "2024-01-01",
      end: "2024-12-31",
    },
    {
      count: 5,
      complete: 2,
      type: "Chapter",
      title: "Todays Goals",
      start: "2024-02-01",
      end: "2024-11-30",
    },
  ]);

  const [formData, setFormData] = useState({
    count: "",
    type: "",
    title: "",
    start: "",
    end: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      count: Number(formData.count),
      complete: 0,
      type: formData.type,
      title: formData.title,
      start: formData.start,
      end: formData.end,
    };
    setGoalsdata([...goalsdata, newGoal]);
    setFormData({ count: "", type: "", title: "", start: "", end: "" });

    closeModal();
    Swal.fire({
      title: "Success!",
      text: "Goals Added.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        {/* Rewards Header */}
        <h2 className="text-xl font-bold mb-6 ">🎉 Rewards Dashboard</h2>

        {/* Daily Reward */}
        <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow p-3 text-center">
          <p className="text-xl font-semibold">
            Your Points:{" "}
            <span className="font-bold">{rewardData.dailyReward}</span>
          </p>
        </div>

        <h3 className="text-lg ml-2 font-bold mb-4">Monthly Quest</h3>
        <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow p-3 text-center flex gap-9">
          <div className="w-28 flex justify-center items-center">
            <FaFlagCheckered className="size-16" />
          </div>
          <div className="w-full text-start">
            <p className="font-semibold">Complete 30 quest</p>
            <ol className="flex items-center w-full">
              <li className="flex w-full items-center text-[#40798C] dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-[#488a9f6b] after:border-4 after:inline-block dark:after:border-blue-800">
                <span className="flex items-center justify-center w-10 h-10 bg-[#488a9f6b] rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                  <FaUnlock />
                </span>
              </li>
              <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-4 after:inline-block dark:after:border-gray-700">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                  <FaLock />
                </span>
              </li>
              <li className="flex items-center w-full">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                  <FaMedal />
                </span>
              </li>
            </ol>
          </div>
        </div>

        <h3 className="text-lg ml-2 font-bold mb-4 mt-16">Daily Quest</h3>
        <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow p-3 text-center flex gap-9">
          <div className="w-28 flex justify-center items-center">
            <GrTasks className="size-16" />
          </div>
          <div className="w-full text-start">
            <p className="font-semibold">Read 1 Chapter</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 relative">
              <div
                className="bg-[#488a9f6b] h-3 rounded-full"
                style={{ width: `0%` }}
              ></div>
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700"
                style={{ marginTop: "-0.18rem" }} // Adjust for spacing above the bar
              >
                0/1
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow p-3 text-center flex gap-9">
          <div className="w-28 flex justify-center items-center">
            <BiSolidCommentEdit className="size-16" />
          </div>
          <div className="w-full text-start">
            <p className="font-semibold">Leave a comment</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 relative">
              <div
                className="bg-[#488a9f6b] h-3 rounded-full"
                style={{ width: `33%` }}
              ></div>
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700"
                style={{ marginTop: "-0.18rem" }} // Adjust for spacing above the bar
              >
                1/3
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between mt-16 mb-4">
          <h3 className="text-lg ml-2 font-bold  ">Personalized Goals</h3>
          <button
            onClick={openModal}
            className="bg-[#40798C] hover:bg-[#2c5360] text-white py-2 px-4 rounded"
          >
            New Milestone
          </button>
        </div>

        {goalsdata.map((goal) => (
          <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow p-3 text-center flex gap-9">
            <div className="w-28 flex justify-center items-center">
              {goal.type === "Book" ? (
                <>
                  <FaBookReader className="size-16" />
                </>
              ) : (
                <>
                  <IoIosBookmarks className="size-16" />
                </>
              )}
            </div>
            <div className="w-full text-start">
              <div className="flex gap-3">
                <p className="font-bold">{goal.type}</p>
                <p className="font-semibold">{goal.title}</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-4 relative">
                <div
                  className="bg-[#488a9f6b] h-3 rounded-full"
                  style={{
                    width: `${Math.floor((goal.complete / goal.count) * 100)}%`,
                  }}
                ></div>
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700"
                  style={{ marginTop: "-0.18rem" }} // Adjust for spacing above the bar
                >
                  {goal.complete}/{goal.count}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Level Progress */}
        <div className="mt-8 mb-6">
          <h3 className="text-lg ml-2 font-bold mb-4">
            Level {rewardData.level}
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-[#488a9f6b] h-3 rounded-full"
              style={{ width: `${rewardData.levelProgress}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm">
            Progress: {rewardData.levelProgress}%
          </p>
        </div>

        {/* Badge Section */}
        <div className="mt-8">
          <h3 className="text-lg ml-2 font-bold mb-4 ">How to Earn Badges</h3>
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
        <Modal isOpen={showGoal} onClose={closeModal}>
          {" "}
          <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                placeholder="write your goals tilte here"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Book">Book</option>
                <option value="Chapter">Chapter</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Count</label>
              <input
                type="number"
                name="count"
                value={formData.count}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                placeholder="number of book or chapter"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Start Date</label>
              <input
                type="date"
                name="start"
                value={formData.start}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">End Date</label>
              <input
                type="date"
                name="end"
                value={formData.end}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className=" text-white py-2 px-4 rounded bg-[#40798C] hover:bg-[#2c5360] w-full"
            >
              Confirm
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Reward;
