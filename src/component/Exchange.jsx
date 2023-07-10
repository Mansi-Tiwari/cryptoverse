import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import millify from "millify";

const Exchange = ({ exchanges, symbol }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <div className="flex justify-between font-bold text-2xl my-9 mx-2 p-6">
        <h1 className="text-3xl text-blue-500">Exchanges</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BsSearch color="white" />
          </div>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            id="table-search"
            className="block search p-2 pl-10 gradient text-sm text-white border border-slate-300 rounded-lg w-70  focus:ring-blue-500 focus:border-blue-500 dark:border-gray-300 dark:placeholder-gray-200  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <div className="grid mb-8 px-4 rounded-lg mt-8  md:mb-12  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 ">
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
              <figure
                key={id}
                className="flex flex-col hover:-translate-y-1 transform transition-all duration-300 items-center justify-center  p-2 text-start bg-white border-b border-gray-200 rounded-lg  dark:bg-gray-200 dark:border-gray-200 mb-3 mx-4"
              >
                <blockquote className="flex flex-col  max-w-xl  mb-4 lg:mb-4 ">
                  <div className="flex items-start p-2 gap-3 justify-start">
                    <div className="">
                      <img
                        className="rounded-full w-11 h-11 "
                        src={coin?.image}
                        alt="profile picture"
                      />
                    </div>
                    <div className="font-bold ">
                      <div>
                        <span>{id + 1}. </span>
                        {coin?.name}
                      </div>
                      <div className="text-sm text-gray-700">
                        ({coin?.symbol})
                      </div>
                    </div>
                  </div>
                </blockquote>
                <hr className="h-px mb-3  bg-gray-200 border-0 dark:bg-gray-300 w-full"></hr>
                <div className="p-3">
                  <div className="mb-3 font-large ">
                    <div>
                      Price:{" "}
                      <span>
                        {symbol}
                        {coin?.current_price?.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      Market cap:{" "}
                      <span>
                        {symbol}
                        {millify(coin?.market_cap)}
                      </span>
                    </div>
                    <div>
                      Price change 24h:&nbsp;
                      {coin?.price_change_percentage_24h > 0 ? (
                        <span className="text-green-600">
                          {coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                      ) : (
                        <span className="text-red-600">
                          {coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                      )}
                    </div>
                    <div>
                      Current Price:{" "}
                      <span>
                        {symbol}
                        {coin?.total_volume.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/coin/${coin.id}`}
                    className="inline-flex  items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </figure>
            ))}
      </div>
    </>
  );
};

export default Exchange;
