import type { NextPageWithLayout } from "../../_app";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { Token } from "../../../tokens";
import useAddresses from "../../../hooks/useAddresses";
import useFactoryContract from "../../../hooks/useFactoryContract";
import { ethers } from "ethers";
import Layout from "../../../components/app/Layout";
import SelectTokenPair from "../../../components/app/SelectPair/SelectTokenPair";

const CreatePair: NextPageWithLayout = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const addresses = useAddresses();
  const factoryContract = useFactoryContract();

  const [token1, setToken1] = useState<Token>();
  const [token2, setToken2] = useState<Token>();

  useEffect(() => {
    if (!factoryContract || !addresses) {
      setError("Connect Wallet to continue");
      return;
    }

    if (!token1 || !token2) {
      setError("Invalid Token pair");
      return;
    }

    (async () => {
      setIsLoading(true);

      const token1Address = addresses.tokens[token1.symbol];
      const token2Address = addresses.tokens[token2.symbol];
      try {
        const pair = await factoryContract.getPair(
          token1Address,
          token2Address
        );
        if (pair !== ethers.constants.AddressZero) {
          setError("Pair already exists");
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      setIsLoading(false);
      return;
    })();

    setError(undefined);
  }, [factoryContract, addresses, token1, token2]);

  const handleCreatePair = async () => {
    if (!addresses || !factoryContract || !token1 || !token2) return;

    const token1Address = addresses.tokens[token1.symbol];
    const token2Address = addresses.tokens[token2.symbol];

    setIsLoading(true);
    try {
      const createPairTx = await factoryContract.createPair(
        token1Address,
        token2Address
      );
      await createPairTx.wait();
      setError("Pair already exists");
      toast({
        title: "Create Pair",
        description: "Pair created successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Create Pair",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <SelectTokenPair
      token1={token1}
      setToken1={setToken1}
      token2={token2}
      setToken2={setToken2}
      middleIcon={<AiOutlinePlus />}
      handler={handleCreatePair}
      action="Create Pair"
      header="Create a Pair"
      error={error}
      setError={setError}
      isLoading={isLoading}
    />
  );
};

CreatePair.getLayout = Layout;

export default CreatePair;
