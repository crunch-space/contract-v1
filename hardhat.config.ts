import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-ethers";

import "dotenv/config";
const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    kaia: {
      url: "https://api-baobab.klaytnscope.com",
      accounts: [String(process.env.PRIVATE_KEY)],
    },
    kairos: {
      chainId: 1001,
      url: "https://public-en.kairos.node.kaia.io",
      accounts: [String(process.env.PRIVATE_KEY)],
    },
  },
  etherscan: {
    apiKey: {
      kairos: "unnecessary",
    },
    customChains: [
      {
        network: "kairos",
        chainId: 1001,
        urls: {
          apiURL: "https://api-baobab.klaytnscope.com/api",
          browserURL: "https://kairos.kaiascope.com",
        },
      },
    ],
  },
};

export default config;
