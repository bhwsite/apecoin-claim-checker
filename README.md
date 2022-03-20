# Apecoin Claimable Tokens Checker


This repository contains the open-source code of the checker I have been using for constantly checking the unclaimed NFT assets which on sale in the OpenSea for profit.		

![](https://i.snipboard.io/Nkf1hn.jpg)

### About ApeCoin

> Tokens will be allocated to BAYC/MAYC members via the [claim
> page](https://apecoin.com/claim) starting on March 17, 2022 at 8:30AM
> ET.


# Usage
### Requirements:
- [Node.js (nodejs.org)](https://nodejs.org/en/) (v14 and above)		

If you don't have the Node.js on your computer, install it from the official website and make sure it is either v14 or above for compatibility. 
After the installation you can check if it is installed correctly by opening up a new console window and type **`node -v`**

## Installation

Download the repository on your local drive. Open up a new console window and navigate to project directory. Then run the command below to install dependencies of the project:     

**`npm install`**


## Run

First of all, you need to query all NFT assets by their id against airdrop contract to check whether they claimed their free tokens or not. On the console, run:        

**`node index.js`**		

Program will start checking all NFT #s and you can check the process real-time on the console. It will also produce a **claims.csv** file containing the results to be used to check on OpenSea on the next step.

## Check Unclaimed NFTs on OpenSea
![](https://i.snipboard.io/2IRNyG.jpg)

After you completed the first step and generated **claims.csv** file. You can run OpenSea checker to find if there is any of the NFTs for sale right now with unclaimed ApeCoin balances. There is 3 different file for each collection, Bored Ape Yacht Club (bayc), Mutant Ape Yacht Club and Bored Ape Kennel Club (bakc). For example if you want to check bakc assets on OpenSea, run:     

`node opensea_bakc.js`

If you are lucky you can catch an NFT.

### What is this, how to make profits?
If you are lucky to catch an NFT with unclaimed ApeCoin balance for a reasonable price, you can buy it and claim it's tokens, then you can sell the NFT for around the same price you bought. 


#### Donations
ETH: `0x627dd4ff3F109C934cAbD1CAd486b1e65f142c7A`