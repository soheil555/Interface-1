import {
  Button,
  HStack,
  NumberInput,
  NumberInputField,
  VStack,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react'
import { Formik, Form, FormikErrors, FormikHelpers } from 'formik'
import useXolotlContract from '../../../hooks/contracts/useXolotlContract'
import { UnstakeAXOFormValues } from '../../../types'
import {
  isNumeric,
  formatCurrencyAmount,
  parseCurrencyAmount,
} from '../../../utils'
import useAXOContract from '../../../hooks/contracts/useAXOContract'
import { useWeb3React } from '@web3-react/core'
import useXltBalance from '../../../hooks/useXltBalance'
import { useAtom } from 'jotai'
import { addTransactionAtom } from '../../../store'
import useFailedTransactionToast from '../../../hooks/useFailedTransactionToast'

const initialValues: UnstakeAXOFormValues = {
  amount: '',
}

const UnstakeAXOPanel = () => {
  const toast = useFailedTransactionToast()
  const axoContract = useAXOContract()
  const xolotlContract = useXolotlContract()
  const { data: xltBalance } = useXltBalance()
  const { account } = useWeb3React()
  const walletConnected = !!axoContract && !!xolotlContract && !!account
  const addTransaction = useAtom(addTransactionAtom)[1]

  const handleUnstakeAXO = async (
    { amount }: UnstakeAXOFormValues,
    { resetForm }: FormikHelpers<UnstakeAXOFormValues>
  ) => {
    if (!walletConnected) return

    try {
      const amountBigNumber = parseCurrencyAmount(amount)

      const tx = await xolotlContract.leave(amountBigNumber, {
        gasLimit: 1000000,
      })

      addTransaction({
        hash: tx.hash,
        description: `Unstake ${amount} AXO`,
      })
    } catch (error: any) {
      toast({ description: error.message })
      console.error(error)
    }

    resetForm()
  }

  const validator = ({ amount }: UnstakeAXOFormValues) => {
    const errors: FormikErrors<UnstakeAXOFormValues> = {}

    if (amount === '' || parseCurrencyAmount(amount).isZero()) {
      errors.amount = 'Enter an amount'
      return errors
    }

    if (!xltBalance || parseCurrencyAmount(amount).gt(xltBalance)) {
      errors.amount = 'Unsufficient XLT balance'
      return errors
    }
  }

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
                    <Text variant="subtext" fontSize="sm"></Text>
                  </HStack>
                </FormLabel>

                <HStack>
                  <NumberInput
                    size={{ base: 'sm', sm: 'md' }}
                    w="full"
                    value={values.amount}
                    onChange={(value) => {
                      isNumeric(value) && setFieldValue('amount', value)
                    }}
                  >
                    <NumberInputField placeholder="0 XLT" />
                  </NumberInput>
                  <Button
                    size={{ base: 'sm', sm: 'md' }}
                    onClick={() => {
                      xltBalance &&
                        setFieldValue(
                          'amount',
                          formatCurrencyAmount(xltBalance)
                        )
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
                variant="brand-outline"
              >
                {errors.amount ? errors.amount : 'Unstake'}
              </Button>
            </VStack>
          </Form>
        )
      }}
    </Formik>
  )
}

export default UnstakeAXOPanel
