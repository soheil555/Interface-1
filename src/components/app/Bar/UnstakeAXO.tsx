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
} from "@chakra-ui/react";
import { Formik, Form, FormikErrors, FormikHelpers } from "formik";
import useXolotlContract from "../../../hooks/useXolotlContract";
import { UnstakeAXOFormValues } from "../../../types";
import {
  isNumberValid,
  parseBalance,
  parseBalanceToBigNumber,
} from "../../../utils";
import useAXOContract from "../../../hooks/useAXOContract";
import { useWeb3React } from "@web3-react/core";
import useXltBalance from "../../../hooks/useXltBalance";

const initialValues: UnstakeAXOFormValues = {
  amount: "",
};

const UnstakeAXO = () => {
  const toast = useToast();
  const axoContract = useAXOContract();
  const xolotlContract = useXolotlContract();
  const { data: xltBalance } = useXltBalance();
  const { account } = useWeb3React();
  const walletConnected = !!axoContract && !!xolotlContract && !!account;

  const handleUnstakeAXO = async (
    { amount }: UnstakeAXOFormValues,
    { resetForm }: FormikHelpers<UnstakeAXOFormValues>
  ) => {
    if (!walletConnected) return;

    try {
      const amountBigNumber = parseBalanceToBigNumber(amount);

      const tx = await xolotlContract.leave(amountBigNumber);
      await tx.wait();

      toast({
        title: "Unstake AXO",
        description: "AXO unstaked successfully",
        status: "success",
        isClosable: true,
        duration: 9000,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Unstake AXO",
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 9000,
      });
    }

    resetForm();
  };

  const validator = ({ amount }: UnstakeAXOFormValues) => {
    const errors: FormikErrors<UnstakeAXOFormValues> = {};

    if (amount === "") {
      errors.amount = "Enter an amount";
      return errors;
    }

    if (!xltBalance || parseBalanceToBigNumber(amount).gt(xltBalance)) {
      errors.amount = "Unsufficient XLT balance";
      return errors;
    }
  };

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      validate={validator}
      onSubmit={handleUnstakeAXO}
    >
      {({ setFieldValue, values, isValid, isSubmitting, errors }) => {
        return (
          <Form>
            <VStack mt={5} gap={2}>
              <FormControl>
                <FormLabel>
                  <HStack justify="space-between">
                    <Text>Unstake</Text>
                    <Text variant="gray" fontSize="sm"></Text>
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
                    <NumberInputField placeholder="0 XLT" />
                  </NumberInput>
                  <Button
                    onClick={() => {
                      xltBalance &&
                        setFieldValue("amount", parseBalance(xltBalance));
                    }}
                  >
                    MAX
                  </Button>
                </HStack>
              </FormControl>
              <Button
                w="full"
                isDisabled={!isValid || !walletConnected}
                isLoading={isSubmitting}
                type="submit"
                colorScheme="brand"
              >
                {errors.amount ? errors.amount : "Unstake"}
              </Button>
            </VStack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UnstakeAXO;
