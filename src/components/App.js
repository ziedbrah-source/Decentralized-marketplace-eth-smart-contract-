import React, { Component } from "react";
import Web3 from "web3";
import logo from "../logo.png";
import "./App.css";
import Marketplace from "../abis/Marketplace.json";
import Navbar from "./Navbar";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    console.log(window.web3);
    await this.loadBlockchainData();
  }
  async loadWeb3() {
    // there is a good code here https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable(); // // Request account access
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-ethereum browser detected. You shoulder consider trying Metamask. thank you."
      );
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({
      account: accounts[0],
    });
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address // the address of the contract.
      );
    } else {
      window.alert("Marketplace contract not deployed to detected netowrk.");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      productCount: 0,
      products: [],
      loading: true,
    };
  }
  render() {
    return (
      <div>
        <Navbar account={this.state.account}></Navbar>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://www.facebook.com/zied.brah75/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Zieds marketplace</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
