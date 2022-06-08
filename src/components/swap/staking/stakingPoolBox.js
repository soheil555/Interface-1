import { useState } from "react";
import smallIcon from "../../../assets/images/small-icon.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Moralis from 'moralis';

const StakingPoolBox = ({ isLast, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  async function deposit() {
    var _pid = document.getElementById("_pid").value;
    var _amount = document.getElementById("_amount").value;
    console.log(_pid, _amount);
    await Moralis.enableWeb3()

    let options = {
      contractAddress: "0x0d6995072186C54AaCea93f112B86C125B6Ee6F3",
      functionName: "deposit",
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
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },],
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
    <div
      className={`pool-box pool-box6 ${isLast ? "pool-box-last" : ""}   
      ${isOpen ? "show-product-dt7" : ""}`}
    >
      <div className="pool-head">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <h4 style={{ color: "white" }}>
              <span>
                <img src={smallIcon} alt="" />
              </span>{" "}
              {data?.name}
            </h4>
          </div>
          <div className="col-md-7 col-sm-12">
            <ul>
              <li style={{ color: "white" }}>
                Earned
                <strong style={{ color: "white" }}>{data?.earned}</strong>
              </li>
              <li style={{ color: "white" }}>
                APR
                <strong style={{ color: "white" }}>{data?.APR}</strong>
              </li>
              <li  style={{ color: "white" }}>
                Liquidity
                <strong style={{ color: "white" }}>{data?.liquidity}</strong>
              </li>
              <li style={{ color: "white" }}>
                Multiplier
                <strong style={{ color: "white" }}>{data?.multiplier}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-sm-12">
            <a
              className="collapse-txt collapse-txt6"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <>
                  <span className="normal-text">Hide</span>
                  <i>
                    {" "}
                    <FaAngleUp />{" "}
                  </i>
                </>
              ) : (
                <>
                  <span style={{ color: "white" }} className="normal-text">Details</span>
                  <i>
                    {" "}
                    <FaAngleDown />{" "}
                  </i>
                </>
              )}
            </a>
          </div>
        </div>
      </div>

      <div className={`collapse ${isOpen ? "show" : ""}`}>
        <div className="card card-body">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="fee-info">
                <a href="#">Get AXO-BNB LP</a>
                <a href="#">View Contract</a>
                <a href="#">Your Balance:</a>
                <a href="#">0.00 BNB - $AXO</a>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="deposit-box">
                <h2>
                  Deposit <span>Withdraw</span>
                </h2>
                <div className="row">
                  <div className="col-md-6">
                    <h6>
                      0.0 <span>Max</span>
                    </h6>
                  </div>
                  <div className="col-md-6">
                    <div style={{ color: "black", textAlign: "center" }}>
                      <label>Enter Pool Id:</label>
                      <input type="text" id="_pid" />
                      <label>Enter Amount:</label>
                      <input type="text" id="_amount" />
                      <br />
                      <a className="btn-main mt-3" onClick={deposit}>
                        <span>Deposit</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-6">
              <div className="profit-box">
                <ul>
                  <li>APY: 156%</li>
                  <li>0.2223</li>
                  <li>AXO</li>
                </ul>
                <a href="#" className="btn-main">
                  <span>Harvest</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StakingPoolBox;
