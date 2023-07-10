import React from "react";
import Loader from "./Loader";
import Stars from "./Stars";
import { Link } from "react-router-dom";

const Trending = ({trending}) => {



  if (!trending) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Stars />
      <div className=" rounded-2xl  px-2  max-w-[70%] w-full mx-auto  py-16 text-primary">
        <h1 className="text-3xl font-bold py-4 text-blue-400">
          Trending Coins
        </h1>
        <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trending &&
            trending.map((coin, id) => (
              <div
                key={id}
                className="backdrop-blur-sm bg-white/10 text-white rounded-2xl shadow-xl  px-2  w-full mx-auto p-4 hover:scale-105 ease-in-out duration-300"
              >
                <div className="flex w-full  items-center  justify-around">
                      <Link to={`/coin/${coin.item.id}`}>
                    <div className="flex">
                      <img
                        className="mr-4 rounded-full"
                        src={coin.item.small}
                        alt={coin.id}
                        />

                      <div>
                        <p className="font-bold">{coin.item.name}</p>
                        <p className="">{coin.item.symbol}</p>
                      </div>
                      <div className="flex px-1 mx-auto items-center">
                        <img
                          className="w-4 h-4 m-1"
                          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                          alt="btc"
                          />
                        <p> {coin.item.price_btc.toFixed(7)}</p>
                      </div>
                    </div>
                          </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
