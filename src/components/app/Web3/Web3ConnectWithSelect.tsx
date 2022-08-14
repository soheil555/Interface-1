import {
  HStack,
  Button,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { useCallback, useEffect, useState } from "react";
import { CHAINS, getAddChainParameters } from "../../../chains";
import { shortenAddress } from "../../../utils";
import ChainSelect from "./ChainSelect";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BiExit } from "react-icons/bi";

interface Web3ConnectWithSelectProps {
  connector: MetaMask;
  chainId: ReturnType<Web3ReactHooks["useChainId"]>;
  isActivating: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActivate: ReturnType<Web3ReactHooks["useIsActive"]>;
  account: ReturnType<Web3ReactHooks["useAccount"]>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
}

const Web3ConnectWithSelect = ({
  connector,
  chainId,
  isActivate,
  isActivating,
  account,
  error,
  setError,
}: Web3ConnectWithSelectProps) => {
  const toast = useToast();
  const [desiredChainId, setDesiredChainId] = useState(137);
  const chainIds = Object.keys(CHAINS).map((chainId) => Number(chainId));

  useEffect(() => {
    if (chainId) {
      if (chainIds.includes(chainId)) {
        setDesiredChainId(chainId);
      } else {
        void connector.deactivate();
      }
    }
  }, [chainId]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error]);

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);

      // if we're aleready on the desired chain, don't do anything
      if (desiredChainId === chainId) return;

      connector
        .activate(
          desiredChainId === -1
            ? undefined
            : getAddChainParameters(desiredChainId)
        )
        .then(() => setError(undefined))
        .catch(setError);
    },
    [connector, chainId, setError]
  );

  const onClick = useCallback(() => {
    setError(undefined);
    connector
      .activate(
        desiredChainId === -1
          ? undefined
          : getAddChainParameters(desiredChainId)
      )
      .then(() => {
        setError(undefined);
      })
      .catch(setError);
  }, [connector, desiredChainId, setError]);

  if (isActivate && account) {
    return (
      <HStack>
        <ChainSelect chainId={desiredChainId} switchChain={switchChain} />

        <Menu>
          <MenuButton
            fontSize={{ base: "sm", lg: "md" }}
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="brand-2"
          >
            {shortenAddress(account)}
          </MenuButton>
          <MenuList fontSize="xl">
            <MenuItem
              onClick={() => {
                connector.deactivate();
              }}
              icon={<BiExit />}
            >
              Disconnect
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    );
  }

  return (
    <HStack>
      <ChainSelect chainId={desiredChainId} switchChain={switchChain} />
      <Button variant="brand-2" isLoading={isActivating} onClick={onClick}>
        Connect Wallet
      </Button>
    </HStack>
  );
};

export default Web3ConnectWithSelect;
