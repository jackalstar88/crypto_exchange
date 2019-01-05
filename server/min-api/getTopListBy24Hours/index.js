import axios from "axios";
import { MIN_API_URL, TOP_LIST_24H, CRYPTOCOMPARE_WEBSITE } from '../../config';

const getToListBy24Hours = async (req, res) => {
  const { limit = 10, symbol = 'USD', page = 0} = req.query;
  console.log(req.query);
  try {
    const { data } = await axios.get(`${MIN_API_URL}/${TOP_LIST_24H}?limit=${limit}&tsym=${symbol}&page=${page}`)

    res.send({
      cryptos: data.Data.map(({ CoinInfo, RAW: { USD: { LASTUPDATE } }, DISPLAY: { USD: { PRICE } }}) => 
        ({
          id: CoinInfo.Id,
          name: CoinInfo.Name,
          displayName: CoinInfo.FullName,
          imageUrl: `${CRYPTOCOMPARE_WEBSITE}/${CoinInfo.ImageUrl}`,
          price: PRICE,
          lastUpdate: new Date(LASTUPDATE) }))
        });
  } catch (err) {
    console.error(err);
  }
  
};

export { getToListBy24Hours }