import MainContent from "./MainContent";

function AllCards(props){

    return(
        <div className="all-cards">
        {props.arrayCities.map(
          city =>
           <MainContent arrayCities={props.arrayCities} SetCities={props.SetCities} city={city} key={city}></MainContent>
        )}
      </div>
    )
}
export default AllCards;