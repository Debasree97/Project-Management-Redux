import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { titleFilter } from "../../features/filter/filterSlice";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    setQuery(value);
  };

  const handleSearch = debounceHandler(doSearch, 500);

  useEffect(() => {
    handleSearch();
    if (query || query==="") {
      dispatch(titleFilter(query))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <input
      onChange={(e) => handleSearch(e.target.value)}
      className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
      type="search"
      placeholder="Search for anything…"
    />
  );
};

export default Search;
