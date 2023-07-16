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

```bash
npx hardhat run scripts/deploy.js --network <network>
```
