import type { NextPageWithLayout } from "../../_app";
import { useEffect, useState } from "react";
import { useToast, VStack, Button } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { Token } from "../../../tokens";
import useAddresses from "../../../hooks/useAddresses";
import useFactoryContract from "../../../hooks/useFactoryContract";
import { ethers } from "ethers";
import Layout from "../../../components/app/Layout";
import SelectTokenPair from "../../../components/app/SelectPair/SelectTokenPair";
import useRouterContract from "../../../hooks/useRouterContract";
import usePairReserves from "../../../hooks/usePairReserves";
import { parseBalanceToBigNumber } from "../../../utils";
import { useWeb3React } from "@web3-react/core";
import useTokenContract from "../../../hooks/useTokenContract";
import useTokenPairAddresses from "../../../hooks/useTokenPairAddresses";

const AddLiquidity: NextPageWithLayout = () => {
  const [token1, setToken1] = useState<Token>();
  const [token1Amount, setToken1Amount] = useState<string>();
  const [token2, setToken2] = useState<Token>();
  const [token2Amount, setToken2Amount] = useState<string>();

  const [error, setError] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const addresses = useAddresses();
  const routerContract = useRouterContract();
  const factoryContract = useFactoryContract();
  const { account, provider } = useWeb3React();

  const { token1Address, token2Address } = useTokenPairAddresses(
    token1,
    token2
  );
  const token1Contract = useTokenContract(token1Address);
  const token2Contract = useTokenContract(token2Address);

  const { data: pairReserves } = usePairReserves(token1, token2);

  const token1AmountOnChange = async (amount: string) => {
    setToken1Amount(amount);
  };

  const token2AmountOnChange = (amount: string) => {
    setToken2Amount(amount);
  };

  const handleAddLiquidity = async () => {
    if (
      !addresses ||
      !factoryContract ||
      !routerContract ||
      !token1 ||
      !token2 ||
      !token1Amount ||
      !token2Amount ||
      !account ||
      !provider ||
      !token1Address ||
      !token2Address ||
      !token1Contract ||
      !token2Contract
    )
      return;

    setIsLoading(true);
    try {
      const amount1 = parseBalanceToBigNumber(token1Amount, token1.decimals);
      const amount2 = parseBalanceToBigNumber(token2Amount, token2.decimals);

      const token1Allowance = await token1Contract.allowance(
        account,
        routerContract.address
      );

      const token2Allowance = await token2Contract.allowance(
        account,
        routerContract.address
      );

      if (token1Allowance.lt(amount1)) {
        let tx = await token1Contract.approve(routerContract.address, amount1);
        await tx.wait();
      }

      if (token2Allowance.lt(amount2)) {
        let tx = await token2Contract.approve(routerContract.address, amount2);
        await tx.wait();
      }

      const timestamp = (await provider.getBlock("latest")).timestamp;

      let tx = await routerContract.addLiquidity(
        token1Address,
        token2Address,
        amount1,
        amount2,
        1,
        1,
        account,
        timestamp + 10000000,
        { gasLimit: 1000000 }
      );

      await tx.wait();

      toast({
        title: "Add liquidity",
        description: "Liquidity added successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Add liquidity",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <VStack gap={2}>
      <SelectTokenPair
        token1={token1}
        setToken1={setToken1}
        token2={token2}
        setToken2={setToken2}
        token1Amount={token1Amount}
        token2Amount={token2Amount}
        setToken1Amount={setToken1Amount}
        setToken2Amount={setToken2Amount}
        setError={setError}
        token1AmountOnChange={token1AmountOnChange}
        token2AmountOnChange={token2AmountOnChange}
        middleIcon={<AiOutlinePlus />}
        header="Add Liquidity"
      />

      <Button
        isLoading={isLoading}
        isDisabled={!!error}
        onClick={handleAddLiquidity}
        variant="brand-2-outline"
        w="full"
      >
        {error ?? "Add Liquidity"}
      </Button>
    </VStack>
  );
};

AddLiquidity.getLayout = Layout;

export default AddLiquidity;
