import {
  Box,
  Button,
  HStack,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Token } from '../../../types'
import TransactionConfirmModal from '../TransactionConfirmModal/TransactionConfirmModal'
import AddLiquidityInfo from './AddLiquidityInfo'

interface AddLiquidityConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  token1: Token
  token2: Token
  token1Amount: string
  token2Amount: string
  slippage: string
  isFormValid: boolean
  isFormSubmitting: boolean
  isWalletConnected: boolean
  handleFormSubmit: () => void
  txHash?: string
  setTxHash: (txHash: string | undefined) => void
  isConfirmed: boolean
  setIsConfirmed: (isConfirmed: boolean) => void
}

const AddLiquidityConfirmModal = ({
  isOpen,
  onClose,
  token1,
  token2,
  token1Amount,
  token2Amount,
  slippage,
  isFormValid,
  isWalletConnected,
  handleFormSubmit,
  txHash,
  isConfirmed,
  setIsConfirmed,
}: AddLiquidityConfirmModalProps) => {
  return (
    <TransactionConfirmModal
      isConfirmed={isConfirmed}
      isOpen={isOpen}
      onClose={onClose}
      txHash={txHash}
      txDescription={`Add ${token1Amount} ${token1?.symbol} and ${token2Amount} ${token2?.symbol}`}
    >
      <ModalHeader>You will receive</ModalHeader>

      <ModalBody>
        <Box mb={5} fontSize={{ base: '1.5rem', md: '2rem' }}>
          <HStack>
            <Text>0.00</Text>
            <HStack>
              {token1.logo && <token1.logo />} {token2.logo && <token2.logo />}
            </HStack>
          </HStack>
          <Text>
            {token1.symbol}/{token2.symbol} Pool Tokens
          </Text>
          <Text
            mt={5}
            fontSize={{ base: '0.8rem', md: '1rem' }}
            variant="subtext"
          >
            Output is estimated. If the price changes by more than {slippage}%
            your transaction will revert.
          </Text>
        </Box>

        <AddLiquidityInfo
          token1={token1}
          token2={token2}
          token1Amount={token1Amount}
          token2Amount={token2Amount}
        />

        <VStack fontSize={{ base: 'xs', sm: 'md' }} mt={5} align="stretch">
          <HStack justify="space-between">
            <Text variant="subtext">{token1.symbol} Deposited</Text>
            <Text>
              {token1Amount} {token1.symbol}
            </Text>
          </HStack>

          <HStack justify="space-between">
            <Text variant="subtext">{token2.symbol} Deposited</Text>
            <Text>
              {token2Amount} {token2.symbol}
            </Text>
          </HStack>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button
          isDisabled={!isFormValid || !isWalletConnected}
          w="full"
          onClick={() => {
            setIsConfirmed(true)
            handleFormSubmit()
          }}
          variant="brand"
        >
          Confirm Supply
        </Button>
      </ModalFooter>
    </TransactionConfirmModal>
  )
}

export default AddLiquidityConfirmModal
