import Header from "./componenets/Header";
import CardCityWeather from "./componenets/CardCityWeather";
import { useState, useEffect } from "react";

function App() {
  const [cities, setCities] = useState([]);

  function deleteCity(cityId){
    var arr = JSON.parse(localStorage.getItem("pages"));
    for( var i = 0; i < arr.length; i++){
      if(cityId === arr[i]){
        arr.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("pages", JSON.stringify(arr));
    setCities([...arr]); 
  }
  function addCities(cityId){
    var arr = JSON.parse(localStorage.getItem("pages"));
    var isAdd = true;
    for( var i = 0; i < arr.length; i++){
      if(cityId === arr[i]){
        isAdd=false;
        break;
      }
    }
    if(isAdd){
      arr.push(cityId);
    }
    localStorage.setItem("pages", JSON.stringify(arr));
    setCities([...arr]);
  }

  useEffect(() => {
    let arr = JSON.parse(localStorage.getItem("pages"));
    setCities([...arr]);
  }, []);

  return (
    <div>
      <Header addCity={addCities}></Header>
      <div className="all-cards">
        {cities.map(
          city =>
           <CardCityWeather cityId={city} delCity={deleteCity}></CardCityWeather>
        )}
      </div>
    </div>
  );
}

export default App;