import { useState, useEffect, useRef } from "react";

const CommChannel = () => {
  const server = [
    { id: 1, emoji: "#️⃣", name: "Books" },
    { id: 2, emoji: "🔊", name: "Games" },
    { id: 3, emoji: "#️⃣", name: "Work" },
    { id: 4, emoji: "🔊", name: "Art" },
  ];
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
      text: "I just finished reading *The Great Gatsby*. What did you think about the plot twist at the end? 📚😲",
      date: "2024-11-13",
    },
    {
      id: 2,
      sender: "Bob",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "I loved it! The whole idea of Gatsby's obsession with Daisy is so intriguing. 🌹",
      date: "2024-11-14",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const endOfMessagesRef = useRef(null);
  const messageContainerRef = useRef(null);

  const userProfilePic = "https://randomuser.me/api/portraits/men/3.jpg";

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          profilePic: userProfilePic,
          text: newMessage,
          date: new Date().toLocaleString(),
        },
      ]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mx-auto p-4 max-w-4xl bg-white rounded-lg shadow-lg">
      <div className="mb-4 text-2xl font-semibold text-gray-800">
        Channel Discussion
      </div>
      <div className="flex gap-2">
        <div className="h-full w-36 flex flex-col items-center p-2 space-y-4 border border-gray-200 rounded-lg">
          {/* Server List */}
          {server.map((server) => (
            <div
              key={server.id}
              className="bg-gray-200/80 w-full h-12 flex items-center gap-2 pl-3 rounded-lg hover:bg-slate-400 cursor-pointer transition duration-200 shadow-sm"
              title={server.name}
            >
              <span
                role="img"
                aria-label={server.name}
                className="text-base text-gray-700"
              >
                {server.emoji}
              </span>
              <p className="text-xs text-gray-600 font-semibold truncate">
                {server.name}
              </p>
            </div>
          ))}

          {/* Add Server Button */}
          <div className="bg-gray-200 w-full h-12 flex items-center justify-center rounded-lg hover:bg-gray-400 cursor-pointer transition duration-200 shadow-sm">
            <span role="img" aria-label="add" className="text-xl text-gray-700">
              ➕
            </span>
          </div>
        </div>

        <div>
          <div
            ref={messageContainerRef}
            className="h-96 overflow-y-scroll border border-gray-200 rounded-lg p-4 space-y-4"
            style={{ scrollBehavior: "smooth" }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-4 p-2 rounded-lg ${
                  message.sender === "You" ? "bg-blue-50 ml-auto" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                {message.sender !== "You" && (
                  <img
                    src={message.profilePic}
                    alt={message.sender}
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                  />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {message.sender}
                  </div>
                  <div className="text-sm text-gray-500">{message.date}</div>
                  <p className="mt-2 text-gray-700">{message.text}</p>
                </div>
                {message.sender === "You" && (
                  <img
                    src={message.profilePic}
                    alt={message.sender}
                    className="w-12 h-12 rounded-full border-2 border-gray-300 ml-3"
                  />
                )}
              </div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 rounded-lg"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSendMessage}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommChannel;
