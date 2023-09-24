const { ethers } = require("hardhat");
const hre = require("hardhat");

let deployerSigner;
let mockNftDeployerInstance;

async function getContractAddress(contractName) {
    let contractAddress = ethers.ZeroAddress;
    try {
        let tokenInstance = await deployments.get(contractName);
        if (tokenInstance) {
            console.log(`Contract ${contractName} found at ${tokenInstance.address}`);
            contractAddress = tokenInstance.address;
        }
    } catch (e) {}
    return contractAddress;
}

async function init() {
    const { deployer } = await hre.getNamedAccounts();

    deployerSigner = await ethers.getSigner(deployer);
    const mockNftContractName = "MockNFT";

    let mockNftAddress = await getContractAddress(mockNftContractName);
    mockNftDeployerInstance = await ethers.getContractAt(mockNftContractName, mockNftAddress, deployerSigner);
}

async function mockNftMint() {
    console.log("Minting MockNFTs...");
    await mockNftDeployerInstance.mint(deployerSigner.address);
    await mockNftDeployerInstance.mint(deployerSigner.address);
    await mockNftDeployerInstance.mint(deployerSigner.address);
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
