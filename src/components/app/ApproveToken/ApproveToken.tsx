import { useEffect, useState } from "react";
import { Token } from "../../../types";
import useNotApprovedTokens, {
  NotApprovedToken,
} from "../../../hooks/useNotApprovedTokens";
import { Button, useToast } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

interface ApproveTokenProps {
  tokens: Token[];
  amounts: string[];
  isAllTokensApproved: boolean;
  setIsAllTokensApproved: (isAllTokensApproved: boolean) => void;
}

const ApproveToken = ({
  tokens,
  amounts,
  isAllTokensApproved,
  setIsAllTokensApproved,
}: ApproveTokenProps) => {
  const toast = useToast();
  const { data: notApprovedTokens } = useNotApprovedTokens(tokens, amounts);
  const [isLoading, setIsLoading] = useState(false);
  const { provider } = useWeb3React();

  const handleApproveToken = async ({
    tokenContract,
    owner,
    spender,
    amount,
  }: NotApprovedToken) => {
    if (!provider) return;
    setIsLoading(true);
    try {
      const signer = provider.getSigner(owner);
      const tx = await tokenContract.connect(signer).approve(spender, amount);
      await tx.wait();

      toast({
        title: "Approve Token",
        description: `Token approved successfully`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err: any) {
      console.log(err);

      toast({
        title: "Approve Token",
        description: err.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (notApprovedTokens && notApprovedTokens.length === 0) {
      setIsAllTokensApproved(true);
    } else {
      setIsAllTokensApproved(false);
    }
  }, [notApprovedTokens]);

  if (
    isAllTokensApproved ||
    !notApprovedTokens ||
    notApprovedTokens.length === 0
  )
    return null;

  return (
    <Button
      isDisabled={!provider}
      variant="brand-outline"
      w="full"
      isLoading={isLoading}
      onClick={() => handleApproveToken(notApprovedTokens[0])}
    >
      Approve {notApprovedTokens[0].tokenInfo.symbol}
    </Button>
  );
};

export default ApproveToken;
