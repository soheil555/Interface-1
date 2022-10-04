import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { CHAINS } from './chains'
import {
  AccountInfo,
  SettingsFormValues,
  Transactions,
  TransactionInfo,
} from './types'

export const settingsAtom = atomWithStorage<SettingsFormValues>('settings', {
  slippage: '0.1',
  deadline: '30',
})

export const accountInfoAtom = atom<AccountInfo>({})

const transactionsInitialValue: Transactions = Object.fromEntries(
  Object.keys(CHAINS).map((chainId) => [chainId, []])
)

export const transactionsAtom = atomWithStorage<Transactions>(
  'transactions',
  transactionsInitialValue
)

export const accountTransactionsAtom = atom((get) => {
  const { address, chainId } = get(accountInfoAtom)
  if (!address || !chainId) return []

  return get(transactionsAtom)[chainId].filter((tx) => tx.sender === address)
})

export const accountTransactionsLenAtom = atom((get) => {
  return Object.keys(get(accountTransactionsAtom)).length
})

export const resetAccountTransactionsAtom = atom(null, (get, set) => {
  const { chainId, address } = get(accountInfoAtom)
  if (!chainId || !address) return

  const accountTransactions = get(transactionsAtom)[chainId].filter(
    (tx) => tx.sender !== address
  )

  set(transactionsAtom, (prev) => ({ ...prev, [chainId]: accountTransactions }))
})

export const accountPendingTransactionsAtom = atom((get) => {
  return get(accountTransactionsAtom).filter((tx) => !tx.receipt)
})

export const accountPendingTransactionsLenAtom = atom((get) => {
  return Object.keys(get(accountPendingTransactionsAtom)).length
})

export const addTransactionAtom = atom(
  null,
  (get, set, update: Omit<TransactionInfo, 'sender' | 'isConfirmed'>) => {
    const { chainId, address } = get(accountInfoAtom)
    if (!chainId || !address) return

    set(transactionsAtom, (prev) => ({
      ...prev,
      [chainId]: [
        { ...update, sender: address, isConfirmed: false },
        ...prev[chainId],
      ],
    }))
  }
)
