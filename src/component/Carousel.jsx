import React from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const CarouselClass = ({ exchanges, symbol }) => {
  const items = exchanges.map((coin, index) => {
    return (
      <Link to={`/coin/${coin.id}`}>
        <div
          key={index}
          className="flex flex-col gradient text-white p-4 shadow-xl rounded-xl items-center justify-center mb-10  mx-3 my-7 px-4"
        >
          <img
            key={index}
            src={coin?.image}
            alt=""
            className=" h-10 w-10 mb-3 rounded-full"
          />
          <p className="flex flex-col items-center  justify-center">
            <span>
              {coin?.name} &nbsp;
              {coin?.price_change_percentage_24h > 0 ? (
                <span className="text-green-600">
                  {symbol} {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              ) : (
                <span className="text-red-600">
                  {symbol} {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              )}
            </span>
            <span className="p-2">
              {symbol}
              {typeof coin?.current_price === "number"
                ? coin?.current_price.toLocaleString()
                : coin?.current_price}
            </span>
          </p>
        </div>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    912: {
      items: 5,
    },
    800: {
      items: 4,
    },
    512: {
      items: 2,
    },
  };
  return (
    <div className="  h-[200px] mt-10 ">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  );
};

export default CarouselClass;
