import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  VStack,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { Token } from "../../../types";
import { balanceWithSlippage, calculatePrice } from "../../../utils";

interface SwapConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenIn: Token;
  tokenOut: Token;
  amountIn: string;
  amountOut: string;
  slippage: string;
  isFormValid: boolean;
  isFormSubmitting: boolean;
  isWalletConnected: boolean;
  handleFormSubmit: () => void;
}

const SwapConfirmationModal = ({
  isOpen,
  onClose,
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  slippage,
  isFormValid,
  isFormSubmitting,
  isWalletConnected,
  handleFormSubmit,
}: SwapConfirmationModalProps) => {
  const amountOutWithSlippage = balanceWithSlippage(
    amountOut,
    slippage,
    tokenOut.decimals
  );

  const tokenOutPrice = calculatePrice(
    amountIn,
    amountOut,
    tokenIn.decimals,
    tokenOut.decimals
  );

  const boxBg = useColorModeValue("black.100", "black.600");

  return (
    <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Swap</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" gap={2}>
            <VStack align="stretch" position="relative">
              <HStack
                bg={boxBg}
                p={2}
                borderRadius="lg"
                justify="space-between"
              >
                <Text>From</Text>
                <Text>
                  {amountIn} {tokenIn.symbol}
                </Text>
              </HStack>

              <ArrowDownIcon
                position="absolute"
                top="43%"
                left="50%"
                transform="translate(-50%, -50%)"
                bg="black.400"
                borderRadius="full"
                fontSize="2xl"
                w="30px"
                h="30px"
                p={1}
              />

              <HStack
                bg={boxBg}
                p={2}
                borderRadius="lg"
                justify="space-between"
              >
                <Text>To</Text>
                <Text>
                  {amountOut} {tokenOut.symbol}
                </Text>
              </HStack>
            </VStack>

            <Text>
              1 {tokenIn.symbol} = {tokenOutPrice} {tokenOut.symbol}
            </Text>

            <VStack align="stretch" bg={boxBg} p={2} borderRadius="lg">
              <HStack justify="space-between">
                <Text>Expected Output</Text>
                <Text>
                  {amountOut} {tokenOut.symbol}
                </Text>
              </HStack>

              <Divider />

              <HStack justify="space-between">
                <Text>
                  Minimum received after slippage <br /> ({slippage}%)
                </Text>
                <Text>
                  <>
                    {amountOutWithSlippage} {tokenOut.symbol}
                  </>
                </Text>
              </HStack>
            </VStack>
            <Text variant="black">
              Output is estimated. You will receive at least{" "}
              <span style={{ fontWeight: "bold" }}>
                {amountOutWithSlippage} {tokenOut.symbol}{" "}
              </span>
              or the transaction will revert.
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isFormSubmitting}
            isDisabled={!isFormValid || !isWalletConnected}
            onClick={handleFormSubmit}
            colorScheme="brand"
            w="full"
            fontSize="xl"
          >
            Confirm Swap
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SwapConfirmationModal;
