'use client'

import { useState, useEffect } from "react";
import requests from "./requests";
import ItemCard from "@/components/itemCard";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

export default function Home() {
  // non-closet stuff
  const [username, setUsername] = useState("Unknown");
  const [brands, setBrands] = useState([]);

  // closet items
  const [closetItems, setClosetItems] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageItems, setPageItems] = useState([]);
  const pageSize = 20;

  // search
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  function fetchUsername() {
    fetch(requests.apiURL + requests.getUsername + `?userId=${process.env.NEXT_PUBLIC_USER_ID}`)
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
      });
  }

  function fetchCloset() {
    fetch(requests.apiURL + requests.getCloset + `?userId=${process.env.NEXT_PUBLIC_USER_ID}`)
      .then((response) => response.json())
      .then((data) => {
        setClosetItems(data);
        getPage(currentPage, data);
        setPages(Math.ceil(closetItems.length / pageSize));
      })
  }

  function fetchBrands() {
    fetch(requests.apiURL + requests.getBrands)
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.brandsIdToName);
      })
      .then(() => {
        fetchCloset();
      });
  }

  function getPage(pageNumber, items) {
    const startIndex = (pageNumber) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedList = items.slice(startIndex, endIndex);
    setPageItems(paginatedList);
    setCurrentPage(pageNumber);
  }

  function search() {
    setIsSearching(true);
    const filtered = closetItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredItems(filtered);
    setPages(Math.ceil(filtered.length / pageSize));
    setCurrentPage(0);
    getPage(0, filtered);
  }

  function reset() {
    setIsSearching(false);
    setFilteredItems([]);
    setSearchQuery("");
    setPages(Math.ceil(closetItems.length / pageSize));
    setCurrentPage(0);
    getPage(0, closetItems);
  }

  useEffect(() => {
    fetchUsername();
    fetchBrands();
  }, []);

  return (
    <div className="p-8">
      <h1>Welcome back, {username}</h1>
      <div className="flex flex-row justify-center items-center mb-4 gap-4">
        <Input
          type="text"
          placeholder="Search for items..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }} />
        <Button variant="outlined" onClick={search}>Search</Button>
        <Button variant="outlined" onClick={reset}>Reset</Button>
      </div>
      <div className="flex flex-row justify-center items-center mb-4 gap-4">
        <Button
          variant="outlined"
          disabled={currentPage === 0}
          onClick={() => getPage(currentPage - 1, isSearching ? filteredItems : closetItems)}>
          Previous
        </Button>
        <p className="">{currentPage + 1} / {pages}</p>
        <Button
          variant="outlined"
          disabled={currentPage + 1 >= pages}
          onClick={() => getPage(currentPage + 1, isSearching ? filteredItems : closetItems)}>
          Next
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        {
          pageItems.map((item, index) => (
            <ItemCard key={index} item={item} index={index} itemType={'fashion'} allBrands={brands} />
          ))
        }
      </div>
    </div>
  );
}
