import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const PoolBox = ({ isLast, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`pool-box pool-box6 ${isLast ? "pool-box-last" : ""}   
        ${isOpen ? "show-product-dt7" : ""}`}
        
    >
      <div className="pool-head" >
        <div className="row">
          <div className="col-md-3 col-sm-12" style={{ color: "white" }}>
            <h4 style={{ color: "white" }}>
              <span style={{ color: "white" }}>
                <img src={data.image} alt="" />
              </span>{" "}
              {data?.name}
            </h4>
          </div>
          <div className="col-md-7 col-sm-12">
            <ul>
              <li style={{ color: "white" }}>
                AXO staked
                <strong style={{ color: "white" }}>{data?.AXOstaked}</strong>
                <span style={{ color: "white" }}>{data?.usd} USD</span>
              </li>
              <li style={{ color: "white" }}>
                Flexible APY
                <strong style={{ color: "white" }}>{data?.flexibleAPY}</strong>
              </li>
              <li style={{ color: "white" }}>
                Locked APY
                <strong style={{ color: "white" }}>{data?.lockedAPY}</strong>
              </li>
              <li style={{ color: "white" }}>
                Total staked
                <strong style={{ color: "white" }}>{data?.totalStaked}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-sm-12">
            <a
              className="collapse-txt collapse-txt1"
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
                <h5>
                  Performance Fee <span>0~2%</span>
                </h5>
                <a href="#">See Token Info</a>
                <a href="#">View Tutorial</a>
                <a href="#">View Contract</a>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="profit-box">
                <h2>Recent AXO Profit</h2>
                <div className="row">
                  <div className="col-md-6">
                    <h6>0.0</h6>
                    <h6>0 USD</h6>
                  </div>
                  <div className="col-md-6">
                    <span>0.1% unstaking fee if withdrawn within 72h</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="profit-box">
                <h2>Enable Pool</h2>
                <a href="#" className="btn-main">
                  <span>Enable</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PoolBox;
