import type { NextPageWithLayout } from "../_app";
import {
  useToast,
  VStack,
  Button,
  Text,
  IconButton,
  Box,
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

const initialValues: SwapFormValues = {
  tokenIn: undefined,
  tokenOut: undefined,
  tokenInContract: null,
  tokenOutContract: null,
  amountIn: undefined,
  amountOut: undefined,
  tokenInBalance: undefined,
};

const Swap: NextPageWithLayout = () => {
  const toast = useToast();

  const routerContract = useRouterContract();
  const factoryContract = useFactoryContract();
  const { account, provider } = useWeb3React();
  const walletConnected =
    !!routerContract && !!factoryContract && !!account && !!provider;

  const handleSwap = async (
    {
      tokenIn,
      tokenOut,
      amountIn,
      amountOut,
      tokenInContract,
      tokenOutContract,
    }: SwapFormValues,
    { resetForm }: FormikHelpers<SwapFormValues>
  ) => {
    if (
      !walletConnected ||
      !tokenIn ||
      !tokenOut ||
      !amountIn ||
      !amountOut ||
      !tokenInContract ||
      !tokenOutContract
    )
      return;

    try {
      const amountInBigNumber = parseBalanceToBigNumber(
        amountIn,
        tokenIn.decimals
      );

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

      const timestamp = (await provider.getBlock("latest")).timestamp;

      //TODO: set amountOutMin and deadline and gasLimit
      const path = [tokenInContract.address, tokenOutContract.address];

      const tx = await routerContract.swapExactTokensForTokens(
        amountInBigNumber,
        1,
        path,
        account,
        timestamp + 10000000,
        { gasLimit: 1000000 }
      );
      await tx.wait();

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
  }: SwapFormValues) => {
    const errors: FormikErrors<SwapFormValues> = {};
    if (!tokenIn || !tokenOut) {
      errors.tokenIn = "Select a token";
      return errors;
    }

    if (!amountIn || !amountOut) {
      errors.amountIn = "Enter an amount";
      return errors;
    }

    if (
      tokenInBalance &&
      parseBalanceToBigNumber(amountIn, tokenIn.decimals).gt(tokenInBalance)
    ) {
      errors.amountIn = `Insufficient ${tokenIn.symbol} balance`;
    }

    return errors;
  };

  return (
    <Formik
      validateOnMount
      validateOnChange
      initialValues={initialValues}
      validate={validator}
      onSubmit={handleSwap}
    >
      {({ handleSubmit, isSubmitting, isValid, isValidating, errors }) => (
        <Form onSubmit={handleSubmit}>
          <VStack maxW={{ base: "250", sm: "sm", md: "md" }} gap={2}>
            <Box>
              <Text textTransform="uppercase" color="gray.600" mb={2}>
                From:
              </Text>
              <SwapSelectToken isTokenIn />
            </Box>

            <IconButton
              onClick={() => {}}
              aria-label="swap"
              icon={<IoSwapVertical />}
              fontSize="xl"
            />

            <Box>
              <Text textTransform="uppercase" color="gray.600" mb={2}>
                To:
              </Text>
              <SwapSelectToken />
            </Box>

            <Button
              type="submit"
              isLoading={isSubmitting || isValidating}
              isDisabled={!isValid || !walletConnected}
              variant="brand-2-outline"
              w="full"
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
  );
};

Swap.getLayout = Layout;

export default Swap;
