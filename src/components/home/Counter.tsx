import { Text, Box, HStack } from "@chakra-ui/react";
import useCountDown from "../../hooks/useCountDown";

const Counter = () => {
  const { days, hours, minutes, seconds } = useCountDown(
    new Date(1663070000000)
  );

  return (
    <HStack gap={20} py={5} px={8} bg="white" borderRadius="lg" boxShadow="lg">
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
  );
};
export default Counter;
