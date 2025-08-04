'use client'

import { useState, useEffect } from "react";
import requests from "./requests";
import ItemCard from "@/components/itemCard";
import Button from '@mui/material/Button';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import ItemNameFilter from "@/components/filters/itemNameFilter.js";
import BrandFilter from "@/components/filters/brandFilter.js";
import ItemTypeFilter from "@/components/filters/itemTypeFilter.js";

export default function Home() {
  // non-closet stuff
  const [username, setUsername] = useState("Unknown");
  const [brands, setBrands] = useState([]);
  const [brandsToId, setBrandsToId] = useState([]);
  const [userId, setUserId] = useState("");
  const [showPrices, setShowPrices] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // closet items
  const [closetItems, setClosetItems] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageItems, setPageItems] = useState([]);
  const [itemType, setItemType] = useState({ name: "All", value: "" });
  const pageSize = 20;

  // search
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const itemTypeOptions = [{ name: "Fashion", value: "WARDROBE" }, { name: "Decor", value: "ANYWHERE" }, { name: "All", value: "" }];

  function fetchUsername() {
    fetch(requests.apiURL + requests.getUsername + `?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
      });
  }

  function fetchCloset() {
    fetch(requests.apiURL + requests.getCloset + `?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setClosetItems(data.closet);
        getPage(currentPage, data.closet);
        setPages(Math.ceil(data.closet.length / pageSize));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  function fetchBrands() {
    fetch(requests.apiURL + requests.getBrands)
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.brandsIdToName);
        setBrandsToId(
          Object.entries(data.brandsIdToName).map((brand, index) => {
            return {
              name: brand[1],
              brandId: parseInt(brand[0])
            }
          })
        );
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

  function search(e) {
    if (e) {
      e.preventDefault();
    }
    setIsSearching(true);
    let filtered = closetItems;
    if (searchQuery) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedBrand) {
      filtered = filtered.filter(item => item.brandId === selectedBrand.brandId);
    }
    if (itemType.value) {
      filtered = filtered.filter(item => item.type === itemType.value);
    }
    setFilteredItems(filtered);
    setPages(Math.ceil(filtered.length / pageSize));
    setCurrentPage(0);
    getPage(0, filtered);
  }

  function reset() {
    setIsSearching(false);
    setFilteredItems([]);
    setSearchQuery("");
    setSelectedBrand(null);
    setItemType({ name: "All", value: "" });
    setPages(Math.ceil(closetItems.length / pageSize));
    setCurrentPage(0);
    getPage(0, closetItems);
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uId = urlParams.get('id');
    if (uId) {
      setUserId(uId);
    } else {
      setUserId(process.env.NEXT_PUBLIC_USER_ID);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchBrands();
      fetchUsername();
    }
  }, [userId]);

  useEffect(() => {
    setPages(Math.ceil(closetItems.length / pageSize));
  }, [closetItems]);

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-purple-600">
                  Closet Genie
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">{username}'s Closet</p>
              </div>
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPrices}
                  onChange={() => setShowPrices(!showPrices)}
                  sx={{
                    color: '#8b5cf6',
                    '&.Mui-checked': {
                      color: '#8b5cf6',
                    },
                  }}
                />
              }
              label="Show Prices"
              className="text-gray-700 dark:text-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <form onSubmit={search}>
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 sm:w-auto w-full">
              <ItemNameFilter itemName={searchQuery} onFilterChange={setSearchQuery} />
              <BrandFilter brand={selectedBrand} onFilterChange={setSelectedBrand} brandsToId={brandsToId} />
              <ItemTypeFilter itemType={itemType} onFilterChange={setItemType} itemTypeOptions={itemTypeOptions} />
              <div className="flex gap-2">
                <Button 
                  variant="contained" 
                  onClick={search} 
                  type="submit"
                  sx={{
                    background: '#8b5cf6',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                    '&:hover': {
                      background: '#7c3aed',
                      boxShadow: '0 6px 20px rgba(139, 92, 246, 0.6)',
                    }
                  }}
                >
                  Search
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={reset} 
                  type="button"
                  sx={{
                    borderColor: '#8b5cf6',
                    color: '#8b5cf6',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: '600',
                    '&:hover': {
                      borderColor: '#7c3aed',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    }
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Pagination */}
        <div className="flex flex-row justify-center items-center mb-8 gap-4">
          <Button
            variant="outlined"
            disabled={currentPage === 0}
            onClick={() => getPage(currentPage - 1, isSearching ? filteredItems : closetItems)}
            sx={{
              borderColor: '#8b5cf6',
              color: '#8b5cf6',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: '600',
              '&:hover': {
                borderColor: '#7c3aed',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
              },
              '&:disabled': {
                borderColor: '#d1d5db',
                color: '#9ca3af',
              }
            }}
          >
            Previous
          </Button>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl px-4 py-2 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 font-medium">{currentPage + 1} / {pages}</p>
          </div>
          <Button
            variant="outlined"
            disabled={currentPage + 1 >= pages}
            onClick={() => getPage(currentPage + 1, isSearching ? filteredItems : closetItems)}
            sx={{
              borderColor: '#8b5cf6',
              color: '#8b5cf6',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: '600',
              '&:hover': {
                borderColor: '#7c3aed',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
              },
              '&:disabled': {
                borderColor: '#d1d5db',
                color: '#9ca3af',
              }
            }}
          >
            Next
          </Button>
        </div>

        {/* Items Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
                <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : pageItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {
              pageItems.map((item, index) => (
                <ItemCard key={index} item={item} index={index} itemType={'fashion'} allBrands={brands} showPrices={showPrices} />
              ))
            }
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">✨</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No items found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
              {isSearching 
                ? "Try adjusting your search filters or search terms." 
                : "Your closet is empty. Add some items to get started!"
              }
            </p>
            {isSearching && (
              <Button 
                variant="contained" 
                onClick={reset}
                sx={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
                    boxShadow: '0 6px 20px rgba(139, 92, 246, 0.6)',
                  }
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
