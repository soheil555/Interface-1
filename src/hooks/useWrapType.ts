import { useEffect, useState } from "react";
import { Token, WrapType } from "../types";

function getWrapType(tokenIn: Token, tokenOut: Token) {
  if (tokenIn.isCoin && tokenOut.symbol === "wMATIC") {
    return "wrap";
  } else if (tokenOut.isCoin && tokenIn.symbol === "wMATIC") {
    return "unwrap";
  } else {
    return "invalid";
  }
}

export default function useWrapType(tokenIn?: Token, tokenOut?: Token) {
  const [wrapType, setWrapType] = useState<WrapType>("invalid");

  useEffect(() => {
    if (tokenIn && tokenOut) {
      setWrapType(getWrapType(tokenIn, tokenOut));
    }
  }, [tokenIn, tokenOut]);

  return wrapType;
}
