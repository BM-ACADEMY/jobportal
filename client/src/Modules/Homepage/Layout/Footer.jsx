// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaTwitter, FaDribbble } from "react-icons/fa";
import logo from "../../../assets/Bm Academy logo .png"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-gray-700">
        {/* Logo & Address */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="BM Academy Logo" className="w-10 h-10 object-contain" />
            <h2 className="text-xl font-bold text-white">ABM PORTAL</h2>
          </div>
          <p className="text-sm">
            Collins Street West, Victoria Near Bank Road <br />
            Australia QHR12456.
          </p>

          {/* Social icons */}
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-gray-800 hover:bg-blue-600 rounded">
              <FaFacebookF size={16} />
            </a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-blue-700 rounded">
              <FaLinkedinIn size={16} />
            </a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-red-500 rounded">
              <FaGoogle size={16} />
            </a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-sky-500 rounded">
              <FaTwitter size={16} />
            </a>
            <a href="#" className="p-2 bg-gray-800 hover:bg-pink-500 rounded">
              <FaDribbble size={16} />
            </a>
          </div>
        </div>

        {/* For Clients */}
        <div>
          <h3 className="font-semibold text-white mb-4">For Clients</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Talent Marketplace</a></li>
            <li><a href="#" className="hover:text-white">Payroll Services</a></li>
            <li><a href="#" className="hover:text-white">Direct Contracts</a></li>
            <li><a href="#" className="hover:text-white">Hire Worldwide</a></li>
            <li><a href="#" className="hover:text-white">Hire in the USA</a></li>
            <li><a href="#" className="hover:text-white">How to Hire</a></li>
          </ul>
        </div>

        {/* Our Resources */}
        <div>
          <h3 className="font-semibold text-white mb-4">Our Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Free Business tools</a></li>
            <li><a href="#" className="hover:text-white">Affiliate Program</a></li>
            <li><a href="#" className="hover:text-white">Success Stories</a></li>
            <li><a href="#" className="hover:text-white">Upwork Reviews</a></li>
            <li><a href="#" className="hover:text-white">Resources</a></li>
            <li><a href="#" className="hover:text-white">Help & Support</a></li>
          </ul>
        </div>

        {/* The Company */}
        <div>
          <h3 className="font-semibold text-white mb-4">The Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Leadership</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Investor Relations</a></li>
            <li><a href="#" className="hover:text-white">Trust, Safety & Security</a></li>
          </ul>
        </div>

        {/* Download Apps */}
        <div>
          <h3 className="font-semibold text-white mb-4">Download Apps</h3>
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
            >
              <i className="fa-brands fa-apple text-2xl"></i>
              <span>
                <p className="text-xs">GET IT ON</p>
                <p className="font-semibold">Google Play</p>
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
            >
              <i className="fa-brands fa-android text-2xl"></i>
              <span>
                <p className="text-xs">GET IT ON</p>
                <p className="font-semibold">App Store</p>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-10 py-8 border-b border-gray-700">
        <div className="text-center">
          <h4 className="text-green-500 font-bold text-lg">12K</h4>
          <p className="text-sm">Job Posted</p>
        </div>
        <div className="text-center">
          <h4 className="text-green-500 font-bold text-lg">10M</h4>
          <p className="text-sm">Happy Customers</p>
        </div>
        <div className="text-center">
          <h4 className="text-green-500 font-bold text-lg">76K</h4>
          <p className="text-sm">Freelancers</p>
        </div>
        <div className="text-center">
          <h4 className="text-green-500 font-bold text-lg">200+</h4>
          <p className="text-sm">Companies</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-6 text-center text-xs text-gray-400">
        © 2025 ABM Design & Develop By{" "}
        <a
          href="https://bmtechx.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 hover:underline"
        >
          bmtechx.in
        </a>
      </div>

    </footer>
  );
}
