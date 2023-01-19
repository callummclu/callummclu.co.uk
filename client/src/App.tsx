import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import useAuth from './hooks/useAuth';
import { Home } from './pages/home';
import { Error } from './pages/error';
import {BiError} from 'react-icons/bi'

function App() {

  const { loggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error code={404} message="Page not found." icon={<BiError size={80}/>}/>}/>
        <Route path="" element={loggedIn ? <Home/> :<Login/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
