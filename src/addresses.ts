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
      AXO: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    },
  },
};
