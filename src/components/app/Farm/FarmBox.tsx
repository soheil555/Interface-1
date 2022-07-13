import {
  Box,
  useColorModeValue,
  HStack,
  Text,
  Flex,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import useLiquidityInfo from "../../../hooks/useLiquidityInfo";
import useMasterChefOwner from "../../../hooks/useMasterChefOwner";
import useTokenInfo from "../../../hooks/useTokenInfo";
import { Farm } from "../../../types";
import { parseBalance } from "../../../utils";
import EditAllocPointButton from "./EditAllocPointButton";
import StakeButton from "./StakeButton";

interface FarmBoxProps {
  farm: Farm;
}

const FarmBox = ({ farm }: FarmBoxProps) => {
  const tokens = useLiquidityInfo(farm.lpToken);
  const token0Info = useTokenInfo(tokens?.token0);
  const token1Info = useTokenInfo(tokens?.token1);
  const { account } = useWeb3React();
  const masterChefOwner = useMasterChefOwner();

  if (!token0Info || !token1Info) return null;

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.600")}
      w="full"
      borderRadius="lg"
    >
      <HStack p={4} justifyContent="space-between">
        <HStack gap={2}>
          <Flex fontSize="2xl">
            <token0Info.logo mr={1} />
            <token1Info.logo />
          </Flex>

          <Text fontSize="xl">
            {token0Info.symbol}/{token1Info.symbol}
          </Text>
        </HStack>
      </HStack>

      <Divider />

      <HStack p={4}>
        <Stat>
          <StatLabel>AXO Allocation Point</StatLabel>
          <HStack>
            <StatNumber>{parseBalance(farm.allocPoint)}</StatNumber>
            {masterChefOwner && masterChefOwner === account ? (
              <EditAllocPointButton
                pid={farm.pid}
                currentAllocPoint={parseBalance(farm.allocPoint)}
              />
            ) : null}
          </HStack>
        </Stat>
        <StakeButton pid={farm.pid} lpToken={farm.lpToken} />
      </HStack>
    </Box>
  );
};

export default FarmBox;
