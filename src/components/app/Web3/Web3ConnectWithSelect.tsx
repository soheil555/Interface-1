import {
  HStack,
  Button,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
} from '@chakra-ui/react'
import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import { useCallback, useEffect, useState } from 'react'
import { CHAINS, getAddChainParameters } from '../../../chains'
import { shortenAddress } from '../../../utils'
import ChainSelect from './ChainSelect'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { BiExit } from 'react-icons/bi'

interface Web3ConnectWithSelectProps {
  connector: MetaMask
  chainId: ReturnType<Web3ReactHooks['useChainId']>
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  isActivate: ReturnType<Web3ReactHooks['useIsActive']>
  account: ReturnType<Web3ReactHooks['useAccount']>
  error: Error | undefined
  setError: (error: Error | undefined) => void
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
  const toast = useToast()
  const [desiredChainId, setDesiredChainId] = useState(137)
  const chainIds = Object.keys(CHAINS).map((chainId) => Number(chainId))

  useEffect(() => {
    if (chainId) {
      if (chainIds.includes(chainId)) {
        setDesiredChainId(chainId)
      } else {
        void connector.deactivate()
      }
    }
  }, [chainId, setDesiredChainId, chainIds, connector])

  useEffect(() => {
    toast({
      title: 'Error',
      description: 'hello',
      status: 'error',
      duration: null,
      // duration: 9000,
      isClosable: true,
    })

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [error, toast])

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId)

      // if we're aleready on the desired chain, don't do anything
      if (desiredChainId === chainId) return

      connector
        .activate(
          desiredChainId === -1
            ? undefined
            : getAddChainParameters(desiredChainId)
        )
        .then(() => setError(undefined))
        .catch(setError)
    },
    [connector, chainId, setError]
  )

  const onClick = useCallback(() => {
    setError(undefined)
    connector
      .activate(
        desiredChainId === -1
          ? undefined
          : getAddChainParameters(desiredChainId)
      )
      .then(() => {
        setError(undefined)
      })
      .catch(setError)
  }, [connector, desiredChainId, setError])

  if (isActivate && account) {
    return (
      <Stack direction={{ base: 'column', sm: 'row' }}>
        <ChainSelect chainId={desiredChainId} switchChain={switchChain} />

        <Menu>
          <MenuButton
            fontSize={{ base: 'xs', sm: 'md' }}
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="brand"
          >
            {shortenAddress(account)}
          </MenuButton>
          <MenuList fontSize="xl">
            <MenuItem
              onClick={() => {
                connector.deactivate()
              }}
              icon={<BiExit />}
            >
              Disconnect
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    )
  }

  return (
    <HStack>
      <ChainSelect chainId={desiredChainId} switchChain={switchChain} />
      <Button
        fontSize={{ base: 'xs', sm: 'md' }}
        variant="brand"
        isLoading={isActivating}
        onClick={onClick}
      >
        Connect Wallet
      </Button>
    </HStack>
  )
}

export default Web3ConnectWithSelect
