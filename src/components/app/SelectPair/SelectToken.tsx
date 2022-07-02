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
import TokensMenu from "./TokensMenu";

interface SelectTokenProps {
  selectedToken: Token | undefined;
  setSelectedToken: (token: Token) => void;
  amount?: string;
  setAmount?: (amount: string) => void;
}

const SelectToken = ({
  selectedToken,
  setSelectedToken,
  amount,
  setAmount,
}: SelectTokenProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

            {amount && (
              <Text fontSize="sm" color="gray.600">
                Balance 0.00
              </Text>
            )}
          </HStack>

          {amount && setAmount ? (
            <>
              <Divider />
              <HStack py={8} px={4} justify="space-between">
                <NumberInput p={0}>
                  <NumberInputField
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    border="none"
                    placeholder="0.00"
                    fontSize="2xl"
                  />
                </NumberInput>

                <Button fontSize="sm">MAX</Button>
              </HStack>
            </>
          ) : null}
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

      <TokensMenu
        setSelectedToken={setSelectedToken}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default SelectToken;
