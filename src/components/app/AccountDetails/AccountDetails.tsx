import {
  Button,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useClipboard,
  VStack,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { shortenAddress } from '../../../utils'
import { FiCopy, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'
import { GiConfirmed } from 'react-icons/gi'
import { getAddChainParameters } from '../../../chains'
import { join } from 'path'
import { useAtom } from 'jotai'
import {
  accountTransactionsAtom,
  accountTransactionsLenAtom,
  resetAccountTransactionsAtom,
} from '../../../store'

interface AccountDetailsProps {
  isOpen: boolean
  onClose: () => void
  connector: MetaMask
}

const AccountDetails = ({
  isOpen,
  onClose,
  connector,
}: AccountDetailsProps) => {
  const { account, chainId } = useWeb3React()
  const { onCopy, hasCopied } = useClipboard(account!)
  const chainInfo =
    typeof chainId !== 'undefined' ? getAddChainParameters(chainId) : undefined

  const blockExplorerURL =
    chainInfo &&
    chainInfo.blockExplorerUrls &&
    chainInfo.blockExplorerUrls.length > 0
      ? chainInfo.blockExplorerUrls[0]
      : undefined

  const [transactions] = useAtom(accountTransactionsAtom)
  const [transactionsLen] = useAtom(accountTransactionsLenAtom)
  const resetTransactions = useAtom(resetAccountTransactionsAtom)[1]

  return (
    <Modal
      blockScrollOnMount={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            mb={4}
            align="stretch"
            p={3}
            border="solid"
            borderWidth={1}
            borderColor="gray.400"
            rounded="xl"
          >
            <HStack justify="space-between">
              <Text variant="subtext">Connected with MetaMask</Text>
              <Button
                onClick={() => {
                  connector.deactivate()
                  onClose()
                }}
                size="sm"
                variant="outline"
                rounded="full"
              >
                Disconnect
              </Button>
            </HStack>

            <Tooltip
              placement="top"
              textAlign="center"
              fontSize="sm"
              hasArrow
              label={account}
            >
              <Text alignSelf="flex-start" fontWeight="bold" fontSize="xl">
                {shortenAddress(account!)}
              </Text>
            </Tooltip>
            <HStack>
              <Button
                onClick={onCopy}
                leftIcon={<FiCopy />}
                variant="ghost"
                size="sm"
              >
                {hasCopied ? 'Copied' : 'Copy Address'}
              </Button>
              <Link
                _hover={{
                  textDecoration: 'none',
                }}
                href={
                  blockExplorerURL
                    ? join(blockExplorerURL, 'address', account!)
                    : '#'
                }
                isExternal
              >
                <Button leftIcon={<FiExternalLink />} variant="ghost" size="sm">
                  View on Explorer
                </Button>
              </Link>
            </HStack>
          </VStack>
        </ModalBody>

        <ModalFooter
          as={VStack}
          alignItems="stretch"
          bg={useColorModeValue('gray.200', 'gray.700')}
        >
          {transactionsLen > 0 ? (
            <>
              <HStack justify="space-between">
                <Text>Recent Transactions</Text>
                <Button onClick={resetTransactions} size="sm" variant="ghost">
                  clear all
                </Button>
              </HStack>
              {Object.entries(transactions).map(([txHash, txInfo]) => (
                <HStack key={txHash} justify="space-between">
                  <Link
                    href={
                      blockExplorerURL
                        ? join(blockExplorerURL, 'tx', txHash)
                        : '#'
                    }
                    isExternal
                  >
                    <HStack>
                      <Text>{txInfo.description}</Text>

                      <FiArrowUpRight />
                    </HStack>
                  </Link>

                  {txInfo.isConfirmed ? (
                    <GiConfirmed color="green" />
                  ) : (
                    <Spinner size="sm" />
                  )}
                </HStack>
              ))}
            </>
          ) : (
            <Text>Your transactions will appear here...</Text>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AccountDetails
