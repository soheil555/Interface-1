import useContract from './useContract'
import { Router } from '../../abis/types/Router'
import ABI from '../../abis/Router.json'
import useAddresses from '../useAddresses'

export default function useRouterContract() {
  const addresses = useAddresses()
  const address = addresses?.router

  return useContract<Router>(address, ABI)
}
