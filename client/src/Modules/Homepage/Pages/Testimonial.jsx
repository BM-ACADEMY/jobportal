// src/components/Testimonials.jsx
import React, { useState } from "react";

// Example static testimonials data
const staticTestimonials = [
  {
    name: "Aarav Sharma",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&h=500&fit=crop",
    quote:
      "This platform helped me land my dream job in just a few weeks. The process was seamless!",
  },
  {
    name: "Emily Johnson",
    role: "UI/UX Designer",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=500&h=500&fit=crop",
    quote:
      "I connected with amazing companies and found the perfect role for my design skills.",
  },
  {
    name: "Ravi Patel",
    role: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=500&fit=crop",
    quote:
      "The platform made job searching easy and stress-free. I highly recommend it to everyone.",
  },
];

export default function Testimonials() {
  const [testimonials] = useState(staticTestimonials);

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
        <p className="text-gray-600 mt-2">
          Real stories from people who found success using our platform.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-20 h-20 rounded-full border-4 border-green-100 object-cover mb-4"
            />
            <p className="text-gray-600 italic mb-4">“{t.quote}”</p>
            <h4 className="font-semibold text-gray-800">{t.name}</h4>
            <span className="text-sm text-gray-500">{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
