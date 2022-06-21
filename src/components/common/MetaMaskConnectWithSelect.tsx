import { Button, Form, Stack } from "react-bootstrap";
import { CHAINS, getAddChainParameters } from "../../../chains";
import { useState, useCallback, useEffect } from "react";
import { metaMask, metaMaskHooks } from "../../connectors/metaMask";

interface ChainSelectProps {
  chainId: number | undefined;
  switchChain: (chainId: number) => void | undefined;
  chainIds: number[];
}

function ChainSelect({ chainId, switchChain, chainIds }: ChainSelectProps) {
  return (
    <Form.Select
      value={chainId}
      onChange={(event) => {
        switchChain(Number(event.target.value));
      }}
      disabled={switchChain === undefined}
    >
      {chainIds.map((chainId) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </Form.Select>
  );
}

export default function MetaMaskConnectWithSelect() {
  const [error, setError] = useState<Error>();
  const { useChainId, useIsActive, useIsActivating } = metaMaskHooks;
  // Current chainId
  const chainId = useChainId();

  const isActive = useIsActive();
  const isActivating = useIsActivating();

  const chainIds = Object.keys(CHAINS).map((chainId) => Number(chainId));
  const [desiredChainId, setDesiredChainId] = useState<number>(chainIds[0]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  // Disconnect if the network is not supported
  useEffect(() => {
    if (chainId && !chainIds.includes(chainId)) {
      metaMask.deactivate();
    }
  }, [chainId]);

  const switchChain = useCallback(
    (desiredChainId: number) => {
      setDesiredChainId(desiredChainId);

      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) return;

      metaMask
        .activate(getAddChainParameters(desiredChainId))
        .then(() => setError(undefined))
        .catch(setError);
    },
    [metaMask, chainId, setError]
  );

  const handleConnect = useCallback(() => {
    metaMask
      .activate(getAddChainParameters(desiredChainId))
      .then(() => setError(undefined))
      .catch(setError);
  }, [metaMask, desiredChainId, setError]);

  if (isActive) {
    return (
      <Stack direction="horizontal" gap={3}>
        <ChainSelect
          chainId={chainId}
          switchChain={switchChain}
          chainIds={chainIds}
        />
        <Button onClick={() => void metaMask.deactivate()}>Disconnect</Button>
      </Stack>
    );
  } else {
    return (
      <Stack direction="horizontal" gap={3}>
        <ChainSelect
          chainId={chainId}
          switchChain={switchChain}
          chainIds={chainIds}
        />
        <Button disabled={isActivating} onClick={handleConnect}>
          Connect Wallet
        </Button>
      </Stack>
    );
  }
}
