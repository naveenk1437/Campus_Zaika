import React from 'react';

const services = [
  {
    title: 'All Type of Food are Available',
    description: 'Wide range of curated products across all categories',
    icon: '🛒',
  },
  {
    title: 'Self Service',
    description: 'It is a Self Service',
    icon: '🚚',
  },
  {
    title: 'Secure Payments',
    description: 'Secure and convenient online payments',
    icon: '💳',
  },
  {
    title: '9 AM - 4:30 PM Support',
    description: 'We’re always here to help you',
    icon: '📞',
  },
  {
    title: 'Replacement',
    description: '30 min Return Policy',
    icon: '🔄',
  },
];

const OurService = () => {
  return (
    <div className="bg-yellow-100 dark:bg-gray-900 text-gray-800 dark:text-white py-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-orange-600 dark:text-orange-400">
          Our Services
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
            >
              <div className="text-5xl mb-4 flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-gray-700 rounded-full">
                {service.icon}
              </div>
              <h2 className="text-xl font-semibold mb-3">{service.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurService;
