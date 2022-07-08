import {
  Box,
  HStack,
  Icon,
  Text,
  useDisclosure,
  Divider,
  Button,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { GiToken } from "react-icons/gi";
import TokensList from "./TokensList";
import useTokenBalance from "../../../hooks/useTokenBalance";
import {
  parseBalance,
  parseBalanceToBigNumber,
  parseValue,
} from "../../../utils";
import { useFormikContext } from "formik";
import { SwapFormValues } from "../../../types";
import { useEffect } from "react";
import useTokenContract from "../../../hooks/useTokenContract";
import usePairReserves from "../../../hooks/usePairReserves";

interface SwapSelectTokenProps {
  isTokenIn?: boolean;
}

const SwapSelectToken = ({ isTokenIn }: SwapSelectTokenProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values, setFieldValue, setValues } =
    useFormikContext<SwapFormValues>();

  const { tokenIn, tokenOut, amountIn, amountOut } = values;

  const [token, otherToken] = isTokenIn
    ? [tokenIn, tokenOut]
    : [tokenOut, tokenIn];

  const [amount, otherAmount] = isTokenIn
    ? [amountIn, amountOut]
    : [amountOut, amountIn];

  const tokenFieldName = isTokenIn ? "tokenIn" : "tokenOut";

  const [amountFieldName, otherAmountFieldName] = isTokenIn
    ? ["amountIn", "amountOut"]
    : ["amountOut", "amountIn"];

  const tokenContract = useTokenContract(token);
  const { data: tokenBalance } = useTokenBalance(token);
  const { data: reserves } = usePairReserves(tokenIn, tokenOut);

  const getAmountOut = (value: string) => {
    const amounts: Record<string, string> = {
      amountIn: "",
      amountOut: "",
    };

    amounts["amountIn"] = value;
    if (value.length === 0) {
      amounts["amountOut"] = "";
    }

    if (
      reserves &&
      tokenIn &&
      tokenOut &&
      reserves.reserve1.gt(0) &&
      reserves.reserve2.gt(0) &&
      value.length > 0
    ) {
      const amountIn = parseBalanceToBigNumber(value, tokenIn.decimals);
      if (amountIn.gt(0)) {
        const amountInWithFee = amountIn.mul(997);
        const numerator = amountInWithFee.mul(reserves.reserve2);
        const denominator = reserves.reserve1.mul(1000).add(amountInWithFee);
        const amountOut = numerator.div(denominator);
        amounts["amountOut"] = parseBalance(amountOut, tokenOut.decimals);
      }
    }

    return amounts;
  };

  const getAmountIn = (value: string) => {
    const amounts: Record<string, string> = {
      amountIn: "",
      amountOut: "",
    };

    amounts["amountOut"] = value;
    if (value.length === 0) {
      amounts["amountIn"] = "";
    }

    if (
      reserves &&
      tokenIn &&
      tokenOut &&
      reserves.reserve1.gt(0) &&
      reserves.reserve2.gt(0) &&
      value.length > 0
    ) {
      const amountOut = parseBalanceToBigNumber(value, tokenIn.decimals);
      if (amountOut.gt(0)) {
        const numerator = reserves.reserve1.mul(amountOut).mul(1000);
        const denominator = reserves.reserve2.sub(amountOut).mul(997);
        const amountIn = numerator.div(denominator).add(1);
        amounts["amountIn"] = parseBalance(amountIn, tokenIn.decimals);
      }
    }

    return amounts;
  };

  useEffect(() => {
    setFieldValue(tokenFieldName + "Contract", tokenContract);
  }, [tokenContract]);

  useEffect(() => {
    if (tokenFieldName === "tokenIn")
      setFieldValue(tokenFieldName + "Balance", tokenBalance);
  }, [tokenBalance]);

  useEffect(() => {
    if (reserves) {
      if (isTokenIn) {
        setFieldValue("tokenInReserve", reserves.reserve1);
      } else {
        setFieldValue("tokenOutReserve", reserves.reserve2);
      }
    }
  }, [reserves]);

  useEffect(() => {
    if (reserves && isTokenIn) {
      if (amountIn) {
        const amounts = getAmountOut(amountIn);
        setValues({ ...values, ...amounts });
      } else if (amountOut) {
        const amounts = getAmountIn(amountOut);
        setValues({ ...values, ...amounts });
      }
    }
  }, [reserves]);

  return (
    <Box minW={{ base: "250", sm: "sm", md: "md" }}>
      {token ? (
        <Box
          borderRadius="lg"
          border="solid"
          borderWidth={1}
          borderColor="gray.200"
          overflow="hidden"
          w="full"
        >
          <HStack
            _hover={{ bgColor: "gray.50" }}
            onClick={onOpen}
            cursor="pointer"
            justify="space-between"
            py={4}
            px={4}
          >
            <HStack>
              <token.logo fontSize="2xl" />
              <Box>
                <Text fontWeight="bold">{token.name}</Text>
                <Text color="gray.600">${token.symbol}</Text>
              </Box>
            </HStack>

            <Text fontSize="sm" color="gray.600">
              <>
                Balance{" "}
                {!!tokenBalance
                  ? parseBalance(tokenBalance, token.decimals)
                  : "0"}
              </>
            </Text>
          </HStack>

          <Divider />

          <HStack py={8} px={4} justify="space-between">
            <NumberInput
              min={0}
              p={0}
              value={amount}
              onChange={(value) => {
                value = parseValue(value, token.decimals);
                if (isTokenIn) {
                  const amounts = getAmountOut(value);
                  setValues({ ...values, ...amounts });
                } else {
                  const amounts = getAmountIn(value);
                  setValues({ ...values, ...amounts });
                }
              }}
            >
              <NumberInputField
                border="none"
                placeholder="0.00"
                fontSize="2xl"
              />
            </NumberInput>

            {isTokenIn ? (
              <Button
                disabled={!tokenBalance}
                onClick={() => {
                  if (tokenBalance) {
                    const amounts = getAmountOut(
                      parseBalance(tokenBalance, token.decimals)
                    );
                    setValues({ ...values, ...amounts });
                  }
                }}
                fontSize="sm"
              >
                MAX
              </Button>
            ) : null}
          </HStack>
        </Box>
      ) : (
        <HStack
          onClick={onOpen}
          cursor="pointer"
          borderRadius="lg"
          boxShadow="md"
          bg="gray.50"
          py={6}
          px={4}
        >
          <Icon fontSize="xl" as={GiToken} />
          <Text>Select a token</Text>
        </HStack>
      )}

      <TokensList
        setSelectedToken={(token) => {
          if (otherToken !== token) setFieldValue(tokenFieldName, token);
        }}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default SwapSelectToken;
