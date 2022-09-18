import { BigNumber } from 'ethers'
import { Token } from '../../../types'
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
  Icon,
} from '@chakra-ui/react'
import { formatCurrencyAmount } from '../../../utils'
import { AiOutlinePlus } from 'react-icons/ai'

interface RemoveLiquidityConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  token1: Token
  token2: Token
  liquidityToken1Amount: BigNumber
  liquidityToken2Amount: BigNumber
  percent: number
  slippage: string
  isFormValid: boolean
  isFormSubmitting: boolean
  isWalletConnected: boolean
  handleFormSubmit: () => void
}

const RemoveLiquidityConfirmationModal = ({
  isOpen,
  onClose,
  token1,
  token2,
  liquidityToken1Amount,
  liquidityToken2Amount,
  percent,
  slippage,
  isFormValid,
  isFormSubmitting,
  isWalletConnected,
  handleFormSubmit,
}: RemoveLiquidityConfirmationModalProps) => {
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
        <ModalHeader>You will receive</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack fontSize="xl" align="flex-start" gap={2}>
            <HStack justify="space-between" w="full">
              <HStack gap={2}>
                {token1.logo && <token1.logo />}
                <>
                  {formatCurrencyAmount(
                    liquidityToken1Amount.mul(percent).div(100),
                    token1.decimals
                  )}
                </>
              </HStack>
              <Text>{token1.symbol}</Text>
            </HStack>

            <Icon as={AiOutlinePlus} fontSize="xl" />

            <HStack justify="space-between" w="full">
              <HStack gap={2}>
                {token2.logo && <token2.logo />}
                <>
                  {formatCurrencyAmount(
                    liquidityToken2Amount.mul(percent).div(100),
                    token2.decimals
                  )}
                </>
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
            isLoading={isFormSubmitting}
            w="full"
            onClick={handleFormSubmit}
            variant="brand"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RemoveLiquidityConfirmationModal
