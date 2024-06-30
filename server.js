const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apiKey = "acdfdd665f703c58d306b48d554dce01";
  const lang = "en";
  const units = "imperial";
  const mode = "JSON";

  // Add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&mode=${mode}&appid=${apiKey}`;
  let weather;
  let error = null;
  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (e) {
    weather = null;
    if(city==null || city=="")
      {
        error = "Please enter city name";
      }
      else
      {
        error = "Error, Please try again";
      }
  }
  // Render the index template with the weather data and error message
  res.render("index", { weather, error });
});

//submit.addEventListener("click", (e)=>{
//  e.preventDefault();
//})

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on http://127.0.0.1:${port}`);
});
