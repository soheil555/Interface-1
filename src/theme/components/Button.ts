import { ComponentStyleConfig } from '@chakra-ui/react'

const Button: ComponentStyleConfig = {
  variants: {
    brand: {
      bg: 'brand.gradient',
      color: 'white',
      fontSize: { base: 'sm', sm: 'md' },
    },
    'brand-solid': {
      bg: 'white',
      color: 'brand.300',
      fontSize: { base: 'sm', sm: 'md' },
    },
    'brand-outline': {
      border: '2px solid',
      borderImageSlice: 1,
      borderImageSource: 'linear-gradient(94.65deg, #e16adc, #ed8780)',
      fontSize: { base: 'sm', sm: 'md' },
    },
  },
}

export default Button
