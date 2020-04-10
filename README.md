# Carbon Footprint Marketplace Grant

***
## 【Introduction of Carbon Footprint Marketplace Grant】
- This is a dApp of solution for issue of carbon footprint by utilizing rDAI（rtoken-contract）.
- This dApp aim for creating new cycle (circulation) of `re-using CO2`.

<br>

## 【How does this dApp works for creating new cycle (circulation) of re-using CO2 ?】
- This dApp works as `Grant Platform` for companies which reserch or create solution by re-using CO2 .
    - Target companies of grant is like e-gas project by Audi below.  
      https://www.audi-technology-portal.de/en/mobility-for-the-future/audi-future-lab-mobility_en/audi-future-energies_en/audi-e-gas_en
    - Grant by using rDAI (=Grant with `intererst income which is generated from "rDAI"` )
        - people who has interest about CO2 issue by grant with interest income.

<br>

- This dApp also works as `MarketPlace` for buy/sell `rights of CO2 emission` .
    - Users can buy/sell `rights of CO2 emission` on the platform.
    - Two users who buy/sell this platform are here:
        - Seller： Provider who has rights of CO2 emission. (Company or Individual)
        - Buyer： Company/Organization/Institution which has demand to utilize CO2.
            
    - For example of Buyer above
        - `e-gas` project by Audi
            - Their project attempt to `"generate synthetic natural gas from CO₂"` and renewable electricity.  
                https://www.audi-technology-portal.de/en/mobility-for-the-future/audi-future-lab-mobility_en/audi-future-energies_en/audi-e-gas_en

<br>

## 【Implemention】
- Implemention is in progress. 



&nbsp;

***

## 【Setup】
### Setup wallet by using Metamask
1. Add MetaMask to browser (Chrome or FireFox or Opera or Brave)    
https://metamask.io/  


2. Adjust appropriate newwork below 
```
Ropsten Test Network
```

&nbsp;


### Setup backend
1. Deploy contracts to Kovan Test Network
```
(root directory)

$ npm run migrate:kovan
```

&nbsp;


### Setup frontend
1. Execute command below in root directory.
```
$ npm run client
```

2. Access to browser by using link 
```
http://127.0.0.1:3000
```

&nbsp;


***

## 【References】  
- `e-gas` project by Audi        
    https://www.audi-technology-portal.de/en/mobility-for-the-future/audi-future-lab-mobility_en/audi-future-energies_en/audi-e-gas_en

<br>


- [rDAI]  
  - [Use Case]
    https://app.rdai.money
    https://rtrees.dappy.dev
    https://highpriests.rdai.money

  - [rDAI / Tutorial]
    - rDAI Basics: A Tutorial on Programming Interest with DeFi  
      https://medium.com/@victorrortvedt/rdai-basics-a-tutorial-on-programming-interest-with-defi-458baab9477a

  - rtoken-contracts：  
    https://github.com/rtoken-project/rtoken-contracts 

  - rDAI explorer：  
    https://explorer.rdai.money

  - Video of rDAI with eth.build  
    https://www.youtube.com/watch?v=nEC2kadoLms


