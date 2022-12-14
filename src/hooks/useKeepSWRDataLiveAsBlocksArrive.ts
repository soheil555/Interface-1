import { useEffect, useRef } from 'react'
import useBlockNumber from './useBlockNumber'

export function useKeepSWRDataLiveAsBlocksArrive(mutate: () => Promise<any>) {
  const mutateRef = useRef(mutate)

  useEffect(() => {
    mutateRef.current = mutate
  })

  const { data } = useBlockNumber()

  useEffect(() => {
    mutateRef.current()
  }, [data])
}
