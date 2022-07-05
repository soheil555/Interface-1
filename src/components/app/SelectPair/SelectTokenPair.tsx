import { Box, Text, VStack, IconButton, HStack } from "@chakra-ui/react";
import SelectToken from "./SelectToken";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import { useFormikContext } from "formik";
import { FormValues } from "../../../types";
import { useEffect } from "react";

interface SelectTokenPairProps {
  middleIcon: JSX.Element;
  middleIconOnClick?: () => void;
  header?: string;
  label1?: string;
  label2?: string;
}

const SelectTokenPair = ({
  middleIcon,
  middleIconOnClick,
  header,
  label1,
  label2,
}: SelectTokenPairProps) => {
  const router = useRouter();
  const { values } = useFormikContext<FormValues>();

  return (
    <VStack maxW={{ base: "250", sm: "sm", md: "md" }} gap={2}>
      {header && (
        <HStack fontSize="lg" alignSelf="flex-start">
          <IconButton
            onClick={() => {
              router.back();
            }}
            aria-label="back"
            icon={<BiArrowBack />}
          />
          <Text>{header}</Text>
        </HStack>
      )}

      <Box>
        <Text textTransform="uppercase" color="gray.600" mb={2}>
          {label1}
        </Text>
        <SelectToken isToken1 />
      </Box>

      <IconButton
        onClick={middleIconOnClick}
        aria-label="middle icon"
        icon={middleIcon}
      />

      <Box>
        <Text textTransform="uppercase" color="gray.600" mb={2}>
          {label2}
        </Text>
        <SelectToken />
      </Box>
    </VStack>
  );
};

export default SelectTokenPair;
