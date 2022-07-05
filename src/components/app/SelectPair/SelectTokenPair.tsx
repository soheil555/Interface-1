import { Box, Text, VStack, IconButton, HStack } from "@chakra-ui/react";
import type { Token } from "../../../tokens";
import SelectToken from "./SelectToken";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface SelectTokenPairProps {
  token1: Token | undefined;
  token2: Token | undefined;
  setToken1: (token: Token | undefined) => void;
  setToken2: (token: Token | undefined) => void;
  middleIcon: JSX.Element;
  middleIconOnClick?: () => void;
  token1Amount: string | undefined;
  setToken1Amount: (amount: string | undefined) => void;
  token2Amount: string | undefined;
  setToken2Amount: (amount: string | undefined) => void;
  setError: (error: string | undefined) => void;
  token1AmountOnChange?: (amount: string) => void;
  token2AmountOnChange?: (amount: string) => void;
  header?: string;
  label1?: string;
  label2?: string;
}

const SelectTokenPair = ({
  token1,
  token2,
  setToken1,
  setToken2,
  middleIcon,
  middleIconOnClick,
  token1Amount,
  token2Amount,
  setToken1Amount,
  setToken2Amount,
  setError,
  token1AmountOnChange,
  token2AmountOnChange,
  header,
  label1,
  label2,
}: SelectTokenPairProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!token1 || !token2) {
      setError("invalid token pair");
      return;
    }
    setError(undefined);
  }, [token1, token2]);

  return (
    <VStack maxW={{ base: "250", sm: "sm", md: "md" }} gap={2}>
      {header && (
        <HStack fontSize="lg" alignSelf="flex-start">
          <IconButton
            onClick={() => {
              router.back();
            }}
            aria-label="back"
            icon={<BiArrowBack />}
          />
          <Text>{header}</Text>
        </HStack>
      )}

      <Box>
        <Text textTransform="uppercase" color="gray.600" mb={2}>
          {label1}
        </Text>
        <SelectToken
          selectedToken={token1}
          setSelectedToken={(selectedToken) => {
            if (selectedToken === token2) setToken2(undefined);
            setToken1(selectedToken);
          }}
          amount={token1Amount}
          setAmount={setToken1Amount}
          setError={setError}
          amountOnChange={token1AmountOnChange}
        />
      </Box>

      <IconButton
        onClick={middleIconOnClick}
        aria-label="middle icon"
        icon={middleIcon}
      />

      <Box>
        <Text textTransform="uppercase" color="gray.600" mb={2}>
          {label2}
        </Text>
        <SelectToken
          selectedToken={token2}
          setSelectedToken={(selectedToken) => {
            if (selectedToken === token1) setToken2(undefined);
            else setToken2(selectedToken);
          }}
          amount={token2Amount}
          setAmount={setToken2Amount}
          setError={setError}
          amountOnChange={token2AmountOnChange}
        />
      </Box>
    </VStack>
  );
};

export default SelectTokenPair;
