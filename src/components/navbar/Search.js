import React from 'react';

const Search = () => {
    return (
      <input
        className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
        type="search"
        placeholder="Search for anything…"
      />
    );
};

export default Search;