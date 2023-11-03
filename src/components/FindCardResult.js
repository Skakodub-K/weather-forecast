import React, { useState, useEffect, useMemo } from "react";
import '../style/FindCardResult.css';
import { getFindResult } from "../api";
import { cordround, debounce } from "../helpers";

function FindCardResult(props) {

  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(true);
  const [results, setResults] = useState([]);
  const [animation, setAnimation] = useState(false);
  
  const debounceFunction =  debounce(()=>getFindResult(query).then((data)=>{

  if (data.length > 0) {
    if(data.length > 3) {
      data.splice(3, data.length - 3);
    }
    setResults(data);
  } else {
    setResults([]);
  }}))

  useEffect(() => {
    if(query.length >= 3){
      debounceFunction();
    }
  },[query]);

  const roundedCoordinates = useMemo(() => {
    return results.map((result) => {
      return {
        ...result,
        roundedLat: cordround(result.coord.lat, 1000),
        roundedLon: cordround(result.coord.lon, 10000)
      };
    });
  }, [results]);
  
  const getCity = (result) =>()=> {
    setAnimation(true);
    setQuery("");
    setResults([]);

    setTimeout(function() {
      setAnimation(false);
    }, 600);
    let cityId = result.id
    if(cityId){
      props.addCity(cityId);
    }
  };

  return (
    <div className="header__search">
      <input
        className="header__search__input"
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        onFocus={(e)=>setFocus(true)}
      />
      <div className="header__search__div">
        {results.length > 0 ? (
          <ul className="header__search__ul" style={{display:animation?"none":"block"}} >
             {roundedCoordinates.map((result) => (
              <div className="header__search__ul__div" key={result.id} style={{ display: focus ? "block" : "none" }}>
                <li className="header__search__ul-li" onClick={getCity(result)}>
                <p className="header__search__ul__name">
                    <strong>{result.name + ", " + result.sys.country}</strong>
                  </p>
                  <img
                    className="header__search__ul__img"
                    src="./image/Add.svg"
                    alt="add"
                  />
                  <p className="header__search__ul__cord">
                    {result.roundedLat + ", " + result.roundedLon}
                  </p>
                </li>
                {result !== roundedCoordinates[roundedCoordinates.length-1] ? (<div className="header__search__ul__line"></div>):(<></>)}
              </div>
            ))}
          </ul>
        ) : query.length > 0 ? (
          <div className="header__search__not--found" style={{display:focus?"block":"none"}}>
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