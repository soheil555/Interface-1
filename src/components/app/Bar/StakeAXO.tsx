import {
  Button,
  HStack,
  NumberInput,
  NumberInputField,
  VStack,
  FormControl,
  FormLabel,
  Text,
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import { Formik, Form, FormikErrors, FormikHelpers } from "formik";
import useUnstakedAXOBalance from "../../../hooks/useUnstakedAXOBalance";
import useXolotlContract from "../../../hooks/useXolotlContract";
import { StakeAXOFormValues } from "../../../types";
import {
  AXOForXLT,
  isNumberValid,
  parseBalance,
  parseBalanceToBigNumber,
} from "../../../utils";
import useAXOContract from "../../../hooks/useAXOContract";
import { useWeb3React } from "@web3-react/core";
import useXolotTotalSupply from "../../../hooks/useXolotTotalSupply";
import useXltBalance from "../../../hooks/useXltBalance";

const initialValues: StakeAXOFormValues = {
  amount: "",
};

const StakeAXO = () => {
  const toast = useToast();
  const axoContract = useAXOContract();
  const xolotlContract = useXolotlContract();
  const { data: xolotlTotalSupply } = useXolotTotalSupply();
  const { data: unstakedAXOBalance } = useUnstakedAXOBalance();
  const { data: xltBalance } = useXltBalance();
  const { account } = useWeb3React();
  const walletConnected = !!axoContract && !!xolotlContract && !!account;

  const handleStakeAXO = async (
    { amount }: StakeAXOFormValues,
    { resetForm }: FormikHelpers<StakeAXOFormValues>
  ) => {
    if (!walletConnected) return;

    try {
      const amountBigNumber = parseBalanceToBigNumber(amount);

      const axoAllowance = await axoContract.allowance(
        account,
        xolotlContract.address
      );

      if (axoAllowance.lt(amountBigNumber)) {
        const tx = await axoContract.approve(
          xolotlContract.address,
          amountBigNumber
        );
        await tx.wait();
      }

      const tx = await xolotlContract.enter(amountBigNumber);
      await tx.wait();

      toast({
        title: "Stake AXO",
        description: "AXO staked successfully",
        status: "success",
        isClosable: true,
        duration: 9000,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Stake AXO",
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 9000,
      });
    }

    resetForm();
  };

  const validator = ({ amount }: StakeAXOFormValues) => {
    const errors: FormikErrors<StakeAXOFormValues> = {};

    if (amount === "" || parseBalanceToBigNumber(amount).isZero()) {
      errors.amount = "Enter an amount";
      return errors;
    }

    if (
      !unstakedAXOBalance ||
      parseBalanceToBigNumber(amount).gt(unstakedAXOBalance)
    ) {
      errors.amount = "Unsufficient AXO balance";
      return errors;
    }
  };

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validate={validator}
      onSubmit={handleStakeAXO}
    >
      {({ setFieldValue, values, isValid, isSubmitting, errors }) => {
        return (
          <Form>
            <VStack mt={5} gap={2}>
              <FormControl>
                <FormLabel>
                  <HStack justify="space-between">
                    <Text>Stake AXO</Text>
                    <Text variant="subtext" fontSize="sm"></Text>
                  </HStack>
                </FormLabel>

                <HStack>
                  <NumberInput
                    w="full"
                    value={values.amount}
                    onChange={(value) => {
                      isNumberValid(value) && setFieldValue("amount", value);
                    }}
                  >
                    <NumberInputField placeholder="0 AXO" />
                  </NumberInput>
                  <Button
                    onClick={() => {
                      unstakedAXOBalance &&
                        setFieldValue(
                          "amount",
                          parseBalance(unstakedAXOBalance)
                        );
                    }}
                  >
                    MAX
                  </Button>
                </HStack>
                <FormHelperText>
                  {xolotlTotalSupply &&
                  unstakedAXOBalance &&
                  xltBalance &&
                  values.amount.length > 0 ? (
                    <>
                      You will receive:{" "}
                      {parseBalance(
                        AXOForXLT(
                          parseBalanceToBigNumber(values.amount),
                          xolotlTotalSupply,
                          xltBalance,
                          unstakedAXOBalance
                        )
                      )}{" "}
                      XLT
                    </>
                  ) : null}
                </FormHelperText>
              </FormControl>
              <Button
                w="full"
                isDisabled={!isValid || !walletConnected}
                isLoading={isSubmitting}
                type="submit"
              >
                {errors.amount ? errors.amount : "Stake"}
              </Button>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default StakeAXO;
