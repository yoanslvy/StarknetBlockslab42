require("@shardlabs/starknet-hardhat-plugin");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  starknet: {
    network: "develop",
    dockerizedVersion: "0.8.1",
  },
  networks: {
    develop: {
      url: "http://127.0.0.1:5050",
    },
  },
  cairo: {
    version: "0.6.2",
  },
  paths: {
    // Where are our contracts: ./contracts
    starknetSources: /* __dirname */ "/Desktop/SBT-Cairo-Piyolu" + "/src",
    // Where are our artifacts (build contract): ./stark-artifacts, not use repository "artifacts" which is reserved by hardhat to solidity
    starknetArtifacts:
      /* __dirname */ "/Desktop/SBT-Cairo-Piyolu" + "/stark-artifacts",
    tests: "./tests",
  },
  mocha: {
    starknetNetwork: "develop",
  },
};
