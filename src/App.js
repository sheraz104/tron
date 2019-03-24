import React, { Component } from "react";
import Swal from "sweetalert2";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    tronWeb: {
      installed: false,
      loggedIn: false
    }
  };

  componentDidMount() {
    
    setTimeout(() => {
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };

      if (!tronWebState.installed) {
        Swal.fire(
          "Oops...",
          "You do not have Tronlink chrome extension installed!",
          "error"
        );
        return;
      }
      
      if(!tronWebState.loggedIn) {
        Swal.fire(
          "Oops...",
          "Please log in to the Tronlink extension",
          "error"
        );
        return;
      }

      this.setState({
        tronWeb: tronWebState
      });
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
