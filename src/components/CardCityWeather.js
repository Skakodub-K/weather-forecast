import NumberWeather from "./NumberWeather";
import '../style/CardCityWeather.css';
import {useState, useEffect, useMemo } from "react";
import {upFirst} from "../helpers";
import { getWeather } from "../api";

function CardCityWeather({cityId, delCity}) {
    
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        getWeather(cityId).then((data)=>{
            setWeatherData(data);
        });
    },[]);
    
    const temperature = useMemo(() => {
        return Math.round(weatherData?.main.temp) + "°C";
      }, [weatherData]);

    if(weatherData === null){
        return null;
    }
    else{
        return (
            <div className="card-city">
                <button className="card-city__delete" onClick={()=>{delCity(cityId)}} ><img src="./image/Delete.svg" alt="delete"></img></button>
                <div className="card-city__info">
                    <p className="card-city__info__name"><b>{weatherData.name}</b></p>
                    <p className="card-city__info__temp">{temperature}<img className="card-city__info__icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="icon"></img></p>
                    <p className="card-city__info__sky">{upFirst(weatherData.weather[0].description)}</p>
                </div>
                <img className="card-city__line" src="./image/LineCards.svg" alt="line"></img>
                <div className="card-city__weather">
                    <NumberWeather path="./image/Wind.svg" txt="wind" number={weatherData.wind.speed + " m/s"}></NumberWeather>
                    <NumberWeather path="./image/Humidity.svg" txt="humidity" number={weatherData.main.humidity + "%"}></NumberWeather>
                    <NumberWeather path="./image/Pressure.svg" txt="pressure" number={weatherData.main.pressure + " hPa"}></NumberWeather>
                </div>
            </div>
        );
    }
}
export default CardCityWeather;