import smallIcon from "../../../assets/images/small-icon.png";
import PoolBox from "./PoolBox";
import Moralis from 'moralis';
const Pool = () => {
  const data = [
    {
      image: smallIcon,
      name: "Stake Axoswap",
      AXOstaked: "0.0",
      usd: 0,
      flexibleAPY: "10.82%",
      lockedAPY: "Up to 231.12%",
      totalStaked: "134,981,587 AXO ",
    },
    {
      image: smallIcon,
      name: "Stake Axoswap",
      AXOstaked: "0.0",
      usd: 10,
      flexibleAPY: "10.82%",
      lockedAPY: "Up to 231.12%",
      totalStaked: "134,981,587 AXO ",
    },
    {
      image: smallIcon,
      name: "Stake Axoswap",
      AXOstaked: "0.0",
      usd: 0,
      flexibleAPY: "10.82%",
      lockedAPY: "Up to 231.12%",
      totalStaked: "134,981,587 AXO ",
    },
    {
      image: smallIcon,
      name: "Stake Axoswap",
      AXOstaked: "0.0",
      usd: 0,
      flexibleAPY: "10.82%",
      lockedAPY: "Up to 231.12%",
      totalStaked: "134,981,587 AXO ",
    },
    {
      image: smallIcon,
      name: "Stake Axoswap",
      AXOstaked: "0.0",
      usd: 0,
      flexibleAPY: "10.82%",
      lockedAPY: "Up to 231.12%",
      totalStaked: "134,981,587 AXO ",
    },
  ];

  async function createPair() {
    var token_a = document.getElementById("token_a").value;
    var token_b = document.getElementById("token_b").value;
    await Moralis.enableWeb3()

    let options = {
      contractAddress: "0x663f1cDBa2a04d8f2ec740BF7bbCfde96Ea01288",
      functionName: "createPair",
      abi: [{
        "inputs": [{
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        }
        ],
        "name": "createPair",
        "outputs": [{
          "internalType": "address",
          "name": "pair",
          "type": "address"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
      },],
      params: {
        tokenA: token_a,
        tokenB: token_b
      },
    };
    try {
      var res = await Moralis.executeFunction(options)
      console.log(res);
    }
    catch (err) {
      console.log(err);
    }
  }

  async function mint() {
    var add = document.getElementById("add").value;
    await Moralis.enableWeb3()

    let options = {
      contractAddress: "0x1495C7B8d37E2b7624c60Cb28475E1B59d93919e",
      functionName: "mint",
      abi: [{
        "inputs": [{
          "internalType": "address",
          "name": "to",
          "type": "address"
        }],
        "name": "mint",
        "outputs": [{
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
      },],
      params: {
        to: add
      },
    }
    try {
      var res = await Moralis.executeFunction(options)
      console.log(res);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="pool-wrp bg-secondary p-5">

      <div style={{ color: "white", display:'flex' }}  >
        <div className="col-md-5 m-2 pt-1" >
          <h4>Create Pair</h4>
          <label>Enter Token-A Address:</label>
          <input className="form-control m-1" type="text" id="token_a" />
          <label>Enter Token-B Address:</label>
          <input className="form-control m-1" type="text" id="token_b" />
          <br />
          <input type="button" className="btn btn-info" value="Create Pair" onClick={createPair} />
        </div>

        <div className="col-md-5 m-3" >
          <h4>For Minting</h4>
          <label>Enter Wallet Address:</label>
          <input className="form-control " type="text" id="add" />
          <br />
          <input type="button" className="btn btn-info" value="Mint" onClick={mint} />
        </div>

      </div>
      <br />
     
      <div style={{ color: "white" }} >
        {

          data.map((el, i) => {
            return <PoolBox data={el} key={i} isLast={data.length === i + 1} />;
          })
        }
      </div>

    </div >
  );
};
export default Pool;
