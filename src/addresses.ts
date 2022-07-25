export interface Address {
  factory: string;
  router: string;
  masterChef: string;
  tokens: Record<string, string>;
}

export type Addresses = Record<number, Address>;

export const addresses: Addresses = {
  // Polygon Mainnet
  137: {
    factory: "0x83Dc6D7040D671F7b75756eA5Eb9249b9ACe35A3",
    router: "0x7A83B60B26b9f2d487fce6C253578a5217161F74",
    masterChef: "0x84A65dBdc019499bbC45A113eC5fAA75C797b59F",
    tokens: {
      USDC: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      AXO: "0xEBA605064104b2e2A6171e31bE9cD03a04575CAe",
      Xolotl: "0xB7EEB0398511255124fB2fBc5cc95eF06C14844F",
      wMATIC: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      MATIC: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      wEth: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      AAVE: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
      DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      LINK: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
    },
  },
  //Hardhat
  // 31337: {
  //   factory: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  //   router: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  //   masterChef: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
  //   tokens: {
  //     USDC: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
  //     USDT: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  //     AXO: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
  //     Xolotl: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
  //     wMATIC: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  //     MATIC: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  //     DAI: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  //   },
  // },
};
