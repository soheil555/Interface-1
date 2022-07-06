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
import { FormValues } from "../../../types";
import { useEffect } from "react";
import useTokenContract from "../../../hooks/useTokenContract";
import useQuote from "../../../hooks/useQuote";
import usePairReserves from "../../../hooks/usePairReserves";

interface SelectTokenProps {
  isToken1?: boolean;
}

const SelectToken = ({ isToken1 }: SelectTokenProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    values,
    setFieldValue,
    setValues,
    setFieldError,
    setErrors,
    setTouched,
  } = useFormikContext<FormValues>();

  const token = isToken1 ? values.token1 : values.token2;
  const otherToken = isToken1 ? values.token2 : values.token1;
  const amount = isToken1 ? values.token1Amount : values.token2Amount;
  const otherAmount = isToken1 ? values.token2Amount : values.token1Amount;
  const tokenFieldName = isToken1 ? "token1" : "token2";
  const otherTokenFieldName = isToken1 ? "token2" : "token1";
  const amountFieldName = isToken1 ? "token1Amount" : "token2Amount";
  const otherAmountFieldName = isToken1 ? "token2Amount" : "token1Amount";

  const tokenContract = useTokenContract(token);
  const { data: tokenBalance } = useTokenBalance(token);
  const amountB = useQuote(token, otherToken, amount);

  const { data: reserves } = usePairReserves(token, otherToken);

  useEffect(() => {
    setFieldValue(tokenFieldName + "Contract", tokenContract);
  }, [tokenContract]);

  useEffect(() => {
    setFieldValue(tokenFieldName + "Balance", tokenBalance);
  }, [tokenBalance]);

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
              onChange={async (value) => {
                const amounts: {
                  token1Amount?: string;
                  token2Amount?: string;
                } = {};

                amounts[amountFieldName] = value;

                if (value.length === 0) {
                  amounts[otherAmountFieldName] = "";
                }

                if (
                  reserves &&
                  otherToken &&
                  reserves.reserve1.gt(0) &&
                  reserves.reserve1.gt(0) &&
                  value.length > 0
                ) {
                  const amountA = parseBalanceToBigNumber(
                    value,
                    token.decimals
                  );
                  if (amountA.gt(0)) {
                    const amountB = amountA
                      .mul(reserves.reserve2)
                      .div(reserves.reserve1);

                    amounts[otherAmountFieldName] = parseBalance(
                      amountB,
                      otherToken.decimals
                    );
                  }
                }

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
              onClick={() => {
                if (tokenBalance)
                  setFieldValue(
                    amountFieldName,
                    parseBalance(tokenBalance, token.decimals)
                  );
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

export default SelectToken;
