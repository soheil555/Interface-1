import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { SetStateAction } from 'react'
import useSWR from 'swr'
import { accountInfoAtom, transactionsAtom } from '../store'
import { TransactionInfo, Transactions } from '../types'
import { useKeepSWRDataLiveAsBlocksArrive } from './useKeepSWRDataLiveAsBlocksArrive'

//TODO: what about failed transactions
function updateTransactionsStatus(provider: Web3Provider) {
  return async (
    _: string,
    transactions: Transactions,
    chainId: number,
    address: string,
    setTransactions: (
      update: typeof RESET | SetStateAction<Transactions>
    ) => void
  ) => {
    const chainTransactions: TransactionInfo[] = []

    for (const transactionInfo of transactions[chainId]) {
      if (!transactionInfo.isConfirmed) {
        const receipt = await provider.getTransactionReceipt(
          transactionInfo.hash
        )
        if (!!receipt) {
          transactionInfo.isConfirmed = true
        }
      }

      chainTransactions.push(transactionInfo)
    }

    setTransactions((prev) => ({ ...prev, [chainId]: chainTransactions }))
  }
}

export default function useUpdateTransactionsStatus() {
  const [transactions, setTransactions] = useAtom(transactionsAtom)
  const [{ chainId, address }] = useAtom(accountInfoAtom)
  const { provider } = useWeb3React()

  const shouldFetch = !!provider && !!address && !!chainId

  const result = useSWR(
    shouldFetch
      ? [
          'UpdateTransactionsStatus',
          transactions,
          chainId,
          address,
          setTransactions,
        ]
      : null,
    updateTransactionsStatus(provider!)
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)
}
