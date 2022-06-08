import { useState } from "react";
import settings from "../../../assets/images/settings.svg";
import { FaAngleDown } from "react-icons/fa";
import SelectToken from "../SelectToken";
import token1 from "../../../assets/images/token1.png";
import token2 from "../../../assets/images/token2.png";
import token3 from "../../../assets/images/token3.png";
import token4 from "../../../assets/images/token4.png";
import token5 from "../../../assets/images/token5.png";
import token6 from "../../../assets/images/token6.png";
import token7 from "../../../assets/images/token7.png";
import Moralis from 'moralis';

const Swap = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState({
    value: "ETH",
    image: token1,
  });
  const [selectedOption2, setSelectedOption2] = useState({
    value: "Acala",
    image: token2,
  });
  const swapHandler = () => {
    let tempSelect1 = selectedOption1;
    let tempSelect2 = selectedOption2;
    setSelectedOption1(tempSelect2);
    setSelectedOption2(tempSelect1);
  };

  async function swapETHForExactTokens() {
    var amountOut = document.getElementById("amountOut").value;
    var path = document.getElementById("path").value;
    var to = document.getElementById("to").value;
    var deadline = document.getElementById("deadline").value;
    await Moralis.enableWeb3()

    let options = {
      contractAddress: "0x481b6c7208C17FF9d01a77c25D31f66809111772",
      functionName: "swapETHForExactTokens",
      abi: [{
        "inputs": [{
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
        ],
        "name": "swapETHForExactTokens",
        "outputs": [{
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }],
        "stateMutability": "payable",
        "type": "function"
      },],
      params: {
        amountOut: amountOut,
        path: path,
        to: to,
        deadline: deadline
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

  async function xLTForAXO() {
    var _xLTAmount = document.getElementById("_xLTAmount").value;
    await Moralis.enableWeb3()

    let options = {
      contractAddress: "0x453b3aCf7e968f7ff7859a9eEBD4Cdf4B20924c0",
      functionName: "xLTForAXO",
      abi: [{
        "inputs": [{
          "internalType": "uint256",
          "name": "_xLTAmount",
          "type": "uint256"
        }],
        "name": "xLTForAXO",
        "outputs": [{
          "internalType": "uint256",
          "name": "axoAmount_",
          "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
      }],
      params: {
        _xLTAmount: _xLTAmount
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

  async function AXOForxLT() {
    var _axoAmount = document.getElementById("_axoAmount").value;
    await Moralis.enableWeb3()

    let options = {
      contractAddress: "0x453b3aCf7e968f7ff7859a9eEBD4Cdf4B20924c0",
      functionName: "AXOForxLT",
      abi: [{
        "inputs": [{
          "internalType": "uint256",
          "name": "_axoAmount",
          "type": "uint256"
        }],
        "name": "AXOForxLT",
        "outputs": [{
          "internalType": "uint256",
          "name": "xLTAmount_",
          "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
      },],
      params: {
        _axoAmount: _axoAmount
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
    <div className="swap-block">
      <div className="setting-drop">
        <div className="btn-group">
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuClickableInside"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img src={settings} alt="" />
          </button>
          <ul
            className={`dropdown-menu  mt-5 ${isOpen ? "show" : ""}`}
            aria-labelledby="dropdownMenuClickableInside"
          >
            <div className="dropdown-block">
              <h2>Transaction Settings</h2>
              <div className="form-group">
                <label>Slippage tolerance ?</label>
                <div className="slippage-input">
                  <a href="#" className="btn-main">
                    <span>Auto</span>
                  </a>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="0.10 %"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Transaction deadline ?</label>
                <div className="slippage-input">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={30}
                  />
                  <label>minutes</label>
                </div>
              </div>
              <h2>Interface Settings</h2>
              <div className="toggle-box">
                <h5>Auto Router API ?</h5>
                <label className="toggle-label">
                  <input type="checkbox" />
                  <span className="back">
                    <span className="toggle" />
                    <span className="label on">on</span>
                    <span className="label off">off</span>
                  </span>
                </label>
              </div>
              <div className="toggle-box">
                <h5>Expert Mode ?</h5>
                <label className="toggle-label">
                  <input type="checkbox" defaultChecked />
                  <span className="back">
                    <span className="toggle" />
                    <span className="label on">on</span>
                    <span className="label off">off</span>
                  </span>
                </label>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <div className="row">
        <div style={{ color: "white", textAlign: "center" }} className="col-md-6">
          <h4>Convert Xolotl To Axolotl</h4>
          <label className="m-2">Enter Xolotl Amount:</label>
          <input className="form-control" type="text" id="_xLTAmount" />
          <br />
          <input type="button" className="btn btn-primary mb-3 " value="Convert" onClick={xLTForAXO} />
        </div>
        <div style={{ color: "white", textAlign: "center" }} className="col-md-6">
          <h4>Convert Axolotl To Xolotl</h4>
          <label className="m-2">Enter Axolotl Amount:</label>
          <input className="form-control" type="text" id="_axoAmount" />
          <br />
          <input type="button" className="btn btn-primary mb-3" value="Convert" onClick={AXOForxLT} />
        </div>
      </div>
      <div className="swap-box">
        <div className="form-group w-50">
          <SelectToken
            selectedOption={selectedOption1}
            optionSelectHandler={(e) => setSelectedOption1(e)}
          />
        </div>
        <h4>
          0 <small>~$12345</small> <span>Balance: 0</span>
        </h4>
      </div>
      <div className="swap-arrrow" onClick={() => swapHandler()}>
        {/* <button class="select-swap">&nbsp;</button> */}
        <a href="javascript:void(0);" className="select-swap">
          <i className="far fa-angle-down" />
          <FaAngleDown />
        </a>
      </div>
      <div className="swap-box">
        <div className="form-group  w-50">
          <SelectToken
            selectedOption={selectedOption2}
            optionSelectHandler={(e) => setSelectedOption2(e)}
          />
        </div>
        <h4>
          <small>~$12345</small> <span>Balance: 0</span>
        </h4>
      </div>
      <div className="swap-info">
        <h5>1 AXO = 0.0012 ETH ($0.0002)</h5>
        <div className="form-group">
          <select class="form-select">
            <option>Legacy</option>
            <option>Legacy</option>
            <option>Legacy</option>
            <option>Legacy</option>
          </select>
        </div>
      </div>
      <div className="text-center">
        <h2>SWAP</h2>
        <div style={{ display: "flex", }} className="mb-4">
        <div className="col-md-6 m-1">
        <label>Enter Amount:</label>
        <input className="form-control" type="text" id="amountOut" />
        <label>Enter Path:</label>
        <input className="form-control" type="text" id="path" />
        </div>
        
        <div className="col-md-6 m-1">
        <label>Enter Receiver Address:</label>
        <input className="form-control" type="text" id="to" />
        <label>Enter Deadline:</label>
        <input className="form-control" type="text" id="deadline" />
        </div>
        </div>
        
                <a href="#" className="btn-main">
          <span id="swapbtn" style={{ display: "" }} onClick={swapETHForExactTokens}>SWAP</span>
        </a>
      </div>
    </div>
  );
};
export default Swap;
