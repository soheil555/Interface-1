import {
  Button,
  HStack,
  NumberInput,
  NumberInputField,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  FormHelperText,
} from '@chakra-ui/react'
import { Formik, Form, FormikErrors, FormikHelpers } from 'formik'
import useUnstakedAXOBalance from '../../../hooks/useUnstakedAXOBalance'
import useXolotlContract from '../../../hooks/contracts/useXolotlContract'
import { StakeAXOFormValues } from '../../../types'
import {
  isNumeric,
  formatCurrencyAmount,
  parseCurrencyAmount,
} from '../../../utils'
import useAXOContract from '../../../hooks/contracts/useAXOContract'
import { useWeb3React } from '@web3-react/core'
import useXolotTotalSupply from '../../../hooks/useXolotTotalSupply'
import useXltBalance from '../../../hooks/useXltBalance'
import { useState } from 'react'
import ApproveToken from '../ApproveToken/ApproveToken'
import useTokenInfo from '../../../hooks/useTokenInfo'
import { BigNumber } from 'ethers'

const initialValues: StakeAXOFormValues = {
  amount: '',
}

const AXOForXLT = (
  axoAmount: BigNumber,
  xltTotalSupply: BigNumber,
  xltBalance: BigNumber,
  axoBalance: BigNumber
) => {
  if (xltBalance.isZero() || axoBalance) return axoAmount
  return axoAmount.mul(xltTotalSupply).div(axoBalance)
}

const StakeAXOPanel = () => {
  const toast = useToast()
  const axoContract = useAXOContract()
  const xolotlContract = useXolotlContract()
  const { data: xolotlTotalSupply } = useXolotTotalSupply()
  const { data: unstakedAXOBalance } = useUnstakedAXOBalance()
  const { data: xltBalance } = useXltBalance()
  const { account } = useWeb3React()
  const walletConnected = !!axoContract && !!xolotlContract && !!account
  const axoTokenInfo = useTokenInfo(axoContract?.address)
  const [isAXOTokenApproved, setIsAXOTokenApproved] = useState(false)

  const handleStakeAXO = async (
    { amount }: StakeAXOFormValues,
    { resetForm }: FormikHelpers<StakeAXOFormValues>
  ) => {
    if (!walletConnected) return

    try {
      const amountBigNumber = parseCurrencyAmount(amount)

      const tx = await xolotlContract.enter(amountBigNumber)
      await tx.wait()

      toast({
        title: 'Stake AXO',
        description: 'AXO staked successfully',
        status: 'success',
        isClosable: true,
        duration: 9000,
      })
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Stake AXO',
        description: error.message,
        status: 'error',
        isClosable: true,
        duration: 9000,
      })
    }

    resetForm()
  }

  const validator = ({ amount }: StakeAXOFormValues) => {
    const errors: FormikErrors<StakeAXOFormValues> = {}

    if (amount === '' || parseCurrencyAmount(amount).isZero()) {
      errors.amount = 'Enter an amount'
      return errors
    }

    if (
      !unstakedAXOBalance ||
      parseCurrencyAmount(amount).gt(unstakedAXOBalance)
    ) {
      errors.amount = 'Unsufficient AXO balance'
      return errors
    }
  }

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
                <FormLabel>Stake AXO</FormLabel>

                <HStack>
                  <NumberInput
                    size={{ base: 'sm', sm: 'md' }}
                    w="full"
                    value={values.amount}
                    onChange={(value) => {
                      isNumeric(value) && setFieldValue('amount', value)
                    }}
                  >
                    <NumberInputField placeholder="0 AXO" />
                  </NumberInput>
                  <Button
                    size={{ base: 'sm', sm: 'md' }}
                    onClick={() => {
                      unstakedAXOBalance &&
                        setFieldValue(
                          'amount',
                          formatCurrencyAmount(unstakedAXOBalance)
                        )
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
                      You will receive:{' '}
                      {formatCurrencyAmount(
                        AXOForXLT(
                          parseCurrencyAmount(values.amount),
                          xolotlTotalSupply,
                          xltBalance,
                          unstakedAXOBalance
                        )
                      )}{' '}
                      XLT
                    </>
                  ) : null}
                </FormHelperText>
              </FormControl>

              {!!axoTokenInfo && values.amount !== '' && !!xolotlContract ? (
                <ApproveToken
                  tokens={[axoTokenInfo]}
                  amounts={[values.amount]}
                  isAllTokensApproved={isAXOTokenApproved}
                  setIsAllTokensApproved={setIsAXOTokenApproved}
                  spender={xolotlContract.address}
                />
              ) : null}

              <Button
                w="full"
                isDisabled={!isValid || !walletConnected || !isAXOTokenApproved}
                isLoading={isSubmitting}
                type="submit"
                variant="brand-outline"
              >
                {errors.amount ? errors.amount : 'Stake'}
              </Button>
            </VStack>
          </Form>
        )
      }}
    </Formik>
  )
}

export default StakeAXOPanel
