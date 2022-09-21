import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import {
  AccountInfo,
  NewTransaction,
  SettingsFormValues,
  Transactions,
} from './types'

export const settingsAtom = atomWithStorage<SettingsFormValues>('settings', {
  slippage: '0.1',
  deadline: '30',
})

export const accountInfoAtom = atom<AccountInfo>({})

export const transactionsAtom = atomWithStorage<Transactions>(
  'transactions',
  {}
)

export const accountTransactionsAtom = atom((get) => {
  const { chainId, address } = get(accountInfoAtom)
  if (!chainId || !address) return {}
  return get(transactionsAtom)[chainId][address]
})

export const accountPendingTransactionsAtom = atom((get) => {
  const accountTransactions = get(accountTransactionsAtom)
  const pendingTransactions: typeof accountTransactions = {}

  for (const [txHash, txInfo] of Object.entries(accountTransactions)) {
    if (!txInfo.isConfirmed) {
      pendingTransactions[txHash] = txInfo
    }
  }

  return pendingTransactions
})

export const addTransactionAtom = atom(
  null,
  (get, set, { transactionHash, ...transactionInfo }: NewTransaction) => {
    const { chainId, address } = get(accountInfoAtom)
    if (!chainId || !address) return

    const transactions = get(transactionsAtom)
    if (!Object.keys(transactions).includes(String(chainId))) {
      transactions[chainId] = {}
    }

    if (!Object.keys(transactions[chainId]).includes(address)) {
      transactions[chainId][address] = {}
    }

    const accountTransactions = transactions[chainId][address]
    accountTransactions[transactionHash] = {
      ...transactionInfo,
      isConfirmed: false,
    }

    set(transactionsAtom, { ...transactions })
  }
)
