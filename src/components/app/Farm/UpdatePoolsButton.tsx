import { Button, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import useMasterChefContract from '../../../hooks/contracts/useMasterChefContract'

const UpdatePoolsButton = () => {
  const masterChefContract = useMasterChefContract()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdatePools = async () => {
    if (!masterChefContract) return

    setIsLoading(true)

    try {
      await masterChefContract.massUpdatePools({
        gasLimit: '1000000',
      })
    } catch (error: any) {
      console.log(error)
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
