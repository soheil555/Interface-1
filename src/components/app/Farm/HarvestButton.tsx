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
} from '@chakra-ui/react'
import useFarmUserInfo from '../../../hooks/useFarmUserInfo'
import { Formik, Form, FormikErrors, FormikHelpers } from 'formik'
import {
  isNumeric,
  formatCurrencyAmount,
  parseCurrencyAmount,
} from '../../../utils'
import { UnstakeFormValues } from '../../../types'
import useLiquidityInfo from '../../../hooks/useLiquidityInfo'
import useTokenInfo from '../../../hooks/useTokenInfo'
import useMasterChefContract from '../../../hooks/contracts/useMasterChefContract'
import usePendingAXO from '../../../hooks/usePendingAXO'
import { ethers } from 'ethers'
import { useAtom } from 'jotai'
import { addTransactionAtom } from '../../../store'

interface HarvestButtonProps {
  pid: number
  lpToken: string
}

const initialValues: UnstakeFormValues = {
  amount: '',
}

const HarvestButton = ({ pid, lpToken }: HarvestButtonProps) => {
  const { data: pendingAXO } = usePendingAXO(pid)
  const tokens = useLiquidityInfo(lpToken)
  const token0Info = useTokenInfo(tokens?.token0)
  const token1Info = useTokenInfo(tokens?.token1)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { data: userInfo } = useFarmUserInfo(pid)
  const isHarvestAvailable =
    userInfo &&
    pendingAXO &&
    (!userInfo.amount.isZero() || !pendingAXO.isZero())
  const masterChefContract = useMasterChefContract()
  const addTransaction = useAtom(addTransactionAtom)[1]

  const isAmountZero = (amount: string) => {
    return amount.length === 0 || parseCurrencyAmount(amount).isZero()
  }

  const handleUnstake = async (
    { amount }: UnstakeFormValues,
    { resetForm }: FormikHelpers<UnstakeFormValues>
  ) => {
    if (!masterChefContract) return
    try {
      const amountBigNumber =
        amount.length === 0 ? 0 : parseCurrencyAmount(amount)

      const tx = await masterChefContract.withdraw(pid, amountBigNumber, {
        gasLimit: '1000000',
      })

      addTransaction({
        hash: tx.hash,
        description: 'Harvest LP tokens',
      })
    } catch (error: any) {
      console.log(error)
    }

    resetForm()
    onClose()
  }
  const validator = ({ amount }: UnstakeFormValues) => {
    const errors: FormikErrors<UnstakeFormValues> = {}

    if (
      userInfo &&
      amount.length !== 0 &&
      parseCurrencyAmount(amount).gt(userInfo.amount)
    ) {
      errors.amount = `Insufficient LP balance`
    }

    return errors
  }

  return (
    <>
      <Button onClick={onOpen} disabled={!isHarvestAvailable}>
        Harvest
      </Button>

      <Modal
        blockScrollOnMount={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
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
                              {userInfo
                                ? userInfo.amount.lte(
                                    ethers.utils.parseEther('0.000001')
                                  )
                                  ? formatCurrencyAmount(
                                      userInfo.amount,
                                      18,
                                      18
                                    )
                                  : formatCurrencyAmount(userInfo.amount)
                                : '0.00'}
                            </Text>
                          </HStack>
                        </FormLabel>
                        <HStack>
                          <NumberInput
                            w="full"
                            value={values.amount}
                            onChange={(value) => {
                              isNumeric(value) && setFieldValue('amount', value)
                            }}
                          >
                            <NumberInputField />
                          </NumberInput>

                          <Button
                            onClick={() => {
                              userInfo &&
                                setFieldValue(
                                  'amount',
                                  userInfo.amount.lte(
                                    ethers.utils.parseEther('0.000001')
                                  )
                                    ? formatCurrencyAmount(
                                        userInfo.amount,
                                        18,
                                        18
                                      )
                                    : formatCurrencyAmount(userInfo.amount)
                                )
                            }}
                          >
                            MAX
                          </Button>
                        </HStack>

                        <FormHelperText>
                          Unstake your {token0Info?.symbol} /{' '}
                          {token1Info?.symbol} pool tokens
                        </FormHelperText>
                      </FormControl>

                      <HStack gap={3} flexDir="row-reverse">
                        <Button
                          w="full"
                          isDisabled={!isValid || !masterChefContract}
                          isLoading={isSubmitting}
                          type="submit"
                        >
                          {errors.amount
                            ? errors.amount
                            : isAmountZero(values.amount)
                            ? 'Harvest reward'
                            : 'Unstake LP tokens and harvest reward'}
                        </Button>
                      </HStack>
                    </VStack>
                  </Form>
                )
              }}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default HarvestButton
