const Counter = () => {
  return (
    <section className="counter-wrp">
      <div className="container">
        <div className="counter-row">
          <div className="counter-rwbx">
            <div className="row">
              <div className="col-md-3 col-sm-3">
                <div className="count-box">
                  <h2>
                    $<span className="counter">933B</span>+
                  </h2>
                  <p>Trade Volume</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className="count-box">
                  <h2>
                    <span className="counter">95</span>M+
                  </h2>
                  <p>All Time Trades</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className="count-box">
                  <h2>
                    <span className="counter">300</span>+
                  </h2>
                  <p>Integrations</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className="count-box">
                  <h2>
                    <span className="counter">4400</span>+
                  </h2>
                  <p>Community Delegates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Counter;
