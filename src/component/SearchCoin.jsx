import React, { useState } from "react";
import Loader from "./Loader";
import { BsSearch } from "react-icons/bs";
import Coin from "./Coin";
import Pagination from "./Pagination";
import { ScrollToTop } from "./scroll";

const SearchCoin = ({ exchanges, setCurrentPage, symbol, currentPage }) => {
  const [searchText, setSearchText] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (!exchanges) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-5 mt-4  ">
        <h1 className="text-2xl font-bold my-2 text-blue-400 mt-5">
          Search Crypto
        </h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BsSearch color="black" />
          </div>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            id="table-search"
            className="block search p-2 pl-10 gradient text-sm text-white border border-slate-400 rounded-lg w-70  focus:ring-blue-500 focus:border-blue-500 dark:border-gray-300 dark:placeholder-gray-200  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <div className="relative sm:rounded-lg px-3 mb-4">
        <ScrollToTop />
        <table className="w-full text-md text-left ">
          <thead className=" items-center uppercase gradient dark:text-gray-700 font-bold">
            <tr className="mx-auto">
              <th scope="col" className="px-2 py-3"></th>
              <th scope="col" className="px-2 py-3">
                #
              </th>
              <th scope="col" className="px-2 py-3">
                Coin
              </th>
              <th scope="col" className="px-1 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                24h
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                24h Volume
              </th>
              <th scope="col" className="px-4 py-3 hidden sm:table-cell">
                Mkt
              </th>
              <th scope="col" className="px-4 py-3 hidden  md:table-cell">
                Last 7 Days
              </th>
            </tr>
          </thead>
          <tbody>
            {exchanges &&
              exchanges
                .filter((value) => {
                  if (searchText === "") {
                    return value;
                  } else if (
                    value.name.toLowerCase().includes(searchText.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((coin, id) => (
                  <Coin key={id} coin={coin} id={id + 1} symbol={symbol} />
                ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center my-4">
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default SearchCoin;
