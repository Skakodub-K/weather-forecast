import NumberWeather from "./NumberWeather";

function upFirst(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}


function CardCityWeather(props) {
    
    function DeleteCard(city) {
        let arr = props.arrayCities;
        for(var i = 0; i < arr.length; i++){
            if((Math.round(arr[i].lat * 100) / 100 === Math.round(city.lat * 100) / 100) && (Math.round(arr[i].lon * 100) / 100 === Math.round(city.lon * 100) / 100)){
                delete arr[i];
                arr.splice(i,1);
                break;
            }
        }
        props.SetCities([...arr]);
        localStorage.setItem("pages", JSON.stringify(arr));
    }

    const NameIcon = "https://openweathermap.org/img/wn/" + props.icon + "@2x.png";
    const deleteCity = (event) => {
        let cord_city=new Object();
        cord_city.lat = event.target.parentNode.dataset.lat;
        cord_city.lon = event.target.parentNode.dataset.lon;
        DeleteCard(cord_city);
    };

    return (
        <div className="card-city">
            <button className="card-city__delete" onClick={deleteCity} data-lat={props.lat} data-lon={props.lon}><img src="./image/Delete.svg" alt="delete"></img></button>
            <div className="card-city__info">
                <p className="card-city__info--name"><b>{props.city}</b></p>
                <p className="card-city__info--temp">{Math.round(props.temperature) + "°C"}<img className="card-city__info--icon" src={NameIcon} alt="icon"></img></p>
                <p className="card-city__info--sky">{upFirst(props.sky)}</p>
            </div>
            <hr></hr>
            <div className="card-city__weather">
                <NumberWeather path="./image/Wind.svg" txt="wind" number={props.wind + " m/s"}></NumberWeather>
                <NumberWeather path="./image/Humidity.svg" txt="humidity" number={props.humidity + "%"}></NumberWeather>
                <NumberWeather path="./image/Pressure.svg" txt="pressure" number={props.pressure + " hPa"}></NumberWeather>
            </div>
        </div>
    );
}
export default CardCityWeather;