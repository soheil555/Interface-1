import type { NextPageWithLayout } from "../../_app";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import SelectPair from "../../../components/app/SelectPair/SelectTokenPair";
import { AiOutlinePlus } from "react-icons/ai";
import Layout from "../../../components/app/Layout";
import { Token } from "../../../tokens";
import useAddresses from "../../../hooks/useAddresses";
import useFactoryContract from "../../../hooks/useFactoryContract";
import { ethers } from "ethers";

const AddLiquidity: NextPageWithLayout = () => {
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

  const handleAddLiquidity = () => {};

  return (
    <SelectPair
      header="Add Liquidity"
      middleIcon={<AiOutlinePlus />}
      handler={handleAddLiquidity}
      action="add liquidity"
    />
  );
};

AddLiquidity.getLayout = Layout;

export default AddLiquidity;
