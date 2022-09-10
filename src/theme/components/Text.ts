import { ComponentStyleConfig } from '@chakra-ui/react'

const Text: ComponentStyleConfig = {
  variants: {
    subtext: ({ colorMode }) => ({
      color: colorMode === 'light' ? 'gray.600' : 'gray.300',
    }),
  },
}

export default Text
