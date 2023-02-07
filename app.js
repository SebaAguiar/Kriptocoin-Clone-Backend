require("dotenv").config();
const cors = require("cors")
const express = require("express")
const fileUpload = require("express-fileupload");
const dbConnect = require("./src/config/mongo");
// const { coinsToDb } = require("./src/controllers");

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(cors())
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./uploads",
    })
  );

app.use("/api", require("./src/routes"))

dbConnect()
// coinsToDb()

app.listen(PORT, ()=> console.log("Server listening on port " + PORT ))