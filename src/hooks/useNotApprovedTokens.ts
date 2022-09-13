import { useWeb3React } from '@web3-react/core'
import { BigNumber, Contract } from 'ethers'
import useSWR from 'swr'
import { Address } from '../addresses'
import { Token } from '../types'
import { parseCurrencyAmount } from '../utils'
import useAddresses from './useAddresses'
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive'
import { ERC20 } from '../abis/types'
import ERC20ABI from '../abis/ERC20.json'
import { Web3Provider } from '@ethersproject/providers'

export interface TokenInfo extends Token {
  address?: string
}

export interface NotApprovedToken {
  tokenInfo: TokenInfo
  tokenContract: ERC20
  spender: string
  owner: string
  amount: BigNumber
}

async function getNotApprovedTokens(
  _: string,
  tokens: TokenInfo[],
  amounts: (string | BigNumber)[],
  addresses: Address,
  provider: Web3Provider,
  account: string,
  spender: string
) {
  const notApprovedTokens: NotApprovedToken[] = []

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const amount = amounts[i]

    if (token.isCoin) continue

    const amountBigNumber =
      amount instanceof BigNumber
        ? amount
        : parseCurrencyAmount(amount, token.decimals)

    const tokenAddress = token.address
      ? token.address
      : addresses.tokens[token.symbol]

    const tokenContract = new Contract(
      tokenAddress,
      ERC20ABI,
      provider
    ) as ERC20

    const allowance = await tokenContract.allowance(account, spender)
    if (allowance.lt(amountBigNumber)) {
      notApprovedTokens.push({
        tokenInfo: token,
        tokenContract,
        spender,
        owner: account,
        amount: amountBigNumber,
      })
    }
  }

  return notApprovedTokens
}

export default function useNotApprovedTokens(
  tokens: TokenInfo[],
  amounts: (string | BigNumber)[],
  spender: string
) {
  const { account, provider } = useWeb3React()
  const addresses = useAddresses()

  const shouldFetch = !!addresses && !!account && !!provider

  const result = useSWR(
    shouldFetch
      ? [
          'NotApprovedTokens',
          tokens,
          amounts,
          addresses,
          provider,
          account,
          spender,
        ]
      : null,
    getNotApprovedTokens
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)

  return result
}
