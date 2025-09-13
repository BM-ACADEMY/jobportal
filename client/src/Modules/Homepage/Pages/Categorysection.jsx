import React, { useState } from "react";

export default function CategorySection({ onFilter }) {
  // Static data instead of fetching
  const [topics] = useState([
    "Technology",
    "Design",
    "Marketing",
    "Finance",
    "Health",
  ]);

  const [categories] = useState([
    "Web Development",
    "Data Science",
    "UI/UX",
    "Digital Marketing",
    "Content Writing",
  ]);

  const [selected, setSelected] = useState(null);

  const handleClick = (item) => {
    setSelected(item);
    if (onFilter) onFilter(item);
  };

  const buttonClasses = (item) =>
    `px-4 py-2 rounded-full border font-medium transition 
     ${
       selected === item
         ? "bg-blue-600 text-white border-blue-600"
         : "bg-white border-gray-300 hover:bg-gray-100"
     }`;

  return (
    <section className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Explore Topics */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Explore topics you are interested in
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              className={buttonClasses("All")}
              onClick={() => handleClick("All")}
            >
              See All Topics
            </button>
            {topics.map((topic, i) => (
              <button
                key={i}
                className={buttonClasses(topic)}
                onClick={() => handleClick(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Job Categories */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Find the right job or internship for you
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={buttonClasses(cat)}
                onClick={() => handleClick(cat)}
              >
                {cat}
              </button>
            ))}
            <button
              className={buttonClasses("Show more")}
              onClick={() => handleClick("Show more")}
            >
              Show more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
