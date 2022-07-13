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
  VStack,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import useLiquidityInfo from "../../../hooks/useLiquidityInfo";
import useMasterChefOwner from "../../../hooks/useMasterChefOwner";
import usePendingAXO from "../../../hooks/usePendingAXO";
import useTokenInfo from "../../../hooks/useTokenInfo";
import { Farm } from "../../../types";
import { parseBalance } from "../../../utils";
import EditAllocPointButton from "./EditAllocPointButton";
import HarvestButton from "./HarvestButton";
import StakeButton from "./StakeButton";
import UpdatePoolButton from "./UpdatePoolButton";

interface FarmBoxProps {
  farm: Farm;
}

const FarmBox = ({ farm }: FarmBoxProps) => {
  const { data: pendingAXO } = usePendingAXO(farm.pid);
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
        <UpdatePoolButton pid={farm.pid} />
      </HStack>

      <Divider />

      <VStack align="stretch" gap={2} p={4}>
        <HStack
          border="solid"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.400"
          p={2}
        >
          <Stat>
            <StatLabel>AXO Allocation Point</StatLabel>
            <HStack>
              <StatNumber>{farm.allocPoint.toString()}</StatNumber>
              {masterChefOwner && masterChefOwner === account ? (
                <EditAllocPointButton
                  pid={farm.pid}
                  currentAllocPoint={farm.allocPoint.toString()}
                />
              ) : null}
            </HStack>
          </Stat>
          <StakeButton pid={farm.pid} lpToken={farm.lpToken} />
        </HStack>

        <HStack
          border="solid"
          borderRadius="lg"
          borderWidth={1}
          borderColor="gray.400"
          p={2}
        >
          <Stat>
            <StatLabel>AXO Earned</StatLabel>
            <StatNumber>
              {pendingAXO ? parseBalance(pendingAXO) : "0.00"}
            </StatNumber>
          </Stat>
          <HarvestButton pid={farm.pid} lpToken={farm.lpToken} />
        </HStack>
      </VStack>
    </Box>
  );
};

export default FarmBox;
