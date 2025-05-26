'use client'

import { useState, useEffect } from "react";
import requests from "./requests";
import ItemCard from "@/components/itemCard";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Home() {
  // non-closet stuff
  const [username, setUsername] = useState("Unknown");
  const [brands, setBrands] = useState([]);
  const [brandsToId, setBrandsToId] = useState([]);
  const [userId, setUserId] = useState("");
  const [showPrices, setShowPrices] = useState(true);

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
      })
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
    <div className="p-8">
      <h1>Welcome back, {username}</h1>
      <form onSubmit={search} >
        <div className="flex flex-row justify-center items-center mb-4 gap-4">
          <Input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }} />
          <Autocomplete
            options={!brandsToId ? [{ name: "Loading...", brandId: 0 }] : brandsToId}
            placeholder='Brand Name'
            autoHighlight
            getOptionLabel={(option) => option.name || ''}
            value={selectedBrand}
            slotProps={{
              listbox: {
                sx: (theme) => ({
                  zIndex: theme.vars.zIndex.modal,
                }),
                className: 'dark:!bg-[#1f2023]'
              }
            }}
            onChange={(event, value) => {
              setSelectedBrand(value);
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box key={key} component="li" sx={{ display: 'flex', alignItems: 'stretch', paddingLeft: '10px', paddingRight: '10px', minHeight: '35px', maxHeight: '100px' }} {...optionProps}
                  className='-mt-2 mb-2 dark:bg-[#1f2023] dark:text-white dark:hover:!bg-neutral-600 dark:aria-selected:bg-neutral-600 aria-selected:font-bold'>
                  <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    {option.name}
                  </div>
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField {...params} label="Start typing..."
                slotProps={{
                  htmlInput: {
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  },
                }} />
            )}
          />
          <Autocomplete
            options={itemTypeOptions}
            placeholder='Item Type'
            autoHighlight
            getOptionLabel={(option) => option.name || ''}
            value={itemType}
            slotProps={{
              listbox: {
                sx: (theme) => ({
                  zIndex: theme.vars.zIndex.modal,
                }),
                className: 'dark:!bg-[#1f2023]'
              }
            }}
            onChange={(event, value) => {
              setItemType(value);
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box key={key} component="li" sx={{ display: 'flex', alignItems: 'stretch', paddingLeft: '10px', paddingRight: '10px', minHeight: '35px', maxHeight: '100px' }} {...optionProps}
                  className='-mt-2 mb-2 dark:bg-[#1f2023] dark:text-white dark:hover:!bg-neutral-600 dark:aria-selected:bg-neutral-600 aria-selected:font-bold'>
                  <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    {option.name}
                  </div>
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField {...params} label="Start typing..."
                slotProps={{
                  htmlInput: {
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  },
                }} />
            )}
          />
          <Button variant="outlined" onClick={search} type="submit">Search</Button>
          <Button variant="outlined" onClick={reset} type="button">Reset</Button>
          <FormControlLabel
            control={
              <Checkbox
                checked={showPrices}
                onChange={() => setShowPrices(!showPrices)}
              />
            }
            label="Show Prices"
          />
        </div>
      </form>

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
            <ItemCard key={index} item={item} index={index} itemType={'fashion'} allBrands={brands} showPrices={showPrices} />
          ))
        }
      </div>
    </div>
  );
}
