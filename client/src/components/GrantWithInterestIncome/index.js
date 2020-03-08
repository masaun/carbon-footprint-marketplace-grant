import React, { Component } from "react";
import getWeb3, { getGanacheWeb3, Web3 } from "../../utils/getWeb3";

import App from "../../App.js";

import { Typography, Grid, TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../../utils/theme';
import { Loader, Button, Card, Input, Heading, Table, Form, Flex, Box, Image, EthAddress } from 'rimble-ui';
import { zeppelinSolidityHotLoaderOptions } from '../../../config/webpack';

import styles from '../../App.module.scss';
//import './App.css';




export default class GrantWithInterestIncome extends Component {
  constructor(props) {    
    super(props);

    this.state = {
      /////// Default state
      storageValue: 0,
      web3: null,
      accounts: null,
      route: window.location.pathname.replace("/", "")
    };

    this.getTestData = this.getTestData.bind(this);
    this.DaiApprove_ = this.DaiApprove_.bind(this);
    this.rDaiMint_ = this.rDaiMint_.bind(this);
    this.rDaiRedeem_ = this.rDaiRedeem_.bind(this);
    this.rDaiTransfer_ = this.rDaiTransfer_.bind(this);

    this.rDaiRedeemAndTransfer_ = this.rDaiRedeemAndTransfer_.bind(this);
    this.rDaiPayInterest_ = this.rDaiPayInterest_.bind(this);

    this.rDaiBalanceOf_ = this.rDaiBalanceOf_.bind(this);
    this.rDaiTotalSupply_ = this.rDaiTotalSupply_.bind(this);
  }


  getTestData = async () => {
      const { accounts, marketplace_registry, web3 } = this.state;

      let response_1 = await marketplace_registry.methods.testFunc().send({ from: accounts[0] })
      console.log('=== response of testFunc() function ===', response_1);
  }

  DaiApprove_ = async () => {
      const { accounts, grant_with_interest_income, web3 } = this.state;
      const _amount = 10000000000

      let response = await grant_with_interest_income.methods.DaiApprove(_amount).send({ from: accounts[0] })
      console.log('=== response of DaiApprove() function ===', response);  
  } 

  rDaiMint_ = async () => {
      const { accounts, grant_with_interest_income, web3 } = this.state;
      const _mintAmount = 10000000000

      let response = await grant_with_interest_income.methods.rDaiMint(_mintAmount).send({ from: accounts[0] })
      console.log('=== response of rDaiMint() function ===', response);
  }

  rDaiTransfer_ = async () => {
      const { accounts, grant_with_interest_income, web3 } = this.state;
      const _dst = accounts[0]
      const _amount = 10000000000

      let response = await grant_with_interest_income.methods.rDaiTransfer(_dst, _amount).send({ from: accounts[0] })
      console.log('=== response of rDaiTransfer() function ===', response);
  }

  rDaiRedeem_ = async () => {
      const { accounts, grant_with_interest_income, web3 } = this.state;
      const _redeemTokens = 10000000000

      let response = await grant_with_interest_income.methods.rDaiRedeem(_redeemTokens).send({ from: accounts[0] })
      console.log('=== response of rDaiRedeem() function ===', response);
  }


  rDaiBalanceOf_ = async () => {
      const { accounts, grant_with_interest_income, web3 } = this.state;

      //const _owner = accounts[0]
      const _owner = "0xd059e0c36d0AfecB2e7A60481DD58A16B0e40081"
      let response = await grant_with_interest_income.methods.rDaiBalanceOf(_owner).call();

      console.log('=== response of rDaiBalanceOf() function ===', response);
  }

  rDaiTotalSupply_ = async () => {
      const { accounts, grant_with_interest_income, web3 } = this.state;
      let response = await grant_with_interest_income.methods.rDaiTotalSupply().call();
      console.log('=== response of rDaiTotalSupply() function ===', response);
  }



  rDaiRedeemAndTransfer_ = async () => {
      const { accounts, grant_with_interest_income, web3 } = this.state;
      //const _redeemTo = accounts[0]
      const _redeemTo = '0x718E3ea0B8C2911C5e54Cb4b9B2075fdd87B55a7'
      const _redeemTokens = 10

      let response = await grant_with_interest_income.methods.rDaiRedeemAndTransfer(_redeemTo, _redeemTokens).send({ from: accounts[0] })
      console.log('=== response of rDaiRedeemAndTransfer() function ===', response);
  }
  
  rDaiPayInterest_ = async () => {
      const { accounts, grant_with_interest_income, web3 } = this.state;
      const _owner = accounts[0]

      let response = await grant_with_interest_income.methods.rDaiPayInterest(_owner).send({ from: accounts[0] })
      console.log('=== response of rDaiPayInterest() function ===', response);
  }










  //////////////////////////////////// 
  ///// Refresh Values
  ////////////////////////////////////
  refreshValues = (instanceGrantWithInterestIncome, instanceMarketplaceRegistry) => {
    if (instanceGrantWithInterestIncome) {
      console.log('refreshValues of instanceGrantWithInterestIncome');
    }
    if (instanceMarketplaceRegistry) {
      console.log('refreshValues of instanceMarketplaceRegistry');
    }
  }


  //////////////////////////////////// 
  ///// Ganache
  ////////////////////////////////////
  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }

  componentDidMount = async () => {
    const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled;
 
    let GrantWithInterestIncome = {};
    let MarketplaceRegistry = {};
    try {
      GrantWithInterestIncome = require("../../../../build/contracts/GrantWithInterestIncome.json"); // Load ABI of contract of GrantWithInterestIncome
      MarketplaceRegistry = require("../../../../build/contracts/MarketplaceRegistry.json");          // Load artifact-file of MarketplaceRegistry
    } catch (e) {
      console.log(e);
    }

    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        let ganacheAccounts = [];

        try {
          ganacheAccounts = await this.getGanacheAddresses();
        } catch (e) {
          console.log('Ganache is not running');
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]): web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');

        let instanceGrantWithInterestIncome = null;
        let instanceMarketplaceRegistry = null;
        let deployedNetwork = null;

        // Create instance of contracts
        if (GrantWithInterestIncome.networks) {
          deployedNetwork = GrantWithInterestIncome.networks[networkId.toString()];
          console.log('=== deployedNetwork ===', deployedNetwork);
          if (deployedNetwork) {
            instanceGrantWithInterestIncome = new web3.eth.Contract(
              GrantWithInterestIncome.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceGrantWithInterestIncome ===', instanceGrantWithInterestIncome);
          }
        }

        if (MarketplaceRegistry.networks) {
          deployedNetwork = MarketplaceRegistry.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceMarketplaceRegistry = new web3.eth.Contract(
              MarketplaceRegistry.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceMarketplaceRegistry ===', instanceMarketplaceRegistry);
          }
        }

        if (GrantWithInterestIncome || MarketplaceRegistry) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ 
            web3, 
            ganacheAccounts, 
            accounts, 
            balance, 
            networkId, 
            networkType, 
            hotLoaderDisabled,
            isMetaMask, 
            grant_with_interest_income: instanceGrantWithInterestIncome,
            marketplace_registry: instanceMarketplaceRegistry
          }, () => {
            this.refreshValues(
              instanceGrantWithInterestIncome,
              instanceMarketplaceRegistry
            );
            setInterval(() => {
              this.refreshValues(instanceMarketplaceRegistry, instanceMarketplaceRegistry);
            }, 5000);
          });
        }
        else {
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled, isMetaMask });
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }



  render() {
    return (

      <div className={styles.widgets}>
        <Grid container style={{ marginTop: 32 }}>
          <Grid item xs={12}>

            <h4>※※※ [Notice]: Using Kovan testnet ※※※</h4> <br />

            <Card width={"auto"} 
                  maxWidth={"420px"} 
                  mx={"auto"} 
                  my={5} 
                  p={20} 
                  borderColor={"#E8E8E8"}
            >
              <h4>Grant With Interest Income</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="100%"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <Button size={'small'} mt={3} mb={2} onClick={this.getTestData}> Get TestData </Button> <br />

              <Button size={'small'} mt={3} mb={2} onClick={this.DaiApprove_}> Dai Approve </Button> <br />

              <Button size={'small'} mt={3} mb={2} onClick={this.rDaiMint_}> rDai Mint </Button> <br />

              <Button size={'small'} mt={3} mb={2} onClick={this.rDaiRedeem_}> rDai Redeem </Button> <br />

              <Button size={'small'} mt={3} mb={2} onClick={this.rDaiTransfer_}> rDai Transfer </Button> <br />

              <hr />

              <Button size={'small'} mt={3} mb={2} onClick={this.rDaiRedeemAndTransfer_}> rDai Redeem And Transfer </Button> <br />

              <Button size={'small'} mt={3} mb={2} onClick={this.rDaiPayInterest_}> rDai Pay Interest </Button> <br />

              <hr />

              <Button size={'small'} mt={3} mb={2} onClick={this.rDaiBalanceOf_}> rDai BalanceOf </Button> <br />

              <Button size={'small'} mt={3} mb={2} onClick={this.rDaiTotalSupply_}> rDai TotalSupply </Button> <br />
            </Card>
          </Grid>

          <Grid item xs={4}>
          </Grid>

          <Grid item xs={4}>
          </Grid>
        </Grid>
      </div>
    );
  }

}
