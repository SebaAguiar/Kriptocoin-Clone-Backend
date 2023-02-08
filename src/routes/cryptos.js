const axios = require('axios')
const express = require('express')
const router = express()
const { coinsList } = require('../utils/mockCryptos.js')
const { cryptoCoins } = require('../utils/mockedCoins.js')

// router.get('/', async(req, res) => {
//    try {
//   const promises = coinsList.map(async coin => {
//     const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}`);
//     return {
//       id: data.id,
//       name: data.name,
//       symbol: data.symbol,
//       icons: data.image,
//       market_cap_rank: data.market_cap_rank,
//       market_cap: data.market_data.market_cap,
//       market_cap_change_24h: data.market_data.market_cap_change_24h,
//       market_cap_change_percentage_24h: data.market_data.market_cap_change_percentage_24h,
//       price_change_24h_in_currency: data.market_data.price_change_24h_in_currency,
//       market_cap_change_24h_in_currency: data.market_data.market_cap_change_24h_in_currency,
//       market_cap_change_percentage_24h_in_currency: data.market_data.market_cap_change_percentage_24h_in_currency
//     };
//   });

//   const coinData = await Promise.all(promises);
//   res.send(coinData);
//       console.log(allCoins)
//    } catch (error) {
//       console.log('ERROR IN GET CRYPTOS')
//       console.log(error)
//       console.log('ERROR IN GET CRYPTOS')
//    }
// })

router.get('/', async(req,res) => {
   try {
      const { name } = req.query
      if(name) {
         let data = cryptoCoins.filter(e => e.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
         data ? res.status(200).send(data) : res.status(404).send('Not found')
      } else {
         res.status(200).send(cryptoCoins)
      }
   } catch (error) {
      console.log('ERROR IN GET CRYPTOS')
      console.log(error)
      console.log('ERROR IN GET CRYPTOS')
      res.satatus(400).send('An error has occurred')
   }
})

module.exports = router