import React, { useState } from "react";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import millify from "millify";

const Coin = ({ coin, id, symbol }) => {
  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = UserAuth();
  const coinPath = doc(db, "users", `${user?.email}`);
  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
        }),
      });
    } else {
      alert("Please sign in to save a coin to your watch list");
    }
  };
  return (
    <tr className=" items-center border-b text-gray-600  bg-gray-50 bg-gray dark:border-gray-300 hover:bg-slate-300 hover:text-gray-700">
      <td
        onClick={saveCoin}
        scope="row"
        className="pl-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-600"
      >
        {savedCoin ? (
          <BsFillStarFill className="text-yellow-400" />
        ) : (
          <BsStar />
        )}
      </td>
      <td className="px-1 py-3">{id}</td>
      <td className="flex justify-start items-center  px-4 py-5 gap-1 mt-3 cursor-pointer hover:text-indigo-600  ">
        <img
          src={coin?.image}
          className=" rounded-full h-5 w-5"
          alt={coin?.name}
        />

        <span>
          <Link to={`/coin/${coin?.id}`}>
            {coin?.name}({coin?.symbol.toUpperCase()})
          </Link>
        </span>
      </td>

      <td className="px-2 py-4">
        {symbol}
        {typeof coin?.current_price === "number"
          ? millify(coin?.current_price)
          : coin?.current_price}
      </td>
      <td className="px-2 py-4 hidden sm:table-cell">
        {coin?.price_change_percentage_24h > 0 ? (
          <p className="text-green-600">
            {coin?.price_change_percentage_24h?.toFixed(2)}
          </p>
        ) : (
          <p className="text-red-600">
            {coin?.price_change_percentage_24h?.toFixed(2)}
          </p>
        )}
      </td>
      <td className="px-6 py-4 ">
        {symbol}
        {typeof coin?.total_volume === "number"
          ? millify(coin?.total_volume)
          : coin?.total_volume}
      </td>
      <td className="px-6 py-4 hidden sm:table-cell ">
        {symbol}
        {typeof coin?.market_cap === "number"
          ? millify(coin?.market_cap)
          : coin?.market_cap?.toLocaleString()}
      </td>
      <td className="px-6 py-4 hidden md:table-cell">
        <Sparklines data={coin?.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default Coin;
