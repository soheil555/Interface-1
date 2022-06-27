import type { NextPageWithLayout } from "../_app";
import { type ReactElement, useState, useEffect } from "react";
import { Token } from "../../tokens";
import {
  Box,
  Container,
  Text,
  VStack,
  IconButton,
  Button,
} from "@chakra-ui/react";
import AppHeader from "../../components/common/Header/AppHeader";
import Tabs from "../../components/app/Tabs";
import SelectToken from "../../components/app/SelectToken/SelectToken";
import { IoSwapVertical } from "react-icons/io5";

const Swap: NextPageWithLayout = () => {
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
      <Box>
        <Text color="gray.600" mb={2}>
          FROM
        </Text>
        <SelectToken
          selectedToken={token1}
          setSelectedToken={setToken1}
          amount={token1Amount}
          setAmount={setToken1Amount}
        />
      </Box>

      <IconButton aria-label="swap" icon={<IoSwapVertical />} />

      <Box>
        <Text color="gray.600" mb={2}>
          To
        </Text>
        <SelectToken
          selectedToken={token2}
          setSelectedToken={setToken2}
          amount={token2Amount}
          setAmount={setToken2Amount}
        />
      </Box>
      <Button variant="brand-2-outline" w="full">
        SWAP
      </Button>
    </VStack>
  );
};

Swap.getLayout = (page: ReactElement) => {
  return (
    <>
      <AppHeader />
      <Tabs />
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="center"
        pt={20}
        pb={40}
      >
        {page}
      </Container>
    </>
  );
};

export default Swap;
