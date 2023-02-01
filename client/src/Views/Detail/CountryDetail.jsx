export default function CountryDetail({flags, name, id, continent, subregion, capital, area, population}){
    return(
        <div >
                <img src={flags} alt={flags}/>
                <h1>{name}</h1>
                <h2>{continent}</h2>
                <h3>{id}</h3>                                                          
                <h3>Subregion: {subregion}</h3>
                <h3>Capital: {capital}</h3>
                <h3>Area: {area} km2</h3>
                <h3>Población: {population} personas</h3>                  
        </div>
    );
}