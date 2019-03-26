import React, { Component } from 'react';
import Swal from "sweetalert2";
import { tokenAddress, saleAddress } from '../Config';

class BuyTokens extends Component {

    state = {
        tronWeb: {
            installed: false,
            loggedIn: false
        },
        tokenAddress: tokenAddress,
        TRXAmount: "",
        saleAddress: saleAddress
    };

    constructor(props) {
        super(props);
    }

    onTRXAmountChange = (e) => {
        this.setState({ TRXAmount: e.target.value });
    }

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

            if (!tronWebState.loggedIn) {
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

    onSend = async () => {
        if (this.state.TRXAmount == "") {
            alert("Please TRX amount");
            return;
        }

        try {
            const tokenContract = await window.tronWeb.contract().at(this.state.saleAddress);
            let result = await tokenContract.sale().send({
                feeLimit: 100000000,
                callValue: this.state.TRXAmount * (10 ** 6),
                shouldPollResponse: true
            });

            alert("Transaction was successful")
        } catch (err) {
            alert("Transaction failed!");
        }


    }

    render() {
        return (
            <div style={styles.container}>
                <h1>Buy Tokens from Sale contract</h1>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <label>Enter TRX Amount</label>
                    <input type="text" value={this.state.TRXAmount} onChange={this.onTRXAmountChange} style={{ width: "200px", height: "20px", marginLeft: "20px" }} />
                </div>
                <div style={{ margin: "20px" }}>
                    <button style={{ width: "100px", height: "30px" }} onClick={this.onSend}>Send</button>
                </div>
            </div>
        )
    }
}


const styles = {
    container: {
        border: "1px solid black",
        height: "200px",
        width: "50%",
        marginTop: "50px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
    }
}

export default BuyTokens;