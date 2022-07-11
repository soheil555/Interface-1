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
  Input,
  NumberInput,
  NumberInputField,
  Checkbox,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { Formik, Form, Field, FormikErrors, FormikHelpers } from "formik";
import useMasterChefContract from "../../../hooks/useMasterChefContract";
import { AddLPFormValues } from "../../../types";
import { parseBalanceToBigNumber } from "../../../utils";

const initialValues: AddLPFormValues = {
  allocPoint: "",
  lpToken: "",
  rewarder: "",
  update: false,
};

const AddLPButton = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const masterChefContract = useMasterChefContract();

  const handleAddLP = async (
    { lpToken, allocPoint, rewarder, update }: AddLPFormValues,
    { resetForm }: FormikHelpers<AddLPFormValues>
  ) => {
    if (!masterChefContract) return;

    const allocPointBigNumber = parseBalanceToBigNumber(allocPoint);
    rewarder = rewarder.length !== 0 ? rewarder : ethers.constants.AddressZero;

    try {
      let tx = await masterChefContract.add(
        allocPointBigNumber,
        lpToken,
        rewarder,
        update,
        { gasLimit: 1000000 }
      );
      await tx.wait();

      toast({
        title: "Add LP",
        description: "LP added successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Add LP",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    resetForm();
    onClose();
  };
  const validator = (values: AddLPFormValues) => {
    const errors: FormikErrors<AddLPFormValues> = {};

    if (values.lpToken.length === 0) {
      errors.lpToken = "Required";
    }

    if (values.lpToken.length > 0 && !ethers.utils.isAddress(values.lpToken)) {
      errors.lpToken = "Invalid address";
    }

    if (values.allocPoint.length === 0) {
      errors.allocPoint = "Required";
    }

    const allocPointNumber = Number(values.allocPoint);
    if (isNaN(allocPointNumber) || allocPointNumber < 0) {
      errors.allocPoint = "Invalid number";
    }

    if (
      values.rewarder.length > 0 &&
      !ethers.utils.isAddress(values.rewarder)
    ) {
      errors.rewarder = "Invalid address";
    }

    return errors;
  };

  return (
    <>
      <Button onClick={onOpen} variant="brand-2-outline">
        Add new lp to the pool
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
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
            isValidating,
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
                        <Field
                          as={Input}
                          id="lpToken"
                          name="lpToken"
                          type="text"
                        />
                        <FormHelperText>
                          Address of ERC20 token that will be staked
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
                            type="text"
                          />
                        </NumberInput>
                        <FormHelperText>
                          Number of allocation points assigned to pool
                        </FormHelperText>
                        <FormErrorMessage>{errors.allocPoint}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={!!touched.rewarder && !!errors.rewarder}
                      >
                        <FormLabel>Rewarder</FormLabel>
                        <Field
                          as={Input}
                          id="rewarder"
                          name="rewarder"
                          type="text"
                        />
                        <FormHelperText>
                          Address of the rewarder delegate
                        </FormHelperText>
                        <FormErrorMessage>{errors.rewarder}</FormErrorMessage>
                      </FormControl>

                      <Checkbox
                        colorScheme="brand"
                        isChecked={values.update}
                        onChange={() => {
                          setFieldValue("update", !values.update);
                        }}
                      >
                        Update reward variables for all pools
                      </Checkbox>
                    </VStack>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="brand"
                      variant="outline"
                      mr={3}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      isLoading={isSubmitting || isValidating}
                      isDisabled={!isValid}
                      colorScheme="brand"
                      type="submit"
                    >
                      Add
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default AddLPButton;
