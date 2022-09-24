import { Button, Tooltip } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useState } from 'react'
import useMasterChefContract from '../../../hooks/contracts/useMasterChefContract'
import { addTransactionAtom } from '../../../store'

interface UpdatePoolButtonProps {
  pid: number
}

const UpdatePoolButton = ({ pid }: UpdatePoolButtonProps) => {
  const masterChefContract = useMasterChefContract()
  const [isLoading, setIsLoading] = useState(false)
  const addTransaction = useAtom(addTransactionAtom)[1]

  const handleUpdatePool = async () => {
    if (!masterChefContract) return

    setIsLoading(true)

    try {
      const tx = await masterChefContract.updatePool(pid, {
        gasLimit: '1000000',
      })

      addTransaction({
        hash: tx.hash,
        description: 'Update pool',
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
      label="Update reward variables of the given pool to be up-to-date"
      fontSize={{ base: 'xs', sm: 'md' }}
      w={{ base: '15rem', sm: 'full' }}
    >
      <Button
        isDisabled={!masterChefContract}
        isLoading={isLoading}
        onClick={handleUpdatePool}
        variant="ghost"
      >
        Update Pool
      </Button>
    </Tooltip>
  )
}

export default UpdatePoolButton
