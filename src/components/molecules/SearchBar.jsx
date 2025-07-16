import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-4">
      <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none"
        />
        <Button
          type="submit"
          size="sm"
          className="rounded-none px-6 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
        >
          <ApperIcon name="Search" size={18} />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;