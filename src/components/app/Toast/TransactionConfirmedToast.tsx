import { Box, HStack, IconButton, Link, Text } from '@chakra-ui/react'
import { join } from 'path'
import useBlockExplorerURL from '../../../hooks/useBlockExplorerURL'
import { CloseIcon } from '@chakra-ui/icons'

interface TransactionConfirmedToastProps {
  txDescription: string
  txHash: string
  onClose(): void
}

const TransactionConfirmedToast = ({
  txDescription,
  txHash,
  onClose,
}: TransactionConfirmedToastProps) => {
  const blockExplorerURL = useBlockExplorerURL()

  return (
    <Box p={2} rounded="lg" color="white" bg="blue.500">
      <HStack justify="space-between" w="full">
        <Text fontWeight="bold">Transaction confirmed</Text>
        <IconButton
          size="sm"
          variant="unstyled"
          icon={<CloseIcon />}
          aria-label="close"
          onClick={onClose}
        />
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
