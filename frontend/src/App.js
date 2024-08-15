// src/App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from '../src/Redux-Store/store';
import { loadUser } from './actions/userActions';
import './App.css';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import Drawer2 from './components/Drawer2';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (

        <div className="App">
          <Route path="/" component={HomePage} exact />
          <Route path="/chats" component={ChatPage} />
          <Route path="/drawer2" component={Drawer2} /> {/* Add this line */}
          
        </div>
  );
}

export default App;
