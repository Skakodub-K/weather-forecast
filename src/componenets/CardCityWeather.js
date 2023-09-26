import NumberWeather from "./NumberWeather";

function upFirst(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
}

function DeleteCard(city) {
    console.log(city);
    let arr = localStorage.getItem("pages");
    if (arr) {
        arr = JSON.parse(arr);
        let index = arr.findIndex(i => i === city);

            arr.splice(index, 1);
            localStorage.setItem("pages", JSON.stringify(arr));
    }
    window.location.href="/";
}

function CardCityWeather(props) {
    const NameIcon = "https://openweathermap.org/img/wn/" + props.icon + "@2x.png";
    const deleteCity = (event) => {
        console.log(event.target.parentNode.dataset.city);
        const city = event.target.parentNode.dataset.city;
        DeleteCard(city);
    };

    return (
        <div className="card-city">
            <button className="card-city__delete" onClick={deleteCity} data-city={props.city}><img src="./image/Delete.svg" alt="delete"></img></button>
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