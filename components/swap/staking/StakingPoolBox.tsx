import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { StakingData } from "./Staking";

import smallIcon from "../../../public/assets/images/small-icon.png";
import StakingDepositForm from "./StakingDepositForm";

interface StakingPoolBox {
  isLast: boolean;
  data: StakingData;
}

const StakingPoolBox = ({ isLast, data }: StakingPoolBox) => {
  const [isOpen, setIsOpen] = useState(false);

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
                <img src={smallIcon.src} alt="" />
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
              <li style={{ color: "white" }}>
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
                  <span style={{ color: "white" }} className="normal-text">
                    Details
                  </span>
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

                  <StakingDepositForm />
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
