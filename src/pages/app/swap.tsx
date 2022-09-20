import {
  VStack,
  Button,
  Text,
  IconButton,
  Box,
  useDisclosure,
  HStack,
  Link,
} from '@chakra-ui/react'
import { IoSwapVertical } from 'react-icons/io5'
import useFactoryContract from '../../hooks/contracts/useFactoryContract'
import Layout from '../../components/app/Layout/Layout'
import useRouterContract from '../../hooks/contracts/useRouterContract'
import { useWeb3React } from '@web3-react/core'
import { Formik, Form, FormikErrors, FormikHelpers } from 'formik'
import { SwapFormValues } from '../../types'
import { currencyAmountWithSlippage, parseCurrencyAmount } from '../../utils'
import SwapSelectToken from '../../components/app/SelectToken/SwapSelectToken'
import { useAtom } from 'jotai'
import useAddresses from '../../hooks/useAddresses'
import { Contract } from 'ethers'
import WETH9ABI from '../../abis/WETH9.json'
import { WETH9 } from '../../abis/types'
import { settingsAtom } from '../../store'
import SwapConfirmationModal from '../../components/app/Swap/SwapConfirmationModal'
import NextLink from 'next/link'
import ApproveToken from '../../components/app/ApproveToken/ApproveToken'
import { useState } from 'react'
import { NextPage } from 'next'
import SwapInfo from '../../components/app/Swap/SwapInfo'

const initialValues: SwapFormValues = {
  tokenIn: undefined,
  tokenOut: undefined,
  amountIn: undefined,
  amountOut: undefined,
  tokenInBalance: undefined,
  tokenInReserve: undefined,
  tokenOutReserve: undefined,
  wrapType: 'invalid',
}

const Swap: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [settings] = useAtom(settingsAtom)
  const addresses = useAddresses()
  const routerContract = useRouterContract()
  const factoryContract = useFactoryContract()
  const { account, provider } = useWeb3React()
  const [isTokenInApproved, setIsTokenInApproved] = useState(false)

  const walletConnected =
    !!routerContract &&
    !!factoryContract &&
    !!account &&
    !!provider &&
    !!addresses

  const handleSwap = async (
    values: SwapFormValues,
    { resetForm }: FormikHelpers<SwapFormValues>
  ) => {
    const { tokenIn, tokenOut, amountIn, amountOut, wrapType } = values

    if (!walletConnected || !tokenIn || !tokenOut || !amountIn || !amountOut)
      return

    const actionType =
      wrapType === 'invalid' ? 'Swap' : wrapType === 'wrap' ? 'Wrap' : 'Unwrap'

    try {
      const amountInBigNumber = parseCurrencyAmount(amountIn, tokenIn.decimals)

      const amountOutBigNumber = parseCurrencyAmount(
        amountOut,
        tokenOut.decimals
      )

      const tokenInaddress = addresses.tokens[tokenIn.symbol]
      const tokenOutaddress = addresses.tokens[tokenOut.symbol]

      // Handle wrap
      if (wrapType === 'wrap') {
        const wMaticContract = new Contract(
          tokenOutaddress,
          WETH9ABI,
          routerContract.signer
        ) as WETH9

        await wMaticContract.deposit({
          value: amountInBigNumber,
          gasLimit: 1000000,
        })
      }
      // Handle unwrap
      else if (wrapType === 'unwrap') {
        const wMaticContract = new Contract(
          tokenInaddress,
          WETH9ABI,
          routerContract.signer
        ) as WETH9

        await wMaticContract.withdraw(amountInBigNumber, {
          gasLimit: 1000000,
        })
      } else if (tokenIn.symbol === 'MATIC') {
        const path = [tokenInaddress, tokenOutaddress]

        const timestamp = (await provider.getBlock('latest')).timestamp
        const deadline = timestamp + Number(settings.deadline) * 60

        //TODO: set gasLimit
        await routerContract.swapExactETHForTokens(
          currencyAmountWithSlippage(amountOutBigNumber, settings.slippage),
          path,
          account,
          deadline,
          {
            gasLimit: 1000000,
            value: amountInBigNumber,
          }
        )
      } else {
        const path = [tokenInaddress, tokenOutaddress]

        const timestamp = (await provider.getBlock('latest')).timestamp
        const deadline = timestamp + Number(settings.deadline) * 60

        if (tokenOut.symbol === 'MATIC') {
          //TODO: set gasLimit
          await routerContract.swapExactTokensForETH(
            amountInBigNumber,
            currencyAmountWithSlippage(amountOutBigNumber, settings.slippage),
            path,
            account,
            deadline,
            {
              gasLimit: 1000000,
            }
          )
        } else {
          //TODO: set gasLimit
          await routerContract.swapExactTokensForTokens(
            amountInBigNumber,
            currencyAmountWithSlippage(amountOutBigNumber, settings.slippage),
            path,
            account,
            deadline,
            { gasLimit: 1000000 }
          )
        }
      }

      resetForm({ values: { ...values, amountIn: '', amountOut: '' } })
    } catch (error: any) {
      console.log(error)
    }
    onClose()
  }

  const validator = ({
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    tokenInBalance,
    tokenInReserve,
    tokenOutReserve,
    wrapType,
  }: SwapFormValues) => {
    const errors: FormikErrors<SwapFormValues> = {}
    if (!tokenIn || !tokenOut) {
      errors.tokenIn = 'Select a token'
      return errors
    }

    if (wrapType !== 'invalid') {
      if (!amountIn || !amountOut) {
        errors.amountIn = 'Enter an amount'
        return errors
      }

      const amountInBigNumber = parseCurrencyAmount(amountIn, tokenIn.decimals)

      if (!tokenInBalance || amountInBigNumber.gt(tokenInBalance)) {
        errors.amountIn = `Insufficient ${tokenIn.symbol} balance`
      }
      return errors
    }

    if (
      !tokenInReserve ||
      tokenInReserve.isZero() ||
      !tokenOutReserve ||
      tokenOutReserve.isZero()
    ) {
      errors.tokenIn = 'Token reserve is zero'
      return errors
    }

    if (!amountIn || !amountOut) {
      errors.amountIn = 'Enter an amount'
      return errors
    }

    const amountInBigNumber = parseCurrencyAmount(amountIn, tokenIn.decimals)
    const amountOutBigNumber = parseCurrencyAmount(amountOut, tokenOut.decimals)

    if (
      amountInBigNumber.gt(tokenInReserve) ||
      amountOutBigNumber.gt(tokenOutReserve)
    ) {
      errors.amountIn = 'Insufficient liquidity for this trade.'
      return errors
    }

    if (!tokenInBalance || amountInBigNumber.gt(tokenInBalance)) {
      errors.amountIn = `Insufficient ${tokenIn.symbol} balance`
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
        onSubmit={handleSwap}
      >
        {({
          handleSubmit,
          isSubmitting,
          isValid,
          errors,
          values,
          setValues,
        }) => (
          <Form onSubmit={handleSubmit}>
            <VStack gap={2}>
              <HStack gap={2} w="full">
                <NextLink href="/app/swap">
                  <Link
                    color="brand.300"
                    fontWeight="bold"
                    fontSize="lg"
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    Swap
                  </Link>
                </NextLink>
                <NextLink href="#">
                  <Link
                    fontWeight="bold"
                    fontSize="lg"
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    Limit
                  </Link>
                </NextLink>
              </HStack>

              <Box w="full">
                <Text textTransform="uppercase" mb={2}>
                  From:
                </Text>
                <SwapSelectToken isTokenIn />
              </Box>

              <IconButton
                isDisabled={!values.tokenIn && !values.tokenOut}
                onClick={() => {
                  const newValues = {
                    tokenIn: values.tokenOut,
                    tokenOut: values.tokenIn,
                    amountIn: values.amountOut,
                  }
                  setValues((values) => ({ ...values, ...newValues }))
                }}
                aria-label="swap"
                icon={<IoSwapVertical />}
                fontSize="xl"
              />

              <Box w="full">
                <Text textTransform="uppercase" mb={2}>
                  To:
                </Text>
                <SwapSelectToken />
              </Box>

              {values.tokenIn &&
              values.tokenOut &&
              values.amountIn &&
              values.amountOut ? (
                <SwapInfo
                  tokenIn={values.tokenIn}
                  tokenOut={values.tokenOut}
                  amountIn={values.amountIn}
                  amountOut={values.amountOut}
                  slippage={settings.slippage}
                />
              ) : null}

              {values.tokenIn && values.amountIn && routerContract ? (
                <ApproveToken
                  tokens={[values.tokenIn]}
                  amounts={[values.amountIn]}
                  isAllTokensApproved={isTokenInApproved}
                  setIsAllTokensApproved={setIsTokenInApproved}
                  spender={routerContract.address}
                />
              ) : null}

              <Button
                isLoading={isSubmitting}
                isDisabled={!isValid || !walletConnected || !isTokenInApproved}
                variant="brand-outline"
                w="full"
                fontSize={{ base: 'sm', sm: 'md' }}
                onClick={
                  values.wrapType !== 'invalid'
                    ? () => {
                        handleSubmit()
                      }
                    : onOpen
                }
              >
                {walletConnected
                  ? isValid
                    ? values.wrapType !== 'invalid'
                      ? values.wrapType === 'wrap'
                        ? 'Wrap'
                        : 'Unwrap'
                      : 'Swap'
                    : errors.tokenIn || errors.amountIn
                  : 'Connect Wallet to Continue'}
              </Button>

              {values.tokenIn &&
              values.tokenOut &&
              values.amountIn &&
              values.amountOut ? (
                <SwapConfirmationModal
                  isOpen={isOpen}
                  onClose={onClose}
                  amountIn={values.amountIn}
                  amountOut={values.amountOut}
                  tokenIn={values.tokenIn}
                  tokenOut={values.tokenOut}
                  slippage={settings.slippage}
                  isFormSubmitting={isSubmitting}
                  isFormValid={isValid}
                  isWalletConnected={walletConnected}
                  handleFormSubmit={handleSubmit}
                />
              ) : null}
            </VStack>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default Swap
