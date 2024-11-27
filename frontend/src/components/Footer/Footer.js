const Footer = () => {
  return (
    <footer className=" rounded-lg shadow bg-[#111828]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/BookNest-2.png"
              className="mr-3 h-5 sm:h-5"
              alt="Flowbite Logo"
            />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm  text-[#F6F1D1]  sm:mb-0 ">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6 text-inherit">
                Contact Us
              </a>
            </li>
            <li>
              <a href="" className="hover:underline me-4 md:me-6 text-inherit">
                Github
              </a>
            </li>
            <li>
              <a href="" className="hover:underline me-4 md:me-6 text-inherit">
                Linkedin
              </a>
            </li>
            <li>
              <a href="" className="hover:underline text-inherit">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 text-[#F6F1D1] border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            BookNest™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
