import React from 'react';

const Contact = () => {
  return (
    <div className="bg-yellow-100 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300 text-center">
          For any queries, suggestions or feedback, feel free to reach out:
        </p>
        <ul className="space-y-4 text-base text-gray-800 dark:text-gray-200 pl-4">
          <li><span className="font-semibold">📧 Email:</span> campuszaika@gmail.com</li>
          <li><span className="font-semibold">📞 Phone:</span> +91 6206090209</li>
          <li><span className="font-semibold">📍 Location:</span> Amritsar Group of Colleges Campus, Front of  Girls Hostel, Food Court</li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
