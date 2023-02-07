const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const CryptoSchema = new Schema({
   id: {
      type: String
   },
   name: {
      type: String
   },
   icon: {
      type: String
   },
   symbol: {
      type: String
   },
   market_cap_rank: {
      type: Number
   },
   market_cap: {
      type: Object
   },
   price_change_24h_in_currency: {
      type: Object
   },
   market_cap_change_percentage_24h: {
      type: Object
   },
   market_cap_change_percentage_24h_in_currency: {
      type: Object
   }
})


module.exports = mongoose.model("Crypto", CryptoSchema)