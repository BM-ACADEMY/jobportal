// src/components/JobGrid.jsx
import React, { useState } from "react";
import { Card, Tag, Button } from "antd";

const { Meta } = Card;

// Badge colors
const badgeColors = {
  Featured: "green",
  Urgent: "orange",
  Freelancer: "blue",
  "Part Time": "purple",
  Internship: "red",
};

export default function JobGrid() {
  const [jobs] = useState([
    {
      title: "Frontend Developer",
      skills: "React, Tailwind, JavaScript",
      salary: "₹8 - 12 LPA",
      openings: 3,
      badges: ["Featured", "Urgent"],
      logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Unsplash
    },
    {
      title: "Backend Developer",
      skills: "Node.js, Express, MongoDB",
      salary: "₹10 - 15 LPA",
      openings: 2,
      badges: ["Part Time"],
      logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Unsplash
    },
    {
      title: "UI/UX Designer",
      skills: "Figma, Adobe XD",
      salary: "₹6 - 10 LPA",
      openings: 1,
      badges: ["Internship"],
      logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
    },
    {
      title: "Backend Developer",
      skills: "Node.js, Express, MongoDB",
      salary: "₹10 - 15 LPA",
      openings: 2,
      badges: ["Part Time"],
      logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Unsplash
    },
  ]);

  const getBadgeColor = (badge) =>
    badgeColors[badge] ||
    `#${([...badge].reduce((acc, char) => acc + char.charCodeAt(0), 0) % 16777215).toString(16)}`;

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 box-border overflow-hidden">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">
        Featured Jobs
      </h2>
      <p className="text-center text-gray-600 mb-10 text-sm sm:text-base">
        Discover your next opportunity with top companies around the world.
      </p>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">
          No jobs available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {jobs.map((job, idx) => (
            <Card
              key={idx}
              hoverable
              cover={
                <img
                  alt={job.title || "Job Logo"}
                  src={job.logo}
                  className="h-40 sm:h-48 w-full object-cover rounded-t-2xl"
                  style={{ maxWidth: "100%", display: "block" }}
                />
              }
              className="rounded-2xl shadow-md flex flex-col justify-between w-full"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {job.badges?.map((badge, i) => (
                  <Tag key={i} color={getBadgeColor(badge)} className="text-xs sm:text-sm">
                    {badge}
                  </Tag>
                ))}
              </div>

              {/* Job Info */}
              <Meta
                title={<span className="font-semibold text-sm sm:text-base">{job.title}</span>}
                description={<span className="text-gray-500 text-xs sm:text-sm">{job.skills}</span>}
              />

              {/* Salary & Openings */}
              <div className="flex justify-between items-center mt-4 mb-3 text-xs sm:text-sm">
                <span className="font-bold text-gray-800">{job.salary}</span>
                <Tag color="green">{job.openings} Open</Tag>
              </div>

              {/* Apply Button */}
              <Button type="primary" block className="!rounded-full mt-auto text-xs sm:text-sm">
                Apply Now
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
