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
  Stack,
  Box,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { shortenAddress } from '../../../utils'
import { FiCopy, FiExternalLink, FiArrowUpRight } from 'react-icons/fi'
import { GiConfirmed } from 'react-icons/gi'
import { join } from 'path'
import { useAtom } from 'jotai'
import {
  accountTransactionsAtom,
  accountTransactionsLenAtom,
  resetAccountTransactionsAtom,
} from '../../../store'
import useBlockExplorerURL from '../../../hooks/useBlockExplorerURL'

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
  const { account } = useWeb3React()
  const { onCopy, hasCopied } = useClipboard(account!)
  const blockExplorerURL = useBlockExplorerURL()

  const [transactions] = useAtom(accountTransactionsAtom)
  const [transactionsLen] = useAtom(accountTransactionsLenAtom)
  const resetTransactions = useAtom(resetAccountTransactionsAtom)[1]

  return (
    <Modal
      blockScrollOnMount={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: 'xs', sm: 'md' }}
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
              <Text fontSize={{ base: 'xs', sm: 'md' }} variant="subtext">
                Connected with MetaMask
              </Text>
              <Button
                onClick={() => {
                  connector.deactivate()
                  onClose()
                }}
                size={{ base: 'xs', sm: 'sm' }}
                fontSize={{ base: 'xs', sm: 'sm' }}
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
            <Stack align="flex-start" direction={{ base: 'column', sm: 'row' }}>
              <Button
                onClick={onCopy}
                leftIcon={<FiCopy />}
                variant="ghost"
                size={{ base: 'xs', sm: 'sm' }}
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
                <Button
                  leftIcon={<FiExternalLink />}
                  variant="ghost"
                  size={{ base: 'xs', sm: 'sm' }}
                >
                  View on Explorer
                </Button>
              </Link>
            </Stack>
          </VStack>
        </ModalBody>

        <ModalFooter
          as={VStack}
          alignItems="stretch"
          bg={useColorModeValue('gray.200', 'gray.700')}
          gap={1}
        >
          {transactionsLen > 0 ? (
            <>
              <HStack justify="space-between">
                <Text fontSize={{ base: 'sm', sm: 'md' }}>
                  Recent Transactions
                </Text>
                <Button onClick={resetTransactions} size="sm" variant="ghost">
                  clear all
                </Button>
              </HStack>
              <VStack align="stretch" gap={2} maxH="20rem" overflowY="scroll">
                {Object.entries(transactions).map(([txHash, txInfo]) => (
                  <HStack
                    align="flex-start"
                    justify="space-between"
                    key={txHash}
                    pr={2}
                  >
                    <Link
                      href={
                        blockExplorerURL
                          ? join(blockExplorerURL, 'tx', txHash)
                          : '#'
                      }
                      isExternal
                      w="80%"
                    >
                      <Text fontSize={{ base: 'xs', sm: 'md' }}>
                        {txInfo.description}{' '}
                        <Box display="inline-block">
                          <FiArrowUpRight />
                        </Box>
                      </Text>
                    </Link>

                    {txInfo.isConfirmed ? (
                      <GiConfirmed color="green" />
                    ) : (
                      <Spinner size="sm" />
                    )}
                  </HStack>
                ))}
              </VStack>
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
