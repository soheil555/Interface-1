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
} from '@chakra-ui/react'
import useLiquidityInfo from '../../../hooks/useLiquidityInfo'
import useTokenInfo from '../../../hooks/useTokenInfo'
import NextLink from 'next/link'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { Formik, Form, FormikHelpers, FormikErrors } from 'formik'
import { StakeFormValues } from '../../../types'
import {
  formatCurrencyAmount,
  parseCurrencyAmount,
  isNumeric,
} from '../../../utils'
import useMasterChefContract from '../../../hooks/contracts/useMasterChefContract'
import useERC20Contract from '../../../hooks/contracts/useERC20Contract'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import ApproveToken from '../ApproveToken/ApproveToken'
import { useState } from 'react'

interface StakeButtonProps {
  pid: number
  lpToken: string
}

const initialValues: StakeFormValues = {
  amount: '',
}

const StakeButton = ({ pid, lpToken }: StakeButtonProps) => {
  const toast = useToast()
  const { data: lpTokenBalance } = useTokenBalance(lpToken)
  const lpTokenContract = useERC20Contract(lpToken)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const tokens = useLiquidityInfo(lpToken)
  const token0Info = useTokenInfo(tokens?.token0)
  const token1Info = useTokenInfo(tokens?.token1)
  const masterChefContract = useMasterChefContract()
  const { account } = useWeb3React()
  const [isLPTokenApproved, setIsLPTokenApproved] = useState(false)

  const walletConnected = !!masterChefContract && !!lpTokenContract && !!account

  const handleStake = async (
    { amount }: StakeFormValues,
    { resetForm }: FormikHelpers<StakeFormValues>
  ) => {
    if (!walletConnected) return
    try {
      const amountBigNumber = parseCurrencyAmount(amount)

      const tx = await masterChefContract.deposit(pid, amountBigNumber, {
        gasLimit: '1000000',
      })
      await tx.wait()

      toast({
        title: 'Stake liquidity',
        description: 'Staked successfully',
        status: 'success',
        isClosable: true,
        duration: 9000,
      })
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Stake liquidity',
        description: error.message,
        status: 'error',
        isClosable: true,
        duration: 9000,
      })
    }

    resetForm()
    onClose()
  }
  const validator = ({ amount }: StakeFormValues) => {
    const errors: FormikErrors<StakeFormValues> = {}

    if (amount.length === 0 || parseCurrencyAmount(amount).isZero()) {
      errors.amount = 'Enter an amount'
      return errors
    }

    if (lpTokenBalance && parseCurrencyAmount(amount).gt(lpTokenBalance)) {
      errors.amount = `Insufficient LP balance`
    }

    return errors
  }

  return (
    <>
      <Button onClick={onOpen}>Stake</Button>

      <Modal
        blockScrollOnMount={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
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
                                Balance{' '}
                                {lpTokenBalance.lte(
                                  ethers.utils.parseEther('0.000001')
                                )
                                  ? formatCurrencyAmount(lpTokenBalance, 18, 18)
                                  : formatCurrencyAmount(lpTokenBalance)}
                              </Text>
                            </HStack>
                          </FormLabel>
                          <HStack>
                            <NumberInput
                              w="full"
                              value={values.amount}
                              onChange={(value) => {
                                isNumeric(value) &&
                                  setFieldValue('amount', value)
                              }}
                            >
                              <NumberInputField />
                            </NumberInput>

                            <Button
                              onClick={() => {
                                setFieldValue(
                                  'amount',
                                  lpTokenBalance.lte(
                                    ethers.utils.parseEther('0.000001')
                                  )
                                    ? formatCurrencyAmount(
                                        lpTokenBalance,
                                        18,
                                        18
                                      )
                                    : formatCurrencyAmount(lpTokenBalance)
                                )
                              }}
                            >
                              MAX
                            </Button>
                          </HStack>

                          <FormHelperText>
                            Stake your {token0Info?.symbol} /{' '}
                            {token1Info?.symbol} pool tokens
                          </FormHelperText>
                        </FormControl>

                        <VStack align="stretch">
                          {masterChefContract && values.amount !== '' ? (
                            <ApproveToken
                              tokens={[
                                {
                                  name: 'LP token',
                                  symbol: 'LP token',
                                  decimals: 18,
                                  address: lpToken,
                                },
                              ]}
                              amounts={[values.amount]}
                              isAllTokensApproved={isLPTokenApproved}
                              setIsAllTokensApproved={setIsLPTokenApproved}
                              spender={masterChefContract.address}
                            />
                          ) : null}

                          <Button
                            isDisabled={
                              !isValid || !walletConnected || !isLPTokenApproved
                            }
                            isLoading={isSubmitting}
                            type="submit"
                          >
                            {errors.amount ? errors.amount : 'Stake'}
                          </Button>
                        </VStack>
                      </VStack>
                    </Form>
                  )
                }}
              </Formik>
            ) : (
              <VStack p={5} gap={10}>
                <Text fontSize="lg" textAlign="center">
                  You can stake your {token0Info?.symbol} / {token1Info?.symbol}{' '}
                  pool tokens in this area. However, you do not have enough{' '}
                  {token0Info?.symbol} / {token1Info?.symbol} pool tokens yet.
                </Text>
                <NextLink href="/app/liquid/add-liquidity">
                  <Button variant="brand-outline">
                    Add liquidity to {token0Info?.symbol} / {token1Info?.symbol}
                  </Button>
                </NextLink>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default StakeButton
