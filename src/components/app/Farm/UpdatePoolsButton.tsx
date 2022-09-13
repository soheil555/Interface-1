import { Button, Tooltip, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import useMasterChefContract from '../../../hooks/contracts/useMasterChefContract'

const UpdatePoolsButton = () => {
  const toast = useToast()
  const masterChefContract = useMasterChefContract()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdatePools = async () => {
    if (!masterChefContract) return

    setIsLoading(true)

    try {
      const tx = await masterChefContract.massUpdatePools({
        gasLimit: '1000000',
      })
      await tx.wait()

      toast({
        title: 'Update pools',
        description: 'Pools updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Update pools',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }

    setIsLoading(false)
  }

  return (
    <Tooltip
      hasArrow
      textAlign="center"
      label="Update reward variables for all pools. Be careful of gas spending!"
      fontSize="md"
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
