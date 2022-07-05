import type { NextPageWithLayout } from "../../_app";
import { useToast, VStack, Button } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import useFactoryContract from "../../../hooks/useFactoryContract";
import Layout from "../../../components/app/Layout";
import SelectTokenPair from "../../../components/app/SelectPair/SelectTokenPair";
import useRouterContract from "../../../hooks/useRouterContract";
import { useWeb3React } from "@web3-react/core";
import { Formik, Form, FormikErrors } from "formik";
import { FormValues } from "../../../types";
import { parseBalanceToBigNumber } from "../../../utils";

const initialValues: FormValues = {
  token1: undefined,
  token2: undefined,
  token1Contract: null,
  token2Contract: null,
  token1Amount: undefined,
  token2Amount: undefined,
};

const AddLiquidity: NextPageWithLayout = () => {
  const toast = useToast();
  const routerContract = useRouterContract();
  const factoryContract = useFactoryContract();
  const { account, provider } = useWeb3React();
  const walletConnected =
    !!routerContract && !!factoryContract && !!account && !!provider;

  const handleAddLiquidity = async ({
    token1,
    token2,
    token1Amount,
    token2Amount,
    token1Contract,
    token2Contract,
  }: FormValues) => {
    if (
      !factoryContract ||
      !routerContract ||
      !account ||
      !provider ||
      !token1 ||
      !token2 ||
      !token1Amount ||
      !token2Amount ||
      !token1Contract ||
      !token2Contract
    )
      return;

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
        token1Contract.address,
        token2Contract.address,
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
  };

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validate={(values) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.token1 || !values.token2) {
          errors.token1 = "Invalid token pair";
        }

        if (!values.token1Amount || !values.token2Amount) {
          errors.token1Amount = "Enter an amount";
        }

        return errors;
      }}
      onSubmit={handleAddLiquidity}
    >
      {({ handleSubmit, isSubmitting, isValid, isValidating, errors }) => (
        <Form onSubmit={handleSubmit}>
          <VStack gap={2}>
            <SelectTokenPair
              middleIcon={<AiOutlinePlus />}
              header="Add Liquidity"
            />

            <Button
              type="submit"
              isLoading={isSubmitting || isValidating}
              isDisabled={!isValid || !walletConnected}
              variant="brand-2-outline"
              w="full"
            >
              {walletConnected
                ? isValid
                  ? "Add Liquidity"
                  : errors.token1 || errors.token1Amount || errors.token2Amount
                : "Connect Wallet to Continue"}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

AddLiquidity.getLayout = Layout;

export default AddLiquidity;
