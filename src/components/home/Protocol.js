import protocolImg1 from "../../assets/images/protocol-img1.png";
import protocolImg2 from "../../assets/images/protocol-img2.png";

const Protocol = () => {
  return (
    <section className="protocol-wrp">
      <div className="container">
        <div className="protocol-row">
          <div className="row">
            <div className="col-md-5 col-sm-5">
              <div className="protocol-data">
                <h3>AXOSWAP</h3>
                <h4>A growing network of DeFi Apps</h4>
                <p>
                  Developers, traders, and liquidity providers participate
                  together in a financial marketplace that is open and
                  accessible to all.
                </p>
                <a href="#" className="btn-main">
                  <span>Explore All</span>
                </a>
              </div>
            </div>
            <div className="col-md-7 col-sm-7">
              <div className="protocol-img">
                <img src={protocolImg1} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="protocol-row evenrow">
          <div className="row">
            <div className="col-md-7 col-sm-7">
              <div className="protocol-img">
                <img src={protocolImg2} alt="" />
              </div>
            </div>
            <div className="col-md-5 col-sm-5">
              <div className="protocol-data">
                <h3>Developers</h3>
                <h4>Superpowers for DeFi developers</h4>
                <p>
                  Build Defi apps and tools on the largest crypto project on
                  Ethereum. Get started with quick start guides, protocol
                  documentation, a Javascript SDK, and fully open source code.
                </p>
                <a href="#" className="btn-main">
                  <span>Documentation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Protocol;
