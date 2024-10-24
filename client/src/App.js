import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUP from './Pages/SignUp';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUP/>}/>
    </Routes>
    </div>
  );
}

export default App;
