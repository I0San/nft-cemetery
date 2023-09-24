const { ethers, network } = require("hardhat");
const { utils } = require("ethers");
const hre = require("hardhat");
const confirmations = network.config.blockConfirmations || 1;

let deployerSigner;

let mockNftAddress;
let nftCemeteryAddress;

let mockNftDeployerInstance;
let nftCemeteryDeployerInstance;

function getContractAddress(contractName) {
    let contractAddress = ethers.ZeroAddress;
    try {
        let tokenInstance = await deployments.get(contractName);
        if (tokenInstance) {
            contractAddress = tokenInstance.address;
        }
    } catch (e) {}
    return contractAddress;
}

async function init() {
    const { deployer } = await hre.getNamedAccounts();

    deployerSigner = await ethers.getSigner(deployer);
    let mockNftContractName = "MockNFT";
    let nftCemeteryContractName = "NFTCemetery";

    let mockNftAddress = getContractAddress(mockNftContractName);
    mockNftDeployerInstance = await ethers.getContractAt(mockNftContractName, mockNftAddress, deployerSigner);

    let nftCemeteryAddress = getContractAddress(nftCemeteryContractName);
    nftCemeteryDeployerInstance = await ethers.getContractAt(nftCemeteryContractName, nftCemeteryAddress, deployerSigner);
}

async function mockNftMint() {
    console.log("Minting MockNFTs...");
    await mockNftDeployerInstance.mint(deployerSigner.address);
    await mockNftDeployerInstance.mint(deployerSigner.address);
    await mockNftDeployerInstance.mint(deployerSigner.address);
    // await mockNftDeployerInstance.mint(deployerSigner.address);
    // await mockNftDeployerInstance.mint(deployerSigner.address);
    console.log("Done.");
}

async function main() {    
    await init();

    mockNftMint();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
