import React, { useState } from "react";
// import axios from "axios";
import axios from "./axios";

var response;

const App = () => {
  const [details, setdetails] = useState({
    cityname: "",
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

  //  AXIOS METHOD
  let key = "2b6c4af07f57c2ccf98db18010b30054";
  let city = `${details.cityname}`;
  async function apicall() {
    response = await axios.get(`/data/2.5/weather?q=${city}&appid=${key}`);
    console.log(response.data);
  }

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
        <p>The current temp is {response.data.base}</p>
      </div>
    </>
  );
};

export default App;
