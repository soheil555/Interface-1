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
import { parseBalance, parseBalanceToBigNumber } from "../../../utils";
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
  const {
    values: { tokenIn, tokenOut, amountIn, amountOut },
    setFieldValue,
    setValues,
  } = useFormikContext<SwapFormValues>();

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

  // const getQuote = (value: string, reverse = false) => {
  //   const amounts: Record<string, string> = {
  //     token1Amount: "",
  //     token2Amount: "",
  //   };

  //   amounts[reverse ? otherAmountFieldName : amountFieldName] = value;

  //   if (value.length === 0) {
  //     amounts[reverse ? amountFieldName : otherAmountFieldName] = "";
  //   }

  //   if (
  //     reserves &&
  //     token &&
  //     otherToken &&
  //     reserves.reserve1.gt(0) &&
  //     reserves.reserve1.gt(0) &&
  //     value.length > 0
  //   ) {
  //     const amountA = parseBalanceToBigNumber(value, token.decimals);
  //     if (amountA.gt(0)) {
  //       const amountB = amountA
  //         .mul(reverse ? reserves.reserve1 : reserves.reserve2)
  //         .div(reverse ? reserves.reserve2 : reserves.reserve1);

  //       amounts[reverse ? amountFieldName : otherAmountFieldName] =
  //         parseBalance(amountB, otherToken.decimals);
  //     }
  //   }
  //   return amounts;
  // };

  useEffect(() => {
    setFieldValue(tokenFieldName + "Contract", tokenContract);
  }, [tokenContract]);

  useEffect(() => {
    if (tokenFieldName === "tokenIn")
      setFieldValue(tokenFieldName + "Balance", tokenBalance);
  }, [tokenBalance]);

  // useEffect(() => {
  //   if (reserves && tokenFieldName === "token1") {
  //     if (amount) {
  //       const amounts = getQuote(amount);
  //       setValues({ ...values, ...amounts });
  //     } else if (otherAmount) {
  //       const amounts = getQuote(otherAmount, true);
  //       setValues({ ...values, ...amounts });
  //     }
  //   }
  // }, [reserves]);

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
              // onChange={(value) => {
              //   const amounts = getQuote(value);
              //   setValues({ ...values, ...amounts });
              // }}
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
                // onClick={() => {
                //   if (tokenBalance) {
                //     const amounts = getQuote(
                //       parseBalance(tokenBalance, token.decimals)
                //     );
                //     setValues({ ...values, ...amounts });
                //   }
                // }}
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
