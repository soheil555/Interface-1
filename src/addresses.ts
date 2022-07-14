export interface Address {
  wETH: string;
  factory: string;
  router: string;
  masterChef: string;
  tokens: Record<string, string>;
}

export type Addresses = Record<number, Address>;

export const addresses: Addresses = {
  // Hardhat
  31337: {
    wETH: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    factory: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    router: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    masterChef: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
    tokens: {
      USDC: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      USDT: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      DAI: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
      wALGO: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
      AXO: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    },
  },
  // Polygon Mainnet
  137: {
    wETH: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    factory: "0x19b5e69b40b43438e69e393A6a808b218d20163B",
    router: "0x37afFEa0f8D0C67b1934889aB074B058248FbdaC",
    masterChef: "0xb29e8dBF18286f6a2722352CE6D0D365AD3D07e0",
    tokens: {
      USDC: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
      USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      AXO: "0xcC4f4795060A1C128EA375EEB9159DD4279F6B56",
    },
  },
};
