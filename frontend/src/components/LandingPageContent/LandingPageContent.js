import React, { useState } from "react";
import "./LandingPageContent.css";

const LandingPageContent = () => {
  const [activeTab, setActiveTab] = useState("week");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="landing-page-content space-y-10 p-6">
      <div className="recommended-books space-y-6 rounded-lg bg-red-200">
        <div className="tag-title">
          <h2 className="text-2xl font-bold">Recommended Books</h2>
        </div>
        <ul className="flex ">
          <li className="min-w-[200px] rounded overflow-hidden shadow-lg transform hover:scale-105 transition duration-200">
            <a href="/" className="title block">
              <img
                src="https://img.wattpad.com/cover/119307608-160-k828775.jpg"
                alt="The Heritage of Throne"
                className="w-full h-40 object-cover rounded"
              />
            </a>
            <p className="dsbn text-center mt-2 font-semibold">
              <a href="/">The Heritage of Throne</a>
            </p>
          </li>
          <li className="min-w-[200px] rounded overflow-hidden shadow-lg transform hover:scale-105 transition duration-200">
            <a href="/" className="title block">
              <img
                src="https://img.wattpad.com/cover/148969091-160-k543913.jpg"
                alt="FALLING for The BEAST"
                className="w-full h-40 object-cover rounded"
              />
            </a>
            <p className="dsbn text-center mt-2 font-semibold">
              <a href="/">FALLING for The BEAST</a>
            </p>
          </li>
          <li className="min-w-[200px] rounded overflow-hidden shadow-lg transform hover:scale-105 transition duration-200">
            <a href="/" className="title block">
              <img
                src="https://img.wattpad.com/cover/243988896-160-k678476.jpg"
                alt="Hiraeth Airlines"
                className="w-full h-40 object-cover rounded"
              />
            </a>
            <p className="dsbn text-center mt-2 font-semibold">
              <a href="/">Hiraeth Airlines</a>
            </p>
          </li>
          <li className="min-w-[200px] rounded overflow-hidden shadow-lg transform hover:scale-105 transition duration-200">
            <a href="/" className="title block">
              <img
                src="https://img.wattpad.com/cover/278065328-160-k487308.jpg"
                alt="The Proposal"
                className="w-full h-40 object-cover rounded"
              />
            </a>
            <p className="dsbn text-center mt-2 font-semibold">
              <a href="/">The Proposal</a>
            </p>
          </li>
          <li className="min-w-[200px] rounded overflow-hidden shadow-lg transform hover:scale-105 transition duration-200">
            <a href="/" className="title block">
              <img
                src="https://img.wattpad.com/cover/273783694-160-k673859.jpg"
                alt="Resign From You"
                className="w-full h-40 object-cover rounded"
              />
            </a>
            <p className="dsbn text-center mt-2 font-semibold">
              <a href="/">Resign From You</a>
            </p>
          </li>
          <li className="min-w-[200px] rounded overflow-hidden shadow-lg transform hover:scale-105 transition duration-200">
            <a href="/" className="title block">
              <img
                src="https://img.wattpad.com/cover/351815313-160-k614173.jpg"
                alt="Rebel Prince"
                className="w-full h-40 object-cover rounded"
              />
            </a>
            <p className="dsbn text-center mt-2 font-semibold">
              <a href="/">Rebel Prince</a>
            </p>
          </li>
        </ul>
      </div>

      <div className="popular-books h-fit space-y-6">
        <div className="">
          <h2 className="text-2xl font-bold">Popular Books</h2>
        </div>
        <div className="tags flex gap-4">
          {["week", "month", "year"].map((period) => (
            <span
              key={period}
              onClick={() => handleTabClick(period)}
              className={`cursor-pointer px-4 py-2 rounded-full transition ${
                activeTab === period
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </span>
          ))}
        </div>
      </div>

      <div className="popular-books-list space-y-4">
        {["week", "month", "year"].map((period) => (
          <ul
            key={period}
            id={period}
            style={{ display: activeTab === period ? "block" : "none" }}
            className="space-y-2"
          >
            {[...Array(10)].map((_, i) => (
              <li key={i}>
                <a href="" className="text-blue-600 hover:text-blue-800">
                  Book {period.charAt(0).toUpperCase() + period.slice(1)}{" "}
                  {i + 1}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="latest-novels space-y-6">
        <div className="tag-title flex justify-between items-center">
          <h5 className="text-xl font-semibold">Latest Update</h5>
          <a href="" className="text-blue-500 hover:underline">
            More {">>"}
          </a>
        </div>
        <div className="latest-update-list grid gap-6 md:grid-cols-2">
          <div className="latest-update-novel p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <a href="" className="flex gap-4">
              <div className="pic w-1/3">
                <img
                  src="https://trxs.cc/d/file/tongren/20241111/629dbed1f804f2d0a95801074188cc78.jpg"
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="infos w-2/3 space-y-2">
                <h3 className="text-lg font-bold">
                  The game of all heavens, the cheater who started from Demon
                  Slayer (full version)
                </h3>
                <div className="booknews text-gray-600 text-sm">
                  Author: Liu Shui Jian Xin{" "}
                  <span className="date ml-2">2024-11-11</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Introduction: One day two hundred years ago, countless huge
                  portals appeared all over the earth...
                </p>
              </div>
            </a>
          </div>
          <div className="latest-update-novel p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <a href="" className="flex gap-4">
              <div className="pic w-1/3">
                <img
                  src="https://trxs.cc/d/file/tongren/20241111/ce8cad16b96044e2fdefb5f7031fee84.jpg"
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="infos w-2/3 space-y-2">
                <h3 className="text-lg font-bold">
                  Dragon, choose cultural victory to make money (1-227)
                </h3>
                <div className="booknews text-gray-600 text-sm">
                  Author: An interesting potato{" "}
                  <span className="date ml-2">2024-11-11</span>
                </div>
                <p className="text-gray-700 text-sm">
                  Introduction: At the beginning, the red dragon Drogo just
                  wanted to make some money...
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPageContent;
