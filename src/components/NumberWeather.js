function NumberWeather(props){
    return (
        <div className="card-city__weather__data">
            <img src={props.path} alt={props.txt}></img>
            <p> {props.number}</p>
        </div>
    );
}
export default NumberWeather;