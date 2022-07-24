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
  Checkbox,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import useERC20Contract from "../../../hooks/useERC20Contract";
import useRouterContract from "../../../hooks/useRouterContract";
import useTokenInfo from "../../../hooks/useTokenInfo";
import { Liquidity, RemoveLiquidityFormValues } from "../../../types";
import { amountWithSlippage, parseBalance } from "../../../utils";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import { useAtom } from "jotai";
import { settingsAtom } from "../../../store";
import { BigNumber } from "ethers";

interface RemoveLiquidityButtonProps {
  liquidity: Liquidity;
}

const initialValues: RemoveLiquidityFormValues = {
  percent: 50,
};

const RemoveLiquidityButton = ({ liquidity }: RemoveLiquidityButtonProps) => {
  const [settings] = useAtom(settingsAtom);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token0Info = useTokenInfo(liquidity.token0);
  const token1Info = useTokenInfo(liquidity.token1);
  const { account } = useWeb3React();
  const routerContract = useRouterContract();
  const liquidityERC20Contract = useERC20Contract(liquidity.address);
  const walletConnected =
    !!routerContract &&
    !!liquidityERC20Contract &&
    !!account &&
    !!token0Info &&
    !!token1Info;
  const isOneOfTokenswMatic =
    token0Info?.symbol === "wMATIC" || token1Info?.symbol === "wMATIC";

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  const handleRemoveLiquidity = async (
    { percent, receiveMatic }: RemoveLiquidityFormValues,
    actions: FormikHelpers<RemoveLiquidityFormValues>
  ) => {
    if (!walletConnected) return;

    try {
      const amountToRemove = liquidity.liquidityBalance.mul(percent).div(100);
      const token0Amount = liquidity.amount0.mul(percent).div(100);
      const token1Amount = liquidity.amount1.mul(percent).div(100);

      const tokenAllowance = await liquidityERC20Contract.allowance(
        account,
        routerContract.address
      );
      if (tokenAllowance.lt(amountToRemove)) {
        let tx = await liquidityERC20Contract.approve(
          routerContract.address,
          amountToRemove
        );
        await tx.wait();
      }

      const timestamp = (await routerContract.provider.getBlock("latest"))
        .timestamp;
      const deadline = timestamp + Number(settings.deadline) * 60;

      if (isOneOfTokenswMatic && receiveMatic) {
        const tokenAddress =
          token0Info.symbol === "wMATIC" ? liquidity.token1 : liquidity.token0;

        let tx = await routerContract.removeLiquidityETH(
          tokenAddress,
          amountToRemove,
          amountWithSlippage(token0Amount, settings.slippage),
          amountWithSlippage(token1Amount, settings.slippage),
          account,
          deadline
        );
        await tx.wait();
      } else {
        let tx = await routerContract.removeLiquidity(
          liquidity.token0,
          liquidity.token1,
          amountToRemove,
          amountWithSlippage(token0Amount, settings.slippage),
          amountWithSlippage(token1Amount, settings.slippage),
          account,
          deadline,
          { gasLimit: 1000000 }
        );
        await tx.wait();
      }

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

                  <VStack gap={1} fontSize="xl" align="stretch">
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

                    {isOneOfTokenswMatic ? (
                      <Checkbox
                        size="lg"
                        isChecked={values.receiveMatic}
                        onChange={() => {
                          setFieldValue("receiveMatic", !values.receiveMatic);
                        }}
                      >
                        Receive MATIC
                      </Checkbox>
                    ) : null}
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    isDisabled={!isValid || !walletConnected}
                    isLoading={isSubmitting}
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
