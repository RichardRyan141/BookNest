import React, { useState } from "react";

const Credit = () => {
  // Dummy Data
  const [saldo, setSaldo] = useState(150.75);
  const purchaseHistory = [
    { id: 1, date: "2024-11-01", amount: -20, description: "Book Purchase" },
    {
      id: 2,
      date: "2024-10-25",
      amount: -15,
      description: "Magazine Subscription",
    },
    { id: 3, date: "2024-10-18", amount: -25, description: "Gift Card" },
    { id: 4, date: "2024-10-10", amount: -10, description: "Music Streaming" },
  ];

  const topUpOptions = [
    {
      id: 1,
      name: "PayPal",
      logoUrl: "/payment/paypal.png",
    },
    {
      id: 2,
      name: "Gopay",
      logoUrl: "/payment/gopay.jpg",
    },
    {
      id: 3,
      name: "ShoppePay",
      logoUrl: "/payment/shopee.jpg",
    },
    {
      id: 4,
      name: "Debit Card",
      logoUrl: "/payment/visa.png",
    },
  ];

  const handleTopUp = (amount) => {
    setSaldo(saldo + amount);
  };

  return (
    <div className="container mx-auto p-8 max-w-3xl bg-white shadow-lg rounded-lg">
      {/* Balance Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Your Balance
        </h1>
        <div className="text-6xl font-bold text-green-600">
          ${saldo.toFixed(2)}
        </div>
      </div>

      {/* Top Up Options */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Top Up Your Balance
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {topUpOptions.map((option) => (
            <div
              key={option.id}
              className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer"
              onClick={() => handleTopUp(50)} // Dummy top-up logic
            >
              <img
                src={option.logoUrl}
                alt={option.name}
                className="w-24 h-16 mb-2"
              />
              <span className="text-sm font-medium text-gray-700">
                {option.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase History Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Purchase History
        </h2>
        <div className="space-y-4 bg-white border border-gray-200 rounded-lg shadow p-3">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left text-gray-800 font-medium">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-gray-800 font-medium">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-gray-800 font-medium">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((purchase) => (
                <tr
                  key={purchase.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-3 text-gray-800 text-lg">
                    {purchase.description}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {purchase.date}
                  </td>
                  <td
                    className={`px-4 py-3 text-lg font-semibold ${
                      purchase.amount < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    ${purchase.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Credit;
