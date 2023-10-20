import React, { useState, useEffect } from "react";


async function getFindResult(str) {
  const response = await fetch(`https://openweathermap.org/data/2.5/find?q=${str}&appid=439d4b804bc8187953eb36d2a8c26a02`);
  const data = await response.json();
  return data.list;
}
function debounce(func, delay=300) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}
function FindCardResult(props) {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [animation, setAnimation] = useState(false);
  const [focus,setFocus] = useState(true);
  
  useEffect(() => {
    debounce(()=>getFindResult(query).then((data)=>{
      
    if (data.length > 0) {
      if(data.length > 3){
        data.splice(3, data.length - 3);
      }
      setResults(data);
    } else {
      setResults([]);
    }}))
  },[query]);

  function handleChange(event) {
    setQuery(event.target.value);
  }
  
  window.addEventListener('click', function(event){
    const target = event.target;
    if(!target.closest('.header__search')){
      setFocus(false);
    }else{
      setFocus(true);
    }
  })

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
        onChange={handleChange}
      />
      <div className="header__search__div">
        {results.length > 0 ? (
          <ul className="header__search__ul" style={{display:animation?"none":"block"}} >
            {results.map((result) => (
              <div className="header__search__ul__div" style={{display:focus?"block":"none"}}>
               <li className="header__search__ul-li"  onClick={getCity(result)}>
                  <p className="header__search__ul__name">
                    <strong>{result.name + ", " + result.sys.country}</strong>
                  </p>
                  <img
                    className="header__search__ul__img"
                    src="./image/Add.svg"
                    alt="add"
                  />
                  <p className="header__search__ul__cord">
                    {Math.round(result.coord.lat * 1000) / 1000 +
                      ", " +
                      Math.round(result.coord.lon * 10000) / 10000}
                  </p>
              </li>
                {result !== results[results.length-1] ? (<img className="header__search__ul__line" src="./image/Line.svg" alt="line"></img>):(<></>)}
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