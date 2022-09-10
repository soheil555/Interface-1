import { Text, Box, Stack } from '@chakra-ui/react'
import useCountDown from '../../hooks/useCountDown'

interface CounterItemProps {
  label: string
  value: number
}

const CounterItem = ({ label, value }: CounterItemProps) => {
  return (
    <Box textAlign="center">
      <Text fontSize={{ base: '2xl', md: '3xl' }}>{value}</Text>
      <Text>{label}</Text>
    </Box>
  )
}

const Counter = () => {
  const { days, hours, minutes, seconds } = useCountDown(
    new Date(1663070000000)
  )

  return (
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      w={{ base: '70%', sm: 'full' }}
      justify="space-between"
      py={5}
      px={8}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      color="black"
    >
      <CounterItem label="Days" value={days} />
      <CounterItem label="Hours" value={hours} />
      <CounterItem label="Minues" value={minutes} />
      <CounterItem label="Seconds" value={seconds} />
    </Stack>
  )
}
export default Counter
