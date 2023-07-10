import { useEffect, useState } from "react";
import { FaTwitter, FaReddit, FaGithub } from "react-icons/fa";
import { BsMeta } from "react-icons/bs";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { Loader } from "../component";
import { CryptoState } from "../context/CryptoContext";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { chartDays } from "../config/data";
import api from "../api/api";
Chart.register(...registerables);
const CoinPage = () => {
  const [coin, setCoin] = useState("");
  const [chart, setCart] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const params = useParams();
  const [days, setDays] = useState(7);
  const { currency, symbol } = CryptoState();
  const fetchCryptoSingle = (id) => {
    api.getSingleCrypto(id).then((resp) => setCoin(resp.data));
  };
  const fetchCryptoChart = (Id, days, currency) => {
    api
      .getCryptoChart(Id, days, currency)
      .then((resp) => setCart(resp.data.prices));
  };

  useEffect(() => {
    fetchCryptoSingle(params.coinId);
    if (params.coinId && currency && days) {
      fetchCryptoChart(params.coinId, currency, days);
    }
  }, [params.coinId, days, currency]);

  if (!coin) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  const handleClick = (dayValue) => {
    setDays(dayValue);
    setActiveButton(dayValue);
  };

  return (
    <div className=" relative rounded-div my-12 py-8 mt-6">
      <div className="flex py-8">
        <img className="w-20 mr-8" src={coin?.image?.large} alt="/" />
        <div>
          <p className="text-3xl font-bold">{coin?.name} price</p>
          <p>
            ({coin?.symbol?.toUpperCase()} / {currency})
          </p>
        </div>
      </div>
      <div className="flex justify-between flex-col ">
        <div>
          <div className="flex  justify-between mb-4 mx-auto ">
            {coin?.market_data?.current_price ? (
              <p className="text-3xl font-bold">
                {symbol}
                {coin?.market_data.current_price[
                  currency.toLowerCase()
                ].toLocaleString()}
              </p>
            ) : null}
            <p>{days} Day</p>
          </div>
          <div className="w-[90%] items-center xl:gap-20 flex flex-col xl:flex-row ">
            <div>
              {!chart ? (
                <div
                  role="status"
                  className=" inset-0 flex xl:min-h-[400px] min-h-[200px] items-center justify-center bg-black bg-opacity-50"
                >
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="canvas-container w-[350px] md:w-[700px]  xl:w-[900px]">
                  <Line
                    data={{
                      labels: chart.map((coin) => {
                        let date = new Date(coin[0]);
                        let time =
                          date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                            : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                      }),
                      datasets: [
                        {
                          data: chart.map((coin) => coin[1]),
                          label: `Price ( Past ${days} Days ) in ${currency}`,
                          borderColor: "#5d67c7",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                  />
                </div>
              )}
              <div className="flex justify-end gap-10 mb-4 mx-auto mt-7  py-2 ">
                <ul
                  className="flex flex-wrap -mb-px text-sm font-medium text-center"
                  id="chart"
                  data-tabs-toggle="#chartContent"
                  role="datalist"
                >
                  {chartDays.map((day) => (
                    <li className="mr-2" role="days" key={day.value}>
                      <button
                        key={day.value}
                        onClick={() => handleClick(day.value)}
                        id={day.value}
                        className={
                          activeButton === day.value
                            ? "bg-blue-500 text-white aria-checked:bg-sky-700 inline-block py-2  rounded-t-lg px-2 font-bold mr-2 rounded-xl   hover:border-4 "
                            : "inline-block py-2 border-b-2 rounded-t-lg px-2 font-bold mr-2 rounded-xl border-2 border-sky-500 hover:bg-blue-600 hover:text-white "
                        }
                        data-tabs-target={day.value}
                        type="button"
                        role="day"
                        aria-controls={day.value}
                        aria-selected={activeButton === day.value}
                      >
                        {day.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-start">
              <div className="flex justify-between py-4 px-5">
                <div>
                  <p className="text-gray-500 text-sm">Market Cap</p>
                  {coin.market_data?.market_cap ? (
                    <p>
                      {symbol}
                      {coin.market_data.market_cap[
                        currency.toLowerCase()
                      ].toLocaleString()}
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Volume (24h)</p>
                  {coin.market_data?.market_cap ? (
                    <p>
                      {symbol}
                      {coin.market_data.total_volume[
                        currency.toLowerCase()
                      ].toLocaleString()}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex justify-between py-4 px-5">
                <div className="button">
                  <p className="text-gray-500 text-sm">24h High</p>
                  {coin.market_data?.high_24h ? (
                    <p>
                      {symbol}
                      {coin.market_data.high_24h[
                        currency.toLowerCase()
                      ].toLocaleString()}
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">24h Low</p>
                  {coin.market_data?.low_24h ? (
                    <p>
                      {symbol}
                      {coin.market_data.low_24h[
                        currency.toLowerCase()
                      ].toLocaleString()}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <p className="text-xl font-bold">Market Stats</p>
                <div className="flex justify-between py-4 px-5">
                  <div>
                    <p className="text-gray-500 text-sm">Market Rank</p>
                    {coin.market_cap_rank}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Hashing Algorithm</p>
                    {coin.hashing_algorithm ? (
                      <p>{coin.hashing_algorithm}</p>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Trust Score</p>
                    {coin.tickers ? (
                      <p>{coin.liquidity_score.toFixed(2)}</p>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-4 justify-between py-4 px-5">
                  <div>
                    <p className="text-gray-500 text-sm">Price Change(24h)</p>
                    {coin.market_data ? (
                      <p>
                        {coin.market_data.price_change_percentage_24h.toFixed(
                          2
                        )}
                        %
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Price Change(7d)</p>
                    {coin.market_data ? (
                      <p>
                        {coin.market_data.price_change_percentage_7d.toFixed(2)}
                        %
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Price Change(14d)</p>
                    {coin.market_data ? (
                      <p>
                        {coin.market_data.price_change_percentage_14d.toFixed(
                          2
                        )}
                        %
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex justify-between py-4 px-5">
                  <div>
                    <p className="text-gray-500 text-sm">Price Change (30d)</p>
                    {coin.market_data ? (
                      <p>
                        {coin.market_data.price_change_percentage_30d.toFixed(
                          2
                        )}
                        %
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Price Change (60d)</p>
                    {coin.market_data ? (
                      <p>
                        {coin.market_data.price_change_percentage_60d.toFixed(
                          2
                        )}
                        %
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Price Change (1y)</p>
                    {coin.market_data ? (
                      <p>
                        {coin.market_data.price_change_percentage_1y.toFixed(2)}
                        %
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 px-5">
          <p className="text-xl font-bold mb-3">About {coin.name}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                coin.description ? coin.description.en : ""
              ),
            }}
          ></p>
          <div className="flex justify-around p-8 text-accent mx-9 px-5">
            <FaTwitter size={25} className="text-blue-500" />
            <BsMeta size={25} className="text-blue-500" />
            <FaReddit size={25} className="text-orange-500" />
            <FaGithub size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
