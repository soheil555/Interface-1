import { tokens as allTokens } from "../../../tokens";
import { Token } from "../../../types";
import {
  Box,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";

interface TokensMenuProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedToken: (token: Token) => void;
}

const TokensList = ({ setSelectedToken, isOpen, onClose }: TokensMenuProps) => {
  const [tokens, setTokens] = useState<Token[]>(allTokens);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value.toLowerCase();
    const filteredTokens = allTokens.filter(
      (token) =>
        token.name.toLowerCase().includes(searchInput) ||
        token.symbol.toLowerCase().includes(searchInput)
    );

    setTokens(filteredTokens);
  };

  return (
    <Modal
      blockScrollOnMount={false}
      size={{ base: "xs", sm: "sm", md: "md" }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a token</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup mb={5}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              onChange={handleSearch}
              type="text"
              placeholder="Search a name"
            />
          </InputGroup>

          <Flex
            align="stretch"
            direction="column"
            border="solid"
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="lg"
            overflowY="scroll"
            maxH={{ base: 400, md: 500 }}
          >
            {tokens.length ? (
              tokens.map((token, i) => (
                <Box key={token.symbol}>
                  <Box
                    onClick={() => {
                      setSelectedToken(token);
                      onClose();
                    }}
                    cursor="pointer"
                    p={2}
                    _hover={{ bgColor: "gray.100", color: "gray.800" }}
                  >
                    <HStack gap={2}>
                      <Box>{token.logo && <token.logo fontSize="2xl" />}</Box>
                      <Box>
                        <Text fontWeight="bold">{token.name}</Text>
                        <Text>${token.symbol}</Text>
                      </Box>
                    </HStack>
                  </Box>
                  {i !== tokens.length - 1 && <Divider />}
                </Box>
              ))
            ) : (
              <Text textAlign="center" p={4} color="gray.600">
                There are no matching assets
              </Text>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TokensList;
