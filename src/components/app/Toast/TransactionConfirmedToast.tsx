import { Box, CloseButton, HStack, Link, Text } from '@chakra-ui/react'
import { join } from 'path'
import useBlockExplorerURL from '../../../hooks/useBlockExplorerURL'

interface TransactionConfirmedToastProps {
  txDescription: string
  txHash: string
  txStatus: number
  onClose(): void
}

const TransactionConfirmedToast = ({
  txDescription,
  txHash,
  txStatus,
  onClose,
}: TransactionConfirmedToastProps) => {
  const blockExplorerURL = useBlockExplorerURL()

  return (
    <Box
      p={2}
      rounded="lg"
      color="white"
      bg={txStatus === 0 ? 'red.500' : 'blue.500'}
    >
      <HStack justify="space-between" w="full">
        <Text fontWeight="bold">
          Transaction {txStatus === 0 ? 'reverted' : 'confirmed'}
        </Text>
        <CloseButton onClick={onClose} />
      </HStack>
      <Text mb={2}>{txDescription}</Text>
      <Link
        href={blockExplorerURL ? join(blockExplorerURL, 'tx', txHash) : '#'}
        isExternal
      >
        View on Explorer
      </Link>
    </Box>
  )
}

export default TransactionConfirmedToast
