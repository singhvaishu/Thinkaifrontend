
import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">About Us</h2>
        <p className="text-lg text-gray-600 mb-8">
          We are a team of passionate developers committed to building innovative solutions
          that make a difference. Our mission is to create user-friendly, scalable, and secure
          applications that drive business success.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-medium text-gray-800">Our Vision</h3>
            <p className="text-gray-600">
              To be a leading tech company that delivers impactful solutions that empower
              businesses and individuals worldwide.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-medium text-gray-800">Our Values</h3>
            <ul className="text-gray-600 list-disc list-inside">
              <li>Innovation</li>
              <li>Integrity</li>
              <li>Collaboration</li>
              <li>Excellence</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
