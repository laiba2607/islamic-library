"use client";
import React from 'react';
import '@/app/globals.css';

// components/SearchBar.js
export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center w-full max-w-lg mx-auto mb-6">
      <input
        type="text"
        placeholder="Search for books..."
        value={value}
        onChange={onChange}
        className="flex-grow p-2 md:p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="p-2 md:p-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}