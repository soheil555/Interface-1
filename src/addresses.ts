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
    },
  },
};
