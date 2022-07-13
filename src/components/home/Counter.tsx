import { Flex, Text, Box, Stack } from "@chakra-ui/react";
import useCountDown from "../../hooks/useCountDown";

const Counter = () => {
  const { days, hours, minutes, seconds } = useCountDown(
    new Date(1657827000000)
  );

  return (
    <Flex
      align="center"
      justify="center"
      bg="brand.gradient"
      borderRadius="lg"
      color="white"
    >
      <Stack
        direction={{ base: "column", sm: "row" }}
        gap={1}
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
      </Stack>
    </Flex>
  );
};
export default Counter;
