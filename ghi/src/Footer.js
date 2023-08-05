import React from "react";
import { LuDog } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900" id="footer">
      <div className="w-full max-w-screen-xl mx-auto md:py-5">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="#" className="flex items-center mb-4 sm:mb-0">
            {/* <LuDog style={{ marginRight: "0.5em" }} /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              {" "}
              FurEver Home
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </Link>
            </li>
            <li>
              <Link to="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="mr-4 hover:underline md:mr-6 ">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr
          className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
          style={{ marginTop: "0px", marginBottom: "1em" }}
        />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link to="#" className="hover:underline">
            FurEver Home™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
