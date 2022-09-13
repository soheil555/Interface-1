import { useEffect, useState } from 'react'
import useNotApprovedTokens, {
  NotApprovedToken,
  TokenInfo,
} from '../../../hooks/useNotApprovedTokens'
import { Button, useToast } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'

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
  const toast = useToast()
  const { data: notApprovedTokens } = useNotApprovedTokens(
    tokens,
    amounts,
    spender
  )
  const [isLoading, setIsLoading] = useState(false)
  const { provider } = useWeb3React()

  const handleApproveToken = async ({
    tokenContract,
    owner,
    spender,
    amount,
  }: NotApprovedToken) => {
    if (!provider) return
    setIsLoading(true)
    try {
      const signer = provider.getSigner(owner)
      const tx = await tokenContract.connect(signer).approve(spender, amount)
      await tx.wait()

      toast({
        title: 'Approve Token',
        description: `Token approved successfully`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (err: any) {
      console.log(err)

      toast({
        title: 'Approve Token',
        description: err.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (notApprovedTokens && notApprovedTokens.length === 0) {
      setIsAllTokensApproved(true)
    } else {
      setIsAllTokensApproved(false)
    }
  }, [notApprovedTokens, setIsAllTokensApproved])

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
