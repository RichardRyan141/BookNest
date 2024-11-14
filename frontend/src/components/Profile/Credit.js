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
        <div className="space-y-4">
          {purchaseHistory.map((purchase) => (
            <div
              key={purchase.id}
              className="flex justify-between items-center p-4 bg-gray-200 rounded-lg shadow-sm"
            >
              <div className="text-lg font-medium text-gray-800">
                {purchase.description}
              </div>
              <div className="text-sm text-gray-600">{purchase.date}</div>
              <div
                className={`text-lg font-semibold ${
                  purchase.amount < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                ${purchase.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Credit;
