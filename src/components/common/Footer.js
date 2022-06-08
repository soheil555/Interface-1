import socialIcon1 from "../../assets/images/social-ic1.svg";
import socialIcon2 from "../../assets/images/social-ic2.svg";
import socialIcon3 from "../../assets/images/social-ic3.svg";
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="social-bx">
          <a href="#" target="_blank">
            <img src={socialIcon1} alt="" />
          </a>
          <a href="#" target="_blank">
            <img src={socialIcon2} alt="" />
          </a>
          <a href="#" target="_blank">
            <img src={socialIcon3} alt="" />
          </a>
        </div>
        <div className="quicklink">
          <ul>
            <li>
              <a href="#">Ecosystem</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Governance</a>
            </li>
            <li>
              <a href="#">Developers</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Protocol</a>
            </li>
            <li>
              <a href="#">Disclaimer</a>
            </li>
            <li>
              <a href="#">Trademark</a>
            </li>
            <li>
              <a href="#">Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
