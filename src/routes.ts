import type { IconType } from "react-icons";
import { IoLogoGithub } from "react-icons/io5";
import { IoSwapVertical } from "react-icons/io5";
import { GiCancer } from "react-icons/gi";
import { GiWaveCrest } from "react-icons/gi";
import { GiHarpoonChain } from "react-icons/gi";

interface Route {
  label: string;
  href: string;
  isExternal: boolean;
  icon?: IconType;
}

export const homeRoutes: Route[] = [
  {
    label: "Documentation",
    href: "https://docs.axoswap.io",
    isExternal: true,
  },
  {
    label: "Community",
    href: "https://discord.gg/PJr44AxWAt",
    isExternal: true,
  },
  {
    label: "Github",
    href: "https://github.com/Axoswap-Polygon",
    icon: IoLogoGithub,
    isExternal: true,
  },
];

export const appRoutes: Route[] = [
  {
    href: "/app/swap",
    label: "Swap",
    icon: IoSwapVertical,
    isExternal: false,
  },
  {
    href: "/app/liquid",
    label: "Liquidity",
    icon: GiCancer,
    isExternal: false,
  },
  {
    href: "/app/pool",
    label: "Pool",
    icon: GiWaveCrest,
    isExternal: false,
  },
  {
    href: "/app/stake",
    label: "Stake",
    icon: GiHarpoonChain,
    isExternal: false,
  },
];
