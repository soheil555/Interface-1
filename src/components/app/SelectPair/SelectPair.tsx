import {
  Box,
  Text,
  VStack,
  IconButton,
  Button,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { Token } from "../../../tokens";
import SelectToken from "./SelectToken";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";

interface SelectPairProps {
  header?: string;
  label1?: string;
  label2?: string;
  icon: JSX.Element;
  handle: () => void;
  action: string;
}

const SelectPair = ({
  header,
  label1,
  label2,
  icon,
  handle,
  action,
}: SelectPairProps) => {
  const router = useRouter();
  const [token1, setToken1] = useState<Token>();
  const [token1Amount, setToken1Amount] = useState("0");

  const [token2, setToken2] = useState<Token>();
  const [token2Amount, setToken2Amount] = useState("0");

  useEffect(() => {
    if (token1 === token2) {
      setToken2(undefined);
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
        onClick={() => {
          const tmp = token1;
          setToken1(token2);
          setToken2(tmp);
        }}
        aria-label="swap tokens"
        icon={icon}
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
      <Button onClick={handle} variant="brand-2-outline" w="full">
        {action}
      </Button>
    </VStack>
  );
};

export default SelectPair;
