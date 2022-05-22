import React, { Component } from 'react';
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
import "react-toastify/dist/ReactToastify.css";
import "./Main.css"
import MovieClub from './views/MovieClub';

export default class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  handleUpdateUser = async (username, password) => {
    await auth.logout()
    await auth.login(username, password)
    window.location = `/editUser/${this.state.user._id}`
    toast.success('User updated.')
  }

  render() {
    return (
      <div>
        <header>
          <ToastContainer hideProgressBar='true' autoClose={2500}/>
          <Header user={this.state.user}/>
        </header>
        <main className='page-container'>
            <div className="main-container">
              <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/editUser/:id" render={props => <EditUser user={this.state.user} onUpdateUser={this.handleUpdateUser} {...props}/>} />
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
}