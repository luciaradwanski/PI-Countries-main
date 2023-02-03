import { useEffect } from 'react';
import useDispatch from 'react-redux';

//import {getAllCountries, getAllActivities, getAllContinents, loadCountries} from './Redux/.....actions'
import './App.css';
import Landing from './Components/Loading';
import NavBar from './Components/NavBar';
import Home from './Components/Home';


export default function App() {
  const dispatch = useDispatch();

  const handleGet =  async() => {
    //await dispatch(getAllCountries());
    //dispatch(getAllActivities());
    //dispatch(getAllContinents());
    //dispatch(loadCountries());
  }

  useEffect(() => {
    handleGet();
  })
  
  return (
    <div className="App">
      <h1>Henry Countries</h1>
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route path='/home' 
          element={<div><NavBar/><Home/></div>}>
        </Route>
        <Route path='/home/country/' 
          element={<div><NavBar/><CountryDetail/></div>}>
        </Route>
        <Route path='/create/' 
          element={<div><NavBar/><CreateForm/></div>}>
        </Route>
      </Routes>
    </div>
  );
}

