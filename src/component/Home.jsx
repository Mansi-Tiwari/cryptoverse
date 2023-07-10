import React from "react";
import Trending from "./Trending";
import Exchange from "./Exchange";
import Stars from "./Stars";
import Loader from "./Loader";
import { ScrollToTop } from "./scroll";
import CarouselClass from "./Carousel";

const Home = ({ exchanges, symbol, global, trending }) => {
  if (!exchanges) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div id="wrapper">
      <ScrollToTop />
      <div className="mainpage">
        <div
          id="fullWidthTabContent"
          className="px-4 pt-9  border-t border-gray-200 dark:border-gray-600"
        >
          <Stars />
          <div
            className=" rounded-lg md:p-8 "
            id="stats"
            role="tabpanel"
            aria-labelledby="stats-tab"
          >
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-xl md:text-3xl font-extrabold">
                  Total Coins Tracked
                </dt>
                <dd className="text-gray-300 md:text-xl">
                  {global?.active_cryptocurrencies?.toLocaleString()}
                </dd>
              </div>

              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-xl md:text-3xl font-extrabold">
                  24h Volume
                </dt>
                <dd className="text-gray-300 text-xl">
                  ${Math.ceil(global?.total_volume?.btc).toLocaleString()}
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-xl md:text-3xl font-extrabold">
                  Market
                </dt>
                <dd className="text-gray-300 text-xl">
                  ${Math.ceil(global?.total_market_cap?.btc).toLocaleString()}
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-xl md:text-3xl font-extrabold">
                  Total Exchanges Tracked
                </dt>
                <dd className="text-gray-300 text-xl">{global?.markets}</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-xl md:text-3xl font-extrabold">
                  Dominance
                </dt>
                <dd className="text-gray-300  md:text-xl">
                  BTC &nbsp; &nbsp;
                  {global?.market_cap_percentage?.btc?.toFixed(2)}%
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-xl md:text-3xl font-extrabold">
                  Ongoing Icons
                </dt>
                <dd className="text-gray-300  md:text-xl">
                  {global?.ongoing_icos}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <Trending trending={trending} />
      </div>
      <div className="mb  ">
        <CarouselClass exchanges={exchanges} symbol={symbol} />
      </div>
      <div className="mt-5">
        <Exchange exchanges={exchanges} symbol={symbol} />
      </div>
    </div>
  );
};

export default Home;
