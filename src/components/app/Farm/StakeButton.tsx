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
import {
  parseBalance,
  parseBalanceToBigNumber,
  isNumberValid,
} from "../../../utils";
import useMasterChefContract from "../../../hooks/useMasterChefContract";
import useERC20Contract from "../../../hooks/useERC20Contract";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

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
  const lpTokenContract = useERC20Contract(lpToken);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const tokens = useLiquidityInfo(lpToken);
  const token0Info = useTokenInfo(tokens?.token0);
  const token1Info = useTokenInfo(tokens?.token1);
  const masterChefContract = useMasterChefContract();
  const { account } = useWeb3React();

  const walletConnected =
    !!masterChefContract && !!lpTokenContract && !!account;

  const handleStake = async (
    { amount }: StakeFormValues,
    { resetForm }: FormikHelpers<StakeFormValues>
  ) => {
    if (!walletConnected) return;
    try {
      const amountBigNumber = parseBalanceToBigNumber(amount);

      const lpTokenAllowance = await lpTokenContract.allowance(
        account,
        masterChefContract.address
      );

      if (lpTokenAllowance.lt(amountBigNumber)) {
        const tx = await lpTokenContract.approve(
          masterChefContract.address,
          amountBigNumber
        );
        await tx.wait();
      }

      const tx = await masterChefContract.deposit(pid, amountBigNumber, {
        gasLimit: "1000000",
      });
      await tx.wait();

      toast({
        title: "Stake liquidity",
        description: "Staked successfully",
        status: "success",
        isClosable: true,
        duration: 9000,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Stake liquidity",
        description: error.message,
        status: "error",
        isClosable: true,
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
      <Button onClick={onOpen}>Stake</Button>

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
                              <Text variant="subtext" fontSize="sm">
                                Balance{" "}
                                {lpTokenBalance.lte(
                                  ethers.utils.parseEther("0.000001")
                                )
                                  ? parseBalance(lpTokenBalance, 18, 18)
                                  : parseBalance(lpTokenBalance)}
                              </Text>
                            </HStack>
                          </FormLabel>
                          <HStack>
                            <NumberInput
                              w="full"
                              value={values.amount}
                              onChange={(value) => {
                                isNumberValid(value) &&
                                  setFieldValue("amount", value);
                              }}
                            >
                              <NumberInputField />
                            </NumberInput>

                            <Button
                              onClick={() => {
                                setFieldValue(
                                  "amount",
                                  lpTokenBalance.lte(
                                    ethers.utils.parseEther("0.000001")
                                  )
                                    ? parseBalance(lpTokenBalance, 18, 18)
                                    : parseBalance(lpTokenBalance)
                                );
                              }}
                            >
                              MAX
                            </Button>
                          </HStack>

                          <FormHelperText>
                            Stake your {token0Info?.symbol} /{" "}
                            {token1Info?.symbol} pool tokens
                          </FormHelperText>
                        </FormControl>

                        <HStack gap={3} flexDir="row-reverse">
                          <Button
                            isDisabled={!isValid || !walletConnected}
                            isLoading={isSubmitting}
                            type="submit"
                          >
                            {errors.amount ? errors.amount : "Stake"}
                          </Button>
                          <Button onClick={onClose} variant="outline">
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
