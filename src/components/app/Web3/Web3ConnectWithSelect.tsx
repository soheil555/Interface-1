import {
  HStack,
  Button,
  useToast,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import { useCallback, useEffect, useState } from 'react'
import { CHAINS, getAddChainParameters } from '../../../chains'
import { shortenAddress } from '../../../utils'
import ChainSelect from './ChainSelect'

import { useAtom } from 'jotai'
import { accountInfoAtom } from '../../../store'
import AccountDetails from '../AccountDetails/AccountDetails'

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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [desiredChainId, setDesiredChainId] = useState(137)
  const chainIds = Object.keys(CHAINS).map((chainId) => Number(chainId))
  const setAccountInfo = useAtom(accountInfoAtom)[1]

  useEffect(() => {
    setAccountInfo({
      chainId,
      address: account,
    })
  }, [chainId, account])

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

        <AccountDetails
          connector={connector}
          isOpen={isOpen}
          onClose={onClose}
        />

        <Button
          onClick={onOpen}
          fontSize={{ base: 'xs', sm: 'md' }}
          as={Button}
          variant="brand"
        >
          {shortenAddress(account)}
        </Button>
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
