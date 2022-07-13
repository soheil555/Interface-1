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
import useFarmUserInfo from "../../../hooks/useFarmUserInfo";
import { Formik, Form, FormikErrors, FormikHelpers } from "formik";
import {
  parseBalance,
  parseBalanceToBigNumber,
  parseValue,
} from "../../../utils";
import { UnstakeFormValues } from "../../../types";
import useLiquidityInfo from "../../../hooks/useLiquidityInfo";
import useTokenInfo from "../../../hooks/useTokenInfo";
import useMasterChefContract from "../../../hooks/useMasterChefContract";

interface HarvestButtonProps {
  pid: number;
  lpToken: string;
}

const initialValues: UnstakeFormValues = {
  amount: "",
};

const HarvestButton = ({ pid, lpToken }: HarvestButtonProps) => {
  const toast = useToast();
  const tokens = useLiquidityInfo(lpToken);
  const token0Info = useTokenInfo(tokens?.token0);
  const token1Info = useTokenInfo(tokens?.token1);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: userInfo } = useFarmUserInfo(pid);
  const isHarvestAvailable = userInfo && !userInfo.amount.isZero();
  const masterChefContract = useMasterChefContract();

  const handleUnstake = async (
    { amount }: UnstakeFormValues,
    { resetForm }: FormikHelpers<UnstakeFormValues>
  ) => {
    if (!masterChefContract) return;
    try {
      const amountBigNumber = parseBalanceToBigNumber(amount);

      const tx = await masterChefContract.withdraw(pid, amountBigNumber, {
        gasLimit: "1000000",
      });
      await tx.wait();

      toast({
        title: "Unstake liquidity",
        description: "Unstaked successfully",
        status: "success",
        duration: 9000,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Unstake liquidity",
        description: error.message,
        status: "error",
        duration: 9000,
      });
    }

    resetForm();
    onClose();
  };
  const validator = ({ amount }: UnstakeFormValues) => {
    const errors: FormikErrors<UnstakeFormValues> = {};

    if (amount.length === 0 || parseBalanceToBigNumber(amount).isZero()) {
      errors.amount = "Enter an amount";
      return errors;
    }

    if (userInfo && parseBalanceToBigNumber(amount).gt(userInfo.amount)) {
      errors.amount = `Insufficient LP balance`;
    }

    return errors;
  };

  return (
    <>
      <Button
        onClick={onOpen}
        disabled={!isHarvestAvailable}
        colorScheme="brand"
      >
        Harvest
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Unstake liquidity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              validateOnChange
              validateOnMount
              initialValues={initialValues}
              onSubmit={handleUnstake}
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
                        isInvalid={!!touched.amount && !!errors.amount}
                      >
                        <FormLabel>
                          <HStack justify="space-between">
                            <Text>LP Token Amount</Text>
                            <Text variant="gray" fontSize="sm">
                              Balance{" "}
                              {userInfo
                                ? parseBalance(userInfo.amount)
                                : "0.00"}
                            </Text>
                          </HStack>
                        </FormLabel>
                        <HStack>
                          <NumberInput
                            w="full"
                            value={values.amount}
                            onChange={(value) => {
                              value = parseValue(value);
                              setFieldValue("amount", value);
                            }}
                          >
                            <NumberInputField />
                          </NumberInput>

                          <Button
                            onClick={() => {
                              userInfo &&
                                setFieldValue(
                                  "amount",
                                  parseBalance(userInfo.amount)
                                );
                            }}
                          >
                            MAX
                          </Button>
                        </HStack>

                        <FormHelperText>
                          unstake your {token0Info?.symbol} /{" "}
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
                          {errors.amount ? errors.amount : "Unstake"}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HarvestButton;
