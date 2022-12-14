import { useEffect, useState } from 'react'
import useNotApprovedTokens, {
  NotApprovedToken,
  TokenInfo,
} from '../../../hooks/useNotApprovedTokens'
import { Button, useToast } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { useAtom } from 'jotai'
import { addTransactionAtom } from '../../../store'
import useFailedTransactionToast from '../../../hooks/useFailedTransactionToast'

interface ApproveTokenProps {
  tokens: TokenInfo[]
  amounts: (string | BigNumber)[]
  isAllTokensApproved: boolean
  setIsAllTokensApproved: (isAllTokensApproved: boolean) => void
  spender: string
}

const ApproveToken = ({
  tokens,
  amounts,
  isAllTokensApproved,
  setIsAllTokensApproved,
  spender,
}: ApproveTokenProps) => {
  const toast = useFailedTransactionToast()
  const { data: notApprovedTokens } = useNotApprovedTokens(
    tokens,
    amounts,
    spender
  )
  const [isLoading, setIsLoading] = useState(false)
  const { provider } = useWeb3React()
  const addTransaction = useAtom(addTransactionAtom)[1]

  const handleApproveToken = async ({
    tokenContract,
    owner,
    spender,
    amount,
    tokenInfo,
  }: NotApprovedToken) => {
    if (!provider) return
    setIsLoading(true)
    try {
      const signer = provider.getSigner(owner)
      const tx = await tokenContract.connect(signer).approve(spender, amount, {
        gasLimit: 1000000,
      })

      addTransaction({
        hash: tx.hash,
        description: `Approve ${tokenInfo.symbol}`,
      })
    } catch (error: any) {
      console.error(error)
      toast({ description: error.message })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (notApprovedTokens && notApprovedTokens.length === 0) {
      setIsAllTokensApproved(true)
    } else {
      setIsAllTokensApproved(false)
    }
  }, [notApprovedTokens])

  if (isAllTokensApproved) return null

  if (!notApprovedTokens || notApprovedTokens.length === 0)
    return <Button w="full" variant="brand-outline" isLoading={true} />

  return (
    <Button
      isDisabled={!provider}
      variant="brand-outline"
      w="full"
      isLoading={isLoading}
      onClick={() => handleApproveToken(notApprovedTokens[0])}
    >
      Approve {notApprovedTokens[0].tokenInfo.symbol}
    </Button>
  )
}

export default ApproveToken
