# Greeter dApp using only hardhat (to deply) and ethers (to retrieve)

## Install dependancies

```
npm i
```

# Settting up dotenv

Create a new file called .env and give it the following with the values being your own

```
PRIVATE_KEY=your_private_key
RINKEBY_URL=your_alchemy_or_infura_endpoint
```

## Deploy the contract

```
npx hardhat run --network rinkeby scripts/sample-script.js
```

## Run the front end

```
cd client
npx http-server
```

# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
