import { BigNumber } from 'ethers'
import { Token } from '../../../types'
import {
  Button,
  HStack,
  ModalBody,
  ModalFooter,
  ModalHeader,
  VStack,
  Text,
  Icon,
} from '@chakra-ui/react'
import { formatCurrencyAmount } from '../../../utils'
import { AiOutlinePlus } from 'react-icons/ai'
import TransactionConfirmModal from '../TransactionConfirmModal/TransactionConfirmModal'

interface RemoveLiquidityConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  token1: Token
  token2: Token
  liquidityToken1Amount: BigNumber
  liquidityToken2Amount: BigNumber
  percent: number
  slippage: string
  isFormValid: boolean
  isWalletConnected: boolean
  handleFormSubmit: () => void
  isConfirmed: boolean
  txHash?: string
  setIsConfirmed: (isConfirmed: boolean) => void
}

const RemoveLiquidityConfirmModal = ({
  isOpen,
  onClose,
  token1,
  token2,
  liquidityToken1Amount,
  liquidityToken2Amount,
  percent,
  slippage,
  isFormValid,
  isWalletConnected,
  handleFormSubmit,
  isConfirmed,
  txHash,
  setIsConfirmed,
}: RemoveLiquidityConfirmModalProps) => {
  const token1Amount = formatCurrencyAmount(
    liquidityToken1Amount.mul(percent).div(100),
    token1.decimals
  )

  const token2Amount = formatCurrencyAmount(
    liquidityToken2Amount.mul(percent).div(100),
    token2.decimals
  )

  return (
    <TransactionConfirmModal
      isConfirmed={isConfirmed}
      isOpen={isOpen}
      onClose={onClose}
      txHash={txHash}
      txDescription={`Remove ${token1Amount} ${token1.symbol} and ${token2Amount} ${token2.symbol}`}
    >
      <ModalHeader>You will receive</ModalHeader>
      <ModalBody>
        <VStack fontSize="xl" align="flex-start" gap={2}>
          <HStack justify="space-between" w="full">
            <HStack gap={2}>
              {token1.logo && <token1.logo />}
              <>{token1Amount}</>
            </HStack>
            <Text>{token1.symbol}</Text>
          </HStack>

          <Icon as={AiOutlinePlus} fontSize="xl" />

          <HStack justify="space-between" w="full">
            <HStack gap={2}>
              {token2.logo && <token2.logo />}
              <>{token2Amount}</>
            </HStack>
            <Text>{token2.symbol}</Text>
          </HStack>
        </VStack>
        <Text mt={5} variant="subtext">
          Output is estimated. If the price changes by more than {slippage}%
          your transaction will revert.
        </Text>

        <HStack mt={7} justify="space-between">
          <Text variant="subtext">
            {token1.symbol}/{token2.symbol} Burned
          </Text>
          <Text>0.00</Text>
        </HStack>
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
          Confirm
        </Button>
      </ModalFooter>
    </TransactionConfirmModal>
  )
}

export default RemoveLiquidityConfirmModal
