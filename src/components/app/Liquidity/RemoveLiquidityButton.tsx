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
  VStack,
  HStack,
  Text,
  useToast,
  Checkbox,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import useERC20Contract from '../../../hooks/useERC20Contract'
import useRouterContract from '../../../hooks/useRouterContract'
import useTokenInfo from '../../../hooks/useTokenInfo'
import { Liquidity, RemoveLiquidityFormValues } from '../../../types'
import { amountWithSlippage, parseBalance } from '../../../utils'
import { Formik, Form, FormikHelpers, FormikErrors } from 'formik'
import { useAtom } from 'jotai'
import { settingsAtom } from '../../../store'
import ApproveToken from '../ApproveToken/ApproveToken'
import { useState } from 'react'

interface RemoveLiquidityButtonProps {
  liquidity: Liquidity
}

const initialValues: RemoveLiquidityFormValues = {
  percent: 50,
}

const RemoveLiquidityButton = ({ liquidity }: RemoveLiquidityButtonProps) => {
  const [settings] = useAtom(settingsAtom)
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const token0Info = useTokenInfo(liquidity.token0)
  const token1Info = useTokenInfo(liquidity.token1)
  const { account } = useWeb3React()
  const routerContract = useRouterContract()
  const liquidityERC20Contract = useERC20Contract(liquidity.address)
  const walletConnected =
    !!routerContract &&
    !!liquidityERC20Contract &&
    !!account &&
    !!token0Info &&
    !!token1Info
  const isOneOfTokenswMatic =
    token0Info?.symbol === 'wMATIC' || token1Info?.symbol === 'wMATIC'
  const [isLPTokenApproved, setIsLPTokenApproved] = useState(false)

  const handleRemoveLiquidity = async (
    { percent, receiveMatic }: RemoveLiquidityFormValues,
    actions: FormikHelpers<RemoveLiquidityFormValues>
  ) => {
    if (!walletConnected) return

    try {
      const amountToRemove = liquidity.liquidityBalance.mul(percent).div(100)
      const token0Amount = liquidity.amount0.mul(percent).div(100)
      const token1Amount = liquidity.amount1.mul(percent).div(100)

      const timestamp = (await routerContract.provider.getBlock('latest'))
        .timestamp
      const deadline = timestamp + Number(settings.deadline) * 60

      if (isOneOfTokenswMatic && receiveMatic) {
        const [tokenAddress, tokenAmount, maticAmount] =
          token0Info.symbol === 'wMATIC'
            ? [liquidity.token1, token1Amount, token0Amount]
            : [liquidity.token0, token0Amount, token1Amount]

        const tx = await routerContract.removeLiquidityETH(
          tokenAddress,
          amountToRemove,
          amountWithSlippage(tokenAmount, settings.slippage),
          amountWithSlippage(maticAmount, settings.slippage),
          account,
          deadline
        )
        await tx.wait()
      } else {
        const tx = await routerContract.removeLiquidity(
          liquidity.token0,
          liquidity.token1,
          amountToRemove,
          amountWithSlippage(token0Amount, settings.slippage),
          amountWithSlippage(token1Amount, settings.slippage),
          account,
          deadline,
          { gasLimit: 1000000 }
        )
        await tx.wait()
      }

      toast({
        title: 'Removed liquidity',
        description: 'Liquidity removed successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      onClose()
      actions.resetForm()
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Removed liquidity',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      onClose()
    }
  }

  const validator = ({ percent }: RemoveLiquidityFormValues) => {
    const errors: FormikErrors<RemoveLiquidityFormValues> = {}

    if (percent === 0) {
      errors.percent = 'Percentage must be greater than 0'
    }

    return errors
  }

  if (!token0Info || !token1Info) return null

  return (
    <>
      <Button onClick={onOpen}>Remove</Button>
      <Modal
        blockScrollOnMount={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
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
                <ModalHeader>Remove Liquidity</ModalHeader>
                <ModalCloseButton />
                <ModalBody py={5} px={10}>
                  <FormControl mb={5}>
                    <FormLabel>Percent to remove</FormLabel>
                    <NumberInput
                      min={0}
                      max={100}
                      defaultValue={0}
                      value={values.percent}
                      onChange={(valueString, value) => {
                        if (valueString === '') value = 0
                        if (value > 100) value = 100

                        setFieldValue('percent', value)
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <VStack
                    gap={1}
                    fontSize="xl"
                    align="stretch"
                    border="solid 1px"
                    p={2}
                    rounded="lg"
                  >
                    <Text fontSize="sm" mb={2}>
                      You&apos;ll receive
                    </Text>
                    <HStack justify="space-between">
                      <Text>
                        {parseBalance(
                          liquidity.amount0.mul(values.percent).div(100),
                          token0Info.decimals
                        )}
                      </Text>

                      <HStack>
                        {token0Info.logo && <token0Info.logo mr={1} />}
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
                        {token1Info.logo && <token1Info.logo />}
                        <Text>{token1Info.symbol}</Text>
                      </HStack>
                    </HStack>

                    {isOneOfTokenswMatic ? (
                      <Checkbox
                        size="lg"
                        isChecked={values.receiveMatic}
                        onChange={() => {
                          setFieldValue('receiveMatic', !values.receiveMatic)
                        }}
                      >
                        Receive MATIC
                      </Checkbox>
                    ) : null}
                  </VStack>
                </ModalBody>
                <ModalFooter flexDirection="column" gap={2}>
                  {values.percent > 0 && !!routerContract ? (
                    <ApproveToken
                      tokens={[
                        {
                          name: 'LP token',
                          symbol: 'LP token',
                          decimals: 18,
                          address: liquidity.address,
                        },
                      ]}
                      amounts={[liquidity.liquidityBalance]}
                      isAllTokensApproved={isLPTokenApproved}
                      setIsAllTokensApproved={setIsLPTokenApproved}
                      spender={routerContract.address}
                    />
                  ) : null}

                  <Button
                    w="full"
                    type="submit"
                    isDisabled={
                      !isValid || !walletConnected || !isLPTokenApproved
                    }
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
  )
}

export default RemoveLiquidityButton
