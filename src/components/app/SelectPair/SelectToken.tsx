import { Token } from "../../../tokens";
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
import { useEffect } from "react";

interface SelectTokenProps {
  selectedToken: Token | undefined;
  setSelectedToken: (token: Token) => void;
  amount: string | undefined;
  setAmount: (amount: string) => void;
  setError: (error: string | undefined) => void;
  amountOnChange?: (amount: string) => void;
}

const SelectToken = ({
  selectedToken,
  setSelectedToken,
  amount,
  setAmount,
  setError,
  amountOnChange,
}: SelectTokenProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: tokenBalance } = useTokenBalance(selectedToken?.symbol);

  useEffect(() => {
    if (
      amount &&
      selectedToken &&
      tokenBalance &&
      parseBalanceToBigNumber(amount, selectedToken.decimals).gt(tokenBalance)
    ) {
      setError(`Insufficient ${selectedToken.symbol} balance`);
      return;
    }

    setError(undefined);
  }, [amount, selectedToken, tokenBalance]);

  return (
    <Box minW={{ base: "250", sm: "sm", md: "md" }}>
      {selectedToken ? (
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
              <selectedToken.logo fontSize="2xl" />
              <Box>
                <Text fontWeight="bold">{selectedToken.name}</Text>
                <Text color="gray.600">${selectedToken.symbol}</Text>
              </Box>
            </HStack>

            <Text fontSize="sm" color="gray.600">
              <>
                Balance{" "}
                {!!tokenBalance
                  ? parseBalance(tokenBalance, selectedToken.decimals)
                  : "0"}
              </>
            </Text>
          </HStack>

          <Divider />
          <HStack py={8} px={4} justify="space-between">
            <NumberInput p={0} value={amount} onChange={amountOnChange}>
              <NumberInputField
                border="none"
                placeholder="0.00"
                fontSize="2xl"
              />
            </NumberInput>

            <Button
              onClick={() => {
                if (tokenBalance)
                  setAmount(parseBalance(tokenBalance, selectedToken.decimals));
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
        setSelectedToken={setSelectedToken}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default SelectToken;
