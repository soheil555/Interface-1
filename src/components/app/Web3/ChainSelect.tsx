import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { CHAINS } from "../../../chains";

interface ChainSelectProps {
  switchChain: (chainId: number) => void | undefined;
  chainId: number;
}

const ChainSelect = ({ switchChain, chainId }: ChainSelectProps) => {
  const chainInfo = CHAINS[chainId];

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <>
          <chainInfo.logo mr={2} />
          <Box display={{ base: "none", md: "inline-block" }}>
            {chainInfo.name}
          </Box>
        </>
      </MenuButton>
      <MenuList>
        <MenuGroup title="Select a network">
          {Object.entries(CHAINS).map(([chainId, chainInfo]) => (
            <MenuItem
              icon={<chainInfo.logo />}
              onClick={() => switchChain(Number(chainId))}
            >
              {chainInfo.name}
            </MenuItem>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default ChainSelect;
