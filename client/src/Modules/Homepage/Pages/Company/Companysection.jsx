// src/modules/Homepages/Pages/Companies.jsx
import React, { useState } from "react";
import { Card, Checkbox, Select, Button, Typography, Spin } from "antd";

const { Title, Text } = Typography;

// ✅ Static Companies Data
const staticCompanies = [
  {
    id: 1,
    name: "TechCorp",
    industry: "Technology",
    location: "Bangalore",
    size: "201-500",
    logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 2,
    name: "DesignHub",
    industry: "Design",
    location: "Chennai",
    size: "51-200",
    logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 3,
    name: "AI Innovators",
    industry: "AI",
    location: "Remote",
    size: "1-50",
    logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
];

// ✅ Static Industries
const staticIndustries = ["Technology", "Design", "AI", "Finance", "Education"];

export default function Companiesection() {
  const [companies] = useState(staticCompanies);
  const [industries] = useState(staticIndustries);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [loading] = useState(false);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) &&
      (industryFilter.length === 0 || industryFilter.includes(company.industry)) &&
      (locationFilter === "" || company.location.includes(locationFilter)) &&
      (sizeFilter === "" || company.size.includes(sizeFilter))
  );

  const sponsoredCompanies = filteredCompanies.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-6 py-10 flex flex-col md:flex-row gap-6">
      {/* Left Filter Column */}
      <div className="w-full md:w-1/4 h-[80vh] overflow-y-auto">
        <div className="mt-18 bg-white/90 p-6 rounded-lg shadow-lg mb-6 transition duration-300 hover:shadow-xl">
          <Title level={4} className="text-lg font-semibold mb-4 text-gray-900">
            Filter Companies
          </Title>
          <Button
            type="link"
            className="text-indigo-600 mb-4"
            onClick={() => {
              setIndustryFilter([]);
              setLocationFilter("");
              setSizeFilter("");
            }}
          >
            Clear All
          </Button>

          {/* Industry */}
          <div className="space-y-1 mb-4">
            <Checkbox.Group
              value={industryFilter}
              onChange={setIndustryFilter}
              className="flex flex-col space-y-1"
            >
              {industries.map((ind) => (
                <Checkbox
                  key={ind}
                  value={ind}
                  className="text-gray-700 cursor-pointer hover:text-indigo-600"
                >
                  {ind}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>

          {/* Location */}
          <div className="mb-4">
            <Text strong className="block mb-2 text-gray-900">Location</Text>
            <Select
              placeholder="Select location"
              value={locationFilter}
              onChange={setLocationFilter}
              className="w-full"
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="Chennai">Chennai</Select.Option>
              <Select.Option value="Bangalore">Bangalore</Select.Option>
              <Select.Option value="Remote">Remote</Select.Option>
            </Select>
          </div>

          {/* Size */}
          <div>
            <Text strong className="block mb-2 text-gray-900">Company Size</Text>
            <Select
              placeholder="Select size"
              value={sizeFilter}
              onChange={setSizeFilter}
              className="w-full"
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="1-50">1-50 Employees</Select.Option>
              <Select.Option value="51-200">51-200 Employees</Select.Option>
              <Select.Option value="201-500">201-500 Employees</Select.Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Right Companies Column */}
      <div className="w-full md:w-3/4 h-[80vh] overflow-y-auto flex flex-col gap-6">
        {/* Sponsored Companies */}
        {sponsoredCompanies.length > 0 && (
          <div className="bg-indigo-50 p-6 rounded-lg shadow-md">
            <Title level={4} className="text-lg font-semibold mb-4 text-gray-900">
              Sponsored Companies
            </Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {sponsoredCompanies.map((company, index) => (
                <CompanyCard key={index} company={company} />
              ))}
            </div>
          </div>
        )}

        {/* Company Listings */}
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
          <Title level={4} className="text-lg font-semibold mb-4 text-gray-900">
            Company Listing
          </Title>
          {loading ? (
            <div className="text-center py-10">
              <Spin size="large" />
            </div>
          ) : filteredCompanies.length === 0 ? (
            <Text className="text-center text-gray-600 text-lg">
              No companies found.
            </Text>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ Company Card
const CompanyCard = ({ company }) => (
  <Card
    hoverable
    className="bg-white p-4 rounded-lg shadow-md text-center relative transition hover:shadow-lg"
  >
    <img
      src={company.logo}
      alt={company.name}
      className="w-16 h-16 mx-auto mb-2 object-contain rounded-md"
    />
    <Title level={5} className="text-gray-900 font-semibold mb-1">
      {company.name}
    </Title>
    <Text className="text-gray-700 block mb-1">{company.industry}</Text>
    <Text className="text-gray-700 block mb-1">{company.location}</Text>
    <Text className="text-gray-700 block mb-2">{company.size}</Text>

    <div className="flex justify-center gap-2 mt-2">
      <Button size="small" className="text-green-600 border border-green-600">
        Chat
      </Button>
      <Button size="small" className="text-blue-600 border border-blue-600">
        Call HR
      </Button>
    </div>
  </Card>
);
