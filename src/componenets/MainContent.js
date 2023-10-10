import { useState } from 'react';
import CardCityWeather from "./CardCityWeather";

const apiKey = "5e992d2e5f4462ff62565f2030da7469";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

async function getWeather(city){
  const response = await fetch(apiUrl + `lat=${city.lat}&lon=${city.lon}`+`&appid=${apiKey}&units=metric`);
  let data = await response.json();
  return data;
}


function MainContent(props){
  const [weatherData, setWeatherData] = useState(null);

  async function fetchData(props) {
    try {
      const weatCity = await getWeather(props.city);
      const weaterArray = weatCity.weather[0];

      return (
          <CardCityWeather 
            arrayCities={props.arrayCities}
            SetCities={props.SetCities}
            icon={weaterArray.icon}
            city={weatCity.name}
            lat={weatCity.coord.lat}
            lon={weatCity.coord.lon}
            temperature ={weatCity.main.temp}
            sky ={weaterArray.description}
            wind ={weatCity.wind.speed}
            humidity ={weatCity.main.humidity}
            pressure ={weatCity.main.pressure}>
          </CardCityWeather>
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

    fetchData(props).then(data => {
      setWeatherData(data);
    });

  return weatherData;
}

export default MainContent;