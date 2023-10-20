import NumberWeather from "./NumberWeather";
import {useState, useEffect } from "react";

function upFirst(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}


function CardCityWeather(props) {
    function deleteCard(){
        props.delCity(props.cityId)
    }
    const [weatherData, setWeatherData] = useState(null);
    
    useEffect(() => {
        fetchData(props).then((data)=>{
            setWeatherData(data);
        });
    },[]);

    async function fetchData(props) {
        const response = await fetch(`https://openweathermap.org/data/2.5/weather?id=${props.cityId}&appid=439d4b804bc8187953eb36d2a8c26a02`);
        const data = await response.json();
        
        return data;
    }
    if(weatherData === null){
        return null;
    }
    else{
        return (
            <div className="card-city">
                <button className="card-city__delete" onClick={deleteCard} ><img src="./image/Delete.svg" alt="delete"></img></button>
                <div className="card-city__info">
                    <p className="card-city__info--name"><b>{weatherData.name}</b></p>
                    <p className="card-city__info--temp">{Math.round(weatherData.main.temp) + "°C"}<img className="card-city__info--icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="icon"></img></p>
                    <p className="card-city__info--sky">{upFirst(weatherData.weather[0].description)}</p>
                </div>
                <hr></hr>
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