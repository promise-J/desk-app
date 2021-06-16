import './App.css';
import SideBar from './component/SideBar';
import Login from './component/Login';
import Chat from './component/Chat';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import { useState } from 'react';
import { useStateValue } from './StateProvider';


function App() {

  const [{user}, dispatch] = useStateValue()


  return   (
    <div className="App">
      {
        user ? (
          <div className='app_body'>
          <Router>
            <SideBar />
             <Switch>
              <Route path='/rooms/:roomId'>
                <Chat />
             </Route>
             <Route path='/'>
                <Chat />
              </Route>
             </Switch>
          </Router>
      </div>
        ) : (
          <Login />
        )
      }
    </div>
  )
}

export default App;
