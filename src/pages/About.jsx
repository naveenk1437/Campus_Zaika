import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-yellow-100 dark:bg-gray-900 text-black dark:text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">About Campus Zaika</h1>
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
          Welcome to <span className="font-semibold text-orange-600 dark:text-orange-400">Campus Zaika</span> — your
          favorite spot on campus for fresh, affordable, and mouth-watering food! Whether you're a student rushing
          between classes or a faculty member looking for a quick bite, we've got you covered.
        </p>
        <br />
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
          From crispy Indian snacks to fulfilling meals, we’re committed to serving up hygiene, flavor, and comfort.
          Our dedicated team ensures that every dish is prepared with care, love, and campus vibes.
        </p>
        <br />
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
          Thank you for making Campus Zaika a part of your daily routine. We’re here to keep you energized and smiling
          with every bite!
        </p>
      </div>
    </div>
  );
};

export default About;
