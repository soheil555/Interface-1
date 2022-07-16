export interface Address {
  factory: string;
  router: string;
  masterChef: string;
  tokens: Record<string, string>;
}

export type Addresses = Record<number, Address>;

export const addresses: Addresses = {
  // Hardhat
  31337: {
    factory: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    router: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    masterChef: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
    tokens: {
      USDC: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      USDT: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      DAI: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
      AXO: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
      wMATIC: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
  },
  // Polygon Mainnet
  137: {
    factory: "0x19b5e69b40b43438e69e393A6a808b218d20163B",
    router: "0x37afFEa0f8D0C67b1934889aB074B058248FbdaC",
    masterChef: "0xb29e8dBF18286f6a2722352CE6D0D365AD3D07e0",
    tokens: {
      USDC: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      AXO: "0xcC4f4795060A1C128EA375EEB9159DD4279F6B56",
      wMATIC: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    },
  },
  // Polygon Mumbai
  80001: {
    factory: "0x19b5e69b40b43438e69e393A6a808b218d20163B",
    router: "0x37afFEa0f8D0C67b1934889aB074B058248FbdaC",
    masterChef: "0xb29e8dBF18286f6a2722352CE6D0D365AD3D07e0",
    tokens: {
      USDC: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747",
      USDT: "0xA02f6adc7926efeBBd59Fd43A84f4E0c0c91e832",
      AXO: "0xcC4f4795060A1C128EA375EEB9159DD4279F6B56",
      wMATIC: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
    },
  },
};
