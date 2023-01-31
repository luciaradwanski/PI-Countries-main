import LandingPage from './Views/LandingPage/LandingPage';
import Home from './Views/Home/Home';

import Form from './Views/ActivityCreate/ActivityCreate';
import NavBar from './Components/NavBar/NavBar';
import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import Detail from './Views/Detail/Detail';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      { location.pathname !== "/" && <NavBar/>}
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/countries/countries/:id" element={<Detail/>}/>
        <Route path="/create" element={<Form/>}/>
      </Routes>
    </div>
  );
}


export default App;