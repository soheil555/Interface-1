import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import '../../theme.ts';

export default function WithBackgroundImage() {
  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={
       '/images/hero.gif'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
          color="white"
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
            Defi's most cutting edge protocol!
          </Text>
          <Stack direction={'row'}>
            <Button
             variant="brand">
              View our docs
            </Button>
            <Button
              variant="brand-2-outline">
              Buy AxO Token
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}