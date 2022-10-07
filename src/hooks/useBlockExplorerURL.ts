import { useWeb3React } from '@web3-react/core'
import { getAddChainParameters } from '../chains'

export default function useBlockExplorerURL() {
  const { chainId } = useWeb3React()
  const chainInfo =
    typeof chainId !== 'undefined' ? getAddChainParameters(chainId) : undefined

  const blockExplorerURL =
    chainInfo &&
    chainInfo.blockExplorerUrls &&
    chainInfo.blockExplorerUrls.length > 0
      ? chainInfo.blockExplorerUrls[0]
      : undefined

  return blockExplorerURL
}
