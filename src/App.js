import Header from "./components/Header";
import CardCityWeather from "./components/CardCityWeather";
import { useState, useEffect } from "react";

function App() {
  const [cities, setCities] = useState([]);

  function deleteCity(cityId) {
    
    var arr = cities; 
    var index = arr.indexOf(cityId);
    if (index > -1) {
      arr.splice(index, 1);
    }
    setCities([...arr]);
  }

  function addCities(cityId){
    var arr = cities;
    if(arr.indexOf(cityId) == -1) {arr.push(cityId)}
    setCities([...arr]);
  }

  useEffect(() => {
    if(localStorage.getItem("pages") !== null){
      let arr = JSON.parse(localStorage.getItem("pages"));
      setCities([...arr]);
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem("pages", JSON.stringify(cities));
  },[cities]);

  return (
    <div>
      <Header addCity={addCities}></Header>
      <div className="all-cards">
        {cities.map(
          city => 
              <CardCityWeather cityId={city} delCity={deleteCity} key={city}></CardCityWeather>
          )}
      </div>
    </div>
  );
}

export default App;