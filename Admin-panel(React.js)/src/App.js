import Home from './pages/home/Home.js';
import Menus from './pages/menus/Menus.js';
import NewMenu from './pages/menus/newMenu/NewMenu.js'
import UpdateMenu from './pages/menus/updateMenu/UpdateMenu.js';
import Orders from './pages/orders/Orders.js';
import Users from './pages/users/Users';
import Login from './pages/login/Login.js';
import Logout from './pages/login/Logout.js';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { useState } from 'react';



  const getToken = () => {
    const token = localStorage.getItem('token');
    return token;
  }
  



function App() {
  const userToken = getToken();
  const [token, setToken] = useState(userToken);
  
  const {darkMode} = useContext(DarkModeContext);

  if(!token) {
    return <Login setToken={setToken} />
  }

  


  // if(!user){
  //   return <Login />

  // }

  
  return (
    <div className={darkMode ? "app dark":"app"}>
      <BrowserRouter> 
      <Routes>
      <Route path='/' >
          <Route index element={<Home />} />
          <Route path='/logout' element={<Logout setToken={setToken} />} />
          
          
          
          <Route path='menus'>
            <Route index element={<Menus />} />
            <Route path=":id" element={<UpdateMenu />} />
            <Route path="new" element={<NewMenu />} />
          </Route>
          <Route path='orders'>
            <Route index element={<Orders />} />
          </Route>
          <Route path='users'>
            <Route index element={<Users />}/>
          </Route>
          
        </Route>
  
        

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
