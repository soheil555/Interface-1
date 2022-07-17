import type { NextPageWithLayout } from "../_app";
import {
  useToast,
  VStack,
  Button,
  Text,
  IconButton,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoSwapVertical } from "react-icons/io5";
import useFactoryContract from "../../hooks/useFactoryContract";
import Layout from "../../components/app/Layout";
import useRouterContract from "../../hooks/useRouterContract";
import { useWeb3React } from "@web3-react/core";
import { Formik, Form, FormikErrors, FormikHelpers } from "formik";
import { SwapFormValues } from "../../types";
import { parseBalanceToBigNumber } from "../../utils";
import SwapSelectToken from "../../components/app/SelectToken/SwapSelectToken";
import { useAtom } from "jotai";
import { settingsAtom } from "../../store";
import useAddresses from "../../hooks/useAddresses";
import { Contract } from "ethers";
import ERC20ABI from "../../abis/ERC20.json";
import { ERC20 } from "../../abis/types";

const initialValues: SwapFormValues = {
  tokenIn: undefined,
  tokenOut: undefined,
  amountIn: undefined,
  amountOut: undefined,
  tokenInBalance: undefined,
  tokenInReserve: undefined,
  tokenOutReserve: undefined,
};

const Swap: NextPageWithLayout = () => {
  const [settings] = useAtom(settingsAtom);
  const toast = useToast();
  const addresses = useAddresses();
  const routerContract = useRouterContract();
  const factoryContract = useFactoryContract();
  const { account, provider } = useWeb3React();

  const walletConnected =
    !!routerContract &&
    !!factoryContract &&
    !!account &&
    !!provider &&
    !!addresses;

  const handleSwap = async (
    { tokenIn, tokenOut, amountIn, amountOut }: SwapFormValues,
    { resetForm }: FormikHelpers<SwapFormValues>
  ) => {
    if (!walletConnected || !tokenIn || !tokenOut || !amountIn || !amountOut)
      return;

    try {
      const amountInBigNumber = parseBalanceToBigNumber(
        amountIn,
        tokenIn.decimals
      );

      const tokenInaddress = addresses.tokens[tokenIn.symbol];
      const tokenOutaddress = addresses.tokens[tokenOut.symbol];

      if (tokenIn.symbol === "MATIC") {
        const path = [tokenInaddress, tokenOutaddress];

        const timestamp = (await provider.getBlock("latest")).timestamp;
        const deadline = timestamp + Number(settings.deadline) * 60;

        //TODO: set tokenOutMin and gasLimit
        const tx = await routerContract.swapExactETHForTokens(
          1,
          path,
          account,
          deadline,
          {
            gasLimit: 1000000,
            value: amountInBigNumber,
          }
        );
        await tx.wait();
      } else {
        const tokenInContract = new Contract(
          tokenInaddress,
          ERC20ABI,
          routerContract.signer
        ) as ERC20;

        const token1Allowance = await tokenInContract.allowance(
          account,
          routerContract.address
        );

        if (token1Allowance.lt(amountInBigNumber)) {
          let tx = await tokenInContract.approve(
            routerContract.address,
            amountInBigNumber
          );
          await tx.wait();
        }

        const path = [tokenInaddress, tokenOutaddress];

        const timestamp = (await provider.getBlock("latest")).timestamp;
        const deadline = timestamp + Number(settings.deadline) * 60;

        if (tokenOut.symbol === "MATIC") {
          //TODO: set tokenOutMin and gasLimit
          const tx = await routerContract.swapExactTokensForETH(
            amountInBigNumber,
            0,
            path,
            account,
            deadline,
            {
              gasLimit: 1000000,
            }
          );

          await tx.wait();
        } else {
          //TODO: set amountOutMin and gasLimit
          const tx = await routerContract.swapExactTokensForTokens(
            amountInBigNumber,
            1,
            path,
            account,
            deadline,
            { gasLimit: 1000000 }
          );
          await tx.wait();
        }
      }

      toast({
        title: "Swap",
        description: "Swapped successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      resetForm();
    } catch (error: any) {
      toast({
        title: "Swap",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const validator = ({
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    tokenInBalance,
    tokenInReserve,
    tokenOutReserve,
  }: SwapFormValues) => {
    const errors: FormikErrors<SwapFormValues> = {};
    if (!tokenIn || !tokenOut) {
      errors.tokenIn = "Select a token";
      return errors;
    }

    if (
      !tokenInReserve ||
      tokenInReserve.isZero() ||
      !tokenOutReserve ||
      tokenOutReserve.isZero()
    ) {
      errors.tokenIn = "Token reserve is zero";
      return errors;
    }

    if (!amountIn || !amountOut) {
      errors.amountIn = "Enter an amount";
      return errors;
    }

    const amountInBigNumber = parseBalanceToBigNumber(
      amountIn,
      tokenIn.decimals
    );
    const amountOutBigNumber = parseBalanceToBigNumber(
      amountOut,
      tokenOut.decimals
    );

    if (
      amountInBigNumber.gt(tokenInReserve) ||
      amountOutBigNumber.gt(tokenOutReserve)
    ) {
      errors.amountIn = "Insufficient liquidity for this trade.";
      return errors;
    }

    if (!tokenInBalance || amountInBigNumber.gt(tokenInBalance)) {
      errors.amountIn = `Insufficient ${tokenIn.symbol} balance`;
    }

    return errors;
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      boxShadow="lg"
      borderRadius="lg"
      p={4}
    >
      <Formik
        validateOnMount
        validateOnChange
        initialValues={initialValues}
        validate={validator}
        onSubmit={handleSwap}
      >
        {({
          handleSubmit,
          isSubmitting,
          isValid,
          errors,
          values,
          setValues,
        }) => (
          <Form onSubmit={handleSubmit}>
            <VStack maxW={{ base: "250", sm: "sm", md: "md" }} gap={2}>
              <Box>
                <Text textTransform="uppercase" mb={2}>
                  From:
                </Text>
                <SwapSelectToken isTokenIn />
              </Box>

              <IconButton
                isDisabled={!values.tokenIn && !values.tokenOut}
                onClick={() => {
                  const newValues = {
                    tokenIn: values.tokenOut,
                    tokenOut: values.tokenIn,
                    amountIn: values.amountOut,
                  };
                  setValues({ ...values, ...newValues });
                }}
                aria-label="swap"
                icon={<IoSwapVertical />}
                fontSize="xl"
              />

              <Box>
                <Text textTransform="uppercase" mb={2}>
                  To:
                </Text>
                <SwapSelectToken />
              </Box>

              <Button
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!isValid || !walletConnected}
                variant="brand-2-outline"
                w="full"
                fontSize={{ base: "sm", sm: "md" }}
              >
                {walletConnected
                  ? isValid
                    ? "Swap"
                    : errors.tokenIn || errors.amountIn
                  : "Connect Wallet to Continue"}
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

Swap.getLayout = Layout;

export default Swap;
