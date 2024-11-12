import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const InboxPage = () => {
  const [inboxItems, setInboxItems] = useState([
    {
      id: 1,
      type: "claim",
      message: "You have a new book reward to claim!",
      status: "unclaimed",
      claimable: true,
    },
    {
      id: 2,
      type: "claim",
      message:
        "Exclusive offer: Claim your free copy of 'Mystery of the Nile'.",
      status: "unclaimed",
      claimable: true,
    },
    {
      id: 3,
      type: "update",
      message:
        "New version of BookNest is now available with exciting features!",
      status: "read",
      claimable: false,
    },
    {
      id: 4,
      type: "community",
      message: "Join our upcoming book club event!",
      status: "unread",
      claimable: false,
    },
    {
      id: 5,
      type: "newRelease",
      message: "New release: 'The Secrets of the Universe' is now available!",
      status: "unread",
      claimable: false,
    },
    {
      id: 6,
      type: "claim",
      message:
        "Exclusive offer: Claim your free copy of 'Mystery of the Nile'.",
      status: "claimed",
      claimable: false,
    },
    // ... Add more data to reach at least 15 items
  ]);

  const handleClaim = (id) => {
    setInboxItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, status: "claimed", claimable: false } : item
      )
    );
    Swal.fire({
      title: "Congratulation!",
      text: "Your reward is claimed!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">Inbox</h1>
      <div className="space-y-4">
        {inboxItems.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg shadow-md ${
              item.status === "unread" ? "bg-blue-100" : "bg-white"
            }`}
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {item.type === "claim" && "🎁 Claim Reward"}
                  {item.type === "update" && "🔄 App Update"}
                  {item.type === "community" && "🌐 Community Update"}
                  {item.type === "newRelease" && "📚 New Book Release"}
                </h3>
                <p className="text-gray-700 mb-4">{item.message}</p>
              </div>
              <div className="flex items-center justify-between">
                {item.claimable && (
                  <button
                    onClick={() => handleClaim(item.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Claim
                  </button>
                )}
                {!item.claimable && item.status === "claimed" && (
                  <span className="text-green-600 font-medium">Claimed</span>
                )}
                {item.type === "newRelease" && (
                  <Link
                    to={`/book/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                )}
                {item.type === "community" && (
                  <Link
                    to={`/community`}
                    className="text-blue-600 hover:underline"
                  >
                    Learn More
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxPage;
