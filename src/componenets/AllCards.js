import { useState, useEffect } from "react";
import MainContent from "./MainContent";

function AllCards(){

    const [citys, setCitys] = useState([]);

    useEffect(() => {
      let arr = JSON.parse(localStorage.getItem("pages"));
      setCitys(arr);
    }, []);

    return(
        <div className="all-cards">
        {citys.map(
          city =>
           <MainContent city={city} key={city}></MainContent>
        )}
      </div>
    )
}
export default AllCards;