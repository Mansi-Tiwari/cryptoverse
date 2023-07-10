import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { HiArrowSmRight } from "react-icons/hi";
import data from "../data.json";
import Select from "react-select";
import nodata from "../assets/nodata.svg";
import { ScrollToTop } from "./scroll";
import axios from "axios";

const News = () => {
  const [selectedOption, setSelectedOption] = useState("cryptocurrency");
  const [news, setNews] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const fetchCryptoNews = async (newsCategory) => {
    const response = await axios.get(
      `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=16`,
      {
        headers: {
          "x-bingapis-sdk": "true",
          "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      }
    );
    setNews(response.data.value);
  };

  const filteredData = data.map((option) => [option.label]);
  const getOptionLabel = (option) => option;
  const selectOption = (e) => {
    setSelectedOption(e);
  };
  useEffect(() => {
    fetchCryptoNews(selectedOption);
  }, [selectedOption]);

  if (!news) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="wrapper min-h-screen">
      <div className="flex flex-col w-60  align-center justify-start mb-6 mt-4 pl-7">
        <h1 className="block mb-2 text-xl font-bold text-gray-900 dark:text-black">
          Select an option
        </h1>
        <Select
          label=" Select an option"
          className="bg-gray-50 border border-gray-300 hover:text-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="name"
          options={filteredData}
          value={selectedOption}
          onChange={(e) => selectOption(e)}
          getOptionLabel={getOptionLabel}
          placeholder="Choose a Category"
          isClearable
        />
      </div>

      {news.length !== 0 ? (
        <>
          <div className="grid  mb-8 hover:drop-shadow-xl drop-shadow-xl rounded-lg   md:mb-12 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 pl-2 pr-2">
            {news &&
              news.map((item, index) => (
                <div key={index} className="hover:drop-shadow-2xl">
                  <figure className="flex flex-col dark:hover:bg-gray-200  items-center justify-center p-4  text-center bg-white border-b border-gray-200 rounded-lg h-200 dark:bg-gray-100 dark:border-gray-300 mb-5 mx-5">
                    <div className="flex h-[130px] flex-row gap-2 mt-4">
                      <img
                        className=" rounded-t-lg h-20 w-20"
                        src={item?.image?.thumbnail?.contentUrl}
                        alt="profile picture"
                      />
                      <blockquote className="mb-4 lg:mb-8">
                        <h3 className="text-lg font-semibold dark:text-gray-800">
                          {item?.name.substring(0,80)}
                        </h3>
                      </blockquote>
                    </div>

                    <blockquote className="flex h-[130px] flex-col justify-start item-start max-w-2xl mx-auto mb-2  lg:mb-4 dark:text-gray-600">
                      <p className="my-2 text-md">{item?.description.substring(0,150)}</p>
                    </blockquote>
                    <figcaption className="flex items-center mb-4 justify-center space-x-3"></figcaption>
                    <a
                      href={item?.url} target="_blank"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <HiArrowSmRight size={20} className="ml-2" />
                    </a>
                  </figure>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col  justify-center  items-center text-black text-lg">
          <div>Did not find anything. Try searching something else.</div>
          <img
            src={nodata}
            alt="notfound"
            className="mx-auto h-[400px] w-[400px] mb-4"
          />
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};

export default News;
