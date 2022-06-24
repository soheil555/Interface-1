import useCountDown from "../../hooks/useCountDown";

const Counter = () => {
  const { days, hours, minutes, seconds } = useCountDown(
    new Date(1658609039612)
  );

  return (
    <section className="counter-wrp">
      <div className="container">
        <div className="counter-row">
          <div className="counter-rwbx">
            <div className="row">
              <div className="col-md-3 col-sm-3">
                <div className="count-box">
                  <h2>
                    <span className="counter">{days}</span>
                  </h2>
                  <p>Days</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className="count-box">
                  <h2>
                    <span className="counter">{hours}</span>
                  </h2>
                  <p>Hours</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className="count-box">
                  <h2>
                    <span className="counter">{minutes}</span>
                  </h2>
                  <p>Minutes</p>
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className="count-box">
                  <h2>
                    <span className="counter">{seconds}</span>
                  </h2>
                  <p>Seconds</p>
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
