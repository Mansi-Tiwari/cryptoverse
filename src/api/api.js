import axios from "axios";

const axiosCreate = axios.create({
  baseURL: `https://api.coingecko.com/api/v3/`,
});

const getCryptoChart = (id, currency, days) =>
  axiosCreate.get(
    `coins/${id}/market_chart?vs_currency=${currency}&days=${
      !days ? 365 : days
    }`
  );

const getTrending = () => axiosCreate.get("search/trending");
const getGlobalCrypto = () => axiosCreate.get("global");
const getExchangeCrypto = (currency, page) =>
  axiosCreate.get(
    `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${
      !page ? 1 : page
    }&sparkline=true`
  );

const getSingleCrypto = (query) =>
  axiosCreate.get(`/coins/${query}?localization=false&sparkline=true`);

export default {
  getCryptoChart,
  getTrending,
  getExchangeCrypto,
  getGlobalCrypto,
  getSingleCrypto,
};
