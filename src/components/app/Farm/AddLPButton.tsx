import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberInput,
  NumberInputField,
  Checkbox,
  VStack,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { Formik, Form, Field, FormikErrors, FormikHelpers } from 'formik'
import { useAtom } from 'jotai'
import useMasterChefContract from '../../../hooks/contracts/useMasterChefContract'
import { addTransactionAtom } from '../../../store'
import { AddLPFormValues } from '../../../types'
import LPTokenSelect from './LPTokenSelect'

const initialValues: AddLPFormValues = {
  allocPoint: '',
  lpToken: '',
  update: false,
}

const AddLPButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const masterChefContract = useMasterChefContract()
  const addTransaction = useAtom(addTransactionAtom)[1]

  const handleAddLP = async (
    { lpToken, allocPoint, update }: AddLPFormValues,
    { resetForm }: FormikHelpers<AddLPFormValues>
  ) => {
    if (!masterChefContract) return

    try {
      const tx = await masterChefContract.add(allocPoint, lpToken, update, {
        gasLimit: 1000000,
      })

      addTransaction({
        hash: tx.hash,
        description: 'Add new lp to the pool',
      })
    } catch (error: any) {
      console.log(error)
    }

    resetForm()
    onClose()
  }
  const validator = (values: AddLPFormValues) => {
    const errors: FormikErrors<AddLPFormValues> = {}

    if (values.lpToken.length === 0) {
      errors.lpToken = 'Required'
    }

    if (values.lpToken.length > 0 && !ethers.utils.isAddress(values.lpToken)) {
      errors.lpToken = 'Invalid address'
    }

    if (values.allocPoint.length === 0) {
      errors.allocPoint = 'Required'
    }

    const allocPointNumber = Number(values.allocPoint)
    if (isNaN(allocPointNumber) || allocPointNumber < 0) {
      errors.allocPoint = 'Invalid number'
    }

    return errors
  }

  return (
    <>
      <Button w="full" onClick={onOpen} variant="brand-outline">
        Add new lp to the pool
      </Button>

      <Modal
        blockScrollOnMount={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <Formik
          initialValues={initialValues}
          onSubmit={handleAddLP}
          validate={validator}
        >
          {({
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            isValid,
            isSubmitting,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <ModalContent>
                  <ModalHeader>Add a new LP to be staked</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <VStack gap={2} align="stretch">
                      <FormControl
                        isRequired
                        isInvalid={!!touched.lpToken && !!errors.lpToken}
                      >
                        <FormLabel>LP Token</FormLabel>

                        <LPTokenSelect />

                        <FormHelperText>
                          LP token that will be staked
                        </FormHelperText>
                        <FormErrorMessage>{errors.lpToken}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        isInvalid={!!touched.allocPoint && !!errors.allocPoint}
                      >
                        <FormLabel>Alloc Point</FormLabel>
                        <NumberInput>
                          <Field
                            as={NumberInputField}
                            id="allocPoint"
                            name="allocPoint"
                          />
                        </NumberInput>
                        <FormHelperText>
                          Number of allocation points assigned to pool
                        </FormHelperText>
                        <FormErrorMessage>{errors.allocPoint}</FormErrorMessage>
                      </FormControl>

                      <Checkbox
                        isChecked={values.update}
                        onChange={() => {
                          setFieldValue('update', !values.update)
                        }}
                      >
                        Update reward variables for all pools
                      </Checkbox>
                    </VStack>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      isLoading={isSubmitting}
                      isDisabled={!isValid}
                      type="submit"
                    >
                      Add
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Form>
            )
          }}
        </Formik>
      </Modal>
    </>
  )
}

export default AddLPButton
