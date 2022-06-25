import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import SelectToken from "../SelectToken";
import SwapForm from "./SwapForm";
import useXolotlContract from "../../../hooks/useXolotlContract";

import settings from "../../../../public/assets/images/settings.svg";
import token1 from "../../../../public/assets/images/token1.png";
import token2 from "../../../../public/assets/images/token2.png";
import token3 from "../../../../public/assets/images/token3.png";
import token4 from "../../../../public/assets/images/token4.png";
import token5 from "../../../../public/assets/images/token5.png";
import token6 from "../../../../public/assets/images/token6.png";
import token7 from "../../../../public/assets/images/token7.png";

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

  const xolotlContract = useXolotlContract();

  const xLTForAXO = async () => {
    if (!xolotlContract) return;

    const _xLTAmount = (
      document.getElementById("_xLTAmount") as HTMLInputElement
    ).value;

    try {
      const response = await xolotlContract.xLTForAXO(_xLTAmount);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const AXOForxLT = async () => {
    if (!xolotlContract) return;

    const _axoAmount = (
      document.getElementById("_axoAmount") as HTMLInputElement
    ).value;

    try {
      const response = await xolotlContract.AXOForxLT(_axoAmount);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
            <img src={settings.src} alt="" />
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
                    placeholder="30"
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
        <div
          style={{ color: "white", textAlign: "center" }}
          className="col-md-6"
        >
          <h4>Convert Xolotl To Axolotl</h4>
          <label className="m-2">Enter Xolotl Amount:</label>
          <input className="form-control" type="text" id="_xLTAmount" />
          <br />
          <input
            type="button"
            className="btn btn-primary mb-3 "
            value="Convert"
            onClick={xLTForAXO}
            disabled={!xolotlContract}
          />
        </div>
        <div
          style={{ color: "white", textAlign: "center" }}
          className="col-md-6"
        >
          <h4>Convert Axolotl To Xolotl</h4>
          <label className="m-2">Enter Axolotl Amount:</label>
          <input className="form-control" type="text" id="_axoAmount" />
          <br />
          <input
            type="button"
            className="btn btn-primary mb-3"
            value="Convert"
            onClick={AXOForxLT}
            disabled={!xolotlContract}
          />
        </div>
      </div>
      <div className="swap-box">
        <div className="form-group w-50">
          <SelectToken
            selectedOption={selectedOption1}
            optionSelectHandler={setSelectedOption1}
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
            optionSelectHandler={setSelectedOption2}
          />
        </div>
        <h4>
          <small>~$12345</small> <span>Balance: 0</span>
        </h4>
      </div>
      <div className="swap-info">
        <h5>1 AXO = 0.0012 ETH ($0.0002)</h5>
        <div className="form-group">
          <select className="form-select">
            <option>Legacy</option>
            <option>Legacy</option>
            <option>Legacy</option>
            <option>Legacy</option>
          </select>
        </div>
      </div>
      <SwapForm />
    </div>
  );
};
export default Swap;
