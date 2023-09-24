require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

const RPC_POLYGON_TESTNET = process.env.RPC_POLYGON_TESTNET || "https://matic-mumbai.chainstacklabs.com";
const RPC_POLYGON_MAINNET = process.env.RPC_POLYGON_MAINNET || "https://polygon-rpc.com/";

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0x68f1cf2612560c8bf2776ddcfc40f58b2dedfe8da0f0c0563d9cb8fb5e5d9326"; // 0x4b86902E59e79741572aA906f985e6bcEb6b4868
const ACCOUNTS = [DEPLOYER_PRIVATE_KEY];

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        }
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      live: false,
      saveDeployments: false,
      blockConfirmations: 1,
      tags: ["test", "local"],
    },
    localhost: {
      chainId: 80001,
      live: false,
      saveDeployments: false,
      blockConfirmations: 1,
      tags: ["local"]
    },
    polygon_testnet: {
      url: RPC_POLYGON_TESTNET,
      chainId: 80001,
      accounts: ACCOUNTS,
      live: false,
      saveDeployments: true,
      blockConfirmations: 2,
      gasPrice: 7000000000,
      tags: ["test", "polygon", "testnet"]
    },
    polygon_mainnet: {
      url: RPC_POLYGON_MAINNET,
      chainId: 137,
      accounts: ACCOUNTS,
      live: true,
      saveDeployments: true,
      blockConfirmations: 2,
      gasPrice: 150000000000,
      tags: ["test", "polygon", "mainnet", "production"]
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },    
  },
  paths: {
    deploy: './deploy',
    deployments: './deployments',
    imports: './imports',
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};
