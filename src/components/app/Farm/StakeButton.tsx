import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInput,
  NumberInputField,
  HStack,
  useToast,
} from "@chakra-ui/react";
import useLiquidityInfo from "../../../hooks/useLiquidityInfo";
import useTokenInfo from "../../../hooks/useTokenInfo";
import NextLink from "next/link";
import useTokenBalanceByAddress from "../../../hooks/useTokenBalanceByAddress";
import { Formik, Form, FormikHelpers, FormikErrors, Field } from "formik";
import { StakeFormValues } from "../../../types";
import { parseBalanceToBigNumber, parseValue } from "../../../utils";
import useMasterChefContract from "../../../hooks/useMasterChefContract";

interface StakeButtonProps {
  pid: number;
  lpToken: string;
}

const initialValues: StakeFormValues = {
  amount: "",
};

const StakeButton = ({ pid, lpToken }: StakeButtonProps) => {
  const toast = useToast();
  const { data: lpTokenBalance } = useTokenBalanceByAddress(lpToken);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const tokens = useLiquidityInfo(lpToken);
  const token0Info = useTokenInfo(tokens?.token0);
  const token1Info = useTokenInfo(tokens?.token1);
  const masterChefContract = useMasterChefContract();

  const handleStake = async (
    { amount }: StakeFormValues,
    { resetForm }: FormikHelpers<StakeFormValues>
  ) => {
    if (!masterChefContract) return;

    const tx = await masterChefContract.deposit(
      pid,
      parseBalanceToBigNumber(amount)
    );
    await tx.wait();

    toast({
      title: "Stake liquidity",
      description: "Staked successfully",
      status: "success",
      duration: 9000,
    });
    try {
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Stake liquidity",
        description: error.message,
        status: "error",
        duration: 9000,
      });
    }

    resetForm();
    onClose();
  };
  const validator = ({ amount }: StakeFormValues) => {
    const errors: FormikErrors<StakeFormValues> = {};

    if (amount.length === 0 || parseBalanceToBigNumber(amount).isZero()) {
      errors.amount = "Enter an amount";
      return errors;
    }

    if (lpTokenBalance && parseBalanceToBigNumber(amount).gt(lpTokenBalance)) {
      errors.amount = `Insufficient LP balance`;
    }

    return errors;
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="brand">
        Stake
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stake liquidity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {lpTokenBalance && lpTokenBalance.gt(0) ? (
              <Formik
                validateOnChange
                validateOnMount
                initialValues={initialValues}
                onSubmit={handleStake}
                validate={validator}
              >
                {({
                  isSubmitting,
                  isValid,
                  isValidating,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => {
                  return (
                    <Form>
                      <VStack align="stretch" gap={2}>
                        <FormControl
                          isRequired
                          isInvalid={!!touched.amount && !!errors.amount}
                        >
                          <FormLabel>Amount</FormLabel>
                          <NumberInput
                            value={values.amount}
                            onChange={(value) => {
                              value = parseValue(value);
                              setFieldValue("amount", value);
                            }}
                          >
                            <NumberInputField />
                          </NumberInput>
                          <FormHelperText>
                            Stake your {token0Info?.symbol} /{" "}
                            {token1Info?.symbol} pool tokens
                          </FormHelperText>
                        </FormControl>

                        <HStack gap={3} flexDir="row-reverse">
                          <Button
                            isDisabled={!isValid || !masterChefContract}
                            isLoading={isSubmitting || isValidating}
                            type="submit"
                            colorScheme="brand"
                          >
                            {errors.amount ? errors.amount : "Stake"}
                          </Button>
                          <Button
                            onClick={onClose}
                            colorScheme="brand"
                            variant="outline"
                          >
                            Cancel
                          </Button>
                        </HStack>
                      </VStack>
                    </Form>
                  );
                }}
              </Formik>
            ) : (
              <VStack p={5} gap={10}>
                <Text fontSize="lg" textAlign="center">
                  You can stake your {token0Info?.symbol} / {token1Info?.symbol}{" "}
                  pool tokens in this area. However, you do not have enough{" "}
                  {token0Info?.symbol} / {token1Info?.symbol} pool tokens yet.
                </Text>
                <NextLink href="/app/pool/add-liquidity">
                  <Button variant="brand-2-outline">
                    Add liquidity to {token0Info?.symbol} / {token1Info?.symbol}
                  </Button>
                </NextLink>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StakeButton;
