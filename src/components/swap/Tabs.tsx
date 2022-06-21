interface TabsProps {
  children: React.ReactNode;
  isActive: string;
  tabHandler: (el: string) => void;
}

const Tabs = ({ children, isActive, tabHandler }: TabsProps) => {
  const tabHeadings = ["SWAP", "POOL", "STAKE"];
  return (
    <section className="pro-inner-wrp">
      <div className="container">
        <div className="protocol-tabs-bx">
          <ul className="nav nav-tabs">
            {tabHeadings.map((el, i) => {
              return (
                <li className="nav-item" key={i}>
                  <a
                    className={`nav-link ${isActive === el ? "active" : ""}`}
                    onClick={() => tabHandler(el)}
                    href="#"
                  >
                    {el}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="inner-prodata">{children}</div>
      </div>
    </section>
  );
};
export default Tabs;
