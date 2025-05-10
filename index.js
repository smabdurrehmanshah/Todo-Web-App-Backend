const express = require("express");
const dotenv = require("dotenv");
const mysqlPool = require("./config/db");
const cors = require('cors');

// configure dotenv
dotenv.config();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/todoApp", require("./routes/todoAppRoutes"));

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server");
});

// port
const PORT = process.env.PORT || 8000;

// conditionally listen

mysqlPool
  .query("SELECT 1")
  .then(() => {
    // MY SQL
    console.log("MY SQL DB Connected");

    // listen
    app.listen(PORT, () => {
      console.log(`Server Running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
