// src/components/CompanyGrid.jsx
import React, { useState } from "react";
import { Card, Tag, Button } from "antd";

const { Meta } = Card;

// Optional tag colors for industries or features
const badgeColors = {
  Tech: "green",
  Design: "purple",
  AI: "orange",
  Remote: "blue",
};

// Example static companies data
const staticCompanies = [
  {
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop",
    industry: "Technology",
    location: "San Francisco, CA",
    size: "500+ Employees",
    tags: ["Tech", "AI", "Remote"],
  },
  {
    name: "DesignHub",
    logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop",
    industry: "Design",
    location: "New York, NY",
    size: "200+ Employees",
    tags: ["Design", "Remote"],
  },
  {
    name: "AI Innovators",
    logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop",
    industry: "Artificial Intelligence",
    location: "Bangalore, India",
    size: "100+ Employees",
    tags: ["AI", "Tech"],
  },
];

export default function CompanyGrid() {
  const [companies] = useState(staticCompanies);
  const [followed, setFollowed] = useState({}); // Track follow state

  const handleFollow = (companyName) => {
    setFollowed({ ...followed, [companyName]: !followed[companyName] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 box-border overflow-hidden">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2">
        Featured Companies
      </h2>
      <p className="text-center text-gray-600 mb-10 text-sm sm:text-base">
        Explore top companies and discover your next opportunity.
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        {companies.map((company, idx) => (
          <Card
            key={company.name + idx}
            hoverable
            cover={
              <img
                alt={company.name}
                src={company.logo || "/placeholder.png"}
                loading="lazy"
                className="h-40 sm:h-48 w-full object-cover rounded-t-2xl"
              />
            }
            className="rounded-2xl shadow-md flex flex-col justify-between w-full"
          >
            {/* Tags / badges */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
              {company.tags?.map((tag, i) => (
                <Tag
                  key={i}
                  color={badgeColors[tag] || "default"}
                  className="text-xs sm:text-sm"
                >
                  {tag}
                </Tag>
              ))}
            </div>

            {/* Company Info */}
            <Meta
              title={
                <span className="font-semibold text-sm sm:text-base">
                  {company.name}
                </span>
              }
              description={
                <span className="text-gray-500 text-xs sm:text-sm">
                  {company.industry || "Industry Unknown"} -{" "}
                  {company.location || "Location Unknown"}
                </span>
              }
            />

            {/* Company Size */}
            {company.size && (
              <div className="flex justify-start mt-2 mb-2 sm:mt-4 sm:mb-3 text-xs sm:text-sm">
                <Tag color="blue">{company.size}</Tag>
              </div>
            )}

            {/* Follow Button */}
            <Button
              type={followed[company.name] ? "default" : "primary"}
              block
              className="!rounded-full mt-auto text-xs sm:text-sm"
              onClick={() => handleFollow(company.name)}
              aria-label={`${
                followed[company.name] ? "Unfollow" : "Follow"
              } ${company.name}`}
            >
              {followed[company.name] ? "Following" : "Follow"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
