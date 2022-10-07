import {
  VStack,
  Button,
  IconButton,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'
import useFactoryContract from '../../../hooks/contracts/useFactoryContract'
import Layout from '../../../components/app/Layout/Layout'
import useRouterContract from '../../../hooks/contracts/useRouterContract'
import { useWeb3React } from '@web3-react/core'
import { Formik, FormikErrors, FormikHelpers } from 'formik'
import { LiquidityFormValues } from '../../../types'
import { currencyAmountWithSlippage, parseCurrencyAmount } from '../../../utils'
import LiquiditySelectToken from '../../../components/app/SelectToken/LiquiditySelectToken'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { addTransactionAtom, settingsAtom } from '../../../store'
import ApproveToken from '../../../components/app/ApproveToken/ApproveToken'
import { useState } from 'react'
import { NextPage } from 'next'
import AddLiquidityInfo from '../../../components/app/Liquidity/AddLiquidityInfo'
import AddLiquidityConfirmModal from '../../../components/app/Liquidity/AddLiquidityConfirmModal'
import useFailedTransactionToast from '../../../hooks/useFailedTransactionToast'

const initialValues: LiquidityFormValues = {
  token1: undefined,
  token2: undefined,
  token1Contract: null,
  token2Contract: null,
  token1Amount: undefined,
  token2Amount: undefined,
  token1Balance: undefined,
  token2Balance: undefined,
}

const AddLiquidity: NextPage = () => {
  const toast = useFailedTransactionToast()
  const [settings] = useAtom(settingsAtom)
  const router = useRouter()
  const {
    isOpen: showConfirm,
    onClose: onConfirmClose,
    onOpen: onConfirmOpen,
  } = useDisclosure()
  const routerContract = useRouterContract()
  const factoryContract = useFactoryContract()
  const { account, provider } = useWeb3React()
  const walletConnected =
    !!routerContract && !!factoryContract && !!account && !!provider
  const [isAllTokensApproved, setIsAllTokensApproved] = useState(false)
  const addTransaction = useAtom(addTransactionAtom)[1]
  const [txHash, setTxHash] = useState<string | undefined>(undefined)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleConfirmDismiss = () => {
    setIsConfirmed(false)
    setTxHash(undefined)
    onConfirmClose()
  }

  const handleAddLiquidity = async (
    values: LiquidityFormValues,
    { resetForm }: FormikHelpers<LiquidityFormValues>
  ) => {
    const {
      token1,
      token2,
      token1Amount,
      token2Amount,
      token1Contract,
      token2Contract,
    } = values

    if (
      !walletConnected ||
      !token1 ||
      !token2 ||
      !token1Amount ||
      !token2Amount ||
      !token1Contract ||
      !token2Contract
    )
      return

    try {
      const amount1 = parseCurrencyAmount(token1Amount, token1.decimals)
      const amount2 = parseCurrencyAmount(token2Amount, token2.decimals)

      if (token1.isCoin || token2.isCoin) {
        const tokenContract = token1.isCoin ? token2Contract : token1Contract
        const tokenAmount = token1.isCoin ? amount2 : amount1
        const maticAmount = token1.isCoin ? amount1 : amount2

        const timestamp = (await provider.getBlock('latest')).timestamp
        const deadline = timestamp + Math.floor(Number(settings.deadline) * 60)

        //TODO: set gasLimit
        const tx = await routerContract.addLiquidityETH(
          tokenContract.address,
          tokenAmount,
          currencyAmountWithSlippage(tokenAmount, settings.slippage),
          currencyAmountWithSlippage(maticAmount, settings.slippage),
          account,
          deadline,
          {
            gasLimit: 1000000,
            value: maticAmount,
          }
        )

        setTxHash(tx.hash)

        addTransaction({
          hash: tx.hash,
          description: `Add ${token1Amount} ${token1.symbol} and ${token2Amount} ${token2.symbol}`,
        })

        resetForm({
          values: { ...values, token1Amount: '', token2Amount: '' },
        })
      } else {
        const timestamp = (await provider.getBlock('latest')).timestamp
        const deadline = timestamp + Math.floor(Number(settings.deadline) * 60)

        //TODO: set gasLimit
        const tx = await routerContract.addLiquidity(
          token1Contract.address,
          token2Contract.address,
          amount1,
          amount2,
          currencyAmountWithSlippage(amount1, settings.slippage),
          currencyAmountWithSlippage(amount2, settings.slippage),
          account,
          deadline,
          { gasLimit: 1000000 }
        )

        setTxHash(tx.hash)

        addTransaction({
          hash: tx.hash,
          description: `Add ${token1Amount} ${token1.symbol} and ${token2Amount} ${token2.symbol}`,
        })
      }

      resetForm({
        values: { ...values, token1Amount: '', token2Amount: '' },
      })
    } catch (error: any) {
      toast({ description: error.message })
      console.error(error)
      handleConfirmDismiss()
    }
  }

  const validator = ({
    token1,
    token2,
    token1Amount,
    token2Amount,
    token1Balance,
    token2Balance,
  }: LiquidityFormValues) => {
    const errors: FormikErrors<LiquidityFormValues> = {}
    if (!token1 || !token2) {
      errors.token1 = 'Invalid token pair'
      return errors
    }

    if (!token1Amount || !token2Amount) {
      errors.token1Amount = 'Enter an amount'
      return errors
    }

    if (
      token1Balance &&
      parseCurrencyAmount(token1Amount, token1.decimals).gt(token1Balance)
    ) {
      errors.token1Amount = `Insufficient ${token1.symbol} balance`
    }

    if (
      token2Balance &&
      parseCurrencyAmount(token2Amount, token2.decimals).gt(token2Balance)
    ) {
      errors.token2Amount = `Insufficient ${token2.symbol} balance`
    }

    return errors
  }

  return (
    <Layout>
      <Formik
        validateOnMount
        validateOnChange
        initialValues={initialValues}
        validate={validator}
        onSubmit={handleAddLiquidity}
      >
        {({ handleSubmit, isSubmitting, isValid, errors, values }) => (
          <VStack w="full" gap={2}>
            <HStack fontSize="lg" alignSelf="flex-start">
              <IconButton
                onClick={() => {
                  router.back()
                }}
                aria-label="back"
                icon={<BiArrowBack />}
              />
              <Text>Add Liquidity</Text>
            </HStack>

            <LiquiditySelectToken isToken1 />

            <Icon as={AiOutlinePlus} fontSize="xl" />

            <LiquiditySelectToken />

            {values.token1 && values.token2 ? (
              <AddLiquidityInfo
                token1={values.token1}
                token2={values.token2}
                token1Amount={values.token1Amount}
                token2Amount={values.token2Amount}
              />
            ) : null}

            {values.token1 &&
            values.token2 &&
            values.token1Amount &&
            values.token2Amount &&
            routerContract ? (
              <ApproveToken
                tokens={[values.token1, values.token2]}
                amounts={[values.token1Amount, values.token2Amount]}
                isAllTokensApproved={isAllTokensApproved}
                setIsAllTokensApproved={setIsAllTokensApproved}
                spender={routerContract.address}
              />
            ) : null}

            {showConfirm && (
              <AddLiquidityConfirmModal
                isOpen={showConfirm}
                onClose={handleConfirmDismiss}
                token1={values.token1!}
                token2={values.token2!}
                token1Amount={values.token1Amount!}
                token2Amount={values.token2Amount!}
                slippage={settings.slippage}
                isFormValid={isValid}
                isWalletConnected={walletConnected}
                handleFormSubmit={handleSubmit}
                txHash={txHash}
                isConfirmed={isConfirmed}
                setIsConfirmed={setIsConfirmed}
              />
            )}

            <Button
              onClick={onConfirmOpen}
              isLoading={isSubmitting}
              isDisabled={!isValid || !walletConnected || !isAllTokensApproved}
              variant="brand-outline"
              w="full"
              fontSize={{ base: 'sm', sm: 'md' }}
            >
              {walletConnected
                ? isValid
                  ? 'Add Liquidity'
                  : errors.token1 || errors.token1Amount || errors.token2Amount
                : 'Connect Wallet to Continue'}
            </Button>
            <Text
              textAlign="center"
              variant="subtext"
              w="full"
              overflow="hidden"
            >
              Supply two tokens in equal values.
            </Text>
          </VStack>
        )}
      </Formik>
    </Layout>
  )
}

export default AddLiquidity
