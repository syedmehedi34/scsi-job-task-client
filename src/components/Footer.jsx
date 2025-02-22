import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200  dark:bg-gray-900  border-t border-gray-200 dark:border-gray-700 text-base-content p-4">
      <aside>
        <p className=" dark:text-gray-50">
          Copyright © {new Date().getFullYear()} - All right reserved by Syed
          Mehedi Hasan
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
