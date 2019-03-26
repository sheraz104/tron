import React, { Component } from "react";
import Swal from "sweetalert2";
import TronWeb from 'tronweb';

import logo from "./logo.svg";
import "./App.css";
import SendToken from "./Components/SendTokens";
import BuyTokens from "./Components/BuyTokens";
import Balances from './Components/Balances';
import TokenInfo from './Components/TokenInfo';

class App extends Component {

  render() {
    return (
      <div className="App" style={styles.container}>   
          <h2>Tarush Airdrop</h2> 
          <Balances />   
          <SendToken />
          <BuyTokens />
          <TokenInfo />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C0C0C0	",
    paddingBottom: "100px",
    paddingTop: "100px"
  }
}

export default App;
