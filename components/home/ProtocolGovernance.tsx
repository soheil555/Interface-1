import arrowUp from "../../public/assets/images/arrow-up.svg";
import newup from "../../public/assets/images/newup.svg";
import newupActive from "../../public/assets/images/newup-active.svg";

const ProtocolGovernance = () => {
  return (
    <section className="protocol-governance-wrp">
      <div className="container">
        <div className="protocol-links">
          <div className="prouserlinks">
            <h6>Useful links</h6>
            <div className="polinksrow">
              <a href="#" target="_blank">
                <span>Whitepaper</span>
                <img src={arrowUp.src} alt="" />
              </a>
              <a href="#" target="_blank">
                <span>Github</span>
                <img src={arrowUp.src} alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="protocol-govern-block">
          <div className="row">
            <div className="col-md-5 col-sm-12">
              <div className="tab-content">
                <div className="tab-pane active" id="home">
                  <div className="protocol-content">
                    <h2>PROTOCOL GOVERNANCE</h2>
                    <h3>Governed by the community</h3>
                    <p>
                      The Tri Protocol is managed by a global community of TRI
                      token holders and delegates.
                    </p>
                    <a href="#" className="btn-read">
                      Read more
                    </a>
                  </div>
                </div>
                <div className="tab-pane fade" id="menu1">
                  <div className="protocol-content">
                    <h2>PROTOCOL GOVERNANCE</h2>
                    <h3>Governed by the community</h3>
                    <p>
                      The Tri Protocol is managed by a global community of TRI
                      token holders and delegates.
                    </p>
                    <a href="#" className="btn-read">
                      Read more
                    </a>
                  </div>
                </div>
                <div className="tab-pane fade" id="menu2">
                  <div className="protocol-content">
                    <h2>PROTOCOL GOVERNANCE</h2>
                    <h3>Governed by the community</h3>
                    <p>
                      The Tri Protocol is managed by a global community of TRI
                      token holders and delegates.
                    </p>
                    <a href="#" className="btn-read">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-sm-12">
              <div className="protocol-govern-tabs">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#home"
                    >
                      <h4>
                        Governance Forum{" "}
                        <img src={newup.src} alt="" className="nrmimg" />
                        <img src={newupActive.src} alt="" className="nrm-act" />
                      </h4>
                      <p>
                        The Tri Protocol is managed by a global community of TRI
                        token holders and delegates.
                      </p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#menu1">
                      <h4>
                        Sybil <img src={newup.src} alt="" className="nrmimg" />
                        <img src={newupActive.src} alt="" className="nrm-act" />
                      </h4>
                      <p>
                        The Tri Protocol is managed by a global community of TRI
                        token holders and delegates.
                      </p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#menu2">
                      <h4>
                        Governance Portal{" "}
                        <img src={newup.src} alt="" className="nrmimg" />
                        <img src={newupActive.src} alt="" className="nrm-act" />
                      </h4>
                      <p>
                        The Tri Protocol is managed by a global community of TRI
                        token holders and delegates.
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProtocolGovernance;
