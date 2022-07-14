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
  useColorModeValue,
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
import { LiquidityFormValues } from "../../../types";
import { useEffect } from "react";
import useTokenContract from "../../../hooks/useTokenContract";
import usePairReserves from "../../../hooks/usePairReserves";

interface LiquiditySelectTokenProps {
  isToken1?: boolean;
}

const LiquiditySelectToken = ({ isToken1 }: LiquiditySelectTokenProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { values, setFieldValue, setValues } =
    useFormikContext<LiquidityFormValues>();

  const [token, otherToken] = isToken1
    ? [values.token1, values.token2]
    : [values.token2, values.token1];

  const [amount, otherAmount] = isToken1
    ? [values.token1Amount, values.token2Amount]
    : [values.token2Amount, values.token1Amount];

  const [tokenFieldName, otherTokenFieldName] = isToken1
    ? ["token1", "token2"]
    : ["token2", "token1"];

  const [amountFieldName, otherAmountFieldName] = isToken1
    ? ["token1Amount", "token2Amount"]
    : ["token2Amount", "token1Amount"];

  const tokenContract = useTokenContract(token);
  const { data: tokenBalance } = useTokenBalance(token);
  const { data: reserves } = usePairReserves(token, otherToken);

  const getQuote = (value: string, reverse = false) => {
    const amounts: Record<string, string> = {};

    amounts[reverse ? otherAmountFieldName : amountFieldName] = value;

    if (
      reserves &&
      (reserves.reserve1.isZero() || reserves.reserve2.isZero())
    ) {
      return amounts;
    }

    if (
      reserves &&
      reserves.reserve1.gt(0) &&
      reserves.reserve2.gt(0) &&
      value.length === 0
    ) {
      amounts[reverse ? amountFieldName : otherAmountFieldName] = "";
    }

    if (
      reserves &&
      token &&
      otherToken &&
      reserves.reserve1.gt(0) &&
      reserves.reserve2.gt(0) &&
      value.length > 0
    ) {
      const amountA = parseBalanceToBigNumber(value, token.decimals);
      if (amountA.gt(0)) {
        const amountB = amountA
          .mul(reverse ? reserves.reserve1 : reserves.reserve2)
          .div(reverse ? reserves.reserve2 : reserves.reserve1);

        amounts[reverse ? amountFieldName : otherAmountFieldName] =
          parseBalance(amountB, otherToken.decimals);
      }
    }
    return amounts;
  };

  useEffect(() => {
    setFieldValue(tokenFieldName + "Contract", tokenContract);
  }, [tokenContract]);

  useEffect(() => {
    setFieldValue(tokenFieldName + "Balance", tokenBalance);
  }, [tokenBalance]);

  useEffect(() => {
    if (isToken1) {
      if (amount) {
        const amounts = getQuote(amount);
        setValues({ ...values, ...amounts });
      } else if (otherAmount) {
        const amounts = getQuote(otherAmount, true);
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
            _hover={{ bgColor: "gray.100", color: "gray.800" }}
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
                const amounts = getQuote(value);
                setValues({ ...values, ...amounts });
              }}
            >
              <NumberInputField
                border="none"
                placeholder="0.00"
                fontSize="2xl"
              />
            </NumberInput>

            <Button
              disabled={!tokenBalance}
              onClick={() => {
                if (tokenBalance) {
                  const amounts = getQuote(
                    parseBalance(tokenBalance, token.decimals)
                  );
                  setValues({ ...values, ...amounts });
                }
              }}
              fontSize="sm"
            >
              MAX
            </Button>
          </HStack>
        </Box>
      ) : (
        <HStack
          onClick={onOpen}
          cursor="pointer"
          borderRadius="lg"
          boxShadow="md"
          bg={useColorModeValue("gray.50", "gray.700")}
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

export default LiquiditySelectToken;
