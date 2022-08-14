import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  IconButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Button,
  InputGroup,
  NumberInput,
  NumberInputField,
  useDisclosure,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { Formik, FormikErrors } from "formik";
import { SettingsFormValues } from "../../../types";
import { settingsAtom } from "../../../store";
import { useAtom } from "jotai";
import ThemeToggler from "../../common/ThemeToggler";

const Settings = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [settings, updateSettings] = useAtom(settingsAtom);

  const handleSaveSettings = (values: SettingsFormValues) => {
    updateSettings({
      slippage: values.slippage !== "" ? values.slippage : "0.1",
      deadline: values.deadline !== "" ? values.deadline : "30",
    });
    onClose();
  };

  const validator = (values: SettingsFormValues) => {
    const errors: FormikErrors<SettingsFormValues> = {};

    const slippageNumber = Number(values.slippage);
    const deadlineNumber = Number(values.deadline);

    if (
      isNaN(slippageNumber) ||
      !(slippageNumber >= 0 && slippageNumber <= 50)
    ) {
      errors.slippage = "Enter a valid slippage perecentage";
    }

    if (
      values.deadline.length > 0 &&
      (isNaN(deadlineNumber) || !(deadlineNumber > 0 && deadlineNumber <= 4320))
    ) {
      errors.deadline = "Enter a valid deadline";
    }

    return errors;
  };

  return (
    <Formik
      validateOnChange
      validateOnMount
      validate={validator}
      onSubmit={handleSaveSettings}
      initialValues={settings}
    >
      {({ errors, touched, values, handleSubmit, setFieldValue }) => (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={handleSubmit}>
          <PopoverTrigger>
            <IconButton
              aria-label="settings"
              variant="ghost"
              icon={<FiSettings />}
            />
          </PopoverTrigger>
          <PopoverContent p={4}>
            <PopoverArrow />

            <Text fontWeight="bold" mb={2}>
              Transaction Settings
            </Text>

            <FormControl
              isInvalid={!!touched.slippage && !!errors.slippage}
              mb={2}
            >
              <FormLabel htmlFor="slippage">Slippage tolerance</FormLabel>
              <InputGroup id="slippage">
                <NumberInput
                  onChange={(value) => setFieldValue("slippage", value)}
                  value={values.slippage}
                >
                  <NumberInputField placeholder="0.1" />
                </NumberInput>
                <Button onClick={() => setFieldValue("slippage", "0.1")} ml={2}>
                  Auto
                </Button>
              </InputGroup>
              <FormErrorMessage>{errors.slippage}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={!!touched.deadline && !!errors.deadline}
              mb={2}
            >
              <FormLabel htmlFor="deadline">Transaction deadline</FormLabel>
              <InputGroup display="flex" alignItems="center" id="deadline">
                <NumberInput
                  onChange={(value) => setFieldValue("deadline", value)}
                  value={values.deadline}
                  w="10rem"
                >
                  <NumberInputField placeholder="30" />
                </NumberInput>
                <Text ml={2}>Minutes</Text>
              </InputGroup>
              <FormErrorMessage>{errors.deadline}</FormErrorMessage>
            </FormControl>

            <Text fontWeight="bold" mb={2}>
              Interface Settings
            </Text>

            <HStack justify="space-between">
              <Text>Dark mode</Text>
              <ThemeToggler />
            </HStack>
          </PopoverContent>
        </Popover>
      )}
    </Formik>
  );
};

export default Settings;
