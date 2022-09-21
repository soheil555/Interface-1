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
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { shortenAddress } from '../../../utils'
import { FiCopy, FiExternalLink } from 'react-icons/fi'
import { getAddChainParameters } from '../../../chains'
import { join } from 'path'

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
  const chainInfo = getAddChainParameters(chainId!)

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
                  chainInfo.blockExplorerUrls &&
                  chainInfo.blockExplorerUrls.length > 0
                    ? join(chainInfo.blockExplorerUrls[0], 'address', account!)
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
          justifyContent="flex-start"
          bg={useColorModeValue('gray.200', 'gray.700')}
        >
          <Text>Your transactions will appear here...</Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AccountDetails
