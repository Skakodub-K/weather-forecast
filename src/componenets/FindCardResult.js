import React, { useState } from "react";


async function getFindResult(str) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${str}&limit=3&appid=5e992d2e5f4462ff62565f2030da7469`
  );
  let data = await response.json();
  return data;
}


function FindCardResult(props) {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [animation, setAnimation] = useState(false);
  
  async function handleChange(event) {
    setQuery(event.target.value);
    try{
    if (event.target.value.length >= 0) {
      const Results = await getFindResult(event.target.value);
      setResults(Results);
    } else {
      setResults([]);
    }
  }
  catch(error){
    console.log(error);
    return null;
  }
  }

  function AddCard(city) {

    let arr = props.arrCities;
    if (arr) {
        var IsAdd = true;
        for(var i = 0; i < arr.length; i++){
          if((Math.round(arr[i].lat * 100) / 100 === Math.round(city.lat * 100) / 100) && (Math.round(arr[i].lon * 100) / 100 === Math.round(city.lon * 100) / 100)){
               IsAdd=false;
               break;
           }
       }
       if(IsAdd){
        arr.push(city);
      }
      props.addCities([...arr]);
      localStorage.setItem("pages", JSON.stringify(arr));
    }
  }
  const getCity = (event) => {
    event.preventDefault();
    setAnimation(true);
    setQuery("");
    setResults([]);
    setTimeout(function() {
      setAnimation(false);
    }, 600);
    let cord_city = new Object();
    cord_city.lat = event.target.parentNode.dataset.lat;
    cord_city.lon = event.target.parentNode.dataset.lon;
    if(cord_city.lat!==undefined && cord_city.lon!==undefined){
      AddCard(cord_city);
    }
  };

  return (
    <div className="header__search">
      <input
        className="header__search__input"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
      <div className="header__search__div">
        {results.length > 0 ? (
          <ul className="header__search__ul" style={{display:animation?"none":"block"}} >
            {results.map((result) => (
              <div className="header__search__ul__div">
              <li className="header__search__ul-li"  data-lat={result.lat} data-lon={result.lon} onClick={getCity}>
                  <p className="header__search__ul__name">
                    <b>{result.name + ", " + result.country}</b>
                  </p>
                  <img
                    className="header__search__ul__img"
                    src="./image/Add.svg"
                    alt="add"
                  />
                  <p className="header__search__ul__cord">
                    {Math.round(result.lat * 1000) / 1000 +
                      ", " +
                      Math.round(result.lon * 10000) / 10000}
                  </p>
              </li>
                {result !== results[results.length-1] ? (<img className="header__search__ul__line" src="./image/Line.svg" alt="line"></img>):(<></>)}
              </div>
            ))}
          </ul>
        ) : query.length > 0 ? (
          <div className="header__search__not--found">
            <p className="header__search__not--found__basis">
              City called “{query}” was not found
            </p>
            <p className="header__search__not--found__descript">
              Try a different city name
            </p>
          </div>
        ) :( 
        <></>
        )}
        <div className="header__search__animation" style={{display:animation?"block":"none"}}> 
          <img className="header__search__animation--img" src="./image/Spinner.svg" alt="animation"></img>
        </div>
      </div>
      <button className="header__search__button">
        <img src="./image/Search.svg" alt="search" />
      </button>
    </div>
  );
}

export default FindCardResult;