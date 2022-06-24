import React, { useState, useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'

import Header from './components/layout/Header';
import Logout from './components/user/Logout';
import auth from './services/authService'
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Footer from './components/layout/Footer';
import EditUser from './views/EditUser';
import MovieClub from './views/MovieClub';

import "react-toastify/dist/ReactToastify.css";
import "./Main.css"

function App() {
  const [user, setUser] = useState()

  useEffect(()=> {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, [])

  const handleUpdateUser = async (username, password) => {
    await auth.logout()
    await auth.login(username, password)
    window.location = `/editUser/${user._id}`
    toast.success('User updated.')
  }

  return (
    <div>
      <header>
        <ToastContainer hideProgressBar='true' autoClose={2500}/>
        <Header user={user}/>
      </header>
      <main className='page-container'>
          <div className="main-container">
            <Switch>
                  <Route exact path="/" render={() => <Home />} />
                  <Route exact path="/editUser/:id" render={props => <EditUser user={user} onUpdateUser={handleUpdateUser} {...props}/>} />
                  <Route exact path="/login" render={props => <Login {...props}/>} />
                  <Route exact path="/logout" render={() => <Logout />} />
                  <Route exact path="/movieClub" render={() => <MovieClub />} />
                  <Route exact path="/register" render={props => <Register {...props}/>} />
            </Switch>
          </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App