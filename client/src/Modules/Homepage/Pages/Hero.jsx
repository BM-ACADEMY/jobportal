import React, { useState, useEffect } from "react";
import { Input, Select, Button, Form } from "antd";
import Image from "../../../assets/hero-bg.jpg";

const { Option } = Select;

export default function Hero() {
  const [stats, setStats] = useState([]);
  const [filters, setFilters] = useState({
    keywords: "",
    category: "",
    type: "",
    level: "",
    experience: "",
    salary: "",
  });

  useEffect(() => {
    const mockStats = [
      { id: 1, value: "200M", label: "Active Jobs" },
      { id: 2, value: "40K", label: "Startups" },
      { id: 3, value: "340K", label: "Talents" },
    ];
    setStats(mockStats);
  }, []);

  const categories = ["Software & Application", "Marketing", "Finance", "Design"];
  const types = ["Full-time", "Part-time", "Internship", "Contract"];
  const levels = ["Junior Level", "Mid Level", "Senior Level"];
  const experiences = ["Fresher", "1 Year", "2+ Years", "5+ Years"];
  const salaries = ["< 20K", "20K - 40K", "40K - 60K", "60K+"];

  const handleSearch = () => {
    console.log("Search with filters:", filters);
  };

  return (
    <section
      className="relative flex items-center bg-cover bg-center min-h-[75vh] pt-[100px] sm:pt-[120px]"
      style={{ backgroundImage: `url(${Image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 w-full">
        {/* Left: Text */}
        <div className="text-white md:w-1/2 w-full text-center md:text-left px-2 sm:px-4">
          <p className="text-green-500 mb-2 text-sm sm:text-base lg:text-lg">
            Get Hot & Trending Jobs
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-snug">
            Real Jobs, Real People, Real Success
          </h1>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg max-w-xl mx-auto md:mx-0">
            Getting a new job is never easy. Check what new jobs we have in store for you on ABM PORTAL.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center md:text-left">
                <span className="font-bold block text-2xl sm:text-3xl lg:text-4xl">
                  {stat.value}
                </span>
                <p className="text-sm sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Job Search Form */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 relative z-10">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 text-center md:text-left">
            Grow Your Career With <span className="text-green-600">ABM PORTAL</span>
          </h2>

          <Form layout="vertical" onFinish={handleSearch}>
            {/* Keywords */}
            <Form.Item className="mb-4">
              <Input
                placeholder="Search Job Keywords..."
                value={filters.keywords}
                onChange={(e) => setFilters({ ...filters, keywords: e.target.value })}
              />
            </Form.Item>

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Form.Item>
                <Select
                  placeholder="Select Category"
                  value={filters.category || undefined}
                  onChange={(value) => setFilters({ ...filters, category: value })}
                  allowClear
                >
                  {categories.map((c, i) => (
                    <Option key={i} value={c}>
                      {c}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Select
                  placeholder="All Type"
                  value={filters.type || undefined}
                  onChange={(value) => setFilters({ ...filters, type: value })}
                  allowClear
                >
                  {types.map((t, i) => (
                    <Option key={i} value={t}>
                      {t}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Form.Item>
                <Select
                  placeholder="Select Level"
                  value={filters.level || undefined}
                  onChange={(value) => setFilters({ ...filters, level: value })}
                  allowClear
                >
                  {levels.map((l, i) => (
                    <Option key={i} value={l}>
                      {l}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Select
                  placeholder="Experience"
                  value={filters.experience || undefined}
                  onChange={(value) => setFilters({ ...filters, experience: value })}
                  allowClear
                >
                  {experiences.map((exp, i) => (
                    <Option key={i} value={exp}>
                      {exp}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Row 3 */}
            <Form.Item className="mb-4">
              <Select
                placeholder="Expected Salary"
                value={filters.salary || undefined}
                onChange={(value) => setFilters({ ...filters, salary: value })}
                allowClear
              >
                {salaries.map((s, i) => (
                  <Option key={i} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Submit */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="!bg-green-600 hover:!bg-green-700"
              >
                Search Result
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-28 sm:h-32 md:h-36 lg:h-48"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224 C 360,300 1080,150 1440,240 L1440,320 L0,320 Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
