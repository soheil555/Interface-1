import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { Token } from '../../../types'

interface AddLiquidityConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  token1: Token
  token2: Token
  token1Amount: string
  token2Amount: string
  handleFormSubmit: () => void
}

const AddLiquidityConfirmationModal = ({
  isOpen,
  onClose,
  handleFormSubmit,
}: AddLiquidityConfirmationModalProps) => {
  return (
    <Modal
      blockScrollOnMount={false}
      size={{ base: 'xs', sm: 'sm', md: 'xl' }}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You will receive</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button onClick={handleFormSubmit} variant="brand">
            Confirm Supply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddLiquidityConfirmationModal
