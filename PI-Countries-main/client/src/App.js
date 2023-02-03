

//import {getAllCountries, getAllActivities, getAllContinents, loadCountries} from './Redux/.....actions'
import './App.css';
import Landing from './Components/Loading';
import NavBar from './Components/NavBar';
import Home from './Components/Home';


export default function App() {
  

  
  
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

