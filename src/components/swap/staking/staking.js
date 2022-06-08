import smallIcon from "../../../assets/images/small-icon.png";
import StakingPoolBox from "./stakingPoolBox";
import Moralis from 'moralis';

const Staking = () => {
  const data = [
    {
      image: smallIcon,
      name: " AXO BNB",
      earned: "0.0",
      APR: "10.2%",
      liquidity: "$240,589,381",
      multiplier: "40x",
    },
    {
      image: smallIcon,
      name: " AXO BNB",
      earned: "0.0",
      APR: "10.2%",
      liquidity: "$240,589,381",
      multiplier: "40x",
    },
    {
      image: smallIcon,
      name: " AXO BNB",
      earned: "0.0",
      APR: "10.2%",
      liquidity: "$240,589,381",
      multiplier: "40x",
    },
  ];

  async function withdraw() {
    var _pid = document.getElementById("_pid").value;
    var _amount = document.getElementById("_amount").value;
    await Moralis.enableWeb3()

    let options = {
      contractAddress: "0x0d6995072186C54AaCea93f112B86C125B6Ee6F3",
      functionName: "withdraw",
      abi: [{
        "inputs": [{
          "internalType": "uint256",
          "name": "_pid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      params: {
        _pid: _pid,
        _amount: _amount
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

  return (
    <div className="pool-wrp bg-secondary p-5">
      <div className="col d-flex justify-content-center">
        <div style={{ color: "white", }} className="col-md-6">
          <h4>Withdraw</h4>
          <label>Enter Pool Id:</label>
          <input className="form-control" type="text" id="_pid" />
          <label>Enter Amount:</label>
          <input className="form-control" type="text" id="_amount" />
          <br />
          <input type="button" className="btn btn-info mb-2 col-md-3" value="Withdraw" onClick={withdraw} />
        </div>
      </div>

      {data.map((el, i) => {
        return (
          <StakingPoolBox key={i} data={el} isLast={data.length === i + 1} />
        );
      })}
    </div>
  );
};
export default Staking;
