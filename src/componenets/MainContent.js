import { useState, useEffect } from 'react';
import CardCityWeather from "./CardCityWeather";

const apiKey = "5e992d2e5f4462ff62565f2030da7469";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;

async function getWeather(city){
  const response = await fetch(apiUrl + city +`&units=metric&appid=${apiKey}`);
  let data = await response.json();
  return data;
}

async function fetchData(city) {
  try {
    const weatCity = await getWeather(city);
    const weaterArray = weatCity.weather[0];

    return (
        <CardCityWeather 
          icon={weaterArray.icon}
          city={weatCity.name}
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
function MainContent(props){
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchData(props.city).then(data => {
      setWeatherData(data);
    });
  }, []);

  return weatherData;
}

export default MainContent;