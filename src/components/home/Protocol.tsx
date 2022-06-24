import protocolImg1 from "../../../public/assets/images/protocol-img1.png";
import protocolImg2 from "../../../public/assets/images/nftImg.gif";

const Protocol = () => {
  return (
    <section className="protocol-wrp">
      <div className="container">
        <div className="protocol-row">
          <div className="row">
            <div className="col-md-5 col-sm-5">
              <div className="protocol-data">
                <h3>AXOSWAP</h3>
                <h4>Disclaimer</h4>
                <p>
                 WORK IN PROGRESS: What you are seeing isnt a final product
                </p>
                <a href="https://docs.axoswap.io" className="btn-main">
                  <span>View our docs</span>
                </a>
              </div>
            </div>
            <div className="col-md-7 col-sm-7">
              <div className="protocol-img">
                <img src={protocolImg1.src} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="protocol-row evenrow">
          <div className="row">
            <div className="col-md-7 col-sm-7">
              <div className="protocol-img">
              <a href="https://rarible.com/axoswapio" className="protocol-img">
                <img src={protocolImg2.src} alt="" />
                </a>
              </div>
            </div>
            <div className="col-md-5 col-sm-5">
              <div className="protocol-data">
                <h3>Crowdfunding Campaign</h3>
                <h4>AxoGenesis Collection</h4>
                <p>
                Purchase our crowdfunding NFT collection
                  to support our platform development
                  and receive future rewards!
                </p>
                <a href="https://nftcalendar.io/event/axoswap-announces-release-of-collection-featuring-3333-axolotl-nfts-with-unique-traits/" className="btn-main">
                  <span>Announcement</span>
                </a>
                <a href="https://nft.axoswap.io" className="btn-main">
                  <span>Mint Now</span>
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
