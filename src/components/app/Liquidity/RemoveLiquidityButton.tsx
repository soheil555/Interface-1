import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  VStack,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import useERC20Contract from "../../../hooks/useERC20Contract";
import useRouterContract from "../../../hooks/useRouterContract";
import useTokenInfo from "../../../hooks/useTokenInfo";
import { Liquidity, RemoveLiquidityFormValues } from "../../../types";
import { parseBalance } from "../../../utils";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";

interface RemoveLiquidityButtonProps {
  liquidity: Liquidity;
}

const initialValues: RemoveLiquidityFormValues = {
  percent: 50,
};

const RemoveLiquidityButton = ({ liquidity }: RemoveLiquidityButtonProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token0Info = useTokenInfo(liquidity.token0);
  const token1Info = useTokenInfo(liquidity.token1);
  const { account } = useWeb3React();
  const router = useRouterContract();
  const liquidityERC20Contract = useERC20Contract(liquidity.address);
  const walletConnected = !!router && !!liquidityERC20Contract && !!account;

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  const handleRemoveLiquidity = async (
    { percent }: RemoveLiquidityFormValues,
    actions: FormikHelpers<RemoveLiquidityFormValues>
  ) => {
    if (!walletConnected) return;

    try {
      let tx = await liquidityERC20Contract.approve(
        router.address,
        liquidity.liquidityBalance
      );
      await tx.wait();

      const amountToRemove = liquidity.liquidityBalance.mul(percent).div(100);

      const timestamp = (await router.provider.getBlock("latest")).timestamp;

      tx = await router.removeLiquidity(
        liquidity.token0,
        liquidity.token1,
        amountToRemove,
        1,
        1,
        account,
        timestamp + 10000000,
        { gasLimit: 1000000 }
      );
      await tx.wait();

      toast({
        title: "Removed liquidity",
        description: "Liquidity removed successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      onClose();
      actions.resetForm();
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Removed liquidity",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }
  };

  const validator = ({ percent }: RemoveLiquidityFormValues) => {
    const errors: FormikErrors<RemoveLiquidityFormValues> = {};

    if (percent === 0) {
      errors.percent = "Percentage must be greater than 0";
    }

    return errors;
  };

  if (!token0Info || !token1Info) return null;

  return (
    <>
      <Button onClick={onOpen}>Remove</Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            validateOnMount
            validateOnChange
            initialValues={initialValues}
            validate={validator}
            onSubmit={handleRemoveLiquidity}
          >
            {({
              handleSubmit,
              isSubmitting,
              isValid,
              isValidating,
              errors,
              values,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <ModalHeader>Remove Amount</ModalHeader>
                <ModalCloseButton />
                <ModalBody py={5} px={10}>
                  <Slider
                    mb={10}
                    value={values.percent}
                    onChange={(value) => setFieldValue("percent", value)}
                    aria-label="remove-liquidity-amount"
                    colorScheme="brand"
                    defaultValue={30}
                  >
                    <SliderMark value={25} {...labelStyles}>
                      25%
                    </SliderMark>
                    <SliderMark value={50} {...labelStyles}>
                      50%
                    </SliderMark>
                    <SliderMark value={75} {...labelStyles}>
                      75%
                    </SliderMark>
                    <SliderMark
                      value={values.percent}
                      textAlign="center"
                      bg="brand.500"
                      color="white"
                      mt="-10"
                      ml="-5"
                      w="12"
                    >
                      {values.percent}%
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>

                  <VStack fontSize="xl" align="stretch">
                    <HStack justify="space-between">
                      <Text>
                        {parseBalance(
                          liquidity.amount0.mul(values.percent).div(100),
                          token0Info.decimals
                        )}
                      </Text>

                      <HStack>
                        <token0Info.logo />
                        <Text>{token0Info.symbol}</Text>
                      </HStack>
                    </HStack>

                    <HStack justify="space-between">
                      <Text>
                        {parseBalance(
                          liquidity.amount1.mul(values.percent).div(100),
                          token1Info.decimals
                        )}
                      </Text>

                      <HStack>
                        <token1Info.logo />
                        <Text>{token1Info.symbol}</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    isDisabled={!isValid || !walletConnected}
                    isLoading={isSubmitting || isValidating}
                    colorScheme="brand"
                  >
                    Remove
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemoveLiquidityButton;
