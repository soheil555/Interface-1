import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button,
  Box,
  useColorModeValue,
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
      <MenuButton
        fontSize={{ base: "sm", lg: "md" }}
        as={Button}
        variant="outline"
        color={useColorModeValue("gray.900", "white")}
        rightIcon={<ChevronDownIcon />}
      >
        <>
          <chainInfo.logo mr={2} />
          <Box display="inline-block">{chainInfo.name}</Box>
        </>
      </MenuButton>
      <MenuList>
        <MenuGroup title="Select a network">
          {Object.entries(CHAINS).map(([chainId, chainInfo]) => (
            <MenuItem
              key={chainInfo.name}
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
