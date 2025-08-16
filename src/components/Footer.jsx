import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-center py-4 mt-auto w-full">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        &copy; {new Date().getFullYear()} Campus Zaika. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
