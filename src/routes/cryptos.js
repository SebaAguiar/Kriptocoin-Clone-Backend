const axios = require('axios')
const express = require('express')
const router = express()
const { coinsList } = require('../utils/mockCryptos.js')

router.get('/', async(req, res) => {
   try {
      const promises = coinsList.map(async coin => {
         const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}`);
         return data;
       });
     
       const coinData = await Promise.all(promises);
       res.send(coinData);
      console.log(allCoins)
   } catch (error) {
      console.log('ERROR IN GET CRYPTOS')
      console.log(error)
      console.log('ERROR IN GET CRYPTOS')
   }
})

module.exports = router