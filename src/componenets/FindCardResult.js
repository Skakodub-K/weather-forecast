import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

async function getFindResult(str) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${str}&limit=3&appid=5e992d2e5f4462ff62565f2030da7469`
  );
  let data = await response.json();
  return data;
}

function AddCard(city) {

  let arr = localStorage.getItem("pages");
  if (arr) {
      arr = JSON.parse(arr);
      arr.push(city);
      localStorage.setItem("pages", JSON.stringify(arr));
  }
  window.location.href="/";
}

function FindCardResult() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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

  const getCity = (event) => {
    event.preventDefault();
    setTimeout(function() {
      let anim = document.querySelector("header__search__animation")[0];
      anim.style.display = "block";
    }, 600);
    
    const city = event.target.parentNode.dataset.city;
    AddCard(city);
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
          <ul className="header__search__ul">
            {results.map((result) => (
              <li className="header__search__ul-li" key={[result.lat, result.lon]}>
                <Link to="/" className="header__search__ul-li__a" data-city={result.name} onClick={getCity}>
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
                </Link>
                
              </li>
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
         <div className="header__search__animation"> 
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