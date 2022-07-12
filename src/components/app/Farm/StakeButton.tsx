import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  VStack,
} from "@chakra-ui/react";
import useLiquidityInfo from "../../../hooks/useLiquidityInfo";
import useTokenInfo from "../../../hooks/useTokenInfo";
import NextLink from "next/link";
import useTokenBalanceByAddress from "../../../hooks/useTokenBalanceByAddress";

interface StakeButtonProps {
  lpToken: string;
}

const StakeButton = ({ lpToken }: StakeButtonProps) => {
  const { data: lpTokenBalance } = useTokenBalanceByAddress(lpToken);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const tokens = useLiquidityInfo(lpToken);
  const token0Info = useTokenInfo(tokens?.token0);
  const token1Info = useTokenInfo(tokens?.token1);

  return (
    <>
      <Button onClick={onOpen} colorScheme="brand">
        Stake
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Staking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {lpTokenBalance && lpTokenBalance.gt(0) ? (
              ""
            ) : (
              <VStack p={5} gap={10}>
                <Text fontSize="lg" textAlign="center">
                  You can stake tour {token0Info?.symbol} / {token1Info?.symbol}{" "}
                  pool tokens in this area. However, you do not have enough{" "}
                  {token0Info?.symbol} / {token1Info?.symbol} pool tokens yet.
                </Text>
                <NextLink href="/app/pool/add-liquidity">
                  <Button variant="brand-2-outline">
                    Add liquidity to {token0Info?.symbol} / {token1Info?.symbol}
                  </Button>
                </NextLink>
              </VStack>
            )}
          </ModalBody>
          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default StakeButton;
