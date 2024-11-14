import React from "react";

// Dummy data for community members
const members = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Founder",
    profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
    joinedDate: "January 2021",
    status: "Online",
    chatEmote: "💬",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Member",
    profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
    joinedDate: "March 2022",
    status: "Offline",
    chatEmote: "💬",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "Moderator",
    profilePic: "https://randomuser.me/api/portraits/men/23.jpg",
    joinedDate: "July 2020",
    status: "Offline",
    chatEmote: "💬",
  },
  {
    id: 4,
    name: "David Green",
    role: "Member",
    profilePic: "https://randomuser.me/api/portraits/men/24.jpg",
    joinedDate: "November 2021",
    status: "Online",
    chatEmote: "💬",
  },
  {
    id: 5,
    name: "Emma White",
    role: "Admin",
    profilePic: "https://randomuser.me/api/portraits/women/25.jpg",
    joinedDate: "May 2020",
    status: "Online",
    chatEmote: "💬",
  },
];

const CommMember = () => {
  return (
    <div className="mx-auto p-6 max-w-4xl bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Community Members
      </h2>
      <table className="min-w-full table-auto bg-gray-200 p-3 rounded-lg overflow-hidden ">
        <thead>
          <tr className="border-b-2 border-gray-300 text-center">
            <th className="px-4 py-2">Profile</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Joined</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Chat</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              className={`border-b border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-center
          
        `}
            >
              <td className="px-4 py-2  justify-center items-center">
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src={member.profilePic}
                    alt={member.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                  />
                </div>
              </td>
              <td className="px-4 py-2">{member.name}</td>
              <td className="px-4 py-2 font-semibold">
                {member.role === "Founder" ? (
                  <span className="text-blue-600">{member.role}</span>
                ) : member.role === "Admin" ? (
                  <span className="text-green-600">{member.role}</span>
                ) : member.role === "Moderator" ? (
                  <span className="text-yellow-600">{member.role}</span>
                ) : (
                  <span className="text-gray-600">{member.role}</span>
                )}
              </td>
              <td className="px-4 py-2">{member.joinedDate}</td>
              <td className="px-4 py-2 flex gap-1 items-center justify-center">
                <p className="text-xs">
                  {member.status === "Online" ? <>🟢</> : <>🔴</>}
                </p>
                <p>{member.status}</p>
              </td>
              <td className="px-4 py-2 text-lg">{member.chatEmote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommMember;
