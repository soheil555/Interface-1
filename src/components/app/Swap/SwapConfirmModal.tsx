import { ArrowDownIcon } from '@chakra-ui/icons'
import {
  VStack,
  Button,
  Text,
  ModalHeader,
  ModalFooter,
  ModalBody,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { Token } from '../../../types'
import {
  currencyAmountWithSlippage,
  formatCurrencyAmount,
  parseCurrencyAmount,
} from '../../../utils'
import TransactionConfirmModal from '../TransactionConfirmModal/TransactionConfirmModal'
import SwapInfo from './SwapInfo'

interface SwapConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  tokenIn: Token
  tokenOut: Token
  amountIn: string
  amountOut: string
  slippage: string
  isFormValid: boolean
  isWalletConnected: boolean
  handleFormSubmit: () => void
  isConfirmed: boolean
  setIsConfirmed: (isConfirmed: boolean) => void
  txHash?: string
}

const SwapConfirmModal = ({
  isOpen,
  onClose,
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  slippage,
  isFormValid,
  isWalletConnected,
  handleFormSubmit,
  isConfirmed,
  setIsConfirmed,
  txHash,
}: SwapConfirmModalProps) => {
  return (
    <TransactionConfirmModal
      isConfirmed={isConfirmed}
      isOpen={isOpen}
      onClose={onClose}
      txHash={txHash}
      txDescription={`Swapping ${amountIn} ${tokenIn.symbol} for ${amountOut} ${tokenOut.symbol}`}
    >
      <ModalHeader>Confirm Swap</ModalHeader>
      <ModalBody>
        <VStack align="stretch" gap={2}>
          <VStack align="stretch" position="relative">
            <HStack
              bg={useColorModeValue('gray.100', 'gray.600')}
              p={2}
              borderRadius="lg"
              justify="space-between"
            >
              <Text fontSize={{ base: 'sm', sm: 'md' }}>From</Text>
              <Text fontSize={{ base: 'sm', sm: 'md' }}>
                {amountIn} {tokenIn.symbol}
              </Text>
            </HStack>

            <ArrowDownIcon
              position="absolute"
              top="40%"
              left="50%"
              transform="translate(-50%, -50%)"
              bg="gray.300"
              borderRadius="full"
              fontSize="2xl"
              w="30px"
              h="30px"
              p={1}
            />

            <HStack
              bg={useColorModeValue('gray.100', 'gray.600')}
              p={2}
              borderRadius="lg"
              justify="space-between"
            >
              <Text fontSize={{ base: 'sm', sm: 'md' }}>To</Text>
              <Text fontSize={{ base: 'sm', sm: 'md' }}>
                {amountOut} {tokenOut.symbol}
              </Text>
            </HStack>
          </VStack>

          <SwapInfo
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            amountIn={amountIn}
            amountOut={amountOut}
            slippage={slippage}
          />

          <Text fontSize={{ base: 'sm', sm: 'md' }}>
            Output is estimated. You will receive at least{' '}
            <span style={{ fontWeight: 'bold' }}>
              {formatCurrencyAmount(
                currencyAmountWithSlippage(
                  parseCurrencyAmount(amountOut, tokenOut.decimals),
                  slippage
                ),
                tokenOut.decimals
              )}{' '}
              {tokenOut.symbol}{' '}
            </span>
            or the transaction will revert.
          </Text>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button
          isDisabled={!isFormValid || !isWalletConnected}
          onClick={() => {
            setIsConfirmed(true)
            handleFormSubmit()
          }}
          w="full"
          fontSize="xl"
        >
          Confirm Swap
        </Button>
      </ModalFooter>
    </TransactionConfirmModal>
  )
}

export default SwapConfirmModal
