import Web3ConnectWithSelect from './Web3ConnectWithSelect'
import { metaMask, metaMaskHooks } from '../../../connectors/metaMask'
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { accountInfoAtom } from '../../../store'

const MetaMaskConnect = () => {
  const [error, setError] = useState<Error>()
  const { useIsActivating, useIsActive, useChainId, useAccount } = metaMaskHooks
  const chainId = useChainId()
  const isActivate = useIsActive()
  const isActivating = useIsActivating()
  const account = useAccount()
  const setAccountInfo = useAtom(accountInfoAtom)[1]

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly()

    setAccountInfo({
      chainId,
      address: account,
    })
  }, [])

  return (
    <Web3ConnectWithSelect
      connector={metaMask}
      error={error}
      setError={setError}
      chainId={chainId}
      isActivate={isActivate}
      isActivating={isActivating}
      account={account}
    />
  )
}

export default MetaMaskConnect
