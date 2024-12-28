import React, { useState, useEffect } from "react";
// import axios from "axios";
import axios from "./axios";
import weather from "./assets/weathergif/weather.gif";
import weather2 from "./assets/weathergif/clouds.gif";
import rain from "./assets/weathergif/rains.gif";
import Clearsky from "./assets/weathergif/sun.gif";
import Fog from "./assets/weathergif/foggy.gif";
import Thunderstorm from "./assets/weathergif/storm.gif";
import Mist from "./assets/weathergif/cloudy.gif";
import Clear from "./assets/weathergif/sun.gif";

const App = () => {
  let set;
  const [details, setdetails] = useState({
    cityname: "",
  });
  const [temp, setTemp] = useState(null);
  const [message, setMessage] = useState("");
  const [weather_image, setweather_image] = useState("");
  const [wcond, setwcond] = useState("");
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setdetails((curInput) => {
      return {
        ...curInput,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime({
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
      });
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  //  AXIOS METHOD
  const apicall = async () => {
    const city = details.cityname.trim();
    if (!city) {
      setMessage("Please enter a valid city name.");
      setTemp(null);
      setweather_image(null);
      setwcond("");
      setdate("");
      return;
    }
    try {
      const key = "2b6c4af07f57c2ccf98db18010b30054";
      const response = await axios.get(
        `/data/2.5/weather?q=${city}&appid=${key}`
      );
      console.log(response.data);
      const temperature = Math.round(response.data.main.temp - 273);
      const weathercondition = response.data.weather[0].main;
      setTemp(temperature);
      setMessage(`The Current Temperature in ${city} is ${temperature}°C 🌤️`);
      setwcond(`${weathercondition}`);
      setweather_image(() => {
        if (weathercondition == "Haze") {
          setweather_image(weather);
        } else if (weathercondition == "Clouds") {
          setweather_image(weather2);
        } else if (weathercondition == "Rain") {
          setweather_image(rain);
        } else if (weathercondition == "Thunderstorm") {
          setweather_image(Thunderstorm);
        } else if (weathercondition == "Fog") {
          setweather_image(Fog);
        } else if (weathercondition == "Clearsky") {
          setweather_image(Clearsky);
        } else if (weathercondition == "Mist") {
          setweather_image(Mist);
        } else if (weathercondition == "Clear") {
          setweather_image(Clear);
        }
      });
    } catch (error) {
      console.error("Error fetching the weather data:", error);
      setMessage(
        "Unable to fetch weather data. Please check the city name and try again."
      );
      setTemp(null);
      setweather_image(null);
      setwcond(null);

      //========================

      // Axios Error Handling
      if (error.response) {
        // Server responded with a status code other than 2xx
        const { status } = error.response;
        if (status === 404) {
          setMessage("City not found. Please enter a valid city.");
        } else if (status === 401) {
          setMessage("Invalid API key. Please check your API key.");
        } else {
          setMessage("Something went wrong. Please try again later.");
        }
      } else if (error.request) {
        // No response received from server
        setMessage(
          "Unable to connect to the server. Please check your network."
        );
      } else {
        // Some other error occurred
        setMessage("An unexpected error occurred.");
      }
    }
  };

  //  ASYNC AND AWAIT METHOD TO FETCH THE API
  // let key = "2b6c4af07f57c2ccf98db18010b30054";
  // let city = "Chennai";
  // async function apicall() {
  //   const response = await fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  //   );
  //   const data = await response.json();
  //   console.log(response);
  //   console.log(data);
  // }

  return (
    <>
      <div className="main">
        <h2>Welcome to the Weather Man</h2>
        <p>
          {dateTime.date} {dateTime.time}
        </p>
        <label htmlFor="city">Enter the City Name</label>
        <br />
        <div className="details">
          <input
            type="text"
            name="cityname"
            id="city"
            onChange={handleChange}
            placeholder="Enter Your City Name"
          />
          <a>
            <button onClick={apicall}>Submit</button>
          </a>
        </div>
        <p>{message}</p>
        <img src={weather_image} />
        <p>{wcond}</p>
      </div>
    </>
  );
};

export default App;
