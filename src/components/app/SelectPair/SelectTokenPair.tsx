import {
  Box,
  Text,
  VStack,
  IconButton,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import type { Token } from "../../../tokens";
import SelectToken from "./SelectToken";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";

interface SelectTokenPairProps {
  token1: Token | undefined;
  token2: Token | undefined;
  setToken1: (token: Token | undefined) => void;
  setToken2: (token: Token | undefined) => void;
  middleIcon: JSX.Element;
  middleIconOnClick?: () => void;
  handler: () => void;
  action: string;
  token1Amount?: string;
  setToken1Amount?: (amount: string) => void;
  token2Amount?: string;
  setToken2Amount?: (amount: string) => void;
  header?: string;
  label1?: string;
  label2?: string;
  error?: string;
  setError: (error: string | undefined) => void;
  isLoading: boolean;
}

const SelectTokenPair = ({
  token1,
  token2,
  setToken1,
  setToken2,
  middleIcon,
  middleIconOnClick,
  handler,
  action,
  token1Amount,
  token2Amount,
  setToken1Amount,
  setToken2Amount,
  header,
  label1,
  label2,
  error,
  setError,
  isLoading,
}: SelectTokenPairProps) => {
  const router = useRouter();

  useEffect(() => {
    if (token1 && token1 === token2) {
      setToken2(undefined);
      return;
    }

    if (!token1 || !token2) {
      setError("Invalid Token pair");
      return;
    }
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
          setSelectedToken={setToken1}
          amount={token1Amount}
          setAmount={setToken1Amount}
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
          setSelectedToken={setToken2}
          amount={token2Amount}
          setAmount={setToken2Amount}
        />
      </Box>
      <Button
        isLoading={isLoading}
        isDisabled={!!error}
        onClick={handler}
        variant="brand-2-outline"
        w="full"
      >
        {error ?? action}
      </Button>
    </VStack>
  );
};

export default SelectTokenPair;
