import { Card, Timeline, Typography } from "antd";
import React, { useMemo } from "react";
import { useMoralis, useExecuteFunction } from "react-moralis";

const { Text } = Typography;
export function QuickStart({ isServerInfo }) {
  const { Moralis } = useMoralis();
  const contractProcessor = useExecuteFunction();
  async function Donation(val)
  {
      let option ={
        contractAddress:"";
        functionName:"";
        abi:"";

      }
  }
  return{
    <div>
    <div style={{ display: "flex", gap: "10px" }}>
    
          <title strong>Intract with Smart Contract</title>
          <div>
          <a href={"https://polygonscan.com/address/0x663f1cDBa2a04d8f2ec740BF7bbCfde96Ea01288#code"}
          target="_blank"
          rel="noreferrer"></a>
          </div>
          <div>
              <title level={3}>Donate</title>
              <button onClick={()=> Donation(0.1)}>0.1 Matic</button>
          </div>
     
       </div>
       </div>












  };
}

