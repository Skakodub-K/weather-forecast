
import AllCards from "./componenets/AllCards";
import Header from "./componenets/Header";
import { useState } from "react";
function App() {
  const [cities, setCities] = useState([]);

  return (
    <div>
      <Header arrCities={cities} addCities={setCities}></Header>
      <AllCards arrayCities={cities} SetCities={setCities}></AllCards>
    </div>
  );
}

export default App;