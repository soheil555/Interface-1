import { useToast } from '@chakra-ui/react'
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
function updateTransactionsStatus(provider: Web3Provider, toast: any) {
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
    const confirmedTransactions: TransactionInfo[] = []

    for (const transactionInfo of transactions[chainId]) {
      if (!transactionInfo.isConfirmed) {
        const receipt = await provider.getTransactionReceipt(
          transactionInfo.hash
        )
        if (!!receipt) {
          transactionInfo.isConfirmed = true
          confirmedTransactions.push(transactionInfo)
        }
      }

      chainTransactions.push(transactionInfo)
    }

    if (confirmedTransactions.length > 0) {
      setTransactions((prev) => ({ ...prev, [chainId]: chainTransactions }))
    }

    confirmedTransactions.forEach((tx) => {
      toast({
        description: tx.description,
      })
    })
  }
}

export default function useUpdateTransactionsStatus() {
  const toast = useToast({
    title: 'Transaction confirmed',
    position: 'bottom-right',
    status: 'info',
    duration: 9000,
    variant: 'top-accent',
    isClosable: true,
  })
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
    updateTransactionsStatus(provider!, toast)
  )

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)
}
