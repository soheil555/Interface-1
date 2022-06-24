import { Flex, Text, Box, HStack } from "@chakra-ui/react";
import useCountDown from "../../hooks/useCountDown";

const Counter = () => {
  const { days, hours, minutes, seconds } = useCountDown(
    new Date(1658609039612)
  );

  return (
    <Flex align="center" justify="center" bgColor="gray.300" borderRadius="lg">
      <HStack
        justify="space-between"
        py={10}
        w={{ base: 300, sm: 400, md: 700 }}
      >
        <Box textAlign="center">
          <Text fontSize="4xl">{days}</Text>
          <Text>Days</Text>
        </Box>

        <Box textAlign="center">
          <Text fontSize="4xl">{hours}</Text>
          <Text>Hours</Text>
        </Box>

        <Box textAlign="center">
          <Text fontSize="4xl">{minutes}</Text>
          <Text>Minutes</Text>
        </Box>

        <Box textAlign="center">
          <Text fontSize="4xl">{seconds}</Text>
          <Text>Seconds</Text>
        </Box>
      </HStack>
    </Flex>
  );
};
export default Counter;
