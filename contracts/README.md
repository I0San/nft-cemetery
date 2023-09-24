# NFT Cemetery Contracts

The main contract for burrying NFTs. 

The user has to approve the "burryMyToken" (safeTransferFrom function) and the contract sends it to the address(1), which is a dead address (ERC721 does not allow sending to zero address).

The contract creates a new Grave with the Incription (limited to 20 characters), BlockNumber of death, token info and owner info and there is a public getter to retrieve the Graves on the Graveyard.

The repo also includes MockNFT contract for testing purposes.


## Install dependencies

```bash
yarn install
```

## Compile contracts

```bash
npx hardhat compile
```

## Run tests

```bash
npx hardhat test
```

## Development

```bash
npx hardhat node
```

## Deploy contracts

## Before deploy
1. Create `.env` file in root folder or copy and check `.env.sexample`

### [Deploy parameters](https://github.com/wighawag/hardhat-deploy#1-hardhat-deploy)

## Deploy on hardhat local network
```shell
npx hardhat deploy
```

## Deploy on Polygon Testnet, generate deployment files
```shell
npx hardhat deploy --write true --network polygon_testnet
```

## Deploy on Polygon Mainnet, generate deployment files
```shell
npx hardhat deploy --write true --network polygon_mainnet
```

## Run custom setup script
```shell
npx hardhat run scripts/setup.js --network <network>
```