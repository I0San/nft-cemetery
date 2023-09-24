require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      live: false,
      blockConfirmations: 1,
      tags: ["test", "local"],
    },
    localhost: {
        live: false,
        blockConfirmations: 1,
        tags: ["local"]
    },
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/A_BOCgg40_7Lk1RHtTJGghIZ2GgFK9Gl",
      blockConfirmations: 2,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    },
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/QrgcKm7z0lctxCcd4kizVW-K9dte3Ah5",
      blockConfirmations: 2,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    }
  }
};
