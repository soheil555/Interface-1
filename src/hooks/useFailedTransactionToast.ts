import { useToast } from '@chakra-ui/react'

export default function useFailedTransactionToast() {
  const toast = useToast({
    title: 'Failed transaction',
    isClosable: true,
    duration: 9000,
    position: 'bottom-right',
    status: 'error',
  })

  return toast
}
