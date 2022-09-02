import { Contract } from "ethers";
import { useEffect, useState } from "react";
import useAddresses from "../../../hooks/useAddresses";
import { Token } from "../../../types";
import { parseBalanceToBigNumber } from "../../../utils";
import ERC20ABI from "../../../abis/ERC20.json";
import { useWeb3React } from "@web3-react/core";
import { ERC20 } from "../../../abis/types";

interface ApproveTokenProps {
  tokens: Token[];
  amounts: string[];
  isAllTokensApproved: boolean;
  setIsAllTokensApproved: (isAllTokensApproved: boolean) => void;
}

interface NotApprovedToken {
  tokenContract: Contract;
  spender: string;
  owner: string;
}

const ApproveToken = ({
  tokens,
  amounts,
  isAllTokensApproved,
  setIsAllTokensApproved,
}: ApproveTokenProps) => {
  const [notApprovedTokens, setNotApprovedTokens] =
    useState<NotApprovedToken[]>();

  const addresses = useAddresses();
  const { account, provider } = useWeb3React();

  useEffect(() => {
    if (!addresses || !provider || !account) return;

    const notApprovedTokens: NotApprovedToken[] = [];

    (async () => {
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const amount = amounts[i];
        const amountBigNumber = parseBalanceToBigNumber(amount, token.decimals);
        const tokenAddress = addresses.tokens[token.symbol];
        const routerContractAddress = addresses.router;

        const tokenContract = new Contract(
          tokenAddress,
          ERC20ABI,
          provider
        ) as ERC20;

        const allowance = await tokenContract.allowance(
          account,
          routerContractAddress
        );
        if (allowance.lt(amountBigNumber)) {
          notApprovedTokens.push({
            tokenContract,
            spender: routerContractAddress,
            owner: account,
          });
        }
      }
    })();
  }, [addresses, provider, account]);

  if (isAllTokensApproved) return null;
};

export default ApproveToken;
