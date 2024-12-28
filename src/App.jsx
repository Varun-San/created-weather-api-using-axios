import React, { useState } from "react";
// import axios from "axios";
import axios from "./axios";

const App = () => {
  const [details, setdetails] = useState({
    cityname: "",
  });
  const [temp, setTemp] = useState(null);
  const [message, setMessage] = useState("");
  // const []

  const handleChange = (event) => {
    const { name, value } = event.target;
    setdetails((curInput) => {
      return {
        ...curInput,
        [name]: value,
      };
    });
  };

  //  AXIOS METHOD
  const apicall = async () => {
    const city = details.cityname.trim();
    if (!city) {
      setMessage("Please enter a valid city name.");
      setTemp(null);
      return;
    }

    try {
      const key = "2b6c4af07f57c2ccf98db18010b30054";
      const response = await axios.get(
        `/data/2.5/weather?q=${city}&appid=${key}`
      );
      console.log(response);

      const temperature = Math.round(response.data.main.temp - 273);
      setTemp(temperature);
      setMessage(`The current temperature in ${city} is ${temperature}°C 🌤️`);
    } catch (error) {
      console.error("Error fetching the weather data:", error);
      setMessage(
        "Unable to fetch weather data. Please check the city name and try again."
      );
      setTemp(null);
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
        <div className="details">
          <label htmlFor="city">Enter the City Name</label>
          <input
            type="text"
            name="cityname"
            id="city"
            onChange={handleChange}
          />
          <button onClick={apicall}>Submit</button>
        </div>
        <p id="temp-display">{message}</p>
      </div>
    </>
  );
};

export default App;
