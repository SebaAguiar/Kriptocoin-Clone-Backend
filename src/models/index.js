const CryptoSchema = require("./nosql/CryptoSchema");
const UserSchema = require("./nosql/UserSchema");

const models = {
   CryptoSchema: CryptoSchema,
   UserSchema: UserSchema
}

module.exports = models