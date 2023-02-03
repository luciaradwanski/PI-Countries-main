import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, orderCountries } from "../Redux/Actions/Actions";
import style from './Home.modules.css';
import {paginate, cutterPage} from '../Utils/Paginate';
import CardsContainer from "./CardsContainer";
import Filters from "./Filters";
import Pagination from "./Pagination";
import Loading from "./Loading";

export default function Home (){

    const countries = useSelector((state) => state.countriesReducer.countries);
    let modifiedCountries = useSelector(
        (state) => state.countriesReducer.modifiedCountries
    );
    const dispatch = useDispatch();

    /*Paginado*/
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedCountries, setPaginatedCountries] = useState(
    cutterPage(currentPage, 10, modifiedCountries || countries)
    );

    useEffect(() => {
        dispatch(orderCountries());
        dispatch(getActivities());
    }, [dispatch]);

    useEffect(() => {
        setPaginatedCountries(cutterPage(currentPage, 10, modifiedCountries));
    }, [modifiedCountries, currentPage]);
    
    return(
        <div className={style.container}>
            <Filters/>
            <div className={style.container}>
                {paginate(modifiedCountries?.length)?.map((p) => (
                    <Pagination 
                        key={p} 
                        num={p} 
                        setCurrentPage={setCurrentPage}
                    />
                ))}
            </div>
            <div>
                {modifiedCountries?.length ? (
                    <CardsContainer
                        modifiedCountries={
                            paginatedCountries?.length
                            ? paginatedCountries
                            : modifiedCountries
                        }
                    />
                ) : (<Loading error={modifiedCountries.error}/>)}
            </div>
        </div>
    )
}