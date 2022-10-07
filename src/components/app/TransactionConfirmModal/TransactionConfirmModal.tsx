import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  Link,
  Box,
} from '@chakra-ui/react'
import { join } from 'path'
import { BsArrowUpCircle } from 'react-icons/bs'
import useBlockExplorerURL from '../../../hooks/useBlockExplorerURL'

interface TransactionConfirmModalProps {
  isConfirmed: boolean
  isOpen: boolean
  onClose: () => void
  txHash?: string
  txDescription: string
  children: React.ReactNode
}

const TransactionConfirmModal = ({
  txHash,
  txDescription,
  children,
  isOpen,
  onClose,
  isConfirmed,
}: TransactionConfirmModalProps) => {
  const blockExplorerURL = useBlockExplorerURL()

  return (
    <Modal
      blockScrollOnMount={false}
      size={{ base: 'xs', sm: 'sm', md: 'xl' }}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton />
        {isConfirmed ? (
          <ModalBody>
            <VStack pt={5}>
              {txHash ? (
                <>
                  <Box color="brand.400" fontSize="4rem" py={5}>
                    <BsArrowUpCircle />
                  </Box>

                  <Link
                    href={
                      blockExplorerURL
                        ? join(blockExplorerURL, 'tx', txHash)
                        : '#'
                    }
                    color="brand.500"
                    isExternal
                    fontSize="lg"
                  >
                    View on Explorer
                  </Link>

                  <Text fontSize="lg" fontWeight="bold">
                    Transaction Submitted
                  </Text>
                  <Button w="full" onClick={onClose}>
                    Close
                  </Button>
                </>
              ) : (
                <>
                  <Spinner color="brand.300" size="xl" my={5} />
                  <Text fontSize="lg" fontWeight="bold">
                    Waiting For Confirmation
                  </Text>
                  <Text textAlign="center">{txDescription}</Text>
                  <Text fontSize="sm" variant="subtext">
                    Confirm this transaction in your wallet
                  </Text>
                </>
              )}
            </VStack>
          </ModalBody>
        ) : (
          children
        )}
      </ModalContent>
    </Modal>
  )
}

export default TransactionConfirmModal
