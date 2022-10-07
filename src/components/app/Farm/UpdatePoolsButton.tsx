import { Button, Tooltip } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useState } from 'react'
import useMasterChefContract from '../../../hooks/contracts/useMasterChefContract'
import useFailedTransactionToast from '../../../hooks/useFailedTransactionToast'
import { addTransactionAtom } from '../../../store'

const UpdatePoolsButton = () => {
  const toast = useFailedTransactionToast()
  const masterChefContract = useMasterChefContract()
  const [isLoading, setIsLoading] = useState(false)
  const addTransaction = useAtom(addTransactionAtom)[1]

  const handleUpdatePools = async () => {
    if (!masterChefContract) return

    setIsLoading(true)

    try {
      const tx = await masterChefContract.massUpdatePools({
        gasLimit: '1000000',
      })

      addTransaction({
        hash: tx.hash,
        description: 'Update pools',
      })
    } catch (error: any) {
      toast({ description: error.message })
      console.error(error)
    }

    setIsLoading(false)
  }

  return (
    <Tooltip
      hasArrow
      textAlign="center"
      label="Update reward variables for all pools. Be careful of gas spending!"
      fontSize={{ base: 'xs', sm: 'md' }}
      w={{ base: '15rem', sm: 'full' }}
    >
      <Button
        w="full"
        isDisabled={!masterChefContract}
        isLoading={isLoading}
        onClick={handleUpdatePools}
        variant="brand-outline"
      >
        Update Pools
      </Button>
    </Tooltip>
  )
}

export default UpdatePoolsButton
