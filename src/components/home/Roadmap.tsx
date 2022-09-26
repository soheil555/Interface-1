import { Box, Center, HStack, Image, Text, VStack } from '@chakra-ui/react'

const Roadmap = () => {
  return (
    <VStack mb="10rem" gap="6rem">
      <VStack>
        <Text fontWeight="bold">Cryptoland Road Map</Text>
        <Text fontWeight="bold" fontSize="4xl">
          Crypto Road Map
        </Text>
      </VStack>

      <Center zIndex={-100} w="full">
        <Box position="relative" h="60em" w="full">
          <Image
            w="full"
            h="full"
            alt="roadmap"
            src="/images/bg-roadmap-center-desktop.svg"
          />

          {/* Right items */}
          <HStack
            position="absolute"
            top="-4%"
            left="45%"
            align="flex-start"
            gap={12}
          >
            <Box
              mt={2}
              bg="brand.100"
              w="50px"
              h="50px"
              rounded="full"
              position="relative"
            >
              <Image
                width={10}
                height={10}
                position="absolute"
                top={1}
                left={6}
                alt="white paper"
                src="/images/white-paper.png"
              />
            </Box>

            <Box w="70%">
              <Text
                textTransform="capitalize"
                fontWeight="bold"
                fontSize={22}
                mb={2}
              >
                White Paper
              </Text>

              <Text>
                While existing solutions offer to solve just one problem team is
                up to build a secure, use use product based integration, and
                even a digital.
              </Text>
            </Box>
          </HStack>

          <HStack
            position="absolute"
            top="39%"
            left="52%"
            align="flex-start"
            gap={12}
          >
            <Box
              mt={2}
              bg="brand.100"
              w="50px"
              h="50px"
              rounded="full"
              position="relative"
            >
              <Image
                width={10}
                height={10}
                position="absolute"
                top={1}
                left={6}
                alt="money"
                src="/images/money.png"
              />
            </Box>

            <Box w="70%">
              <Text
                textTransform="capitalize"
                fontWeight="bold"
                fontSize={22}
                mb={2}
              >
                Money
              </Text>

              <Text>
                While existing solutions offer to solve just one problem team is
                up to build a secure, use use product based integration, and
                even a digital.
              </Text>
            </Box>
          </HStack>

          <HStack
            position="absolute"
            top="71%"
            left="52%"
            align="flex-start"
            gap={12}
          >
            <Box
              mt={2}
              bg="brand.100"
              w="50px"
              h="50px"
              rounded="full"
              position="relative"
            >
              <Image
                width={10}
                height={10}
                position="absolute"
                top={1}
                left={6}
                alt="reward"
                src="/images/reward.png"
              />
            </Box>

            <Box w="70%">
              <Text
                textTransform="capitalize"
                fontWeight="bold"
                fontSize={22}
                mb={2}
              >
                Reward
              </Text>

              <Text>
                While existing solutions offer to solve just one problem team is
                up to build a secure, use use product based integration, and
                even a digital.
              </Text>
            </Box>
          </HStack>

          {/* Left items */}
          <HStack
            position="absolute"
            top="19%"
            left="10%"
            align="flex-start"
            gap={12}
          >
            <Box w="34%">
              <Text
                textTransform="capitalize"
                fontWeight="bold"
                fontSize={22}
                mb={2}
                textAlign="right"
              >
                Launch
              </Text>

              <Text textAlign="right">
                While existing solutions offer to solve just one problem team is
                up to build a secure, use use product based integration, and
                even a digital.
              </Text>
            </Box>
            <Box w="140px" h="140px">
              <Image
                w="full"
                h="full"
                alt="white paper"
                src="/images/launch.svg"
              />
            </Box>
          </HStack>

          <HStack
            position="absolute"
            top="52%"
            left="10%"
            align="flex-start"
            gap={12}
          >
            <Box w="34%">
              <Text
                textTransform="capitalize"
                fontWeight="bold"
                fontSize={22}
                mb={2}
                textAlign="right"
              >
                Launch
              </Text>

              <Text textAlign="right">
                While existing solutions offer to solve just one problem team is
                up to build a secure, use use product based integration, and
                even a digital.
              </Text>
            </Box>
            <Box w="140px" h="140px">
              <Image
                w="full"
                h="full"
                alt="white paper"
                src="/images/launch.svg"
              />
            </Box>
          </HStack>

          <HStack
            position="absolute"
            top="92%"
            left="10%"
            align="flex-start"
            gap={12}
          >
            <Box w="34%">
              <Text
                textTransform="capitalize"
                fontWeight="bold"
                fontSize={22}
                mb={2}
                textAlign="right"
              >
                Launch
              </Text>

              <Text textAlign="right">
                While existing solutions offer to solve just one problem team is
                up to build a secure, use use product based integration, and
                even a digital.
              </Text>
            </Box>
            <Box w="140px" h="140px">
              <Image
                w="full"
                h="full"
                alt="white paper"
                src="/images/launch.svg"
              />
            </Box>
          </HStack>
        </Box>
      </Center>
    </VStack>
  )
}

export default Roadmap
