import { Select } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import useAllPairs from '../../../hooks/useLiquidityPairs'
import useFarms from '../../../hooks/useFarms'
import useTokenInfo from '../../../hooks/useTokenInfo'
import { Pair } from '../../../types'

interface LPTokenOptionProps {
  pair: Pair
}

const LPTokenOption = ({ pair }: LPTokenOptionProps) => {
  const token0Info = useTokenInfo(pair.token0)
  const token1Info = useTokenInfo(pair.token1)

  return (
    <option value={pair.address}>
      {token0Info?.symbol}/{token1Info?.symbol} LP token
    </option>
  )
}

const LPTokenSelect = () => {
  const [validPairs, setValidPairs] = useState<Pair[]>()
  const { data: farms } = useFarms()
  const { data: pairs } = useAllPairs()
  const { setFieldValue, setFieldTouched } = useFormikContext()

  useEffect(() => {
    if (pairs && farms) {
      const notAvaialbeTokens = farms.map((farm) => farm.lpToken)
      const validPairs = pairs.filter(
        (pair) => !notAvaialbeTokens.includes(pair.address)
      )
      setValidPairs(validPairs)
    }
  }, [pairs, farms])

  return (
    <Select
      placeholder={
        !validPairs
          ? 'loading...'
          : validPairs.length
          ? 'Select a LP token'
          : 'No available LP token found'
      }
      disabled={!validPairs || validPairs.length === 0}
      onBlur={() => {
        setFieldTouched('lpToken', true)
      }}
      onChange={(e) => {
        setFieldValue('lpToken', e.target.value)
      }}
    >
      {validPairs &&
        validPairs.map((pair) => {
          return <LPTokenOption key={pair.address} pair={pair} />
        })}
    </Select>
  )
}

export default LPTokenSelect
