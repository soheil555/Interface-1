import {
  extendTheme,
  ThemeConfig,
  withDefaultColorScheme,
} from '@chakra-ui/react'
import { globalStyles } from './styles'
import Button from './components/Button'
import Menu from './components/Menu'
import Popover from './components/Popover'
import Text from './components/Text'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = extendTheme(
  {
    config,
    ...globalStyles,
    components: {
      Button,
      Menu,
      Popover,
      Text,
    },
  },
  withDefaultColorScheme({
    colorScheme: 'brand',
    components: ['Button', 'Tabs', 'Checkbox', 'Slider', 'Switch'],
  })
)

export default theme
