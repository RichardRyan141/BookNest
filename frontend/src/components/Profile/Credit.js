import React, { useState } from "react";
import Swal from "sweetalert2";

const Credit = ({ credit }) => {
  // Dummy Data
  const [saldo, setSaldo] = useState(credit);
  const [amount, setAmount] = useState(0);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTopUp(amount);
  };

  const handleTopUp = async (amount) => {
    const token = localStorage.getItem("token");

    console.log("ini token:", token);
    try {
      const response = await fetch(
        `http://localhost:5000/users/buy-credits/${parseInt(amount)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: parseInt(amount) }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to buy credits");
      }
      setSaldo(parseInt(saldo) + parseInt(amount));
      await Swal.fire({
        icon: "success",
        title: "Top Up Successful",
        text: "Happy Reading!",
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (err) {}
  };

  return (
    <div className="container mx-auto p-8 max-w-3xl bg-white shadow-lg rounded-lg">
      {/* Balance Section */}
      <div className="mb-2 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Your Balance
        </h1>
        <div className="text-6xl font-bold text-[#f4ebb1] py-3 px-6 rounded-md bg-[#111828] w-fit">
          ${saldo}
        </div>
      </div>

      {/* Top Up Options */}
      <div className="mb-5">
        <section class="bg-white py-3 antialiased dark:bg-gray-900 md:py-16">
          <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div class="mx-auto max-w-5xl">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Payment
              </h2>

              <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 justify-center">
                <form
                  action="#"
                  class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
                  onSubmit={handleSubmit}
                >
                  <div class="mb-6 grid grid-cols-2 gap-4">
                    <div class="col-span-2 sm:col-span-1">
                      <label
                        for="full_name"
                        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Full name (as displayed on card)*{" "}
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#1d3058] focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Bonnie Green"
                        required
                      />
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                      <label
                        for="card-number-input"
                        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Card number*{" "}
                      </label>
                      <input
                        type="text"
                        id="card-number-input"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-[#1d3058] focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        required
                      />
                    </div>

                    <div>
                      <label
                        for="card-expiration-input"
                        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Card expiration*{" "}
                      </label>
                      <div class="relative">
                        <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                          <svg
                            class="h-4 w-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          datepicker
                          datepicker-format="mm/yy"
                          id="card-expiration-input"
                          type="text"
                          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-[#1d3058] focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          placeholder="12/23"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        for="cvv-input"
                        class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        CVV*
                        <button
                          data-tooltip-target="cvv-desc"
                          data-tooltip-trigger="hover"
                          class="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                        >
                          <svg
                            class="h-4 w-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                        <div
                          id="cvv-desc"
                          role="tooltip"
                          class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                        >
                          The last 3 digits on back of card
                          <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                      </label>
                      <input
                        type="number"
                        id="cvv-input"
                        aria-describedby="helper-text-explanation"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#1d3058] focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="•••"
                        required
                      />
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                      <label
                        for="full_name"
                        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Amount (in dollars $){" "}
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#1d3058] focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="150 $"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="flex w-full items-center justify-center rounded-lg bg-[#1d3058] hover:bg-[#121e3a] text-[#F6F1D1] px-5 py-2.5 text-sm font-medium  focus:outline-none focus:ring-4 "
                  >
                    Pay now
                  </button>
                </form>
              </div>
              <div class="mt-6 flex items-center justify-center gap-8">
                <img
                  class="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                  alt=""
                />
                <img
                  class="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                  alt=""
                />
                <img
                  class="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                  alt=""
                />
                <img
                  class="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                  alt=""
                />
                <img
                  class="h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                  alt=""
                />
                <img
                  class="hidden h-8 w-auto dark:flex"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                  alt=""
                />
              </div>

              <p class="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
                Payment processed by{" "}
                <a
                  href="#"
                  title=""
                  class="font-medium text-blue-700 underline hover:no-underline dark:text-blue-500"
                >
                  Paddle
                </a>{" "}
                for{" "}
                <a
                  href="#"
                  title=""
                  class="font-medium text-blue-700 underline hover:no-underline dark:text-blue-500"
                >
                  Flowbite LLC
                </a>
                - United States Of America
              </p>
            </div>
          </div>
        </section>
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
