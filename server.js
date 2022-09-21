const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "/views")));

app.get("/", async (req, res) => {
  try {
    let getData = new Array();
    let wazirxData = await axios("https://api.wazirx.com/api/v2/tickers");
    let data = wazirxData.data || {},i = 1;
    for (const key in data) {
      if (i++ > 10) break;
      getData.push(data[key]);
    }
    return res.render("index", { data: getData });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
});

app.listen(3000, console.log("Running"));
